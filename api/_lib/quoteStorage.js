import { getAdminClient } from './supabaseAdmin.js';

const SIGNED_URL_TTL = 60 * 60 * 24 * 7; // 7 days

function sanitize(name) {
  return String(name || 'file').replace(/[^\w.-]+/g, '_').slice(0, 120) || 'file';
}

/** Create an Opportunity task from the quote fields. Shared by both flows. */
async function createOpportunityTask(admin, fields) {
  const name = (fields.name || '').trim();
  const service = (fields.service || '').trim();
  const email = (fields.email || '').trim();

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

  const { data: task, error } = await admin
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
  if (error) throw new Error(`Task insert failed: ${error.message}`);
  return task;
}

/**
 * Direct-upload flow (preferred): files were uploaded straight to Storage by
 * the browser via signed URLs. Here we just create the task, record each
 * attachment, and return signed view links.
 */
export async function persistQuoteSubmissionFromPaths(fields, uploadedFiles) {
  const admin = getAdminClient();
  const task = await createOpportunityTask(admin, fields);

  const links = [];
  for (const f of uploadedFiles) {
    if (!f?.path) continue;
    const fileName = f.name || f.path.split('/').pop();
    // Confirm the object exists (also yields the view link); skip if missing.
    const { data: signed, error } = await admin.storage.from('quotes').createSignedUrl(f.path, SIGNED_URL_TTL);
    if (error || !signed?.signedUrl) {
      console.error('[quote] uploaded object missing:', f.path, error?.message);
      continue;
    }
    await admin.from('quote_attachments').insert({
      task_id: task.id,
      file_name: fileName,
      file_path: f.path,
      content_type: f.contentType || null,
      size_bytes: typeof f.size === 'number' ? f.size : null,
    });
    links.push({ name: fileName, size: f.size, url: signed.signedUrl });
  }
  return { taskId: task.id, links };
}

/**
 * Multipart fallback: files arrived as buffers through the function (only used
 * if the browser couldn't upload directly). Subject to the ~4.5 MB body limit.
 */
export async function persistQuoteSubmission(fields, files) {
  const admin = getAdminClient();
  const task = await createOpportunityTask(admin, fields);

  const links = [];
  for (let i = 0; i < files.length; i += 1) {
    const f = files[i];
    const path = `${task.id}/${i}-${sanitize(f.name)}`;
    const { error } = await admin.storage.from('quotes').upload(path, f.buffer, {
      contentType: f.contentType || 'application/octet-stream',
      upsert: false,
    });
    if (error) {
      console.error('[quote] storage upload failed for', f.name, '-', error.message);
      continue;
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

  if (files.length > 0 && links.length === 0) {
    throw new Error('All file uploads failed');
  }
  return { taskId: task.id, links };
}
