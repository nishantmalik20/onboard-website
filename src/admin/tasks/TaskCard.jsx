import { GripVertical, User2 } from 'lucide-react';
import { Avatar } from '../ui/Avatar.jsx';

const PRIORITY = {
  high: { dot: 'bg-accent', label: 'High' },
  medium: { dot: 'bg-amber-500', label: 'Medium' },
  low: { dot: 'bg-emerald-500', label: 'Low' },
};

/**
 * Pure presentational task card. The sortable wrapper lives in Column;
 * this is also reused inside the DragOverlay.
 */
export function TaskCard({ task, assignees = [], onClick, dragHandleProps, dragging = false, overlay = false }) {
  const priority = PRIORITY[task.priority] || PRIORITY.medium;

  return (
    <div
      onClick={onClick}
      className={[
        'group rounded-2xl border bg-white p-3.5 transition-shadow',
        overlay ? 'border-accent/50 shadow-2xl rotate-[1.5deg]' : 'border-primary hover:shadow-md',
        dragging ? 'opacity-40' : '',
        onClick ? 'cursor-pointer' : '',
      ].join(' ')}
    >
      <div className="flex items-start gap-2">
        {/* Drag handle */}
        <button
          type="button"
          {...dragHandleProps}
          onClick={(e) => e.stopPropagation()}
          className="mt-0.5 -ml-1 p-0.5 rounded-md text-dark/25 hover:text-dark/60 cursor-grab active:cursor-grabbing touch-none"
          aria-label="Drag task"
        >
          <GripVertical size={16} />
        </button>

        <div className="min-w-0 flex-1">
          <p className="font-heading text-sm font-semibold text-dark leading-snug">{task.title}</p>
          {task.customerName && (
            <p className="font-data text-[11px] text-dark/45 mt-0.5 truncate">{task.customerName}</p>
          )}

          <div className="flex items-center justify-between mt-3">
            {/* Priority */}
            <span className="inline-flex items-center gap-1.5">
              <span className={`w-2 h-2 rounded-full ${priority.dot}`} />
              <span className="font-data text-[10px] uppercase tracking-wide text-dark/45">{priority.label}</span>
            </span>

            {/* Assignees */}
            {assignees.length > 0 ? (
              <span className="flex -space-x-1.5">
                {assignees.slice(0, 3).map((u) => (
                  <Avatar key={u.id} name={u.name} color={u.color} size={22} />
                ))}
                {assignees.length > 3 && (
                  <span className="inline-flex items-center justify-center w-[22px] h-[22px] rounded-full bg-primary text-dark/60 text-[9px] font-heading font-bold ring-2 ring-background">
                    +{assignees.length - 3}
                  </span>
                )}
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 font-data text-[10px] text-dark/30">
                <User2 size={12} /> Unassigned
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
