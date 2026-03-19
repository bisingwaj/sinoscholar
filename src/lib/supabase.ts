import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

if (!supabaseUrl || supabaseUrl === 'VOTRE_URL_SUPABASE') {
  console.warn('⚠️ Supabase URL non configurée. Ajoutez VITE_SUPABASE_URL dans .env.local');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ── Database Row Types (reflect the SQL schema) ──────────────────────────────

export type ScholarshipRow = {
  id: string;
  titre: string;
  institution: string;
  frais_dossier: number;
  frais_accompagnement: number;
  etapes: unknown; // JSON
  statut: 'Actif' | 'Inactif' | 'Brouillon';
  created_at: string;
};

export type ApplicationRow = {
  id: string;
  receipt_number: string;
  date: string;
  status: 'Nouveau' | 'En traitement' | 'Validé' | 'Rejeté';
  bourse_id: string | null;
  etapes_validees: string[];
  etapes_options: Record<string, 'gratuit' | 'accompagne'>;
  paiement_dossier: boolean;
  paiement_accompagnement: boolean;
  nom: string;
  age: string;
  province: string;
  ville: string;
  sexe: string;
  niveau_etude: string;
  domaine_etude: string;
  email: string;
  whatsapp: string;
  objectif: string;
  projet: string;
  passeport: string;
  carte_vaccination: string;
  deja_candidate: string;
  created_at: string;
};

export type DocumentRow = {
  id: string;
  application_id: string;
  nom: string;
  categorie: string;
  file_path: string;
  file_name: string | null;
  file_type: string | null;
  uploaded_by: 'admin' | 'candidat';
  created_at: string;
};

export type CollectRequestRow = {
  id: string;
  application_id: string;
  token: string;
  documents_requested: string[];
  status: 'actif' | 'complété';
  created_at: string;
};
