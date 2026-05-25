-- =====================================================
-- Nexim: Core tables for assessments & payments
-- Run in Supabase SQL Editor (Dashboard → SQL Editor)
-- =====================================================

-- 1. Payments — records every confirmed checkout
create table if not exists public.payments (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz not null default now(),
  email         text not null,
  tier          text not null check (tier in ('basic','professional','premium')),
  stripe_session_id text,
  amount_cents  integer,
  currency      text default 'usd',
  status        text not null default 'confirmed'
);

-- Index for lookups by email
create index if not exists idx_payments_email on public.payments (email);

-- 2. Assessments — stores questionnaire answers + AI analysis results
create table if not exists public.assessments (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz not null default now(),
  email         text,
  user_id       uuid references auth.users (id) on delete set null,
  tier          text not null check (tier in ('basic','professional','premium')),
  locale        text not null default 'en',
  country_code  text not null,
  answers       jsonb not null default '{}',
  scores        jsonb,
  analysis      text,
  risks         jsonb default '[]'::jsonb,
  recommendations jsonb default '[]'::jsonb,
  tasks         jsonb,
  mode          text not null default 'demo' check (mode in ('demo','ai'))
);

-- Indexes
create index if not exists idx_assessments_email on public.assessments (email);
create index if not exists idx_assessments_user_id on public.assessments (user_id);
create index if not exists idx_assessments_country on public.assessments (country_code);
create index if not exists idx_assessments_created on public.assessments (created_at desc);

-- 3. Row Level Security
alter table public.payments  enable row level security;
alter table public.assessments enable row level security;

-- Service-role can do everything (our API uses service key)
create policy "Service full access on payments"
  on public.payments for all
  using (true) with check (true);

-- Authenticated users may read only their own rows (API uses service role and bypasses RLS)
drop policy if exists "Service full access on assessments" on public.assessments;
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
