-- Row Level Security — the real server-side visibility boundary.
-- Mirrors the mock provider's rules: admin sees/does everything;
-- employees see only their assigned tasks and may only move them / edit notes.

-- ============================================================
-- HELPER: is_admin() — SECURITY DEFINER avoids recursive policy lookups
-- ============================================================
create or replace function is_admin()
returns boolean
language sql security definer stable set search_path = public
as $$
  select exists (
    select 1 from profiles
    where id = auth.uid() and role = 'admin' and is_active = true
  );
$$;

-- ============================================================
-- HELPER: is_assigned(task) — is the current user assigned to this task?
-- SECURITY DEFINER bypasses RLS inside the check, so policies that read
-- task_assignees don't recurse. Lets an employee see every assignee of a
-- task they're on (co-worker avatars), but nothing about tasks they're not.
-- ============================================================
create or replace function is_assigned(p_task uuid)
returns boolean
language sql security definer stable set search_path = public
as $$
  select exists (
    select 1 from task_assignees
    where task_id = p_task and user_id = auth.uid()
  );
$$;

-- ============================================================
-- Enable RLS
-- ============================================================
alter table profiles          enable row level security;
alter table board_columns     enable row level security;
alter table tasks             enable row level security;
alter table task_assignees    enable row level security;
alter table quote_attachments enable row level security;

-- ============================================================
-- PROFILES
-- Any authenticated staff member can read the roster (names/avatars).
-- Writes are admin-only — prevents an employee from self-promoting.
-- ============================================================
drop policy if exists "profiles read"        on profiles;
drop policy if exists "profiles admin insert" on profiles;
drop policy if exists "profiles admin update" on profiles;
drop policy if exists "profiles admin delete" on profiles;

create policy "profiles read"
  on profiles for select
  using (auth.uid() is not null);

create policy "profiles admin insert"
  on profiles for insert
  with check (is_admin());

create policy "profiles admin update"
  on profiles for update
  using (is_admin()) with check (is_admin());

create policy "profiles admin delete"
  on profiles for delete
  using (is_admin());

-- ============================================================
-- BOARD COLUMNS
-- Everyone authenticated reads; only admin mutates; defaults are protected.
-- ============================================================
drop policy if exists "columns read"         on board_columns;
drop policy if exists "columns admin insert"  on board_columns;
drop policy if exists "columns admin update"  on board_columns;
drop policy if exists "columns admin delete"  on board_columns;

create policy "columns read"
  on board_columns for select
  using (auth.uid() is not null);

create policy "columns admin insert"
  on board_columns for insert
  with check (is_admin());

create policy "columns admin update"
  on board_columns for update
  using (is_admin()) with check (is_admin());

create policy "columns admin delete"
  on board_columns for delete
  using (is_admin() and is_default = false);

-- ============================================================
-- TASKS
-- Admin: all. Employee: only tasks they're assigned to (select + update).
-- Create/delete are admin-only. Column-level edit limits enforced by trigger.
-- ============================================================
drop policy if exists "tasks select"        on tasks;
drop policy if exists "tasks admin insert"   on tasks;
drop policy if exists "tasks admin delete"   on tasks;
drop policy if exists "tasks update"         on tasks;

create policy "tasks select"
  on tasks for select
  using (is_admin() or is_assigned(id));

create policy "tasks admin insert"
  on tasks for insert
  with check (is_admin());

create policy "tasks admin delete"
  on tasks for delete
  using (is_admin());

create policy "tasks update"
  on tasks for update
  using (is_admin() or is_assigned(id))
  with check (is_admin() or is_assigned(id));

-- Defense in depth: employees may change only stage (column_id), position,
-- description/notes. Any attempt to edit title or customer/meta fields raises.
create or replace function enforce_employee_task_update()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  if is_admin() then
    return new;
  end if;
  if new.title         is distinct from old.title
     or new.customer_name  is distinct from old.customer_name
     or new.customer_email is distinct from old.customer_email
     or new.customer_phone is distinct from old.customer_phone
     or new.company        is distinct from old.company
     or new.service_type   is distinct from old.service_type
     or new.due_date       is distinct from old.due_date
     or new.priority       is distinct from old.priority
     or new.created_by     is distinct from old.created_by then
    raise exception 'Employees may only move tasks or edit notes';
  end if;
  return new;
end;
$$;

drop trigger if exists tasks_employee_guard on tasks;
create trigger tasks_employee_guard
  before update on tasks
  for each row execute procedure enforce_employee_task_update();

-- ============================================================
-- TASK ASSIGNEES
-- Read your own rows (admin reads all); only admin assigns/unassigns.
-- ============================================================
drop policy if exists "assignees read"         on task_assignees;
drop policy if exists "assignees admin insert"   on task_assignees;
drop policy if exists "assignees admin delete"   on task_assignees;

create policy "assignees read"
  on task_assignees for select
  using (is_admin() or is_assigned(task_id));

create policy "assignees admin insert"
  on task_assignees for insert
  with check (is_admin());

create policy "assignees admin delete"
  on task_assignees for delete
  using (is_admin());

-- ============================================================
-- QUOTE ATTACHMENTS
-- Visibility follows the parent task; writes happen server-side (service role).
-- ============================================================
drop policy if exists "attachments select" on quote_attachments;

create policy "attachments select"
  on quote_attachments for select
  using (is_admin() or (task_id is not null and is_assigned(task_id)));
