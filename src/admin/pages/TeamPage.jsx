import { useCallback, useEffect, useState } from 'react';
import { UserPlus, Check, Loader2, X } from 'lucide-react';
import { useData } from '../lib/useData.js';
import { Avatar } from '../ui/Avatar.jsx';

const emptyForm = { name: '', email: '', password: '', role: 'employee' };

export function TeamPage() {
  const data = useData();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    const list = await data.listUsers();
    setUsers(list);
    setLoading(false);
  }, [data]);
  useEffect(() => { load(); }, [load]);

  async function handleCreate(e) {
    e.preventDefault();
    setError('');
    setSaving(true);
    try {
      await data.createUser(form);
      setForm(emptyForm);
      setAdding(false);
      await load();
    } catch (err) {
      setError(err?.message || 'Could not add team member');
    } finally {
      setSaving(false);
    }
  }

  async function toggleActive(u) {
    await data.updateUser(u.id, { active: !u.active });
    await load();
  }

  const inputCls = 'w-full px-3.5 py-2.5 rounded-xl border border-primary bg-background/60 font-heading text-sm text-dark placeholder:text-dark/35 focus:outline-none focus:border-accent focus:bg-white transition-colors';
  const labelCls = 'font-heading text-xs font-bold uppercase tracking-wide text-dark/55';

  return (
    <div className="max-w-3xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-heading text-2xl font-bold text-dark tracking-tight">Team</h2>
          <p className="font-heading text-sm text-dark/55 mt-1">Add staff and control who can sign in.</p>
        </div>
        {!adding && (
          <button type="button" onClick={() => setAdding(true)} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-accent text-white font-heading text-sm font-semibold hover:scale-[1.02] active:scale-[0.98] transition-transform">
            <UserPlus size={16} /> Add member
          </button>
        )}
      </div>

      {/* Add form */}
      {adding && (
        <form onSubmit={handleCreate} className="mb-6 rounded-[2rem] border border-primary bg-white p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-heading text-lg font-bold text-dark">New team member</h3>
            <button type="button" onClick={() => { setAdding(false); setError(''); setForm(emptyForm); }} className="p-2 -mr-2 rounded-xl text-dark/50 hover:bg-primary/50" aria-label="Cancel"><X size={18} /></button>
          </div>
          {error && <div className="mb-4 px-4 py-3 rounded-xl bg-accent/10 border border-accent/30 text-accent font-heading text-sm font-semibold">{error}</div>}
          <div className="grid sm:grid-cols-2 gap-4">
            <label className="space-y-1.5 block"><span className={labelCls}>Name</span><input className={inputCls} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required /></label>
            <label className="space-y-1.5 block"><span className={labelCls}>Email</span><input type="email" className={inputCls} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required /></label>
            <label className="space-y-1.5 block"><span className={labelCls}>Initial password</span><input className={inputCls} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder="At least 6 characters" required /></label>
            <label className="space-y-1.5 block"><span className={labelCls}>Role</span>
              <select className={inputCls} value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
                <option value="employee">Employee</option>
                <option value="admin">Admin</option>
              </select>
            </label>
          </div>
          <div className="flex justify-end mt-5">
            <button type="submit" disabled={saving} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-accent text-white font-heading text-sm font-semibold hover:scale-[1.02] transition-transform disabled:opacity-60">
              {saving ? <Loader2 size={16} className="animate-spin" /> : <Check size={16} />} Create
            </button>
          </div>
        </form>
      )}

      {/* List */}
      <div className="rounded-[2rem] border border-primary bg-white overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-12 text-dark/40"><Loader2 className="animate-spin" /></div>
        ) : (
          <ul className="divide-y divide-primary">
            {users.map((u) => (
              <li key={u.id} className="flex items-center gap-3.5 px-5 py-4">
                <Avatar name={u.name} color={u.color} size={40} />
                <div className="min-w-0 flex-1">
                  <p className="font-heading text-sm font-semibold text-dark truncate">{u.name}</p>
                  <p className="font-data text-xs text-dark/45 truncate">{u.email}</p>
                </div>
                <span className={['font-data text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full', u.role === 'admin' ? 'bg-accent/10 text-accent' : 'bg-primary/60 text-dark/55'].join(' ')}>{u.role}</span>
                <button type="button" onClick={() => toggleActive(u)} className={['font-data text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full border transition-colors', u.active ? 'border-emerald-300 text-emerald-600 hover:bg-emerald-50' : 'border-primary text-dark/40 hover:bg-primary/40'].join(' ')}>
                  {u.active ? 'Active' : 'Inactive'}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <p className="mt-4 font-data text-[11px] text-dark/40">
        Adding a member creates their Supabase login with the initial password you set — share it with them to sign in. Deactivating blocks their access.
      </p>
    </div>
  );
}
