import { useState } from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Plus, MoreVertical, Pencil, Trash2, Check, X } from 'lucide-react';
import { TaskCard } from './TaskCard.jsx';

function SortableTaskCard({ task, assignees, onClick, disabled }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: task.id,
    data: { type: 'task', columnId: task.columnId },
    disabled,
  });

  return (
    <div ref={setNodeRef} style={{ transform: CSS.Translate.toString(transform), transition }}>
      <TaskCard
        task={task}
        assignees={assignees}
        onClick={onClick}
        dragging={isDragging}
        dragHandleProps={disabled ? {} : { ...attributes, ...listeners }}
      />
    </div>
  );
}

export function Column({ column, tasks, usersById, isAdmin, dndDisabled, onAddTask, onOpenTask, onRenameColumn, onDeleteColumn }) {
  const { setNodeRef, isOver } = useDroppable({ id: column.id, data: { type: 'column' } });
  const [menuOpen, setMenuOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(column.name);

  async function saveRename() {
    const name = draft.trim();
    if (name && name !== column.name) await onRenameColumn(column.id, name);
    setEditing(false);
  }

  return (
    <div className="flex flex-col w-72 shrink-0">
      {/* Column header */}
      <div className="flex items-center gap-2 px-1 mb-3">
        {editing ? (
          <div className="flex items-center gap-1 flex-1">
            <input
              autoFocus
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') saveRename(); if (e.key === 'Escape') setEditing(false); }}
              className="flex-1 min-w-0 px-2 py-1 rounded-lg border border-accent bg-white font-heading text-sm font-bold text-dark focus:outline-none"
            />
            <button type="button" onClick={saveRename} className="p-1 text-accent" aria-label="Save name"><Check size={16} /></button>
            <button type="button" onClick={() => { setEditing(false); setDraft(column.name); }} className="p-1 text-dark/40" aria-label="Cancel"><X size={16} /></button>
          </div>
        ) : (
          <>
            <h3 className="font-heading text-sm font-bold text-dark tracking-tight truncate">{column.name}</h3>
            <span className="font-data text-[11px] text-dark/40 px-1.5 py-0.5 rounded-full bg-primary/60">{tasks.length}</span>
            {column.hint && <span className="font-data text-[10px] text-dark/30 truncate hidden xl:inline">· {column.hint}</span>}

            {isAdmin && !column.isDefault && (
              <div className="relative ml-auto">
                <button type="button" onClick={() => setMenuOpen((o) => !o)} onBlur={() => setTimeout(() => setMenuOpen(false), 150)} className="p-1 rounded-lg text-dark/40 hover:text-dark hover:bg-primary/50 transition-colors" aria-label="Column options">
                  <MoreVertical size={16} />
                </button>
                {menuOpen && (
                  <div className="absolute right-0 mt-1 w-40 p-1.5 rounded-xl bg-white border border-primary shadow-xl z-20">
                    <button type="button" onMouseDown={() => { setEditing(true); setMenuOpen(false); }} className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left text-dark/80 hover:bg-primary/40 font-heading text-sm font-semibold">
                      <Pencil size={14} /> Rename
                    </button>
                    <button type="button" onMouseDown={() => { setMenuOpen(false); onDeleteColumn(column.id); }} className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left text-accent hover:bg-accent/10 font-heading text-sm font-semibold">
                      <Trash2 size={14} /> Delete
                    </button>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>

      {/* Droppable list */}
      <div
        ref={setNodeRef}
        className={[
          'flex-1 min-h-[120px] rounded-[1.5rem] border p-2.5 space-y-2.5 transition-colors',
          isOver ? 'border-accent/50 bg-accent/5' : 'border-primary bg-white/40',
        ].join(' ')}
      >
        <SortableContext items={tasks.map((t) => t.id)} strategy={verticalListSortingStrategy}>
          {tasks.map((task) => (
            <SortableTaskCard
              key={task.id}
              task={task}
              assignees={(task.assigneeIds || []).map((id) => usersById[id]).filter(Boolean)}
              onClick={() => onOpenTask(task)}
              disabled={dndDisabled}
            />
          ))}
        </SortableContext>

        {tasks.length === 0 && (
          <p className="text-center font-data text-[11px] text-dark/30 py-6">No jobs here</p>
        )}

        {isAdmin && (
          <button
            type="button"
            onClick={() => onAddTask(column.id)}
            className="w-full flex items-center justify-center gap-1.5 py-2 rounded-xl border border-dashed border-primary text-dark/45 hover:text-accent hover:border-accent/40 transition-colors font-heading text-xs font-semibold"
          >
            <Plus size={14} /> Add task
          </button>
        )}
      </div>
    </div>
  );
}
