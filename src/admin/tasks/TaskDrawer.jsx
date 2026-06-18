import { useState, useEffect, useRef, useCallback } from 'react';
import { X, Trash2, Check, Loader2, ImagePlus, FileText, CheckCircle2 } from 'lucide-react';
import { useData } from '../lib/useData.js';
import { Avatar } from '../ui/Avatar.jsx';

const PRIORITIES = [
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
];

const empty = { title: '', customerName: '', description: '', priority: 'medium', dueDate: '', columnId: '', assigneeIds: [] };

function initialForm(mode, task, defaultColumnId, columns) {
  if (mode === 'edit' && task) {
    return {
      title: task.title,
      customerName: task.customerName || '',
      description: task.description || '',
      priority: task.priority || 'medium',
      dueDate: task.dueDate || '',
      columnId: task.columnId,
      assigneeIds: [...(task.assigneeIds || [])],
    };
  }
  return { ...empty, columnId: defaultColumnId || columns[0]?.id || '' };
}

/**
 * Create / edit a task. Admins get the full form (incl. assignees, stage,
 * delete); employees can view and edit only the description of their task.
 *
 * Mounted only while open (see Board), so a lazy initializer replaces an
 * effect — no cascading renders.
 */
export function TaskDrawer({ mode, task, columns, users, isAdmin, defaultColumnId, onClose, onSaved }) {
  const data = useData();
  const [form, setForm] = useState(() => initialForm(mode, task, defaultColumnId, columns));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  // Attachments / images (only on an existing task).
  const fileInputRef = useRef(null);
  const [attachments, setAttachments] = useState([]);
  const [uploading, setUploading] = useState(false);
  const completedColumn = columns.find((c) => c.isCompleted);
  const isCompleted = task && completedColumn && task.columnId === completedColumn.id;

  const loadAttachments = useCallback(async () => {
    if (mode !== 'edit' || !task?.id) return;
    try {
      setAttachments(await data.listAttachments(task.id));
    } catch {
      setAttachments([]);
    }
  }, [data, mode, task]);

  useEffect(() => { loadAttachments(); }, [loadAttachments]);

  async function handleAddFiles(e) {
    const picked = Array.from(e.target.files || []);
    e.target.value = ''; // allow re-picking the same file
    if (!picked.length) return;
    setError('');
    setUploading(true);
    try {
      for (const file of picked) {
        await data.addAttachment(task.id, file);
      }
      await loadAttachments();
    } catch (err) {
      setError(err?.message || 'Could not upload the image');
    } finally {
      setUploading(false);
    }
  }

  async function handleRemoveAttachment(id) {
    try {
      await data.removeAttachment(id);
      setAttachments((list) => list.filter((a) => a.id !== id));
    } catch (err) {
      setError(err?.message || 'Could not remove the file');
    }
  }

  async function handleMarkComplete() {
    if (!completedColumn || !task?.id) return;
    setSaving(true);
    try {
      await data.moveTask(task.id, completedColumn.id, Number.MAX_SAFE_INTEGER);
      await onSaved?.();
      onClose();
    } catch (err) {
      setError(err?.message || 'Could not mark complete');
      setSaving(false);
    }
  }

  const set = (patch) => setForm((f) => ({ ...f, ...patch }));
  const toggleAssignee = (id) =>
    setForm((f) => ({
      ...f,
      assigneeIds: f.assigneeIds.includes(id) ? f.assigneeIds.filter((x) => x !== id) : [...f.assigneeIds, id],
    }));

  async function handleSave(e) {
    e.preventDefault();
    setError('');
    setSaving(true);
    try {
      if (mode === 'create') {
        await data.createTask({
          title: form.title,
          customerName: form.customerName,
          description: form.description,
          priority: form.priority,
          dueDate: form.dueDate || null,
          columnId: form.columnId,
          assigneeIds: form.assigneeIds,
        });
      } else if (isAdmin) {
        await data.updateTask(task.id, {
          title: form.title,
          customerName: form.customerName,
          description: form.description,
          priority: form.priority,
          dueDate: form.dueDate || null,
        });
        await data.setAssignees(task.id, form.assigneeIds);
        if (form.columnId !== task.columnId) {
          await data.moveTask(task.id, form.columnId, Number.MAX_SAFE_INTEGER);
        }
      } else {
        await data.updateTask(task.id, { description: form.description });
      }
      await onSaved?.();
      onClose();
    } catch (err) {
      setError(err?.message || 'Could not save');
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!window.confirm('Delete this task? This cannot be undone.')) return;
    setSaving(true);
    try {
      await data.deleteTask(task.id);
      await onSaved?.();
      onClose();
    } catch (err) {
      setError(err?.message || 'Could not delete');
      setSaving(false);
    }
  }

  const readOnlyField = !isAdmin; // employees only edit description
  const inputCls = 'w-full px-3.5 py-2.5 rounded-xl border border-primary bg-background/60 font-heading text-sm text-dark placeholder:text-dark/35 focus:outline-none focus:border-accent focus:bg-white transition-colors disabled:opacity-60 disabled:bg-primary/20';
  const labelCls = 'font-heading text-xs font-bold uppercase tracking-wide text-dark/55';

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-dark/40 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />
      <aside className="absolute inset-y-0 right-0 w-full max-w-md bg-background shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 h-20 border-b border-primary bg-white">
          <h2 className="font-heading text-lg font-bold text-dark tracking-tight">
            {mode === 'create' ? 'New task' : isAdmin ? 'Edit task' : 'Task details'}
          </h2>
          <button type="button" onClick={onClose} className="p-2 -mr-2 rounded-xl text-dark/55 hover:bg-primary/50 transition-colors" aria-label="Close">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSave} className="flex-1 overflow-y-auto px-6 py-6 space-y-5">
          {error && (
            <div className="px-4 py-3 rounded-xl bg-accent/10 border border-accent/30 text-accent font-heading text-sm font-semibold">{error}</div>
          )}

          <label className="block space-y-1.5">
            <span className={labelCls}>Title</span>
            <input className={inputCls} value={form.title} onChange={(e) => set({ title: e.target.value })} disabled={readOnlyField} required placeholder="e.g. Storefront channel letters" />
          </label>

          <label className="block space-y-1.5">
            <span className={labelCls}>Customer</span>
            <input className={inputCls} value={form.customerName} onChange={(e) => set({ customerName: e.target.value })} disabled={readOnlyField} placeholder="Customer or company" />
          </label>

          <label className="block space-y-1.5">
            <span className={labelCls}>Notes</span>
            <textarea className={`${inputCls} resize-none`} rows={4} value={form.description} onChange={(e) => set({ description: e.target.value })} placeholder="Details, measurements, links…" />
          </label>

          <div className="grid grid-cols-2 gap-4">
            <label className="block space-y-1.5">
              <span className={labelCls}>Priority</span>
              <select className={inputCls} value={form.priority} onChange={(e) => set({ priority: e.target.value })} disabled={readOnlyField}>
                {PRIORITIES.map((p) => <option key={p.value} value={p.value}>{p.label}</option>)}
              </select>
            </label>
            <label className="block space-y-1.5">
              <span className={labelCls}>Stage</span>
              <select className={inputCls} value={form.columnId} onChange={(e) => set({ columnId: e.target.value })} disabled={readOnlyField}>
                {columns.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </label>
          </div>

          <label className="block space-y-1.5">
            <span className={labelCls}>Due date</span>
            <input type="date" className={inputCls} value={form.dueDate || ''} onChange={(e) => set({ dueDate: e.target.value })} disabled={readOnlyField} />
          </label>

          {/* Assignees */}
          <div className="space-y-2">
            <span className={labelCls}>Assigned to</span>
            {isAdmin ? (
              <div className="space-y-1.5">
                {users.map((u) => {
                  const selected = form.assigneeIds.includes(u.id);
                  return (
                    <button
                      type="button"
                      key={u.id}
                      onClick={() => toggleAssignee(u.id)}
                      className={[
                        'w-full flex items-center gap-2.5 px-3 py-2 rounded-xl border transition-colors text-left',
                        selected ? 'border-accent bg-accent/10' : 'border-primary bg-white hover:bg-primary/30',
                      ].join(' ')}
                    >
                      <Avatar name={u.name} color={u.color} size={28} />
                      <span className="min-w-0 flex-1">
                        <span className="block font-heading text-sm font-semibold text-dark truncate">{u.name}</span>
                        <span className="block font-data text-[10px] uppercase tracking-wide text-dark/45">{u.role}</span>
                      </span>
                      {selected && <Check size={16} className="text-accent shrink-0" />}
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="flex flex-wrap gap-1.5">
                {(task?.assigneeIds || []).length === 0 && <span className="font-data text-xs text-dark/40">Unassigned</span>}
                {users.filter((u) => task?.assigneeIds?.includes(u.id)).map((u) => (
                  <span key={u.id} className="inline-flex items-center gap-1.5 pl-1 pr-3 py-1 rounded-full bg-white border border-primary">
                    <Avatar name={u.name} color={u.color} size={20} />
                    <span className="font-heading text-xs font-semibold text-dark">{u.name}</span>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Images & files — only on an existing task */}
          {mode === 'edit' && task?.id && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className={labelCls}>Images &amp; files</span>
                {isAdmin && (
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-primary bg-white text-dark/70 hover:text-accent hover:border-accent/40 transition-colors font-heading text-xs font-semibold disabled:opacity-60"
                  >
                    {uploading ? <Loader2 size={14} className="animate-spin" /> : <ImagePlus size={14} />}
                    {uploading ? 'Uploading…' : 'Add image'}
                  </button>
                )}
              </div>
              <input ref={fileInputRef} type="file" accept="image/*,.pdf" multiple className="hidden" onChange={handleAddFiles} />
              {attachments.length === 0 ? (
                <p className="font-data text-xs text-dark/40">
                  {isAdmin ? 'No images yet — add a reference picture for the team.' : 'No images attached.'}
                </p>
              ) : (
                <div className="grid grid-cols-3 gap-2">
                  {attachments.map((a) => (
                    <div key={a.id} className="relative group rounded-xl overflow-hidden border border-primary bg-white">
                      {a.isImage && a.url ? (
                        <a href={a.url} target="_blank" rel="noreferrer">
                          <img src={a.url} alt={a.name} className="w-full h-24 object-cover" />
                        </a>
                      ) : (
                        <a href={a.url || '#'} target="_blank" rel="noreferrer" className="flex flex-col items-center justify-center h-24 p-2 text-dark/60">
                          <FileText size={22} />
                          <span className="font-data text-[10px] mt-1 w-full text-center truncate">{a.name}</span>
                        </a>
                      )}
                      {isAdmin && (
                        <button
                          type="button"
                          onClick={() => handleRemoveAttachment(a.id)}
                          className="absolute top-1 right-1 w-6 h-6 inline-flex items-center justify-center rounded-full bg-dark/60 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                          aria-label={`Remove ${a.name}`}
                        >
                          <X size={13} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </form>

        {/* Footer actions */}
        <div className="flex items-center gap-3 px-6 py-4 border-t border-primary bg-white">
          {mode === 'edit' && isAdmin && (
            <button type="button" onClick={handleDelete} disabled={saving} className="p-2.5 rounded-xl text-dark/50 hover:text-accent hover:bg-accent/10 transition-colors" aria-label="Delete task">
              <Trash2 size={18} />
            </button>
          )}
          {mode === 'edit' && completedColumn && !isCompleted && (
            <button type="button" onClick={handleMarkComplete} disabled={saving} className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-emerald-300 text-emerald-700 hover:bg-emerald-50 transition-colors font-heading text-sm font-semibold disabled:opacity-60">
              <CheckCircle2 size={16} /> Mark complete
            </button>
          )}
          {mode === 'edit' && isCompleted && (
            <span className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-50 text-emerald-700 font-heading text-sm font-semibold">
              <CheckCircle2 size={16} /> Completed
            </span>
          )}
          <button type="button" onClick={onClose} className="ml-auto px-4 py-2.5 rounded-xl font-heading text-sm font-semibold text-dark/70 hover:bg-primary/50 transition-colors">
            Cancel
          </button>
          <button type="button" onClick={handleSave} disabled={saving} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-accent text-white font-heading text-sm font-semibold hover:scale-[1.02] active:scale-[0.98] transition-transform disabled:opacity-60">
            {saving ? <Loader2 size={16} className="animate-spin" /> : <Check size={16} />}
            {mode === 'create' ? 'Create task' : 'Save'}
          </button>
        </div>
      </aside>
    </div>
  );
}
