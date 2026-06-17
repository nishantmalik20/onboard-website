import { createClient } from '@supabase/supabase-js';

const url = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

/** Service-role client — bypasses RLS. Server-side only, never the browser. */
export function getAdminClient() {
  if (!url || !serviceKey) {
    throw new Error('Supabase admin not configured (SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY)');
  }
  return createClient(url, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

/**
 * Verify the request's bearer token belongs to an active admin.
 * Throws an Error with `.status` (401/403) on failure.
 * Returns the service-role client and the caller's user id.
 */
export async function requireAdmin(req) {
  const header = req.headers.authorization || req.headers.Authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  if (!token) {
    const e = new Error('Missing authorization token');
    e.status = 401;
    throw e;
  }

  const admin = getAdminClient();
  const { data: { user }, error } = await admin.auth.getUser(token);
  if (error || !user) {
    const e = new Error('Invalid or expired session');
    e.status = 401;
    throw e;
  }

  const { data: profile } = await admin
    .from('profiles')
    .select('role, is_active')
    .eq('id', user.id)
    .maybeSingle();

  if (!profile || profile.role !== 'admin' || !profile.is_active) {
    const e = new Error('Admins only');
    e.status = 403;
    throw e;
  }

  return { admin, userId: user.id };
}
