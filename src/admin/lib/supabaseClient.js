import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!url || !anonKey) {
  // Surface misconfiguration loudly in dev rather than failing with a vague
  // network error deep inside a query.
  console.error('[supabase] Missing VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY — check .env.local');
}

export const supabase = createClient(url, anonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    storageKey: 'onboard_admin_auth',
  },
});
