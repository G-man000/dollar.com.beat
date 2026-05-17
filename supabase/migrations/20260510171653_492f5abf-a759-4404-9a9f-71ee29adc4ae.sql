
-- Roles enum + table (separate to prevent privilege escalation)
create type public.app_role as enum ('admin', 'producer', 'buyer');

create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  role app_role not null,
  created_at timestamptz not null default now(),
  unique (user_id, role)
);
alter table public.user_roles enable row level security;

create or replace function public.has_role(_user_id uuid, _role app_role)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.user_roles where user_id = _user_id and role = _role)
$$;

create policy "Users view their own roles" on public.user_roles
  for select to authenticated using (auth.uid() = user_id);
create policy "Admins manage roles" on public.user_roles
  for all to authenticated using (public.has_role(auth.uid(), 'admin'))
  with check (public.has_role(auth.uid(), 'admin'));

-- Profiles
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  producer_alias text unique,
  avatar_url text,
  bio text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.profiles enable row level security;

create policy "Profiles are viewable by everyone" on public.profiles
  for select using (true);
create policy "Users update own profile" on public.profiles
  for update to authenticated using (auth.uid() = id);
create policy "Users insert own profile" on public.profiles
  for insert to authenticated with check (auth.uid() = id);

-- Auto-create profile + buyer role on signup
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, display_name)
  values (new.id, coalesce(new.raw_user_meta_data->>'display_name', split_part(new.email, '@', 1)));
  insert into public.user_roles (user_id, role) values (new.id, 'buyer');
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Beats
create table public.beats (
  id uuid primary key default gen_random_uuid(),
  producer_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  description text,
  genre text not null,
  bpm int not null check (bpm > 0 and bpm < 400),
  musical_key text,
  tags text[] not null default '{}',
  cover_url text,
  preview_url text,
  master_path text, -- private bucket path
  master_format text, -- 'mp3' | 'wav'
  duration_seconds int,
  is_published boolean not null default true,
  is_exclusive_sold boolean not null default false,
  plays int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index beats_genre_idx on public.beats (genre);
create index beats_bpm_idx on public.beats (bpm);
create index beats_created_idx on public.beats (created_at desc);
alter table public.beats enable row level security;

create policy "Published beats viewable by all" on public.beats
  for select using (is_published = true or auth.uid() = producer_id);
create policy "Producers insert own beats" on public.beats
  for insert to authenticated with check (auth.uid() = producer_id);
create policy "Producers update own beats" on public.beats
  for update to authenticated using (auth.uid() = producer_id);
create policy "Producers delete own beats" on public.beats
  for delete to authenticated using (auth.uid() = producer_id);

-- License types per beat
create type public.license_type as enum ('lease', 'premium_lease', 'exclusive');

create table public.beat_licenses (
  id uuid primary key default gen_random_uuid(),
  beat_id uuid not null references public.beats(id) on delete cascade,
  license_type license_type not null,
  price_cents int not null check (price_cents >= 0),
  currency text not null default 'usd',
  unique (beat_id, license_type)
);
alter table public.beat_licenses enable row level security;
create policy "Licenses viewable by all" on public.beat_licenses for select using (true);
create policy "Producers manage their licenses" on public.beat_licenses
  for all to authenticated
  using (exists (select 1 from public.beats b where b.id = beat_id and b.producer_id = auth.uid()))
  with check (exists (select 1 from public.beats b where b.id = beat_id and b.producer_id = auth.uid()));

-- Cart
create table public.cart_items (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  beat_id uuid not null references public.beats(id) on delete cascade,
  license_type license_type not null,
  added_at timestamptz not null default now(),
  unique (user_id, beat_id, license_type)
);
alter table public.cart_items enable row level security;
create policy "Users manage own cart" on public.cart_items
  for all to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- Purchases
create table public.purchases (
  id uuid primary key default gen_random_uuid(),
  buyer_id uuid not null references auth.users(id) on delete cascade,
  beat_id uuid not null references public.beats(id) on delete cascade,
  producer_id uuid not null references auth.users(id) on delete cascade,
  license_type license_type not null,
  amount_cents int not null,
  currency text not null default 'usd',
  status text not null default 'pending', -- pending|paid|refunded|failed
  stripe_session_id text,
  download_token uuid not null default gen_random_uuid(),
  created_at timestamptz not null default now(),
  paid_at timestamptz
);
create index purchases_buyer_idx on public.purchases (buyer_id, created_at desc);
create index purchases_producer_idx on public.purchases (producer_id, created_at desc);
alter table public.purchases enable row level security;
create policy "Buyers view own purchases" on public.purchases
  for select to authenticated using (auth.uid() = buyer_id);
create policy "Producers view sales of their beats" on public.purchases
  for select to authenticated using (auth.uid() = producer_id);

-- Cookie consents (anonymous allowed)
create table public.cookie_consents (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  necessary boolean not null default true,
  analytics boolean not null default false,
  marketing boolean not null default false,
  ip_hash text,
  created_at timestamptz not null default now()
);
alter table public.cookie_consents enable row level security;
create policy "Anyone can record consent" on public.cookie_consents
  for insert with check (true);
create policy "Users view own consent" on public.cookie_consents
  for select to authenticated using (auth.uid() = user_id);

-- Storage buckets
insert into storage.buckets (id, name, public) values
  ('covers', 'covers', true),
  ('previews', 'previews', true),
  ('masters', 'masters', false),
  ('licenses', 'licenses', false);

-- Storage policies
-- Covers: public read, producers upload to their folder
create policy "Public read covers" on storage.objects for select using (bucket_id = 'covers');
create policy "Auth upload covers" on storage.objects for insert to authenticated
  with check (bucket_id = 'covers' and (storage.foldername(name))[1] = auth.uid()::text);
create policy "Auth update own covers" on storage.objects for update to authenticated
  using (bucket_id = 'covers' and (storage.foldername(name))[1] = auth.uid()::text);
create policy "Auth delete own covers" on storage.objects for delete to authenticated
  using (bucket_id = 'covers' and (storage.foldername(name))[1] = auth.uid()::text);

create policy "Public read previews" on storage.objects for select using (bucket_id = 'previews');
create policy "Auth upload previews" on storage.objects for insert to authenticated
  with check (bucket_id = 'previews' and (storage.foldername(name))[1] = auth.uid()::text);
create policy "Auth delete own previews" on storage.objects for delete to authenticated
  using (bucket_id = 'previews' and (storage.foldername(name))[1] = auth.uid()::text);

-- Masters: producers upload to their folder, only buyer can read via signed URL from server
create policy "Producers upload masters" on storage.objects for insert to authenticated
  with check (bucket_id = 'masters' and (storage.foldername(name))[1] = auth.uid()::text);
create policy "Producers read own masters" on storage.objects for select to authenticated
  using (bucket_id = 'masters' and (storage.foldername(name))[1] = auth.uid()::text);
create policy "Producers delete own masters" on storage.objects for delete to authenticated
  using (bucket_id = 'masters' and (storage.foldername(name))[1] = auth.uid()::text);

-- updated_at triggers
create or replace function public.set_updated_at() returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end; $$;
create trigger profiles_updated before update on public.profiles
  for each row execute function public.set_updated_at();
create trigger beats_updated before update on public.beats
  for each row execute function public.set_updated_at();
