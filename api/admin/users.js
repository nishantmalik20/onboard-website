import { requireAdmin } from '../_lib/supabaseAdmin.js';

/**
 * Create a staff account. Admin-only (verified via the caller's JWT).
 * Uses the service role to create the auth user; the on_auth_user_created
 * trigger inserts the matching profile row.
 */
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  let admin;
  try {
    ({ admin } = await requireAdmin(req));
  } catch (err) {
    return res.status(err.status || 401).json({ error: err.message });
  }

  const { name, email, password, role = 'employee' } = req.body || {};
  const cleanName = String(name || '').trim();
  const cleanEmail = String(email || '').trim().toLowerCase();
  const safeRole = role === 'admin' ? 'admin' : 'employee';

  if (cleanName.length < 2) return res.status(400).json({ error: 'Name must be at least 2 characters.' });
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) return res.status(400).json({ error: 'A valid email is required.' });
  if (!password || String(password).length < 6) return res.status(400).json({ error: 'Password must be at least 6 characters.' });

  const { data: created, error: createErr } = await admin.auth.admin.createUser({
    email: cleanEmail,
    password: String(password),
    email_confirm: true,
    user_metadata: { full_name: cleanName, role: safeRole },
  });

  if (createErr) {
    const exists = /registered|already|exists/i.test(createErr.message || '');
    return res.status(400).json({ error: exists ? 'That email already exists.' : createErr.message });
  }

  const id = created.user.id;
  // The trigger creates the profile from metadata; enforce the requested values
  // explicitly so the result is correct regardless of trigger timing.
  const { error: profileErr } = await admin
    .from('profiles')
    .update({ full_name: cleanName, role: safeRole, is_active: true })
    .eq('id', id);

  if (profileErr) {
    return res.status(500).json({ error: 'Account created but profile setup failed. Check the Team list.' });
  }

  return res.status(200).json({
    user: { id, name: cleanName, email: cleanEmail, role: safeRole, active: true },
  });
}
