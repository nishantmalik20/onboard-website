-- Enable Realtime (WebSocket change streams) so every open board updates live.
-- Adds the tables to the supabase_realtime publication (idempotent).

do $$
begin
  if not exists (
    select 1 from pg_publication_tables
    where pubname = 'supabase_realtime' and schemaname = 'public' and tablename = 'tasks'
  ) then
    alter publication supabase_realtime add table tasks;
  end if;

  if not exists (
    select 1 from pg_publication_tables
    where pubname = 'supabase_realtime' and schemaname = 'public' and tablename = 'task_assignees'
  ) then
    alter publication supabase_realtime add table task_assignees;
  end if;

  if not exists (
    select 1 from pg_publication_tables
    where pubname = 'supabase_realtime' and schemaname = 'public' and tablename = 'board_columns'
  ) then
    alter publication supabase_realtime add table board_columns;
  end if;
end $$;
