import { getAdminClient } from './_lib/supabaseAdmin.js';
import { runStorageCleanup } from './_lib/storageCleanup.js';

/**
 * Daily maintenance, triggered by a Vercel Cron job (see vercel.json):
 *  1. Heartbeat — one tiny query keeps the free-tier project from pausing after
 *     7 days of inactivity.
 *  2. Storage cleanup — clears abandoned uploads and, if the bucket nears the
 *     free-tier cap, deletes the oldest files to make room.
 *
 * If a CRON_SECRET env var is set, Vercel includes it as a Bearer token on cron
 * invocations; we verify it so the endpoint can't be triggered by random callers.
 */
export default async function handler(req, res) {
  const secret = process.env.CRON_SECRET;
  if (secret) {
    const auth = req.headers.authorization || '';
    if (auth !== `Bearer ${secret}`) {
      return res.status(401).json({ ok: false, error: 'Unauthorized' });
    }
  }

  try {
    const admin = getAdminClient();
    const { error } = await admin.from('board_columns').select('id').limit(1);
    if (error) throw error;

    // Best-effort cleanup — never let it fail the keep-alive ping.
    let cleanup = null;
    try {
      cleanup = await runStorageCleanup(Date.now());
    } catch (cleanupErr) {
      console.error('[keep-alive] storage cleanup failed:', cleanupErr.message);
    }

    return res.status(200).json({ ok: true, pinged: 'supabase', cleanup, ts: new Date().toISOString() });
  } catch (err) {
    console.error('[keep-alive] ping failed:', err.message);
    return res.status(500).json({ ok: false, error: err.message });
  }
}
