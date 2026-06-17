import { useEffect, useState } from 'react';
import { useNavigate, useLocation, Navigate } from 'react-router-dom';
import { Lock, Mail, ArrowRight, Loader2 } from 'lucide-react';
import { useAuth } from '../AuthProvider.jsx';
import { useData } from '../lib/useData.js';

export function LoginPage() {
  const { user, loading, signIn } = useAuth();
  const showDemo = useData().capabilities?.demo;
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const from = location.state?.from || '/admin';

  // Keep the page title sensible even before the layout mounts.
  useEffect(() => {
    const prev = document.title;
    document.title = 'Sign in — OnBoard Admin';
    return () => { document.title = prev; };
  }, []);

  if (!loading && user) return <Navigate to={from} replace />;

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await signIn(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err?.message || 'Could not sign in');
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center mb-8">
          <img src="/onboard_logo.svg" alt="OnBoard Print & Signs" className="h-9 w-auto mb-5" width={150} height={36} />
          <h1 className="font-heading text-2xl font-bold text-dark tracking-tight">Admin Panel</h1>
          <p className="font-data text-xs uppercase tracking-widest text-dark/45 mt-1.5">Staff sign in</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white border border-primary rounded-[2rem] shadow-xl p-7 md:p-8"
        >
          {error && (
            <div className="mb-5 px-4 py-3 rounded-2xl bg-accent/10 border border-accent/30 text-accent font-heading text-sm font-semibold">
              {error}
            </div>
          )}

          <label className="block mb-4">
            <span className="font-heading text-sm font-semibold text-dark/80">Email</span>
            <div className="mt-1.5 relative">
              <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-dark/35" />
              <input
                type="email"
                autoComplete="username"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@onboardprints.ca"
                className="w-full pl-10 pr-4 py-3 rounded-2xl border border-primary bg-background/60 font-heading text-sm text-dark placeholder:text-dark/35 focus:outline-none focus:border-accent focus:bg-white transition-colors"
              />
            </div>
          </label>

          <label className="block mb-6">
            <span className="font-heading text-sm font-semibold text-dark/80">Password</span>
            <div className="mt-1.5 relative">
              <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-dark/35" />
              <input
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-3 rounded-2xl border border-primary bg-background/60 font-heading text-sm text-dark placeholder:text-dark/35 focus:outline-none focus:border-accent focus:bg-white transition-colors"
              />
            </div>
          </label>

          <button
            type="submit"
            disabled={submitting}
            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-accent text-white font-heading font-semibold text-sm hover:scale-[1.01] active:scale-[0.99] transition-transform disabled:opacity-60 disabled:hover:scale-100"
          >
            {submitting ? <Loader2 size={18} className="animate-spin" /> : <>Sign in <ArrowRight size={16} /></>}
          </button>
        </form>

        {/* Demo credentials — only shown when running on the mock provider. */}
        {showDemo && (
          <div className="mt-5 px-5 py-4 rounded-2xl border border-dashed border-primary bg-white/50">
            <p className="font-data text-[10px] uppercase tracking-widest text-dark/40 mb-2">Demo accounts</p>
            <ul className="font-data text-xs text-dark/60 space-y-1">
              <li><span className="text-dark/80 font-semibold">Admin:</span> admin@onboardprints.ca / admin123</li>
              <li><span className="text-dark/80 font-semibold">Employee:</span> harkamal@onboardprints.ca / employee123</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
