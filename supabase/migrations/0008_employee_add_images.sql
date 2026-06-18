-- Employees may now ADD images to tasks they're assigned to (previously
-- admin-only). DELETES remain admin-only.
--
-- can_read_quote_object(name) returns "admin OR assigned to this object's task"
-- — exactly the rule we want for employee uploads too, so we reuse it here.

-- Storage: allow upload to the quotes bucket if admin or assigned to the task.
drop policy if exists "quotes admin insert" on storage.objects;
drop policy if exists "quotes insert" on storage.objects;
create policy "quotes insert"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'quotes' and public.can_read_quote_object(name));

-- Attachment rows: allow admins and assigned employees to record attachments.
drop policy if exists "attachments admin insert" on quote_attachments;
drop policy if exists "attachments insert" on quote_attachments;
create policy "attachments insert"
  on quote_attachments for insert
  with check (is_admin() or is_assigned(task_id));

-- (DELETE policies "quotes admin delete" and "attachments admin delete" are
--  intentionally left admin-only.)
