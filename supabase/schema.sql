-- PlayWin Campaign Platform MVP Schema

create extension if not exists "uuid-ossp";

create table if not exists clients (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  logo_url text,
  created_at timestamptz default now()
);

create table if not exists profiles (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null,
  client_id uuid references clients(id) on delete set null,
  role text not null check (role in ('admin', 'client')),
  created_at timestamptz default now()
);

create table if not exists campaigns (
  id uuid primary key default uuid_generate_v4(),
  client_id uuid references clients(id) on delete cascade,
  name text not null,
  slug text unique not null,
  game_type text not null,
  config_json jsonb not null default '{}'::jsonb,
  active_from timestamptz,
  active_to timestamptz,
  status text not null default 'draft' check (status in ('draft', 'active', 'paused', 'archived')),
  created_at timestamptz default now()
);

create table if not exists game_sessions (
  id uuid primary key default uuid_generate_v4(),
  campaign_id uuid references campaigns(id) on delete cascade,
  started_at timestamptz default now(),
  completed_at timestamptz,
  source text,
  medium text,
  device text,
  ip_hash text
);

create table if not exists leads (
  id uuid primary key default uuid_generate_v4(),
  campaign_id uuid references campaigns(id) on delete cascade,
  session_id uuid references game_sessions(id) on delete set null,
  name text,
  phone text,
  email text,
  consent_marketing boolean default false,
  score int,
  time_taken int,
  created_at timestamptz default now()
);

create table if not exists events (
  id uuid primary key default uuid_generate_v4(),
  campaign_id uuid references campaigns(id) on delete cascade,
  session_id uuid references game_sessions(id) on delete set null,
  type text not null,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz default now()
);

create table if not exists vouchers (
  id uuid primary key default uuid_generate_v4(),
  campaign_id uuid references campaigns(id) on delete cascade,
  lead_id uuid references leads(id) on delete set null,
  code text unique not null,
  prize_name text,
  redeemed boolean default false,
  redeemed_at timestamptz,
  redeemed_branch text,
  created_at timestamptz default now()
);

create table if not exists leaderboard_entries (
  id uuid primary key default uuid_generate_v4(),
  campaign_id uuid references campaigns(id) on delete cascade,
  lead_id uuid references leads(id) on delete cascade,
  score int not null,
  time_taken int,
  created_at timestamptz default now()
);

alter table clients enable row level security;
alter table profiles enable row level security;
alter table campaigns enable row level security;
alter table game_sessions enable row level security;
alter table leads enable row level security;
alter table events enable row level security;
alter table vouchers enable row level security;
alter table leaderboard_entries enable row level security;

-- Helper function: checks if current auth user is admin.
create or replace function public.is_admin()
returns boolean
language sql
security definer
as $$
  select exists (
    select 1 from profiles
    where user_id = auth.uid()
    and role = 'admin'
  );
$$;

-- Helper function: returns current user's client_id.
create or replace function public.current_client_id()
returns uuid
language sql
security definer
as $$
  select client_id from profiles
  where user_id = auth.uid()
  limit 1;
$$;

-- Admins can see all clients.
create policy "admins can manage clients" on clients
for all using (public.is_admin())
with check (public.is_admin());

-- Clients can see their own client record.
create policy "clients can read own client" on clients
for select using (id = public.current_client_id());

-- Profiles.
create policy "admins can manage profiles" on profiles
for all using (public.is_admin())
with check (public.is_admin());

create policy "users can read own profile" on profiles
for select using (user_id = auth.uid());

-- Campaigns.
create policy "admins can manage campaigns" on campaigns
for all using (public.is_admin())
with check (public.is_admin());

create policy "clients can read own campaigns" on campaigns
for select using (client_id = public.current_client_id());

-- Leads, sessions, events, vouchers and leaderboard entries are visible by campaign ownership.
create policy "admins can manage sessions" on game_sessions for all using (public.is_admin()) with check (public.is_admin());
create policy "clients can read own sessions" on game_sessions for select using (
  campaign_id in (select id from campaigns where client_id = public.current_client_id())
);

create policy "admins can manage leads" on leads for all using (public.is_admin()) with check (public.is_admin());
create policy "clients can read own leads" on leads for select using (
  campaign_id in (select id from campaigns where client_id = public.current_client_id())
);

create policy "admins can manage events" on events for all using (public.is_admin()) with check (public.is_admin());
create policy "clients can read own events" on events for select using (
  campaign_id in (select id from campaigns where client_id = public.current_client_id())
);

create policy "admins can manage vouchers" on vouchers for all using (public.is_admin()) with check (public.is_admin());
create policy "clients can read own vouchers" on vouchers for select using (
  campaign_id in (select id from campaigns where client_id = public.current_client_id())
);

create policy "admins can manage leaderboard" on leaderboard_entries for all using (public.is_admin()) with check (public.is_admin());
create policy "clients can read own leaderboard" on leaderboard_entries for select using (
  campaign_id in (select id from campaigns where client_id = public.current_client_id())
);

-- Public insert policies can be replaced by secure Edge Functions / Workers in production.
-- Recommended: submit game events through Cloudflare Worker using Supabase service role key.
