import pg from 'pg';
const { Client } = pg;

const client = new Client({
  host: 'db.uefducfagnlpdosrijkb.supabase.co',
  port: 5432,
  database: 'postgres',
  user: 'postgres',
  password: 'OpwqHEQ4GdWBTe0H',
  ssl: { rejectUnauthorized: false },
  connectionTimeoutMillis: 15000,
});

const fixes = [
  [`Add bucket_name column to documents`, `
    alter table public.documents 
    add column if not exists bucket_name text not null default 'documents'
  `],
  [`Public SELECT policy on applications (for collect portal)`, `
    do $$ begin
      if not exists (
        select 1 from pg_policies 
        where tablename='applications' and policyname='Public read application for collect'
      ) then
        execute $policy$
          create policy "Public read application for collect" on public.applications
          for select using (
            exists (
              select 1 from public.collect_requests
              where application_id = applications.id
            )
          )
        $policy$;
      end if;
    end $$
  `],
  [`Storage policy: allow anon INSERT to collect-uploads bucket`, `
    do $$ begin
      if not exists (
        select 1 from pg_policies 
        where schemaname='storage' and tablename='objects' and policyname='Allow anon uploads to collect-uploads'
      ) then
        execute $policy$
          create policy "Allow anon uploads to collect-uploads"
          on storage.objects for insert
          with check (bucket_id = 'collect-uploads')
        $policy$;
      end if;
    end $$
  `],
  [`Storage policy: allow anon SELECT on collect-uploads bucket`, `
    do $$ begin
      if not exists (
        select 1 from pg_policies 
        where schemaname='storage' and tablename='objects' and policyname='Allow anon reads from collect-uploads'
      ) then
        execute $policy$
          create policy "Allow anon reads from collect-uploads"
          on storage.objects for select
          using (bucket_id = 'collect-uploads')
        $policy$;
      end if;
    end $$
  `],
  [`Allow anon SELECT on documents for authenticated reference`, `
    do $$ begin
      if not exists (
        select 1 from pg_policies 
        where tablename='documents' and policyname='Public read documents'
      ) then
        execute $policy$
          create policy "Public read documents" on public.documents
          for select using (true)
        $policy$;
      end if;
    end $$
  `],
];

try {
  await client.connect();
  console.log('✅ Connecté');
  
  let ok = 0, fail = 0;
  for (const [name, sql] of fixes) {
    try {
      await client.query(sql);
      console.log(`✅ ${name}`);
      ok++;
    } catch(e) {
      console.error(`❌ ${name}: ${e.message}`);
      fail++;
    }
  }
  
  console.log(`\n=== ${ok}/${fixes.length} succès ===`);
  await client.end();
} catch(e) {
  console.error('❌ Connexion échouée:', e.message);
  process.exit(1);
}
