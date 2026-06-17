import { createClient } from '@supabase/supabase-js';

// Anonymous, session-less client for public-site use (e.g. direct file uploads
// from the quote form to Supabase Storage via short-lived signed URLs).
// Kept separate from the admin client so the marketing site stays decoupled.
const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabasePublic = createClient(url, anonKey, {
  auth: { persistSession: false, autoRefreshToken: false },
});
