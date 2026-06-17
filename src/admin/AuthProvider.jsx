import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { dataProvider } from './lib/useData.js';

const AuthContext = createContext(null);

/**
 * Holds the current admin/employee session. Backed by the data provider, so
 * when the provider swaps to Supabase this component is unchanged.
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    const current = await dataProvider.getCurrentUser();
    setUser(current);
    return current;
  }, []);

  useEffect(() => {
    let active = true;
    (async () => {
      await refresh();
      if (active) setLoading(false);
    })();
    return () => { active = false; };
  }, [refresh]);

  const signIn = useCallback(async (email, password) => {
    const u = await dataProvider.signIn(email, password);
    setUser(u);
    return u;
  }, []);

  const signOut = useCallback(async () => {
    await dataProvider.signOut();
    setUser(null);
  }, []);

  // Mock-only: switch which seeded user is "logged in" to demo role visibility.
  const switchUser = useCallback(async (userId) => {
    const u = await dataProvider.setSessionUser(userId);
    setUser(u);
    return u;
  }, []);

  const value = {
    user,
    loading,
    isAdmin: user?.role === 'admin',
    signIn,
    signOut,
    switchUser,
    refresh,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components -- hook lives with its provider
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
}
