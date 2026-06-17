import { useEffect, useRef, useState } from 'react';
import { Menu, ChevronDown, LogOut, Eye } from 'lucide-react';
import { useAuth } from '../AuthProvider.jsx';
import { useData } from '../lib/useData.js';
import { Avatar } from '../ui/Avatar.jsx';

export function Topbar({ title, onOpenMenu }) {
  const { user, signOut, switchUser } = useAuth();
  const data = useData();
  const [demoUsers, setDemoUsers] = useState([]);
  const [openMenu, setOpenMenu] = useState(null); // 'user' | 'viewas' | null
  const wrapRef = useRef(null);

  // Demo "view as" list (mock only). Hidden once a real backend is wired.
  const canImpersonate = data.capabilities?.impersonation;
  useEffect(() => {
    if (!canImpersonate) return undefined;
    let active = true;
    data.listUsers().then((u) => { if (active) setDemoUsers(u); }).catch(() => {});
    return () => { active = false; };
  }, [data, user, canImpersonate]);

  useEffect(() => {
    function onDocClick(e) {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpenMenu(null);
    }
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, []);

  if (!user) return null;

  return (
    <header className="sticky top-0 z-30 flex items-center gap-3 h-20 px-4 md:px-8 bg-background/85 backdrop-blur-xl border-b border-primary">
      <button
        type="button"
        onClick={onOpenMenu}
        className="lg:hidden p-2 -ml-1 rounded-xl text-dark/70 hover:bg-primary/50 transition-colors"
        aria-label="Open menu"
      >
        <Menu size={22} />
      </button>

      <h1 className="font-heading text-lg md:text-xl font-bold text-dark tracking-tight truncate">{title}</h1>

      <div ref={wrapRef} className="ml-auto flex items-center gap-2">
        {/* Demo role switcher */}
        {canImpersonate && demoUsers.length > 0 && (
          <div className="relative">
            <button
              type="button"
              onClick={() => setOpenMenu((m) => (m === 'viewas' ? null : 'viewas'))}
              className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-2xl border border-primary bg-white text-dark/70 hover:text-dark hover:border-accent/40 transition-colors font-heading text-xs font-semibold"
            >
              <Eye size={14} />
              <span className="hidden md:inline">View as</span>
              <ChevronDown size={14} />
            </button>
            {openMenu === 'viewas' && (
              <div className="absolute right-0 mt-2 w-60 p-2 rounded-2xl bg-white border border-primary shadow-xl">
                <p className="px-3 py-1.5 font-data text-[10px] uppercase tracking-widest text-dark/40">Demo — switch user</p>
                {demoUsers.map((u) => (
                  <button
                    key={u.id}
                    type="button"
                    onClick={async () => { await switchUser(u.id); setOpenMenu(null); }}
                    className={[
                      'w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-left transition-colors',
                      u.id === user.id ? 'bg-primary/50' : 'hover:bg-primary/40',
                    ].join(' ')}
                  >
                    <Avatar name={u.name} color={u.color} size={28} />
                    <span className="min-w-0">
                      <span className="block font-heading text-sm font-semibold text-dark truncate">{u.name}</span>
                      <span className="block font-data text-[10px] uppercase tracking-wide text-dark/45">{u.role}</span>
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* User menu */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setOpenMenu((m) => (m === 'user' ? null : 'user'))}
            className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-2xl border border-transparent hover:border-primary hover:bg-white transition-colors"
          >
            <Avatar name={user.name} color={user.color} size={34} />
            <span className="hidden sm:block text-left">
              <span className="block font-heading text-sm font-semibold text-dark leading-tight">{user.name}</span>
              <span className="block font-data text-[10px] uppercase tracking-wide text-dark/45 leading-tight">{user.role}</span>
            </span>
            <ChevronDown size={15} className="text-dark/50" />
          </button>
          {openMenu === 'user' && (
            <div className="absolute right-0 mt-2 w-52 p-2 rounded-2xl bg-white border border-primary shadow-xl">
              <div className="px-3 py-2">
                <p className="font-heading text-sm font-semibold text-dark truncate">{user.name}</p>
                <p className="font-data text-[11px] text-dark/45 truncate">{user.email}</p>
              </div>
              <div className="border-t border-primary my-1" />
              <button
                type="button"
                onClick={signOut}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-left text-dark/80 hover:bg-accent/10 hover:text-accent transition-colors font-heading text-sm font-semibold"
              >
                <LogOut size={16} />
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
