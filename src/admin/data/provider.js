/**
 * Data provider contract — the single seam between the admin UI and its backend.
 *
 * The UI only ever talks to a provider through `useData()`. Today that resolves
 * to `mockProvider` (localStorage). In Phase 1b a `supabaseProvider` implements
 * this same interface and we flip one import — no UI changes.
 *
 * Authorization mirrors the planned Supabase RLS: the provider enforces the
 * admin-vs-employee rules itself, so the UI hiding a control is defense-in-depth,
 * not the only guard.
 *
 * @typedef {Object} User
 * @property {string} id
 * @property {string} name
 * @property {string} email
 * @property {'admin'|'employee'} role
 * @property {boolean} active
 * @property {string} color  // avatar color
 *
 * @typedef {Object} Column
 * @property {string} id
 * @property {string} name
 * @property {string} [hint]
 * @property {number} position
 * @property {boolean} isDefault
 *
 * @typedef {Object} Task
 * @property {string} id
 * @property {string} title
 * @property {string} description
 * @property {string} columnId
 * @property {number} position
 * @property {string} [customerName]
 * @property {'low'|'medium'|'high'} priority
 * @property {string|null} dueDate
 * @property {string[]} assigneeIds
 * @property {string} createdBy
 * @property {string} createdAt
 * @property {string} updatedAt
 *
 * Interface (all methods async):
 *
 *   // auth / session
 *   signIn(email, password): Promise<User>
 *   signOut(): Promise<void>
 *   getCurrentUser(): Promise<User|null>
 *   setSessionUser(userId): Promise<User>   // mock-only demo role switch
 *   changePassword(currentPassword, newPassword): Promise<void>
 *
 *   // users (admin only for writes)
 *   listUsers(): Promise<User[]>
 *   createUser({ name, email, password, role }): Promise<User>
 *   updateUser(id, patch): Promise<User>
 *
 *   // columns (admin only for writes)
 *   listColumns(): Promise<Column[]>
 *   createColumn(name): Promise<Column>
 *   renameColumn(id, name): Promise<Column>
 *   deleteColumn(id): Promise<void>          // moves its tasks to the first column
 *   reorderColumns(orderedIds): Promise<void>
 *
 *   // tasks (scoped by current user's role)
 *   listTasks(): Promise<Task[]>             // admin: all; employee: assigned-only
 *   createTask(data): Promise<Task>          // admin only
 *   updateTask(id, patch): Promise<Task>
 *   moveTask(id, toColumnId, toIndex): Promise<void>
 *   setAssignees(id, userIds): Promise<Task> // admin only
 *   deleteTask(id): Promise<void>            // admin only
 */

export class ProviderError extends Error {
  constructor(message, code) {
    super(message);
    this.name = 'ProviderError';
    this.code = code; // 'auth' | 'forbidden' | 'not_found' | 'validation'
  }
}
