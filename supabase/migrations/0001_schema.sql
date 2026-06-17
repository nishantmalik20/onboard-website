-- OnBoard Admin — core schema
-- Postgres 17 (gen_random_uuid() is built-in; no extension needed)

-- ============================================================
-- ENUMS
-- ============================================================
do $$ begin
  create type user_role as enum ('admin', 'employee');
exception when duplicate_object then null; end $$;

do $$ begin
  create type task_priority as enum ('low', 'medium', 'high', 'urgent');
exception when duplicate_object then null; end $$;

-- ============================================================
-- PROFILES (extends auth.users 1:1)
-- ============================================================
create table if not exists profiles (
  id          uuid primary key references auth.users(id) on delete cascade,
  full_name   text not null,
  email       text not null unique,
  role        user_role not null default 'employee',
  is_active   boolean not null default true,
  created_at  timestamptz not null default now()
);

-- ============================================================
-- BOARD COLUMNS
-- ============================================================
create table if not exists board_columns (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  position    integer not null,
  is_default  boolean not null default false,
  created_at  timestamptz not null default now()
);

-- Seed the 9 default pipeline stages (idempotent)
insert into board_columns (name, position, is_default)
select v.name, v.position, true
from (values
  ('Opportunity',        0),
  ('Survey',             1),
  ('Quote',              2),
  ('Design',             3),
  ('Pending Approval',   4),
  ('Production',         5),
  ('Install / Delivery', 6),
  ('Close-out',          7),
  ('Permits',            8)
) as v(name, position)
where not exists (select 1 from board_columns where is_default = true);

-- ============================================================
-- TASKS
-- ============================================================
create table if not exists tasks (
  id             uuid primary key default gen_random_uuid(),
  title          text not null,
  description    text,
  column_id      uuid not null references board_columns(id) on delete cascade,
  position       integer not null default 0,
  -- customer / lead fields (populated when a task originates from a quote form)
  customer_name  text,
  customer_email text,
  customer_phone text,
  company        text,
  service_type   text,
  -- task meta
  due_date       date,
  priority       task_priority not null default 'medium',
  notes          text,
  created_by     uuid references auth.users(id) on delete set null,
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);

create index if not exists tasks_column_id_idx on tasks(column_id);

-- Auto-maintain updated_at
create or replace function touch_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists tasks_touch_updated_at on tasks;
create trigger tasks_touch_updated_at
  before update on tasks
  for each row execute procedure touch_updated_at();

-- ============================================================
-- TASK ASSIGNEES (many-to-many)
-- ============================================================
create table if not exists task_assignees (
  task_id  uuid not null references tasks(id) on delete cascade,
  user_id  uuid not null references auth.users(id) on delete cascade,
  primary key (task_id, user_id)
);

create index if not exists task_assignees_user_id_idx on task_assignees(user_id);

-- ============================================================
-- QUOTE ATTACHMENTS (upgraded form-submission flow)
-- ============================================================
create table if not exists quote_attachments (
  id           uuid primary key default gen_random_uuid(),
  task_id      uuid references tasks(id) on delete cascade,
  file_name    text not null,
  file_path    text not null,   -- storage path: {task_id}/{filename}
  content_type text,
  size_bytes   integer,
  created_at   timestamptz not null default now()
);

create index if not exists quote_attachments_task_id_idx on quote_attachments(task_id);
