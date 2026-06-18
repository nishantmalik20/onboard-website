/**
 * Supabase data provider — the live backend implementation of the provider
 * contract in `provider.js`. Drop-in replacement for `mockProvider`: the UI
 * still talks only through `useData()`.
 *
 * Authorization is enforced for real by Postgres RLS (see supabase/migrations).
 * The checks here mirror those rules so the UI fails fast with friendly errors,
 * but RLS is the actual boundary.
 */
import { supabase } from '../lib/supabaseClient.js';
import { ProviderError } from './provider.js';
import { DEFAULT_COLUMNS } from './seed.js';

// Default-stage hints aren't stored in the DB — they're presentation only.
const HINTS = Object.fromEntries(DEFAULT_COLUMNS.map((c) => [c.name, c.hint]));
const PALETTE = ['#2563EB', '#16A34A', '#9333EA', '#D97706', '#0891B2', '#DB2777', '#E63B2E'];

/** Stable avatar color derived from the user id (no DB column needed). */
function colorFor(id) {
  let h = 0;
  const s = String(id);
  for (let i = 0; i < s.length; i += 1) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return PALETTE[h % PALETTE.length];
}

function mapProfile(row) {
  if (!row) return null;
  return {
    id: row.id,
    name: row.full_name,
    email: row.email,
    role: row.role,
    active: row.is_active,
    color: colorFor(row.id),
  };
}

function mapColumn(row) {
  return {
    id: row.id,
    name: row.name,
    hint: HINTS[row.name] || '',
    position: row.position,
    isDefault: row.is_default,
    isCompleted: row.is_completed || false,
  };
}

function mapAttachment(row, url) {
  return {
    id: row.id,
    name: row.file_name,
    path: row.file_path,
    size: row.size_bytes,
    contentType: row.content_type,
    url,
    isImage: (row.content_type || '').startsWith('image/'),
  };
}

