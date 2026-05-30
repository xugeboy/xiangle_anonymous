create extension if not exists pgcrypto;

create table if not exists public.confessions (
  id uuid primary key default gen_random_uuid(),
  nickname text not null default '匿名同事' check (char_length(nickname) <= 24),
  content text not null check (char_length(content) between 5 and 1200),
  created_at timestamptz not null default now()
);

create index if not exists confessions_created_at_idx
  on public.confessions (created_at desc);

alter table public.confessions enable row level security;
