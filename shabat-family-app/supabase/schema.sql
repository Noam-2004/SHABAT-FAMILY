-- SHABAT FAMILY — database schema
-- Run this once in Supabase: Dashboard -> SQL Editor -> New query -> paste -> Run

create extension if not exists "uuid-ossp";

-- ---------- Seeded trip data (written by admin/seed script, read by everyone) ----------
create table if not exists trip_days (
  day int primary key,
  date date not null,
  country text not null,               -- 'vn' | 'th' | 'il'
  title text not null,
  title_he text not null,
  loc text not null,
  hotel text,
  confirmed boolean not null default true,
  hero_image_path text                  -- storage path, nullable
);

create table if not exists activities (
  id uuid primary key default uuid_generate_v4(),
  day int not null references trip_days(day) on delete cascade,
  sort_order int not null default 0,
  time text,                            -- e.g. '08:30', null if unconfirmed
  text_he text not null,
  planned boolean not null default false
);

create table if not exists attractions (
  id uuid primary key default uuid_generate_v4(),
  day int not null references trip_days(day) on delete cascade,
  name_en text not null,
  name_he text not null,
  image_path text                       -- storage path, nullable (falls back to illustration client-side)
);

-- ---------- User-generated content (this is what must persist forever) ----------
create table if not exists photos (
  id uuid primary key default uuid_generate_v4(),
  day int not null references trip_days(day) on delete cascade,
  attraction_id uuid references attractions(id) on delete set null,
  storage_path text not null,           -- path inside the 'photos' bucket
  uploaded_by text,
  original_filename text,
  created_at timestamptz not null default now()
);

create table if not exists photo_favorites (
  photo_id uuid references photos(id) on delete cascade,
  favorited_by text not null,
  created_at timestamptz not null default now(),
  primary key (photo_id, favorited_by)
);

create table if not exists day_covers (
  day int primary key references trip_days(day) on delete cascade,
  photo_id uuid references photos(id) on delete cascade,
  set_by text,
  updated_at timestamptz not null default now()
);

create table if not exists family_members (
  name text primary key,
  created_at timestamptz not null default now()
);

create table if not exists shake_prefs (
  person text primary key references family_members(name) on delete cascade,
  fruits text[] not null default '{}',
  base text[] not null default '{}',
  extras text[] not null default '{}',
  updated_at timestamptz not null default now()
);

create table if not exists daily_shakes (
  day int primary key references trip_days(day) on delete cascade,
  person text,
  fruits text[] not null default '{}',
  base text[] not null default '{}',
  extras text[] not null default '{}',
  updated_at timestamptz not null default now()
);

create table if not exists quotes (
  id uuid primary key default uuid_generate_v4(),
  text text not null,
  said_by text,
  created_at timestamptz not null default now()
);

create table if not exists award_votes (
  award text not null,
  voted_by text not null,
  created_at timestamptz not null default now(),
  primary key (award, voted_by)
);

create index if not exists idx_photos_day on photos(day);
create index if not exists idx_activities_day on activities(day);
create index if not exists idx_attractions_day on attractions(day);

-- ---------- Row Level Security ----------
-- Everything is written through Next.js Server Actions using the service-role
-- key (server-only, never sent to the browser), so the tables below deny all
-- direct access from the public anon key. This keeps photos and family data
-- private even though the anon key is visible in client-side JS.
alter table trip_days enable row level security;
alter table activities enable row level security;
alter table attractions enable row level security;
alter table photos enable row level security;
alter table photo_favorites enable row level security;
alter table day_covers enable row level security;
alter table family_members enable row level security;
alter table shake_prefs enable row level security;
alter table daily_shakes enable row level security;
alter table quotes enable row level security;
alter table award_votes enable row level security;
-- (No policies are created — default-deny. Only the service-role key, used
-- exclusively in server code, bypasses RLS.)

-- ---------- Storage ----------
-- Create a PRIVATE bucket called "photos" from the Supabase dashboard
-- (Storage -> New bucket -> name: photos -> Public: OFF), or run:
insert into storage.buckets (id, name, public)
values ('photos', 'photos', false)
on conflict (id) do nothing;
