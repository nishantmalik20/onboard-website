import { useState } from 'react';
import { Plus, Check, X } from 'lucide-react';

/** Admin-only: append a custom pipeline column. */
export function AddColumn({ onCreate }) {
  const [adding, setAdding] = useState(false);
  const [name, setName] = useState('');

  async function save() {
    const clean = name.trim();
    if (!clean) return;
    await onCreate(clean);
    setName('');
    setAdding(false);
  }

  if (!adding) {
    return (
      <button
        type="button"
        onClick={() => setAdding(true)}
        className="flex items-center gap-2 w-60 shrink-0 h-11 px-4 rounded-2xl border border-dashed border-primary text-dark/50 hover:text-accent hover:border-accent/40 transition-colors font-heading text-sm font-semibold"
      >
        <Plus size={16} /> Add column
      </button>
    );
  }

  return (
    <div className="flex items-center gap-1.5 w-60 shrink-0 h-11 px-2 rounded-2xl border border-accent bg-white">
      <input
        autoFocus
        value={name}
        onChange={(e) => setName(e.target.value)}
        onKeyDown={(e) => { if (e.key === 'Enter') save(); if (e.key === 'Escape') { setAdding(false); setName(''); } }}
        placeholder="Column name"
        className="flex-1 min-w-0 px-2 font-heading text-sm font-semibold text-dark bg-transparent focus:outline-none"
      />
      <button type="button" onClick={save} className="p-1.5 text-accent" aria-label="Create column"><Check size={16} /></button>
      <button type="button" onClick={() => { setAdding(false); setName(''); }} className="p-1.5 text-dark/40" aria-label="Cancel"><X size={16} /></button>
    </div>
  );
}
