// Script to initialize Supabase schema via SQL
// Run with: node supabase/init_schema.mjs

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://uefducfagnlpdosrijkb.supabase.co';
const serviceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVlZmR1Y2ZhZ25scGRvc3JpamtiIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3Mzk0OTA1OCwiZXhwIjoyMDg5NTI1MDU4fQ.yVTlw2naYrhWd8n_DVe5LbsF1m5WHu4tORGBDoS_Jqw';

const supabase = createClient(supabaseUrl, serviceKey);

const statements = [
  // 1. scholarships table
  `create table if not exists public.scholarships (
    id text primary key,
    titre text not null,
    institution text not null,
    frais_dossier integer not null default 0,
    frais_accompagnement integer not null default 0,
    etapes jsonb not null default '[]'::jsonb,
    statut text not null default 'Actif',
    created_at timestamptz not null default now()
  )`,

  // 2. applications table
  `create table if not exists public.applications (
    id text primary key,
    receipt_number text unique not null,
    date timestamptz not null default now(),
    status text not null default 'Nouveau',
    bourse_id text references public.scholarships(id) on delete set null,
    etapes_validees text[] not null default '{}',
    etapes_options jsonb not null default '{}'::jsonb,
    paiement_dossier boolean not null default false,
    paiement_accompagnement boolean not null default false,
    nom text, age text, province text, ville text, sexe text,
    niveau_etude text, domaine_etude text, email text, whatsapp text,
    objectif text, projet text, passeport text, carte_vaccination text, deja_candidate text,
    created_at timestamptz not null default now()
  )`,

  // 3. documents table
  `create table if not exists public.documents (
    id uuid primary key default gen_random_uuid(),
    application_id text not null references public.applications(id) on delete cascade,
    nom text not null,
    categorie text not null default 'Autre',
    file_path text not null,
    file_name text,
    file_type text,
    uploaded_by text not null default 'admin',
    created_at timestamptz not null default now()
  )`,

  // 4. collect_requests table
  `create table if not exists public.collect_requests (
    id uuid primary key default gen_random_uuid(),
    application_id text not null references public.applications(id) on delete cascade,
    token text unique not null,
    documents_requested text[] not null default '{}',
    status text not null default 'actif',
    created_at timestamptz not null default now()
  )`,

  // 5. Enable RLS
  `alter table public.scholarships enable row level security`,
  `alter table public.applications enable row level security`,
  `alter table public.documents enable row level security`,
  `alter table public.collect_requests enable row level security`,

  // 6. RLS Policies - Admins full access (drop first if exists to avoid duplicate errors)
  `do $$ begin
    if not exists (select 1 from pg_policies where tablename='scholarships' and policyname='Admins full access scholarships') then
      execute 'create policy "Admins full access scholarships" on public.scholarships for all using (auth.role() = ''authenticated'')';
    end if;
  end $$`,
  `do $$ begin
    if not exists (select 1 from pg_policies where tablename='applications' and policyname='Admins full access applications') then
      execute 'create policy "Admins full access applications" on public.applications for all using (auth.role() = ''authenticated'')';
    end if;
  end $$`,
  `do $$ begin
    if not exists (select 1 from pg_policies where tablename='documents' and policyname='Admins full access documents') then
      execute 'create policy "Admins full access documents" on public.documents for all using (auth.role() = ''authenticated'')';
    end if;
  end $$`,
  `do $$ begin
    if not exists (select 1 from pg_policies where tablename='collect_requests' and policyname='Admins full access collect_requests') then
      execute 'create policy "Admins full access collect_requests" on public.collect_requests for all using (auth.role() = ''authenticated'')';
    end if;
  end $$`,

  // 7. Public insert policy for applications (the public form)
  `do $$ begin
    if not exists (select 1 from pg_policies where tablename='applications' and policyname='Public insert applications') then
      execute 'create policy "Public insert applications" on public.applications for insert with check (true)';
    end if;
  end $$`,

  // 8. Public read collect_requests (token validation)
  `do $$ begin
    if not exists (select 1 from pg_policies where tablename='collect_requests' and policyname='Public read collect_requests') then
      execute 'create policy "Public read collect_requests" on public.collect_requests for select using (true)';
    end if;
  end $$`,

  // 9. Public insert documents (candidates uploading via collect portal)
  `do $$ begin
    if not exists (select 1 from pg_policies where tablename='documents' and policyname='Public insert documents') then
      execute 'create policy "Public insert documents" on public.documents for insert with check (true)';
    end if;
  end $$`,

  // 10. Public update collect_requests status
  `do $$ begin
    if not exists (select 1 from pg_policies where tablename='collect_requests' and policyname='Public update collect status') then
      execute 'create policy "Public update collect status" on public.collect_requests for update using (true)';
    end if;
  end $$`,

  // 11. Public update applications status (for collect portal to set "En traitement")
  `do $$ begin
    if not exists (select 1 from pg_policies where tablename='applications' and policyname='Public update application status') then
      execute 'create policy "Public update application status" on public.applications for update using (true)';
    end if;
  end $$`,

  // 12. Seed scholarship data
  `insert into public.scholarships (id, titre, institution, frais_dossier, frais_accompagnement, etapes, statut)
  values (
    'B-2026-CH-01',
    'Bourse d''Excellence Gouvernementale',
    'CSC (China Scholarship Council)',
    50, 1500,
    '[{"id":"e1","nom":"Paiement Frais d Ouverture de Dossier","categorie":"Pré-requis","cout":50,"accompagnementDisponible":false},{"id":"e2","nom":"Pré-sélection du candidat","categorie":"Académique","cout":0,"accompagnementDisponible":false},{"id":"e3","nom":"Traduction Notariée des Documents","categorie":"Pré-requis","cout":150,"accompagnementDisponible":true},{"id":"e4","nom":"Admission Universitaire Obtenue","categorie":"Académique","cout":0,"accompagnementDisponible":true},{"id":"e5","nom":"Examen Médical","categorie":"Visa & Logistique","cout":80,"accompagnementDisponible":true},{"id":"e6","nom":"Dépôt Visa Étudiant (X1/X2)","categorie":"Visa & Logistique","cout":200,"accompagnementDisponible":true},{"id":"e7","nom":"Achat Billet d Avion","categorie":"Visa & Logistique","cout":900,"accompagnementDisponible":true}]'::jsonb,
    'Actif'
  ) on conflict (id) do nothing`,

  `insert into public.scholarships (id, titre, institution, frais_dossier, frais_accompagnement, etapes, statut)
  values (
    'B-2026-CH-02',
    'Bourse Partielle (Provinciale) Jasmine',
    'Gouvernement du Jiangsu',
    50, 800,
    '[{"id":"e1","nom":"Paiement Frais d Ouverture","categorie":"Pré-requis","cout":50,"accompagnementDisponible":false},{"id":"e4","nom":"Admission Universitaire","categorie":"Académique","cout":0,"accompagnementDisponible":true},{"id":"e5","nom":"Examen Médical","categorie":"Visa & Logistique","cout":80,"accompagnementDisponible":true},{"id":"e6","nom":"Dépôt Visa","categorie":"Visa & Logistique","cout":200,"accompagnementDisponible":true}]'::jsonb,
    'Actif'
  ) on conflict (id) do nothing`,
];

console.log(`Exécution de ${statements.length} requêtes SQL...`);

for (let i = 0; i < statements.length; i++) {
  const { error } = await supabase.rpc('exec_sql', { sql: statements[i] }).catch(() => ({ error: 'rpc_not_available' }));
  
  // Fallback: use the pg REST endpoint directly
  const response = await fetch(`${supabaseUrl}/rest/v1/rpc/exec_sql`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${serviceKey}`,
      'apikey': serviceKey,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ sql: statements[i] }),
  }).catch(() => null);

  const ok = response?.ok;
  console.log(`[${i+1}/${statements.length}] ${ok ? '✅' : '❌'} ${statements[i].slice(0, 60).replace(/\n/g, ' ')}...`);
}

console.log('Terminé.');
