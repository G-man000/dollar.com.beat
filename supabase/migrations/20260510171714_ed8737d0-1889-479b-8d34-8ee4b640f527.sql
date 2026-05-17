
-- Already setting search_path inline, but ensure set_updated_at also has it
create or replace function public.set_updated_at() returns trigger
language plpgsql set search_path = public as $$
begin new.updated_at = now(); return new; end; $$;

-- Restrict SECURITY DEFINER functions
revoke execute on function public.has_role(uuid, public.app_role) from public, anon;
revoke execute on function public.handle_new_user() from public, anon, authenticated;
revoke execute on function public.set_updated_at() from public, anon, authenticated;
grant execute on function public.has_role(uuid, public.app_role) to authenticated;

-- Replace overly permissive cookie consent insert with one that ties non-null user_id to auth.uid()
drop policy if exists "Anyone can record consent" on public.cookie_consents;
create policy "Anon can record consent" on public.cookie_consents
  for insert to anon with check (user_id is null);
create policy "Auth records own consent" on public.cookie_consents
  for insert to authenticated with check (user_id is null or user_id = auth.uid());

-- Replace public bucket "select all" with a no-op since covers/previews are accessed via public URL anyway.
-- We restrict listing while still allowing direct object access via public URLs (which don't go through RLS).
drop policy if exists "Public read covers" on storage.objects;
drop policy if exists "Public read previews" on storage.objects;
-- Authenticated can list their own folder for management
create policy "Auth list own covers" on storage.objects for select to authenticated
  using (bucket_id = 'covers' and (storage.foldername(name))[1] = auth.uid()::text);
create policy "Auth list own previews" on storage.objects for select to authenticated
  using (bucket_id = 'previews' and (storage.foldername(name))[1] = auth.uid()::text);
