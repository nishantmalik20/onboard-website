-- Task images (admin attaches, assigned employees view) + a Completed stage.

-- ============================================================
-- 1. Completed stage
-- ============================================================
alter table board_columns add column if not exists is_completed boolean not null default false;

-- Add the terminal "Completed" column once, at the end of the board.
insert into board_columns (name, position, is_default, is_completed)
select 'Completed', (select coalesce(max(position), 0) + 1 from board_columns), true, true
where not exists (select 1 from board_columns where is_completed = true);

-- ============================================================
-- 2. Attachment-row writes from the browser (admin only)
--    (Public quote uploads still insert server-side via the service role.)
-- ============================================================
drop policy if exists "attachments admin insert" on quote_attachments;
create policy "attachments admin insert"
  on quote_attachments for insert
  with check (is_admin());

drop policy if exists "attachments admin delete" on quote_attachments;
create policy "attachments admin delete"
  on quote_attachments for delete
  using (is_admin());

-- ============================================================
-- 3. Storage access
--    Files live under "{task_id}/...", so derive the task from the path:
--    admins read everything; an employee reads only files on tasks they're
--    assigned to. Admins may upload/delete objects from the browser.
-- ============================================================
create or replace function can_read_quote_object(object_name text)
returns boolean
language plpgsql security definer stable set search_path = public
as $$
declare
  seg text;
  tid uuid;
begin
  if is_admin() then
    return true;
  end if;
  seg := split_part(object_name, '/', 1);
  begin
    tid := seg::uuid;
  exception when others then
    return false;
  end;
  return is_assigned(tid);
end;
$$;

drop policy if exists "quotes admin read" on storage.objects;
drop policy if exists "quotes read" on storage.objects;
create policy "quotes read"
  on storage.objects for select
  to authenticated
  using (bucket_id = 'quotes' and public.can_read_quote_object(name));

drop policy if exists "quotes admin insert" on storage.objects;
create policy "quotes admin insert"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'quotes' and public.is_admin());

drop policy if exists "quotes admin delete" on storage.objects;
create policy "quotes admin delete"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'quotes' and public.is_admin());
