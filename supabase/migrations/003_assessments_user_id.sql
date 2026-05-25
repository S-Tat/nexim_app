-- Link assessments to Supabase Auth user; tighten RLS for dashboard reads.

alter table public.assessments
  add column if not exists user_id uuid references auth.users (id) on delete set null;

create index if not exists idx_assessments_user_id on public.assessments (user_id);

-- Optional: store AI lists for future UI (safe if columns already exist)
alter table public.assessments
  add column if not exists risks jsonb default '[]'::jsonb;

alter table public.assessments
  add column if not exists recommendations jsonb default '[]'::jsonb;

drop policy if exists "Service full access on assessments" on public.assessments;
drop policy if exists "Authenticated users read own assessments" on public.assessments;

create policy "Authenticated users read own assessments"
  on public.assessments
  for select
  to authenticated
  using (
    (user_id is not null and user_id = auth.uid())
    or (
      email is not null
      and lower(trim(email)) = lower(trim(coalesce((select auth.jwt() ->> 'email'), '')))
    )
  );
