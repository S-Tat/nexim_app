-- =====================================================
-- Nexim: SEO relocation guides (Gemini-generated articles)
-- Run in Supabase SQL Editor (Dashboard → SQL Editor)
-- =====================================================

create table if not exists public.guides (
  id          uuid primary key default gen_random_uuid(),
  country     text not null,
  profession  text not null,
  lang        text not null,
  title       text not null,
  content     text not null,
  slug        text not null unique,
  created_at  timestamptz not null default now(),
  unique (country, profession, lang)
);

create index if not exists idx_guides_lookup on public.guides (lang, country, profession);
create index if not exists idx_guides_slug on public.guides (slug);

alter table public.guides enable row level security;

create policy "Public read guides"
  on public.guides
  for select
  using (true);
