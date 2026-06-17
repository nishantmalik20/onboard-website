import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Sidebar } from './Sidebar.jsx';
import { Topbar } from './Topbar.jsx';

const TITLES = [
  { match: (p) => p === '/admin', title: 'Dashboard' },
  { match: (p) => p.startsWith('/admin/tasks'), title: 'Task Manager' },
  { match: (p) => p.startsWith('/admin/team'), title: 'Team' },
  { match: (p) => p.startsWith('/admin/account'), title: 'My Account' },
];

/** Keep admin routes out of search indexes; restore the public default on exit. */
function useNoIndex() {
  useEffect(() => {
    const meta = document.querySelector('meta[name="robots"]');
    const previous = meta?.getAttribute('content') ?? null;
    const prevTitle = document.title;
    if (meta) meta.setAttribute('content', 'noindex, nofollow');
    document.title = 'OnBoard Admin';
    return () => {
      if (meta) meta.setAttribute('content', previous ?? 'index, follow');
      document.title = prevTitle;
    };
  }, []);
}

export function AdminLayout() {
  const location = useLocation();
  const [drawerOpen, setDrawerOpen] = useState(false);
  useNoIndex();

  const title = TITLES.find((t) => t.match(location.pathname))?.title ?? 'Admin';

  return (
    <div className="min-h-screen bg-background text-dark">
      {/* Desktop sidebar */}
      <aside className="hidden lg:block fixed inset-y-0 left-0 w-64 z-40">
        <Sidebar />
      </aside>

      {/* Mobile drawer */}
      {drawerOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-dark/40 backdrop-blur-sm"
            onClick={() => setDrawerOpen(false)}
            aria-hidden="true"
          />
          <div className="absolute inset-y-0 left-0 w-72 max-w-[82vw] shadow-2xl">
            <Sidebar onNavigate={() => setDrawerOpen(false)} onClose={() => setDrawerOpen(false)} />
          </div>
        </div>
      )}

      {/* Main column */}
      <div className="lg:pl-64 flex flex-col min-h-screen">
        <Topbar title={title} onOpenMenu={() => setDrawerOpen(true)} />
        <main className="flex-1 px-4 md:px-8 py-6 md:py-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
