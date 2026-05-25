-- Align assessments with app inserts (user_id, risks, recommendations) + safe RLS for dashboard reads.
-- Service role (API routes) bypasses RLS in Supabase.

alter table public.assessments
  add column if not exists user_id uuid references auth.users (id) on delete set null,
  add column if not exists risks jsonb default '[]'::jsonb,
  add column if not exists recommendations jsonb default '[]'::jsonb;

create index if not exists idx_assessments_user_id on public.assessments (user_id);

drop policy if exists "Service full access on assessments" on public.assessments;
drop policy if exists "Users read own assessments" on public.assessments;

create policy "Users read own assessments"
  on public.assessments
  for select
  to authenticated
  using (
    user_id = auth.uid()
    or (
      email is not null
      and trim(email) <> ''
      and lower(trim(email)) = lower(
        trim(
          coalesce(
            (select u.email from auth.users u where u.id = auth.uid()),
            ''
          )
        )
      )
    )
  );
