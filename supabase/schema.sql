-- ==========================================================
-- SINOSCHOLAR — Schéma de Base de Données Supabase
-- Exécuter dans Supabase SQL Editor
-- ==========================================================

-- ── 1. Table Bourses (Scholarships) ──────────────────────
create table if not exists public.scholarships (
  id                   text primary key,
  titre                text not null,
  institution          text not null,
  frais_dossier        integer not null default 0,
  frais_accompagnement integer not null default 0,
  etapes               jsonb not null default '[]'::jsonb,
  statut               text not null default 'Actif' check (statut in ('Actif', 'Inactif', 'Brouillon')),
  created_at           timestamptz not null default now()
);

-- ── 2. Table Candidatures (Applications) ─────────────────
create table if not exists public.applications (
  id                       text primary key,
  receipt_number           text unique not null,
  date                     timestamptz not null default now(),
  status                   text not null default 'Nouveau' check (status in ('Nouveau', 'En traitement', 'Validé', 'Rejeté')),
  bourse_id                text references public.scholarships(id) on delete set null,
  etapes_validees          text[] not null default '{}',
  etapes_options           jsonb not null default '{}'::jsonb,
  paiement_dossier         boolean not null default false,
  paiement_accompagnement  boolean not null default false,
  -- Données biographiques
  nom                      text,
  age                      text,
  province                 text,
  ville                    text,
  sexe                     text,
  niveau_etude             text,
  domaine_etude            text,
  email                    text,
  whatsapp                 text,
  objectif                 text,
  projet                   text,
  passeport                text,
  carte_vaccination        text,
  deja_candidate           text,
  created_at               timestamptz not null default now()
);

-- ── 3. Table Documents ────────────────────────────────────
create table if not exists public.documents (
  id               uuid primary key default gen_random_uuid(),
  application_id   text not null references public.applications(id) on delete cascade,
  nom              text not null,
  categorie        text not null default 'Autre',
  file_path        text not null,
  file_name        text,
  file_type        text,
  uploaded_by      text not null default 'admin' check (uploaded_by in ('admin', 'candidat')),
  created_at       timestamptz not null default now()
);

-- ── 4. Table Demandes de Collecte (Collect Requests) ─────
create table if not exists public.collect_requests (
  id                   uuid primary key default gen_random_uuid(),
  application_id       text not null references public.applications(id) on delete cascade,
  token                text unique not null,
  documents_requested  text[] not null default '{}',
  status               text not null default 'actif' check (status in ('actif', 'complété')),
  created_at           timestamptz not null default now()
);

-- ── 5. Row Level Security (RLS) ───────────────────────────
alter table public.scholarships         enable row level security;
alter table public.applications         enable row level security;
alter table public.documents            enable row level security;
alter table public.collect_requests     enable row level security;

-- Admins authentifiés = accès complet
create policy "Admins full access" on public.scholarships
  for all using (auth.role() = 'authenticated');

create policy "Admins full access" on public.applications
  for all using (auth.role() = 'authenticated');

create policy "Admins full access" on public.documents
  for all using (auth.role() = 'authenticated');

create policy "Admins full access" on public.collect_requests
  for all using (auth.role() = 'authenticated');

-- Formulaire public : insertion de candidature sans auth
create policy "Public can insert applications" on public.applications
  for insert with check (true);

-- Portail public : lecture du token de collecte sans auth
create policy "Public can read collect requests" on public.collect_requests
  for select using (true);

-- Portail public : ajout de documents via token (par les candidats)
create policy "Public can insert documents via collect" on public.documents
  for insert with check (true);

-- Portail public : marquer demande comme complétée
create policy "Public can update collect status" on public.collect_requests
  for update using (true);

-- ── 6. Storage Buckets ────────────────────────────────────
-- Créer manuellement dans Supabase Dashboard → Storage :
-- Bucket 1: "documents"           → Privé (authenticated only)
-- Bucket 2: "collect-uploads"     → Public (pour les candidats)
-- Policy collect-uploads: allow anon INSERT pour les candidats

-- ── 7. Données Initiales (Bourses) ───────────────────────
insert into public.scholarships (id, titre, institution, frais_dossier, frais_accompagnement, etapes, statut)
values
  (
    'B-2026-CH-01',
    'Bourse d''Excellence Gouvernementale',
    'CSC (China Scholarship Council)',
    50, 1500,
    '[
      {"id":"e1","nom":"Paiement Frais d''Ouverture de Dossier","categorie":"Pré-requis","cout":50,"accompagnementDisponible":false},
      {"id":"e2","nom":"Pré-sélection du candidat","categorie":"Académique","cout":0,"accompagnementDisponible":false},
      {"id":"e3","nom":"Traduction Notariée des Documents","categorie":"Pré-requis","cout":150,"accompagnementDisponible":true},
      {"id":"e4","nom":"Admission Universitaire Obtenue","categorie":"Académique","cout":0,"accompagnementDisponible":true},
      {"id":"e5","nom":"Examen Médical","categorie":"Visa & Logistique","cout":80,"accompagnementDisponible":true},
      {"id":"e6","nom":"Dépôt Visa Étudiant (X1/X2)","categorie":"Visa & Logistique","cout":200,"accompagnementDisponible":true},
      {"id":"e7","nom":"Achat Billet d''Avion","categorie":"Visa & Logistique","cout":900,"accompagnementDisponible":true}
    ]'::jsonb,
    'Actif'
  ),
  (
    'B-2026-CH-02',
    'Bourse Partielle (Provinciale) Jasmine',
    'Gouvernement du Jiangsu',
    50, 800,
    '[
      {"id":"e1","nom":"Paiement Frais d''Ouverture","categorie":"Pré-requis","cout":50,"accompagnementDisponible":false},
      {"id":"e4","nom":"Admission Universitaire","categorie":"Académique","cout":0,"accompagnementDisponible":true},
      {"id":"e5","nom":"Examen Médical","categorie":"Visa & Logistique","cout":80,"accompagnementDisponible":true},
      {"id":"e6","nom":"Dépôt Visa","categorie":"Visa & Logistique","cout":200,"accompagnementDisponible":true}
    ]'::jsonb,
    'Actif'
  )
on conflict (id) do nothing;
