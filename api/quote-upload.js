import { getAdminClient } from './_lib/supabaseAdmin.js';

const MAX_FILES = 5;
const MAX_SIZE = 50 * 1024 * 1024; // 50 MB (matches the Supabase bucket limit)
const ALLOWED = ['pdf', 'ai', 'psd', 'eps', 'svg', 'png', 'jpg', 'jpeg', 'tiff', 'tif'];

function sanitize(name) {
  return String(name || 'file').replace(/[^\w.-]+/g, '_').slice(0, 120) || 'file';
}

/**
 * Issue short-lived signed upload URLs so the browser can upload quote-form
 * files straight to Supabase Storage — bypassing the ~4.5 MB serverless body
 * limit entirely. Only metadata then comes back to /api/quote.
 */
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  let admin;
  try {
    admin = getAdminClient();
  } catch {
    return res.status(503).json({ error: 'File uploads are temporarily unavailable.' });
  }

  const { files } = req.body || {};
  if (!Array.isArray(files) || files.length === 0) {
    return res.status(400).json({ error: 'No files specified.' });
  }
  if (files.length > MAX_FILES) {
    return res.status(400).json({ error: `Maximum ${MAX_FILES} files allowed.` });
  }

  const uploads = [];
  for (const f of files) {
    const safeName = sanitize(f?.name);
    const ext = safeName.split('.').pop().toLowerCase();
    if (!ALLOWED.includes(ext)) {
      return res.status(400).json({ error: `"${f?.name}" is not an accepted file type.` });
    }
    if (typeof f?.size === 'number' && f.size > MAX_SIZE) {
      return res.status(400).json({ error: `"${f?.name}" exceeds the 25MB limit.` });
    }
    const path = `${crypto.randomUUID()}/${safeName}`;
    const { data, error } = await admin.storage.from('quotes').createSignedUploadUrl(path);
    if (error) {
      console.error('[quote-upload] createSignedUploadUrl failed:', error.message);
      return res.status(500).json({ error: 'Could not prepare the upload. Please try again.' });
    }
    uploads.push({ name: f.name, path, token: data.token, signedUrl: data.signedUrl });
  }

  return res.status(200).json({ uploads });
}
