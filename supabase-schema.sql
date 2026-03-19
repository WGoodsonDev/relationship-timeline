-- Run this in the Supabase SQL editor

create table timeline_events (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  date date not null,
  title text not null,
  description text,
  emoji text default '✨',
  color text default '#c8765a'
);

-- Auto-update updated_at on row changes
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger set_updated_at
before update on timeline_events
for each row execute function update_updated_at();

-- Enable Row Level Security
alter table timeline_events enable row level security;

-- Allow all authenticated users to read and write (shared timeline)
create policy "Authenticated users can do everything"
on timeline_events
for all
to authenticated
using (true)
with check (true);
