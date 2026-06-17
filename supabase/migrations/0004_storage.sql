-- Private storage bucket for quote-form attachments.
-- Uploads happen server-side with the service role (bypasses RLS);
-- staff view files through short-lived signed URLs. Admins may also
-- browse objects directly from an authenticated session.

insert into storage.buckets (id, name, public)
values ('quotes', 'quotes', false)
on conflict (id) do nothing;

drop policy if exists "quotes admin read" on storage.objects;
create policy "quotes admin read"
  on storage.objects for select
  to authenticated
  using (bucket_id = 'quotes' and public.is_admin());
