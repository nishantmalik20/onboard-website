import { NavLink } from 'react-router-dom';
import { LayoutDashboard, KanbanSquare, Users, UserCircle, X } from 'lucide-react';
import { useAuth } from '../AuthProvider.jsx';

const navItems = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/admin/tasks', label: 'Task Manager', icon: KanbanSquare },
  { to: '/admin/team', label: 'Team', icon: Users, adminOnly: true },
  { to: '/admin/account', label: 'My Account', icon: UserCircle },
];

export function Sidebar({ onNavigate, onClose }) {
  const { isAdmin } = useAuth();

  return (
    <div className="flex h-full flex-col bg-white border-r border-primary">
      {/* Brand */}
      <div className="flex items-center justify-between gap-3 px-5 h-20 border-b border-primary">
        <NavLink to="/admin" onClick={onNavigate} className="flex items-center gap-2.5">
          <img src="/onboard_logo.svg" alt="OnBoard Print & Signs" className="h-7 w-auto" width={120} height={28} />
        </NavLink>
        {/* Mobile close */}
        <button
          type="button"
          onClick={onClose}
          className="lg:hidden p-2 -mr-2 rounded-xl text-dark/60 hover:bg-primary/50 transition-colors"
          aria-label="Close menu"
        >
          <X size={20} />
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-5 space-y-1" aria-label="Admin navigation">
        {navItems
          .filter((item) => !item.adminOnly || isAdmin)
          .map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                onClick={onNavigate}
                className={({ isActive }) =>
                  [
                    'flex items-center gap-3 px-3.5 py-2.5 rounded-2xl font-heading text-sm font-semibold transition-colors',
                    isActive ? 'bg-accent text-white shadow-sm' : 'text-dark/70 hover:bg-primary/50 hover:text-dark',
                  ].join(' ')
                }
              >
                <Icon size={18} strokeWidth={2.2} />
                {item.label}
              </NavLink>
            );
          })}
      </nav>

      {/* Footer tag */}
      <div className="px-5 py-4 border-t border-primary">
        <p className="font-data text-[10px] uppercase tracking-widest text-dark/40">OnBoard Admin</p>
        <p className="font-data text-[10px] text-dark/30 mt-0.5">Built &amp; managed by inishant.com</p>
      </div>
    </div>
  );
}
