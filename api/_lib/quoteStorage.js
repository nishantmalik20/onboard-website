import { getAdminClient } from './supabaseAdmin.js';

const SIGNED_URL_TTL = 60 * 60 * 24 * 7; // 7 days

function sanitize(name) {
  return String(name || 'file').replace(/[^\w.-]+/g, '_').slice(0, 120) || 'file';
}

/**
 * Persist a quote submission to Supabase:
 *  1. create an "Opportunity" task with the customer details,
 *  2. upload each file to the private `quotes` bucket,
 *  3. record each attachment and return signed view links.
 *
 * Throws if Supabase isn't configured or the task can't be created — the caller
 * falls back to emailing raw attachments so a submission is never lost.
 */
export async function persistQuoteSubmission(fields, files) {
  const admin = getAdminClient();

  const name = (fields.name || '').trim();
  const service = (fields.service || '').trim();
  const email = (fields.email || '').trim();

  // Target the Opportunity stage; fall back to the first column if renamed.
  let columnId;
  const { data: opp } = await admin.from('board_columns').select('id').eq('name', 'Opportunity').maybeSingle();
  columnId = opp?.id;
  if (!columnId) {
    const { data: first } = await admin.from('board_columns').select('id').order('position').limit(1).maybeSingle();
    columnId = first?.id;
  }
  if (!columnId) throw new Error('No board columns configured');

  const { count } = await admin
    .from('tasks')
    .select('*', { count: 'exact', head: true })
    .eq('column_id', columnId);

  const extras = [];
  if (fields.quantity) extras.push(`Quantity: ${fields.quantity}`);
  if (fields.deadline) extras.push(`Deadline: ${fields.deadline}`);
  if (fields.budget) extras.push(`Budget: ${fields.budget}`);
  const description = [
    (fields.description || '').trim(),
    extras.length ? `— ${extras.join(' · ')}` : '',
  ].filter(Boolean).join('\n\n');

  const { data: task, error: taskErr } = await admin
    .from('tasks')
    .insert({
      title: `${service || 'Quote request'} — ${name || 'New lead'}`.slice(0, 200),
      description: description || null,
      column_id: columnId,
      position: count ?? 0,
      customer_name: name || null,
      customer_email: email || null,
      customer_phone: (fields.phone || '').trim() || null,
      company: (fields.company || '').trim() || null,
      service_type: service || null,
      priority: 'medium',
    })
    .select('id')
    .single();
  if (taskErr) throw new Error(`Task insert failed: ${taskErr.message}`);

  const links = [];
  for (let i = 0; i < files.length; i += 1) {
    const f = files[i];
    const path = `${task.id}/${i}-${sanitize(f.name)}`;
    const { error: upErr } = await admin.storage.from('quotes').upload(path, f.buffer, {
      contentType: f.contentType || 'application/octet-stream',
      upsert: false,
    });
    if (upErr) {
      console.error('[quote] storage upload failed for', f.name, '-', upErr.message);
      continue; // skip this file; the rest still get saved
    }
    await admin.from('quote_attachments').insert({
      task_id: task.id,
      file_name: f.name,
      file_path: path,
      content_type: f.contentType || null,
      size_bytes: f.size ?? null,
    });
    const { data: signed } = await admin.storage.from('quotes').createSignedUrl(path, SIGNED_URL_TTL);
    links.push({ name: f.name, size: f.size, url: signed?.signedUrl || null });
  }

  // If files were sent but none stored, signal a fallback to email attachments.
  if (files.length > 0 && links.length === 0) {
    throw new Error('All file uploads failed');
  }

  return { taskId: task.id, links };
}
