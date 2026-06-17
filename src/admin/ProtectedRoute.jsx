import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthProvider.jsx';

/**
 * Gates admin routes.
 *  - not signed in  → redirect to /admin/login (remembering where they were)
 *  - role="admin"   → employees are bounced back to the dashboard
 */
export function ProtectedRoute({ children, role }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="font-data text-sm text-dark/50">Loading…</div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/admin/login" state={{ from: location.pathname }} replace />;
  }

  if (role === 'admin' && user.role !== 'admin') {
    return <Navigate to="/admin" replace />;
  }

  return children;
}
