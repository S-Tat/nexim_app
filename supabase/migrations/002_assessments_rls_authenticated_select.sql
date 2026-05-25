-- Tighten RLS: logged-in users only see rows where assessments.email matches their JWT email.
-- Service role (Next.js API with SUPABASE_SERVICE_ROLE_KEY) bypasses RLS for inserts/updates.

drop policy if exists "Service full access on assessments" on public.assessments;

create policy "Authenticated users read own assessments"
  on public.assessments
  for select
  to authenticated
  using (
    email is not null
    and lower(trim(email)) = lower(trim(coalesce((select auth.jwt() ->> 'email'), '')))
  );