function mapTask(row) {
  return {
    id: row.id,
    title: row.title,
    description: row.description || '',
    columnId: row.column_id,
    position: row.position,
    customerName: row.customer_name || '',
    priority: row.priority,
    dueDate: row.due_date,
    assigneeIds: (row.task_assignees || []).map((a) => a.user_id),
    createdBy: row.created_by,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

const TASK_SELECT = '*, task_assignees(user_id)';

/** Turn a Supabase error into a ProviderError the UI understands. */
function fail(error, fallback = 'validation') {
  const code = error?.code === '42501' ? 'forbidden' : fallback;
  throw new ProviderError(error?.message || 'Something went wrong', code);
}

async function fetchProfile(userId) {
  const { data } = await supabase.from('profiles').select('*').eq('id', userId).maybeSingle();
  return data || null;
}

async function currentRole() {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session?.user) return null;
  const profile = await fetchProfile(session.user.id);
  return profile?.role ?? null;
}

export const supabaseProvider = {
  // Capability flags read by the UI to hide mock-only affordances.
  capabilities: { impersonation: false, demo: false },

  // ── auth / session ──────────────────────────────────────────────
  async signIn(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: String(email).trim(),
      password,
    });
    if (error || !data?.user) throw new ProviderError('Invalid email or password', 'auth');
    const profile = await fetchProfile(data.user.id);
    if (!profile) throw new ProviderError('No staff profile is linked to this account', 'auth');
    if (!profile.is_active) {
      await supabase.auth.signOut();
      throw new ProviderError('This account is deactivated', 'forbidden');
    }
    return mapProfile(profile);
  },

  async signOut() {
    await supabase.auth.signOut();
  },

  async getCurrentUser() {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.user) return null;
    const profile = await fetchProfile(session.user.id);
    if (!profile || !profile.is_active) return null;
    return mapProfile(profile);
  },

  /** Not supported with real accounts — impersonation is a mock-only demo aid. */
  async setSessionUser() {
    throw new ProviderError('Switching users is not available with live accounts', 'forbidden');
  },

  async changePassword(currentPassword, newPassword) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user?.email) throw new ProviderError('Not signed in', 'auth');
    // Supabase doesn't verify the old password on update — re-auth to confirm it.
    const { error: reauthError } = await supabase.auth.signInWithPassword({
      email: user.email,
      password: currentPassword,
    });
    if (reauthError) throw new ProviderError('Current password is incorrect', 'validation');
    if (!newPassword || newPassword.length < 6) {
      throw new ProviderError('New password must be at least 6 characters', 'validation');
    }
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) fail(error);
  },

  // ── users ───────────────────────────────────────────────────────
  async listUsers() {
    const { data, error } = await supabase.from('profiles').select('*').order('created_at');
    if (error) fail(error, 'forbidden');
    return data.map(mapProfile);
  },

  async createUser({ name, email, password, role = 'employee' }) {
    // Privileged: creating an auth user needs the service role, so it goes
    // through the guarded serverless endpoint, not the browser client.
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) throw new ProviderError('Not signed in', 'auth');
    const res = await fetch('/api/admin/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session.access_token}`,
      },
      body: JSON.stringify({ name, email, password, role }),
    });
    const body = await res.json().catch(() => ({}));
    if (!res.ok) {
      throw new ProviderError(body.error || 'Could not add team member', res.status === 403 ? 'forbidden' : 'validation');
    }
    return { ...body.user, color: colorFor(body.user.id) };
  },

  async updateUser(id, patch) {
    const update = {};
    if (patch.name !== undefined) update.full_name = patch.name;
    if (patch.role !== undefined) update.role = patch.role;
    if (patch.active !== undefined) update.is_active = patch.active;
    const { data, error } = await supabase.from('profiles').update(update).eq('id', id).select().single();
    if (error) fail(error, 'forbidden');
    return mapProfile(data);
  },

  // ── columns ─────────────────────────────────────────────────────
  async listColumns() {
    const { data, error } = await supabase.from('board_columns').select('*').order('position');
    if (error) fail(error, 'forbidden');
    return data.map(mapColumn);
  },

  async createColumn(name) {
    if (!name?.trim()) throw new ProviderError('Column name is required', 'validation');
    const { count } = await supabase.from('board_columns').select('*', { count: 'exact', head: true });
    const { data, error } = await supabase
      .from('board_columns')
      .insert({ name: name.trim(), position: count ?? 0, is_default: false })
      .select()
      .single();
    if (error) fail(error, 'forbidden');
    return mapColumn(data);
  },

  async renameColumn(id, name) {
    if (!name?.trim()) throw new ProviderError('Column name is required', 'validation');
    const { data, error } = await supabase
      .from('board_columns')
      .update({ name: name.trim() })
      .eq('id', id)
      .select()
      .single();
    if (error) fail(error, 'forbidden');
    return mapColumn(data);
  },

  async deleteColumn(id) {
    const { data: cols, error: colErr } = await supabase
      .from('board_columns')
      .select('id, is_default')
      .order('position');
    if (colErr) fail(colErr, 'forbidden');
    const target = cols.find((c) => c.id === id);
    if (!target) throw new ProviderError('Column not found', 'not_found');
    if (target.is_default) throw new ProviderError('Default pipeline stages cannot be deleted', 'forbidden');
    const fallback = cols.find((c) => c.id !== id);
    if (!fallback) throw new ProviderError('Cannot delete the last column', 'forbidden');

    // Move this column's tasks to the fallback rather than cascade-deleting them.
    const { error: moveErr } = await supabase.from('tasks').update({ column_id: fallback.id }).eq('column_id', id);
    if (moveErr) fail(moveErr, 'forbidden');
    const { error: delErr } = await supabase.from('board_columns').delete().eq('id', id);
    if (delErr) fail(delErr, 'forbidden');
  },

  async reorderColumns(orderedIds) {
    const results = await Promise.all(
      orderedIds.map((cid, i) => supabase.from('board_columns').update({ position: i }).eq('id', cid)),
    );
    const errored = results.find((r) => r.error);
    if (errored) fail(errored.error, 'forbidden');
  },

  // ── tasks ───────────────────────────────────────────────────────
  async listTasks() {
    // RLS scopes this automatically: admin → all; employee → assigned only.
    const { data, error } = await supabase.from('tasks').select(TASK_SELECT).order('position');
    if (error) fail(error, 'forbidden');
    return data.map(mapTask);
  },

  async createTask(data) {
    if (!data.title?.trim()) throw new ProviderError('Title is required', 'validation');
    let columnId = data.columnId;
    if (!columnId) {
      const { data: first } = await supabase.from('board_columns').select('id').order('position').limit(1).single();
      columnId = first?.id;
    }
    const { count } = await supabase
      .from('tasks')
      .select('*', { count: 'exact', head: true })
      .eq('column_id', columnId);
    const { data: { user } } = await supabase.auth.getUser();

    const insert = {
      title: data.title.trim(),
      description: data.description?.trim() || null,
      column_id: columnId,
      position: count ?? 0,
      customer_name: data.customerName?.trim() || null,
      priority: ['low', 'medium', 'high', 'urgent'].includes(data.priority) ? data.priority : 'medium',
      due_date: data.dueDate || null,
      created_by: user?.id ?? null,
    };
    const { data: row, error } = await supabase.from('tasks').insert(insert).select(TASK_SELECT).single();
    if (error) fail(error, 'forbidden');

    const ids = Array.isArray(data.assigneeIds) ? [...new Set(data.assigneeIds)] : [];
    if (ids.length) {
      const { error: aErr } = await supabase
        .from('task_assignees')
        .insert(ids.map((uid) => ({ task_id: row.id, user_id: uid })));
      if (aErr) fail(aErr, 'forbidden');
    }
    return mapTask({ ...row, task_assignees: ids.map((uid) => ({ user_id: uid })) });
  },

  async updateTask(id, patch) {
    const role = await currentRole();
    if (!role) throw new ProviderError('Not signed in', 'auth');

    const update = {};
    if (role === 'admin') {
      if (patch.title !== undefined) update.title = String(patch.title).trim();
      if (patch.description !== undefined) update.description = String(patch.description).trim() || null;
      if (patch.customerName !== undefined) update.customer_name = String(patch.customerName).trim() || null;
      if (patch.priority !== undefined) update.priority = patch.priority;
      if (patch.dueDate !== undefined) update.due_date = patch.dueDate || null;
    } else if (patch.description !== undefined) {
      // Employees may only edit the notes/description on their own tasks.
      update.description = String(patch.description).trim() || null;
    }

    if (Object.keys(update).length === 0) {
      const { data: row } = await supabase.from('tasks').select(TASK_SELECT).eq('id', id).single();
      return mapTask(row);
    }
    const { data: row, error } = await supabase.from('tasks').update(update).eq('id', id).select(TASK_SELECT).single();
    if (error) fail(error, 'forbidden');
    return mapTask(row);
  },

  async moveTask(id, toColumnId, toIndex) {
    // Atomic server-side reposition (renumbers siblings under SECURITY DEFINER).
    const idx = Number.isFinite(toIndex) ? Math.max(0, Math.min(Math.floor(toIndex), 1_000_000)) : 1_000_000;
    const { error } = await supabase.rpc('move_task', {
      p_task: id,
      p_to_column: toColumnId,
      p_to_index: idx,
    });
    if (error) fail(error, 'forbidden');
  },

  async setAssignees(id, userIds) {
    const ids = Array.isArray(userIds) ? [...new Set(userIds)] : [];
    const { error: delErr } = await supabase.from('task_assignees').delete().eq('task_id', id);
    if (delErr) fail(delErr, 'forbidden');
    if (ids.length) {
      const { error: insErr } = await supabase
        .from('task_assignees')
        .insert(ids.map((uid) => ({ task_id: id, user_id: uid })));
      if (insErr) fail(insErr, 'forbidden');
    }
    const { data: row, error } = await supabase.from('tasks').select(TASK_SELECT).eq('id', id).single();
    if (error) fail(error, 'forbidden');
    return mapTask(row);
  },

  async deleteTask(id) {
    const { error } = await supabase.from('tasks').delete().eq('id', id);
    if (error) fail(error, 'forbidden');
  },

  // ── attachments / images ────────────────────────────────────────
  /** Files on a task, each with a fresh 1-hour signed view URL. */
  async listAttachments(taskId) {
    const { data, error } = await supabase
      .from('quote_attachments')
      .select('id, file_name, file_path, content_type, size_bytes')
      .eq('task_id', taskId)
      .order('created_at');
    if (error) return [];
    const out = [];
    for (const row of data) {
      const { data: signed } = await supabase.storage.from('quotes').createSignedUrl(row.file_path, 60 * 60);
      out.push(mapAttachment(row, signed?.signedUrl || null));
    }
    return out;
  },

  /** Admin only (RLS): upload a file to the task and record it. */
  async addAttachment(taskId, file) {
    const safe = String(file.name || 'file').replace(/[^\w.-]+/g, '_').slice(0, 120) || 'file';
    const path = `${taskId}/${crypto.randomUUID()}-${safe}`;
    const { error: upErr } = await supabase.storage.from('quotes').upload(path, file, {
      contentType: file.type || 'application/octet-stream',
      upsert: false,
    });
    if (upErr) fail(upErr, 'forbidden');
    const { data, error } = await supabase
      .from('quote_attachments')
      .insert({ task_id: taskId, file_name: file.name, file_path: path, content_type: file.type || null, size_bytes: file.size ?? null })
      .select('id, file_name, file_path, content_type, size_bytes')
      .single();
    if (error) fail(error, 'forbidden');
    const { data: signed } = await supabase.storage.from('quotes').createSignedUrl(path, 60 * 60);
    return mapAttachment(data, signed?.signedUrl || null);
  },

  /** Admin only (RLS): delete a file from a task. */
  async removeAttachment(attachmentId) {
    const { data: row } = await supabase.from('quote_attachments').select('file_path').eq('id', attachmentId).maybeSingle();
    if (row?.file_path) await supabase.storage.from('quotes').remove([row.file_path]);
    const { error } = await supabase.from('quote_attachments').delete().eq('id', attachmentId);
    if (error) fail(error, 'forbidden');
  },

  // ── realtime ────────────────────────────────────────────────────
  /**
   * Subscribe to live board changes. Returns an unsubscribe fn. Debounced so a
   * drag (which emits several row updates) triggers a single refresh.
   */
  subscribe(onChange) {
    let timer;
    const fire = () => { clearTimeout(timer); timer = setTimeout(onChange, 250); };
    const channel = supabase
      .channel('admin-board')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'tasks' }, fire)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'task_assignees' }, fire)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'board_columns' }, fire)
      .subscribe();
    return () => { clearTimeout(timer); supabase.removeChannel(channel); };
  },
};
