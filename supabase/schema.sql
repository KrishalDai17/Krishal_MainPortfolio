-- ============================================================
-- Krishal Shrestha portfolio — CMS schema
-- Run this once in the Supabase SQL editor for a new project.
-- ============================================================

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------
-- Singletons: one row per key, flexible jsonb payload.
-- Used for: profile (hero+contact), about, qa, data_section,
-- philosophy, seo, settings.
-- ---------------------------------------------------------
create table if not exists content_singletons (
  key text primary key,
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

-- ---------------------------------------------------------
-- List tables — each row is one CRUD-able item.
-- Every list table shares: id, order_index, published, timestamps.
-- ---------------------------------------------------------

create table if not exists skill_categories (
  id uuid primary key default gen_random_uuid(),
  category_key text not null unique,
  tab text not null,
  title text not null,
  groups jsonb not null default '[]'::jsonb, -- [{label, items:[{name, level}]}]
  order_index int not null default 0,
  published boolean not null default true,
  updated_at timestamptz not null default now()
);

create table if not exists projects (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text not null,
  technology text[] not null default '{}',
  features text[] not null default '{}',
  github_url text,
  demo_url text,
  cover_image_url text,
  cover_image_public_id text,
  order_index int not null default 0,
  published boolean not null default true,
  updated_at timestamptz not null default now()
);

create table if not exists photo_items (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  category text not null,
  description text,
  image_url text,
  image_public_id text,
  alt_text text,
  order_index int not null default 0,
  published boolean not null default true,
  updated_at timestamptz not null default now()
);

create table if not exists video_items (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  category text not null,
  description text,
  thumbnail_url text,
  thumbnail_public_id text,
  video_url text,
  order_index int not null default 0,
  published boolean not null default true,
  updated_at timestamptz not null default now()
);

create table if not exists education_items (
  id uuid primary key default gen_random_uuid(),
  period text not null,
  institution text not null,
  program text not null,
  location text not null,
  order_index int not null default 0,
  published boolean not null default true,
  updated_at timestamptz not null default now()
);

create table if not exists learning_items (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  stage text not null check (stage in ('EXPLORING', 'LEARNING', 'BUILDING')),
  order_index int not null default 0,
  published boolean not null default true,
  updated_at timestamptz not null default now()
);

create table if not exists contribution_items (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null,
  order_index int not null default 0,
  published boolean not null default true,
  updated_at timestamptz not null default now()
);

create table if not exists social_links (
  id uuid primary key default gen_random_uuid(),
  key text not null unique,
  label text not null,
  tagline text not null,
  handle text,
  url text not null,
  cta text not null,
  order_index int not null default 0,
  published boolean not null default true,
  updated_at timestamptz not null default now()
);

-- ---------------------------------------------------------
-- General media library (Cloudinary references only — never
-- binary data). Item tables above also keep their own
-- image_url/public_id columns for direct rendering; this table
-- is the browsable library used by the admin media picker.
-- ---------------------------------------------------------
create table if not exists media_assets (
  id uuid primary key default gen_random_uuid(),
  cloudinary_public_id text not null,
  url text not null,
  title text,
  caption text,
  alt_text text,
  category text,
  order_index int not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------
-- updated_at triggers
-- ---------------------------------------------------------
create or replace function set_updated_at() returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

do $$
declare t text;
begin
  foreach t in array array[
    'content_singletons','skill_categories','projects','photo_items',
    'video_items','education_items','learning_items','contribution_items','social_links'
  ] loop
    execute format('drop trigger if exists trg_set_updated_at on %I;', t);
    execute format('create trigger trg_set_updated_at before update on %I for each row execute function set_updated_at();', t);
  end loop;
end $$;

-- ---------------------------------------------------------
-- Row Level Security
-- Public (anon): read-only, published rows only.
-- Authenticated (logged into /admin via Supabase Auth): full access.
-- ---------------------------------------------------------
alter table content_singletons enable row level security;
alter table skill_categories enable row level security;
alter table projects enable row level security;
alter table photo_items enable row level security;
alter table video_items enable row level security;
alter table education_items enable row level security;
alter table learning_items enable row level security;
alter table contribution_items enable row level security;
alter table social_links enable row level security;
alter table media_assets enable row level security;

do $$
declare t text;
begin
  -- singletons: public read, authenticated write
  execute 'create policy "public read singletons" on content_singletons for select using (true)';
  execute 'create policy "auth write singletons" on content_singletons for all using (auth.role() = ''authenticated'') with check (auth.role() = ''authenticated'')';

  foreach t in array array[
    'skill_categories','projects','photo_items','video_items',
    'education_items','learning_items','contribution_items','social_links'
  ] loop
    execute format('create policy "public read published %1$s" on %1$s for select using (published = true)', t);
    execute format('create policy "auth full access %1$s" on %1$s for all using (auth.role() = ''authenticated'') with check (auth.role() = ''authenticated'')', t);
  end loop;

  execute 'create policy "public read media" on media_assets for select using (published = true)';
  execute 'create policy "auth full access media" on media_assets for all using (auth.role() = ''authenticated'') with check (auth.role() = ''authenticated'')';
end $$;
