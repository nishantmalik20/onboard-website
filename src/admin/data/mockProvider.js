/**
 * Mock data provider — localStorage-backed implementation of the provider
 * contract in `provider.js`. State persists across reloads so demos hold up.
 *
 * Role rules mirror the planned Supabase RLS:
 *   - employees see/act only on tasks assigned to them
 *   - only admins create tasks, assign people, manage columns, and add users
 */
import { ProviderError } from './provider.js';
import { buildSeed } from './seed.js';

const DB_KEY = 'onboard_admin_db_v1';
const SESSION_KEY = 'onboard_admin_session_v1';

function newId(prefix) {
  const rand = (crypto?.randomUUID?.() || `${Date.now()}-${Math.round(Math.random() * 1e9)}`).slice(0, 8);
  return `${prefix}-${rand}`;
}

function loadDB() {
  try {
    const raw = localStorage.getItem(DB_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    // fall through to reseed
  }
  const seeded = buildSeed();
  localStorage.setItem(DB_KEY, JSON.stringify(seeded));
  return seeded;
}

function saveDB(db) {
  localStorage.setItem(DB_KEY, JSON.stringify(db));
}

function publicUser(u) {
  if (!u) return null;
  // Strip the mock password before exposing a user to the UI.
  const { password: _password, ...rest } = u;
  return rest;
}

function getSessionId() {
  return localStorage.getItem(SESSION_KEY) || null;
}

function requireSession(db) {
  const id = getSessionId();
  const user = db.users.find((u) => u.id === id);
  if (!user) throw new ProviderError('Not signed in', 'auth');
  return user;
}

function requireAdmin(db) {
  const user = requireSession(db);
  if (user.role !== 'admin') throw new ProviderError('Admins only', 'forbidden');
  return user;
}

function normalizePositions(db, columnId) {
  db.tasks
    .filter((t) => t.columnId === columnId)
    .sort((a, b) => a.position - b.position)
    .forEach((t, i) => { t.position = i; });
}

// Resolve immediately but keep the async shape of the contract.
const ok = (v) => Promise.resolve(v);

export const mockProvider = {
  // Capability flags read by the UI. The mock supports demo-only affordances
  // (role switcher, seeded credentials) that the real backend does not.
  capabilities: { impersonation: true, demo: true },

  /** No live backend in the mock — return a no-op unsubscribe. */
  subscribe() {
    return () => {};
  },

  // ── auth / session ──────────────────────────────────────────────
  async signIn(email, password) {
    const db = loadDB();
    const user = db.users.find((u) => u.email.toLowerCase() === String(email).trim().toLowerCase());
    if (!user || user.password !== password) {
      throw new ProviderError('Invalid email or password', 'auth');
    }
    if (!user.active) throw new ProviderError('This account is deactivated', 'forbidden');
    localStorage.setItem(SESSION_KEY, user.id);
    return publicUser(user);
  },

  async signOut() {
    localStorage.removeItem(SESSION_KEY);
    return ok();
  },

  async getCurrentUser() {
    const db = loadDB();
    const id = getSessionId();
    return ok(publicUser(db.users.find((u) => u.id === id)));
  },

  /** Mock-only: jump to another seeded user to demo role-based visibility. */
  async setSessionUser(userId) {
    const db = loadDB();
    const user = db.users.find((u) => u.id === userId);
    if (!user) throw new ProviderError('Unknown user', 'not_found');
    localStorage.setItem(SESSION_KEY, user.id);
    return publicUser(user);
  },

  async changePassword(currentPassword, newPassword) {
    const db = loadDB();
    const me = requireSession(db);
    const stored = db.users.find((u) => u.id === me.id);
    if (stored.password !== currentPassword) {
      throw new ProviderError('Current password is incorrect', 'validation');
    }
    if (!newPassword || newPassword.length < 6) {
      throw new ProviderError('New password must be at least 6 characters', 'validation');
    }
    stored.password = newPassword;
    saveDB(db);
    return ok();
  },

  // ── users ───────────────────────────────────────────────────────
  async listUsers() {
    const db = loadDB();
    requireSession(db);
    return ok(db.users.map(publicUser));
  },

  async createUser({ name, email, password, role = 'employee' }) {
    const db = loadDB();
    requireAdmin(db);
    const clean = String(email || '').trim().toLowerCase();
    if (!name?.trim()) throw new ProviderError('Name is required', 'validation');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clean)) throw new ProviderError('A valid email is required', 'validation');
    if (db.users.some((u) => u.email.toLowerCase() === clean)) throw new ProviderError('That email already exists', 'validation');
    if (!password || password.length < 6) throw new ProviderError('Password must be at least 6 characters', 'validation');

    const palette = ['#2563EB', '#16A34A', '#9333EA', '#D97706', '#0891B2', '#DB2777'];
    const user = {
      id: newId('u'),
      name: name.trim(),
      email: clean,
      role: role === 'admin' ? 'admin' : 'employee',
      password,
      active: true,
      color: palette[db.users.length % palette.length],
    };
    db.users.push(user);
    saveDB(db);
    return ok(publicUser(user));
  },

  async updateUser(id, patch) {
    const db = loadDB();
    requireAdmin(db);
    const user = db.users.find((u) => u.id === id);
    if (!user) throw new ProviderError('User not found', 'not_found');
    Object.assign(user, {
      name: patch.name ?? user.name,
      role: patch.role ?? user.role,
      active: patch.active ?? user.active,
    });
    saveDB(db);
    return ok(publicUser(user));
  },

  // ── columns ─────────────────────────────────────────────────────
  async listColumns() {
    const db = loadDB();
    requireSession(db);
    return ok([...db.columns].sort((a, b) => a.position - b.position));
  },

  async createColumn(name) {
    const db = loadDB();
    requireAdmin(db);
    if (!name?.trim()) throw new ProviderError('Column name is required', 'validation');
    const column = {
      id: newId('col'),
      name: name.trim(),
      hint: '',
      position: db.columns.length,
      isDefault: false,
    };
    db.columns.push(column);
    saveDB(db);
    return ok(column);
  },

  async renameColumn(id, name) {
    const db = loadDB();
    requireAdmin(db);
    const column = db.columns.find((c) => c.id === id);
    if (!column) throw new ProviderError('Column not found', 'not_found');
    if (!name?.trim()) throw new ProviderError('Column name is required', 'validation');
    column.name = name.trim();
    saveDB(db);
    return ok(column);
  },

  async deleteColumn(id) {
    const db = loadDB();
    requireAdmin(db);
    const column = db.columns.find((c) => c.id === id);
    if (!column) throw new ProviderError('Column not found', 'not_found');
    if (column.isDefault) throw new ProviderError('Default pipeline stages cannot be deleted', 'forbidden');

    const fallback = [...db.columns].filter((c) => c.id !== id).sort((a, b) => a.position - b.position)[0];
    if (!fallback) throw new ProviderError('Cannot delete the last column', 'forbidden');

    // Move this column's tasks into the fallback column rather than losing them.
    db.tasks.filter((t) => t.columnId === id).forEach((t) => { t.columnId = fallback.id; });
    db.columns = db.columns.filter((c) => c.id !== id);
    db.columns.sort((a, b) => a.position - b.position).forEach((c, i) => { c.position = i; });
    normalizePositions(db, fallback.id);
    saveDB(db);
    return ok();
  },

  async reorderColumns(orderedIds) {
    const db = loadDB();
    requireAdmin(db);
    orderedIds.forEach((id, i) => {
      const column = db.columns.find((c) => c.id === id);
      if (column) column.position = i;
    });
    saveDB(db);
    return ok();
  },

  // ── tasks ───────────────────────────────────────────────────────
  async listTasks() {
    const db = loadDB();
    const me = requireSession(db);
    const all = [...db.tasks].sort((a, b) => a.position - b.position);
    const scoped = me.role === 'admin' ? all : all.filter((t) => t.assigneeIds.includes(me.id));
    return ok(scoped);
  },

  async createTask(data) {
    const db = loadDB();
    const me = requireAdmin(db);
    if (!data.title?.trim()) throw new ProviderError('Title is required', 'validation');
    const columnId = data.columnId || [...db.columns].sort((a, b) => a.position - b.position)[0]?.id;
    const inCol = db.tasks.filter((t) => t.columnId === columnId).length;
    const now = new Date().toISOString();
    const task = {
      id: newId('task'),
      title: data.title.trim(),
      description: data.description?.trim() || '',
      columnId,
      position: inCol,
      customerName: data.customerName?.trim() || '',
      priority: ['low', 'medium', 'high'].includes(data.priority) ? data.priority : 'medium',
      dueDate: data.dueDate || null,
      assigneeIds: Array.isArray(data.assigneeIds) ? data.assigneeIds : [],
      createdBy: me.id,
      createdAt: now,
      updatedAt: now,
    };
    db.tasks.push(task);
    saveDB(db);
    return ok(task);
  },

  async updateTask(id, patch) {
    const db = loadDB();
    const me = requireSession(db);
    const task = db.tasks.find((t) => t.id === id);
    if (!task) throw new ProviderError('Task not found', 'not_found');

    if (me.role !== 'admin') {
      // Employees may edit only tasks assigned to them, and only safe fields.
      if (!task.assigneeIds.includes(me.id)) throw new ProviderError('You can only edit your own tasks', 'forbidden');
      const allowed = {};
      if (patch.description !== undefined) allowed.description = String(patch.description).trim();
      Object.assign(task, allowed);
    } else {
      Object.assign(task, {
        title: patch.title !== undefined ? String(patch.title).trim() : task.title,
        description: patch.description !== undefined ? String(patch.description).trim() : task.description,
        customerName: patch.customerName !== undefined ? String(patch.customerName).trim() : task.customerName,
        priority: patch.priority ?? task.priority,
        dueDate: patch.dueDate !== undefined ? patch.dueDate : task.dueDate,
      });
    }
    task.updatedAt = new Date().toISOString();
    saveDB(db);
    return ok(task);
  },

  async moveTask(id, toColumnId, toIndex) {
    const db = loadDB();
    const me = requireSession(db);
    const task = db.tasks.find((t) => t.id === id);
    if (!task) throw new ProviderError('Task not found', 'not_found');
    if (me.role !== 'admin' && !task.assigneeIds.includes(me.id)) {
      throw new ProviderError('You can only move your own tasks', 'forbidden');
    }
    const fromColumnId = task.columnId;

    // Pull from source ordering.
    const target = db.tasks
      .filter((t) => t.columnId === toColumnId && t.id !== id)
      .sort((a, b) => a.position - b.position);

    const clampedIndex = Math.max(0, Math.min(toIndex ?? target.length, target.length));
    target.splice(clampedIndex, 0, task);
    task.columnId = toColumnId;
    target.forEach((t, i) => { t.position = i; });

    if (fromColumnId !== toColumnId) normalizePositions(db, fromColumnId);
    task.updatedAt = new Date().toISOString();
    saveDB(db);
    return ok();
  },

  async setAssignees(id, userIds) {
    const db = loadDB();
    requireAdmin(db);
    const task = db.tasks.find((t) => t.id === id);
    if (!task) throw new ProviderError('Task not found', 'not_found');
    const valid = new Set(db.users.filter((u) => u.role === 'employee' || u.role === 'admin').map((u) => u.id));
    task.assigneeIds = (Array.isArray(userIds) ? userIds : []).filter((uid) => valid.has(uid));
    task.updatedAt = new Date().toISOString();
    saveDB(db);
    return ok(task);
  },

  async deleteTask(id) {
    const db = loadDB();
    requireAdmin(db);
    const task = db.tasks.find((t) => t.id === id);
    if (!task) throw new ProviderError('Task not found', 'not_found');
    const columnId = task.columnId;
    db.tasks = db.tasks.filter((t) => t.id !== id);
    normalizePositions(db, columnId);
    saveDB(db);
    return ok();
  },

  // ── attachments (no file handling in the mock) ──────────────────
  async listAttachments() {
    return ok([]);
  },
  async addAttachment() {
    throw new ProviderError('Attachments need the live backend', 'forbidden');
  },
  async removeAttachment() {
    return ok();
  },

  /** Test/demo helper: wipe local state back to the seed. */
  async resetDemo() {
    localStorage.removeItem(DB_KEY);
    localStorage.removeItem(SESSION_KEY);
    loadDB();
    return ok();
  },
};
