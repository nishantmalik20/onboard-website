/**
 * Returns the active data provider.
 *
 * Live backend: `supabaseProvider` (Supabase auth + Postgres + RLS + Realtime).
 * To run the app offline against seeded localStorage data, swap the import to
 * `mockProvider` — nothing else changes.
 */
import { supabaseProvider } from '../data/supabaseProvider.js';
// import { mockProvider } from '../data/mockProvider.js';

const provider = supabaseProvider;

export function useData() {
  return provider;
}

// Also exported for non-hook contexts (e.g. AuthProvider bootstrap).
export const dataProvider = provider;
