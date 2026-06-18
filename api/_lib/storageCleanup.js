import { getAdminClient } from './supabaseAdmin.js';

// Dashcam-style retention: keep every file while there's room; only when the
// bucket nears the free-tier cap do we delete the OLDEST files to make space.
// Plus: clear abandoned uploads (files with no lead record). No time-based
// expiry — files are kept as long as storage allows.
const SOFT_LIMIT_BYTES = (Number(process.env.STORAGE_SOFT_LIMIT_MB) || 800) * 1024 * 1024;
const ORPHAN_AGE_MS = 24 * 60 * 60 * 1000;
const COMPLETED_RETENTION_DAYS = Number(process.env.COMPLETED_RETENTION_DAYS) || 45;

/** List every object in the quotes bucket (one level of {uuid}/ prefixes). */
async function listAllObjects(admin) {
  const out = [];
  const { data: top } = await admin.storage.from('quotes').list('', { limit: 1000 });
  for (const entry of top || []) {
    if (entry.id === null) {
      const { data: files } = await admin.storage.from('quotes').list(entry.name, { limit: 1000 });
      for (const f of files || []) out.push({ path: `${entry.name}/${f.name}`, created: f.created_at });
    } else {
      out.push({ path: entry.name, created: entry.created_at });
    }
  }
  return out;
}

export async function runStorageCleanup(nowMs) {
  const admin = getAdminClient();
  const result = { completedPurged: 0, orphansRemoved: 0, capacityRemoved: 0, usedMB: 0, limitMB: Math.round(SOFT_LIMIT_BYTES / 1048576) };

  // 0. Purge jobs that have sat in the Completed stage past the retention window
  //    (deletes the task + its files; attachment rows cascade with the task).
  const { data: completedCol } = await admin.from('board_columns').select('id').eq('is_completed', true).maybeSingle();
  if (completedCol) {
    const cutoff = new Date(nowMs - COMPLETED_RETENTION_DAYS * 86400000).toISOString();
    const { data: stale } = await admin
      .from('tasks')
      .select('id')
      .eq('column_id', completedCol.id)
      .lt('updated_at', cutoff);
    for (const t of stale || []) {
      const { data: files } = await admin.storage.from('quotes').list(t.id, { limit: 1000 });
      if (files?.length) await admin.storage.from('quotes').remove(files.map((f) => `${t.id}/${f.name}`));
      await admin.from('tasks').delete().eq('id', t.id);
      result.completedPurged += 1;
    }
  }

  // 1. Remove abandoned uploads: storage objects with no attachment row, > 24h old.
  const objects = await listAllObjects(admin);
  const { data: rows } = await admin.from('quote_attachments').select('file_path');
  const tracked = new Set((rows || []).map((r) => r.file_path));
  const orphans = objects
    .filter((o) => !tracked.has(o.path) && o.created && (nowMs - new Date(o.created).getTime()) > ORPHAN_AGE_MS)
    .map((o) => o.path);
  if (orphans.length) {
    await admin.storage.from('quotes').remove(orphans);
    result.orphansRemoved = orphans.length;
  }

  // 2. Capacity check (sum of tracked file sizes — reliable, populated on insert).
  const { data: atts } = await admin
    .from('quote_attachments')
    .select('id, file_path, size_bytes, created_at')
    .order('created_at', { ascending: true });
  let used = (atts || []).reduce((s, a) => s + (a.size_bytes || 0), 0);

  // 3. If over the soft limit, delete oldest files until back under it.
  if (used > SOFT_LIMIT_BYTES) {
    for (const a of atts) {
      if (used <= SOFT_LIMIT_BYTES) break;
      await admin.storage.from('quotes').remove([a.file_path]);
      await admin.from('quote_attachments').delete().eq('id', a.id);
      used -= (a.size_bytes || 0);
      result.capacityRemoved += 1;
    }
  }

  result.usedMB = Number((used / 1048576).toFixed(2));
  return result;
}
