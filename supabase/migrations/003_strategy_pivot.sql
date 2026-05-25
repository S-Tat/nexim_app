-- V3: Pivot to strategy-based country matching
-- New fields for the questionnaire + AI response format

alter table public.assessments
  add column if not exists strategy text check (strategy in ('career','lifestyle')),
  add column if not exists profession text,
  add column if not exists monthly_income integer,
  add column if not exists savings integer,
  add column if not exists life_values jsonb default '[]'::jsonb,
  add column if not exists top_countries jsonb default '[]'::jsonb;

-- country_code is no longer required (AI picks the countries)
alter table public.assessments
  alter column country_code drop not null,
  alter column country_code set default '';
