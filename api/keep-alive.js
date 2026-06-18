import { getAdminClient } from './_lib/supabaseAdmin.js';

/**
 * Heartbeat to stop the Supabase free-tier project from pausing after 7 days of
 * inactivity. Triggered daily by a Vercel Cron job (see vercel.json) — a single
 * tiny query counts as project activity and resets the inactivity timer.
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
    return res.status(200).json({ ok: true, pinged: 'supabase', ts: new Date().toISOString() });
  } catch (err) {
    console.error('[keep-alive] ping failed:', err.message);
    return res.status(500).json({ ok: false, error: err.message });
  }
}
