-- Run this in the Supabase SQL editor (Project > SQL Editor > New query).

-- 1. Table that holds every piece of work shown in the portfolio grid.
create table if not exists public.work_items (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  medium text not null check (medium in ('photography', 'videography', 'design')),
  category text,               -- e.g. "Editorial", "Portrait", "Branding"
  year int,
  camera text,                 -- EXIF-style caption, e.g. "Sony A7IV · 35mm · f/2.8 · 1/250s · ISO 400"
  image_path text,             -- path inside the `portfolio-media` storage bucket
  sort_order int default 0,
  published boolean default true,
  created_at timestamptz default now()
);

-- 2. Table that stores contact form submissions from the site.
create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  project text,
  message text not null,
  created_at timestamptz default now()
);

-- 3. Row Level Security
alter table public.work_items enable row level security;
alter table public.contact_messages enable row level security;

-- Anyone (anon key, used by the React app) can READ published work items.
create policy "Public can read published work"
  on public.work_items for select
  using (published = true);

-- Only the service role (used by the /api/contact serverless function) can
-- insert contact messages. The anon key cannot write directly.
create policy "Service role can insert contact messages"
  on public.contact_messages for insert
  to service_role
  with check (true);

-- Note: no public select/update/delete policies are created for
-- contact_messages, so submissions stay private to Bobby (viewable via the
-- Supabase dashboard or the service role).

-- 4. Storage bucket for photos, video thumbnails and design mockups.
insert into storage.buckets (id, name, public)
values ('portfolio-media', 'portfolio-media', true)
on conflict (id) do nothing;

create policy "Public can view portfolio media"
  on storage.objects for select
  using (bucket_id = 'portfolio-media');
