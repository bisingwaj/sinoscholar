import pg from 'pg';
const { Client } = pg;

const client = new Client({
  connectionString: 'postgresql://postgres:OpwqHEQ4GdWBTe0H@db.uefducfagnlpdosrijkb.supabase.co:5432/postgres',
  ssl: { rejectUnauthorized: false },
  connectionTimeoutMillis: 30000,
  query_timeout: 60000,
});

await client.connect();
console.log('✅ Connecté à Supabase PostgreSQL');

const steps = [
  ['Table scholarships', `
    create table if not exists public.scholarships (
      id text primary key,
      titre text not null,
      institution text not null,
      frais_dossier integer not null default 0,
      frais_accompagnement integer not null default 0,
      etapes jsonb not null default '[]'::jsonb,
      statut text not null default 'Actif',
      created_at timestamptz not null default now()
    )
  `],
  ['Table applications', `
    create table if not exists public.applications (
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
    )
  `],
  ['Table documents', `
    create table if not exists public.documents (
      id uuid primary key default gen_random_uuid(),
      application_id text not null references public.applications(id) on delete cascade,
      nom text not null,
      categorie text not null default 'Autre',
      file_path text not null,
      file_name text,
      file_type text,
      uploaded_by text not null default 'admin',
      created_at timestamptz not null default now()
    )
  `],
  ['Table collect_requests', `
    create table if not exists public.collect_requests (
      id uuid primary key default gen_random_uuid(),
      application_id text not null references public.applications(id) on delete cascade,
      token text unique not null,
      documents_requested text[] not null default '{}',
      status text not null default 'actif',
      created_at timestamptz not null default now()
    )
  `],
  ['Enable RLS', `
    alter table public.scholarships enable row level security;
    alter table public.applications enable row level security;
    alter table public.documents enable row level security;
    alter table public.collect_requests enable row level security;
  `],
  ['Policy: Admins full access', `
    do $$ begin
      if not exists (select 1 from pg_policies where tablename='scholarships' and policyname='Admins full access scholarships') then
        execute 'create policy "Admins full access scholarships" on public.scholarships for all using (auth.role() = ''authenticated'')';
      end if;
      if not exists (select 1 from pg_policies where tablename='applications' and policyname='Admins full access applications') then
        execute 'create policy "Admins full access applications" on public.applications for all using (auth.role() = ''authenticated'')';
      end if;
      if not exists (select 1 from pg_policies where tablename='documents' and policyname='Admins full access documents') then
        execute 'create policy "Admins full access documents" on public.documents for all using (auth.role() = ''authenticated'')';
      end if;
      if not exists (select 1 from pg_policies where tablename='collect_requests' and policyname='Admins full access collect_requests') then
        execute 'create policy "Admins full access collect_requests" on public.collect_requests for all using (auth.role() = ''authenticated'')';
      end if;
    end $$
  `],
  ['Policy: Public insert applications', `
    do $$ begin
      if not exists (select 1 from pg_policies where tablename='applications' and policyname='Public insert applications') then
        execute 'create policy "Public insert applications" on public.applications for insert with check (true)';
      end if;
    end $$
  `],
  ['Policy: Public read collect_requests', `
    do $$ begin
      if not exists (select 1 from pg_policies where tablename='collect_requests' and policyname='Public read collect_requests') then
        execute 'create policy "Public read collect_requests" on public.collect_requests for select using (true)';
      end if;
    end $$
  `],
  ['Policy: Public insert documents', `
    do $$ begin
      if not exists (select 1 from pg_policies where tablename='documents' and policyname='Public insert documents') then
        execute 'create policy "Public insert documents" on public.documents for insert with check (true)';
      end if;
    end $$
  `],
  ['Policy: Public update collect status', `
    do $$ begin
      if not exists (select 1 from pg_policies where tablename='collect_requests' and policyname='Public update collect status') then
        execute 'create policy "Public update collect status" on public.collect_requests for update using (true)';
      end if;
    end $$
  `],
  ['Policy: Public update application status', `
    do $$ begin
      if not exists (select 1 from pg_policies where tablename='applications' and policyname='Public update application status') then
        execute 'create policy "Public update application status" on public.applications for update using (true)';
      end if;
    end $$
  `],
  ['Seed: Bourse CSC', `
    insert into public.scholarships (id, titre, institution, frais_dossier, frais_accompagnement, etapes, statut)
    values (
      'B-2026-CH-01',
      'Bourse d''Excellence Gouvernementale',
      'CSC (China Scholarship Council)',
      50, 1500,
      '[{"id":"e1","nom":"Paiement Frais Ouverture Dossier","categorie":"Pré-requis","cout":50,"accompagnementDisponible":false},{"id":"e2","nom":"Pré-sélection du candidat","categorie":"Académique","cout":0,"accompagnementDisponible":false},{"id":"e3","nom":"Traduction Notariée des Documents","categorie":"Pré-requis","cout":150,"accompagnementDisponible":true},{"id":"e4","nom":"Admission Universitaire Obtenue","categorie":"Académique","cout":0,"accompagnementDisponible":true},{"id":"e5","nom":"Examen Médical","categorie":"Visa & Logistique","cout":80,"accompagnementDisponible":true},{"id":"e6","nom":"Dépôt Visa Étudiant (X1/X2)","categorie":"Visa & Logistique","cout":200,"accompagnementDisponible":true},{"id":"e7","nom":"Achat Billet Avion","categorie":"Visa & Logistique","cout":900,"accompagnementDisponible":true}]'::jsonb,
      'Actif'
    ) on conflict (id) do nothing
  `],
  ['Seed: Bourse Jasmine', `
    insert into public.scholarships (id, titre, institution, frais_dossier, frais_accompagnement, etapes, statut)
    values (
      'B-2026-CH-02',
      'Bourse Partielle (Provinciale) Jasmine',
      'Gouvernement du Jiangsu',
      50, 800,
      '[{"id":"e1","nom":"Paiement Frais Ouverture","categorie":"Pré-requis","cout":50,"accompagnementDisponible":false},{"id":"e4","nom":"Admission Universitaire","categorie":"Académique","cout":0,"accompagnementDisponible":true},{"id":"e5","nom":"Examen Médical","categorie":"Visa & Logistique","cout":80,"accompagnementDisponible":true},{"id":"e6","nom":"Dépôt Visa","categorie":"Visa & Logistique","cout":200,"accompagnementDisponible":true}]'::jsonb,
      'Actif'
    ) on conflict (id) do nothing
  `],
];

let success = 0;
let failed = 0;

for (const [name, sql] of steps) {
  try {
    await client.query(sql);
    console.log(`✅ ${name}`);
    success++;
  } catch (e) {
    console.error(`❌ ${name}: ${e.message}`);
    failed++;
  }
}

await client.end();
console.log(`\n=== RÉSUMÉ ===`);
console.log(`✅ Succès: ${success}/${steps.length}`);
console.log(`❌ Erreurs: ${failed}/${steps.length}`);
