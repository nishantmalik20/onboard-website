import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  DndContext, DragOverlay, PointerSensor, KeyboardSensor, useSensor, useSensors, closestCorners,
} from '@dnd-kit/core';
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { Plus, Filter, Loader2 } from 'lucide-react';
import { useAuth } from '../AuthProvider.jsx';
import { useData } from '../lib/useData.js';
import { Column } from './Column.jsx';
import { AddColumn } from './AddColumn.jsx';
import { TaskCard } from './TaskCard.jsx';
import { TaskDrawer } from './TaskDrawer.jsx';

export function Board() {
  const { isAdmin } = useAuth();
  const data = useData();

  const [columns, setColumns] = useState([]);
  const [tasksById, setTasksById] = useState({});
  const [users, setUsers] = useState([]);
  const [containers, setContainersState] = useState({});
  const containersRef = useRef({});
  const [loading, setLoading] = useState(true);
  const [activeId, setActiveId] = useState(null);
  const [employeeFilter, setEmployeeFilter] = useState('all');
  const [drawer, setDrawer] = useState({ open: false, mode: 'create', task: null, defaultColumnId: null });

  const setContainers = useCallback((updater) => {
    setContainersState((prev) => {
      const next = typeof updater === 'function' ? updater(prev) : updater;
      containersRef.current = next;
      return next;
    });
  }, []);

  const usersById = useMemo(() => Object.fromEntries(users.map((u) => [u.id, u])), [users]);

  const loadAll = useCallback(async () => {
    const [cols, tasks, allUsers] = await Promise.all([data.listColumns(), data.listTasks(), data.listUsers()]);
    setColumns(cols);
    setUsers(allUsers);

    const filtered = isAdmin && employeeFilter !== 'all'
      ? tasks.filter((t) => t.assigneeIds.includes(employeeFilter))
      : tasks;

    setTasksById(Object.fromEntries(filtered.map((t) => [t.id, t])));
    const next = Object.fromEntries(cols.map((c) => [c.id, []]));
    filtered
      .slice()
      .sort((a, b) => a.position - b.position)
      .forEach((t) => { (next[t.columnId] ||= []).push(t.id); });
    setContainers(next);
    setLoading(false);
  }, [data, isAdmin, employeeFilter, setContainers]);

  useEffect(() => { loadAll(); }, [loadAll]);

  // Live updates: refresh the board when anyone changes tasks/columns.
  // No-op on the mock provider; a real WebSocket subscription on Supabase.
  useEffect(() => {
    const unsubscribe = data.subscribe?.(() => loadAll());
    return () => unsubscribe?.();
  }, [data, loadAll]);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  // Admin reordering is exact only on the full board; disable while filtered.
  const dndDisabled = isAdmin && employeeFilter !== 'all';

  const findContainer = useCallback((id) => {
    if (id in containersRef.current) return id;
    return Object.keys(containersRef.current).find((colId) => containersRef.current[colId].includes(id));
  }, []);

  function handleDragStart(e) {
    setActiveId(e.active.id);
  }

  function handleDragOver(e) {
    const { active, over } = e;
    if (!over) return;
    const activeContainer = findContainer(active.id);
    const overContainer = findContainer(over.id);
    if (!activeContainer || !overContainer || activeContainer === overContainer) return;

    setContainers((prev) => {
      const activeItems = prev[activeContainer];
      const overItems = prev[overContainer];
      const overIndex = over.id in prev ? overItems.length : overItems.indexOf(over.id);
      return {
        ...prev,
        [activeContainer]: activeItems.filter((id) => id !== active.id),
        [overContainer]: [...overItems.slice(0, overIndex), active.id, ...overItems.slice(overIndex)],
      };
    });
    setTasksById((prev) => ({ ...prev, [active.id]: { ...prev[active.id], columnId: overContainer } }));
  }

  async function handleDragEnd(e) {
    const { active, over } = e;
    setActiveId(null);
    if (!over) return;

    const overContainer = findContainer(over.id);
    if (!overContainer) return;

    const items = containersRef.current[overContainer];
    const oldIndex = items.indexOf(active.id);
    const newIndex = over.id in containersRef.current ? items.length - 1 : items.indexOf(over.id);
    if (oldIndex === -1 || newIndex === -1) return;

    if (oldIndex !== newIndex) {
      setContainers((prev) => ({ ...prev, [overContainer]: arrayMove(prev[overContainer], oldIndex, newIndex) }));
    }

    try {
      await data.moveTask(active.id, overContainer, newIndex);
    } catch {
      // Revert to source of truth on any permission/validation error.
    }
    await loadAll();
  }

  const openCreate = (columnId) => setDrawer({ open: true, mode: 'create', task: null, defaultColumnId: columnId });
  const openEdit = (task) => setDrawer({ open: true, mode: 'edit', task, defaultColumnId: null });
  const closeDrawer = () => setDrawer((d) => ({ ...d, open: false }));

  async function handleCreateColumn(name) { await data.createColumn(name); await loadAll(); }
  async function handleRenameColumn(id, name) { await data.renameColumn(id, name); await loadAll(); }
  async function handleDeleteColumn(id) {
    if (!window.confirm('Delete this column? Its tasks move to the first stage.')) return;
    await data.deleteColumn(id);
    await loadAll();
  }

  const activeTask = activeId ? tasksById[activeId] : null;

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20 text-dark/40">
        <Loader2 className="animate-spin" /> <span className="ml-2 font-data text-sm">Loading board…</span>
      </div>
    );
  }

  const assignableUsers = users; // employees + admins can be assigned

  return (
    <div>
      {/* Board toolbar */}
      <div className="flex flex-wrap items-center gap-3 mb-5">
        <p className="font-data text-xs uppercase tracking-widest text-dark/45">
          {isAdmin ? 'Full pipeline' : 'My pipeline'}
        </p>

        <div className="ml-auto flex items-center gap-2.5">
          {isAdmin && (
            <div className="relative inline-flex items-center">
              <Filter size={15} className="absolute left-3 text-dark/40 pointer-events-none" />
              <select
                value={employeeFilter}
                onChange={(e) => setEmployeeFilter(e.target.value)}
                className="appearance-none pl-9 pr-8 py-2.5 rounded-2xl border border-primary bg-white font-heading text-sm font-semibold text-dark/80 focus:outline-none focus:border-accent transition-colors"
              >
                <option value="all">All team members</option>
                {users.map((u) => <option key={u.id} value={u.id}>{u.name}</option>)}
              </select>
            </div>
          )}
          {isAdmin && (
            <button
              type="button"
              onClick={() => openCreate(columns[0]?.id)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-accent text-white font-heading text-sm font-semibold hover:scale-[1.02] active:scale-[0.98] transition-transform"
            >
              <Plus size={16} /> New task
            </button>
          )}
        </div>
      </div>

      {dndDisabled && (
        <p className="mb-3 font-data text-[11px] text-dark/45">Viewing one team member — clear the filter to drag &amp; reorder.</p>
      )}

      {/* Board */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
        onDragCancel={() => setActiveId(null)}
      >
        <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 md:-mx-8 md:px-8">
          {columns.map((column) => (
            <Column
              key={column.id}
              column={column}
              tasks={(containers[column.id] || []).map((id) => tasksById[id]).filter(Boolean)}
              usersById={usersById}
              isAdmin={isAdmin}
              dndDisabled={dndDisabled}
              onAddTask={openCreate}
              onOpenTask={openEdit}
              onRenameColumn={handleRenameColumn}
              onDeleteColumn={handleDeleteColumn}
            />
          ))}
          {isAdmin && <AddColumn onCreate={handleCreateColumn} />}
        </div>

        <DragOverlay>
          {activeTask ? (
            <TaskCard
              task={activeTask}
              assignees={(activeTask.assigneeIds || []).map((id) => usersById[id]).filter(Boolean)}
              overlay
            />
          ) : null}
        </DragOverlay>
      </DndContext>

      {drawer.open && (
        <TaskDrawer
          key={drawer.task?.id || `new-${drawer.defaultColumnId}`}
          mode={drawer.mode}
          task={drawer.task}
          columns={columns}
          users={assignableUsers}
          isAdmin={isAdmin}
          defaultColumnId={drawer.defaultColumnId}
          onClose={closeDrawer}
          onSaved={loadAll}
        />
      )}
    </div>
  );
}
