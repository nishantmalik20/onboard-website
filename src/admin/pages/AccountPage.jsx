import { useState } from 'react';
import { Check, Loader2 } from 'lucide-react';
import { useAuth } from '../AuthProvider.jsx';
import { useData } from '../lib/useData.js';
import { Avatar } from '../ui/Avatar.jsx';

export function AccountPage() {
  const { user } = useAuth();
  const data = useData();
  const [current, setCurrent] = useState('');
  const [next, setNext] = useState('');
  const [confirm, setConfirm] = useState('');
  const [status, setStatus] = useState(null); // { type, message }
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus(null);
    if (next !== confirm) { setStatus({ type: 'error', message: 'New passwords do not match' }); return; }
    setSaving(true);
    try {
      await data.changePassword(current, next);
      setStatus({ type: 'success', message: 'Password updated' });
      setCurrent(''); setNext(''); setConfirm('');
    } catch (err) {
      setStatus({ type: 'error', message: err?.message || 'Could not update password' });
    } finally {
      setSaving(false);
    }
  }

  const inputCls = 'w-full px-3.5 py-2.5 rounded-xl border border-primary bg-background/60 font-heading text-sm text-dark placeholder:text-dark/35 focus:outline-none focus:border-accent focus:bg-white transition-colors';
  const labelCls = 'font-heading text-xs font-bold uppercase tracking-wide text-dark/55';

  return (
    <div className="max-w-xl">
      <h2 className="font-heading text-2xl font-bold text-dark tracking-tight mb-6">My Account</h2>

      {/* Profile */}
      <div className="flex items-center gap-4 rounded-[2rem] border border-primary bg-white p-6 mb-6">
        <Avatar name={user?.name} color={user?.color} size={56} />
        <div>
          <p className="font-heading text-lg font-bold text-dark">{user?.name}</p>
          <p className="font-data text-sm text-dark/50">{user?.email}</p>
          <span className="inline-block mt-1.5 font-data text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full bg-primary/60 text-dark/55">{user?.role}</span>
        </div>
      </div>

      {/* Change password */}
      <form onSubmit={handleSubmit} className="rounded-[2rem] border border-primary bg-white p-6 space-y-4">
        <h3 className="font-heading text-lg font-bold text-dark">Change password</h3>
        {status && (
          <div className={['px-4 py-3 rounded-xl font-heading text-sm font-semibold', status.type === 'success' ? 'bg-emerald-50 border border-emerald-200 text-emerald-700' : 'bg-accent/10 border border-accent/30 text-accent'].join(' ')}>
            {status.message}
          </div>
        )}
        <label className="space-y-1.5 block"><span className={labelCls}>Current password</span><input type="password" className={inputCls} value={current} onChange={(e) => setCurrent(e.target.value)} required /></label>
        <label className="space-y-1.5 block"><span className={labelCls}>New password</span><input type="password" className={inputCls} value={next} onChange={(e) => setNext(e.target.value)} required /></label>
        <label className="space-y-1.5 block"><span className={labelCls}>Confirm new password</span><input type="password" className={inputCls} value={confirm} onChange={(e) => setConfirm(e.target.value)} required /></label>
        <div className="flex justify-end pt-1">
          <button type="submit" disabled={saving} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-accent text-white font-heading text-sm font-semibold hover:scale-[1.02] transition-transform disabled:opacity-60">
            {saving ? <Loader2 size={16} className="animate-spin" /> : <Check size={16} />} Update password
          </button>
        </div>
      </form>
    </div>
  );
}
