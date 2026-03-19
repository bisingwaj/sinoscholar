import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';

// ─── TYPES ───────────────────────────────────────────────────────────────────

export type ScholarshipStepCategory = 'Pré-requis' | 'Académique' | 'Visa & Logistique' | 'Autre';

export type ScholarshipStep = {
  id: string;
  nom: string;
  categorie: ScholarshipStepCategory;
  cout?: number;
  accompagnementDisponible?: boolean;
};

export type Scholarship = {
  id: string;
  titre: string;
  institution: string;
  fraisDossier: number;
  fraisAccompagnement: number;
  etapes: ScholarshipStep[];
  statut: 'Actif' | 'Inactif' | 'Brouillon';
  createdAt: string;
};

export type ApplicationDocument = {
  id: string;
  nom: string;
  categorie: 'Identités & Administratif' | 'Académie & Scolarité' | 'Démarche Visa' | 'Autre';
  filePath: string;    // Supabase Storage path
  bucketName: string;  // 'documents' | 'collect-uploads'
  fileUrl?: string;
  fileName: string;
  fileType: string;
  uploadedBy: 'admin' | 'candidat';
  uploadedAt: string;
};

export type CollectRequest = {
  id: string;
  token: string;
  documentsRequested: string[];
  status: 'actif' | 'complété';
  createdAt: string;
};

export type Application = {
  id: string;
  receiptNumber: string;
  date: string;
  status: 'Nouveau' | 'En traitement' | 'Validé' | 'Rejeté';
  bourseId: string | null;
  etapesValidees: string[];
  etapesOptions: Record<string, 'gratuit' | 'accompagne'>;
  documents: ApplicationDocument[];
  collectRequests: CollectRequest[];
  paiementDossier: boolean;
  paiementAccompagnement: boolean;
  nom: string;
  age: string;
  province: string;
  ville: string;
  sexe: string;
  niveauEtude: string;
  domaineEtude: string;
  email: string;
  whatsapp: string;
  objectif: string;
  projet: string;
  passeport: string;
  carteVaccination: string;
  dejaCandidate: string;
  // Legacy fields (kept for compat)
  documentsFournis?: string[];
};

// ─── CONTEXT TYPE ─────────────────────────────────────────────────────────────

interface AdminContextType {
  isAuth: boolean;
  authLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  scholarships: Scholarship[];
  applications: Application[];
  isLoading: boolean;
  refreshApplications: () => Promise<void>;
  addScholarship: (s: Omit<Scholarship, 'id' | 'createdAt'>) => Promise<void>;
  updateScholarship: (id: string, s: Partial<Scholarship>) => Promise<void>;
  deleteScholarship: (id: string) => Promise<void>;
  addApplication: (a: Omit<Application, 'id' | 'status' | 'bourseId' | 'etapesValidees' | 'etapesOptions' | 'paiementDossier' | 'paiementAccompagnement' | 'documents' | 'collectRequests' | 'documentsFournis'>) => Promise<string>;
  updateApplication: (id: string, a: Partial<Application>) => Promise<void>;
  addDocumentToApplication: (appId: string, file: File, meta: { nom: string; categorie: ApplicationDocument['categorie']; bucket: 'documents' | 'collect-uploads' }) => Promise<void>;
  removeDocumentFromApplication: (appId: string, docId: string, filePath: string, bucketName?: string) => Promise<void>;
  createCollectRequest: (appId: string, documentsRequested: string[]) => Promise<string>;
  findApplicationByToken: (token: string) => Promise<Application | null>;
  submitCollectedDocuments: (token: string, files: { file: File; nom: string }[]) => Promise<void>;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const useAdmin = () => {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error('useAdmin must be used within an AdminProvider');
  return ctx;
};

// ─── MAPPERS (DB rows → App types) ───────────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mapScholarship = (row: any): Scholarship => ({
  id: row.id,
  titre: row.titre,
  institution: row.institution,
  fraisDossier: row.frais_dossier,
  fraisAccompagnement: row.frais_accompagnement,
  etapes: (row.etapes ?? []) as ScholarshipStep[],
  statut: row.statut,
  createdAt: row.created_at,
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mapApplication = (row: any, docs: ApplicationDocument[] = [], collects: CollectRequest[] = []): Application => ({
  id: row.id,
  receiptNumber: row.receipt_number,
  date: row.date,
  status: row.status,
  bourseId: row.bourse_id,
  etapesValidees: row.etapes_validees ?? [],
  etapesOptions: row.etapes_options ?? {},
  paiementDossier: row.paiement_dossier,
  paiementAccompagnement: row.paiement_accompagnement,
  documents: docs,
  collectRequests: collects,
  documentsFournis: [],
  nom: row.nom ?? '',
  age: row.age ?? '',
  province: row.province ?? '',
  ville: row.ville ?? '',
  sexe: row.sexe ?? '',
  niveauEtude: row.niveau_etude ?? '',
  domaineEtude: row.domaine_etude ?? '',
  email: row.email ?? '',
  whatsapp: row.whatsapp ?? '',
  objectif: row.objectif ?? '',
  projet: row.projet ?? '',
  passeport: row.passeport ?? '',
  carteVaccination: row.carte_vaccination ?? '',
  dejaCandidate: row.deja_candidate ?? '',
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mapDocument = (row: any): ApplicationDocument => ({
  id: row.id,
  nom: row.nom,
  categorie: row.categorie as ApplicationDocument['categorie'],
  filePath: row.file_path,
  bucketName: row.bucket_name ?? 'documents',
  fileName: row.file_name ?? '',
  fileType: row.file_type ?? '',
  uploadedBy: row.uploaded_by,
  uploadedAt: row.created_at,
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mapCollect = (row: any): CollectRequest => ({
  id: row.id,
  token: row.token,
  documentsRequested: row.documents_requested ?? [],
  status: row.status,
  createdAt: row.created_at,
});

// ─── PROVIDER ─────────────────────────────────────────────────────────────────

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [scholarships, setScholarships] = useState<Scholarship[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);

  // ── Auth init ──
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsAuth(!!session);
      setAuthLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuth(!!session);
    });
    return () => subscription.unsubscribe();
  }, []);

  // ── Load data on auth ──
  useEffect(() => {
    if (isAuth) {
      loadScholarships();
      loadApplications(true);
    }
  }, [isAuth]);

  // ── Real-time subscription on applications + documents + collect_requests ──
  useEffect(() => {
    if (!isAuth) return;
    const channel = supabase
      .channel('sinoscholar-realtime')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'applications' }, () => {
        loadApplications();
      })
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'documents' }, () => {
        loadApplications(); // Reload when new doc is added (e.g. from collect portal)
      })
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'collect_requests' }, () => {
        loadApplications(); // Reload when collect request status changes
      })
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [isAuth]);

  const loadScholarships = async () => {
    const { data, error } = await supabase.from('scholarships').select('*').order('created_at', { ascending: false });
    if (!error && data) setScholarships(data.map(mapScholarship));
  };

  const loadApplications = useCallback(async (showSkeleton = false) => {
    if (showSkeleton) setIsLoading(true);
    try {
      const { data: apps, error } = await supabase
        .from('applications')
        .select('*')
        .order('created_at', { ascending: false });
      if (error || !apps) return;

      const appIds = apps.map(a => a.id);

      const [{ data: docs }, { data: collects }] = await Promise.all([
        supabase.from('documents').select('*').in('application_id', appIds),
        supabase.from('collect_requests').select('*').in('application_id', appIds),
      ]);

      const docsMap = (docs ?? []).reduce<Record<string, ApplicationDocument[]>>((acc, d) => {
        acc[d.application_id] = [...(acc[d.application_id] ?? []), mapDocument(d)];
        return acc;
      }, {});

      const collectsMap = (collects ?? []).reduce<Record<string, CollectRequest[]>>((acc, c) => {
        acc[c.application_id] = [...(acc[c.application_id] ?? []), mapCollect(c)];
        return acc;
      }, {});

      setApplications(apps.map(a => mapApplication(a, docsMap[a.id] ?? [], collectsMap[a.id] ?? [])));
    } finally {
      if (showSkeleton) setIsLoading(false);
    }
  }, []);

  // ─── SCHOLARSHIPS ──────────────────────────────────────────────────────────

  const addScholarship = async (s: Omit<Scholarship, 'id' | 'createdAt'>) => {
    const id = `B-${Math.floor(Math.random() * 9000 + 1000)}`;
    const { error } = await supabase.from('scholarships').insert({
      id,
      titre: s.titre,
      institution: s.institution,
      frais_dossier: s.fraisDossier,
      frais_accompagnement: s.fraisAccompagnement,
      etapes: s.etapes,
      statut: s.statut,
    });
    if (!error) await loadScholarships();
  };

  const updateScholarship = async (id: string, updates: Partial<Scholarship>) => {
    const patch: Record<string, unknown> = {};
    if (updates.titre !== undefined) patch.titre = updates.titre;
    if (updates.institution !== undefined) patch.institution = updates.institution;
    if (updates.fraisDossier !== undefined) patch.frais_dossier = updates.fraisDossier;
    if (updates.fraisAccompagnement !== undefined) patch.frais_accompagnement = updates.fraisAccompagnement;
    if (updates.etapes !== undefined) patch.etapes = updates.etapes;
    if (updates.statut !== undefined) patch.statut = updates.statut;
    const { error } = await supabase.from('scholarships').update(patch).eq('id', id);
    if (!error) await loadScholarships();
  };

  const deleteScholarship = async (id: string) => {
    const { error } = await supabase.from('scholarships').delete().eq('id', id);
    if (!error) await loadScholarships();
  };

  // ─── APPLICATIONS ──────────────────────────────────────────────────────────

  const addApplication = async (a: Omit<Application, 'id' | 'status' | 'bourseId' | 'etapesValidees' | 'etapesOptions' | 'paiementDossier' | 'paiementAccompagnement' | 'documents' | 'collectRequests' | 'documentsFournis'>): Promise<string> => {
    const id = `A-${Date.now()}`;
    const receiptNumber = `PCARC-${new Date().getFullYear()}-${Math.floor(Math.random() * 9000 + 1000)}`;
    const { error } = await supabase.from('applications').insert({
      id,
      receipt_number: receiptNumber,
      status: 'Nouveau',
      bourse_id: null,
      etapes_validees: [],
      etapes_options: {},
      paiement_dossier: false,
      paiement_accompagnement: false,
      nom: a.nom,
      age: a.age,
      province: a.province,
      ville: a.ville,
      sexe: a.sexe,
      niveau_etude: a.niveauEtude,
      domaine_etude: a.domaineEtude,
      email: a.email,
      whatsapp: a.whatsapp,
      objectif: a.objectif,
      projet: a.projet,
      passeport: a.passeport,
      carte_vaccination: a.carteVaccination,
      deja_candidate: a.dejaCandidate,
    });
    if (error) throw error;
    return receiptNumber;
  };

  const updateApplication = async (id: string, updates: Partial<Application>) => {
    const patch: Record<string, unknown> = {};
    if (updates.status !== undefined) patch.status = updates.status;
    if (updates.bourseId !== undefined) patch.bourse_id = updates.bourseId;
    if (updates.etapesValidees !== undefined) patch.etapes_validees = updates.etapesValidees;
    if (updates.etapesOptions !== undefined) patch.etapes_options = updates.etapesOptions;
    if (updates.paiementDossier !== undefined) patch.paiement_dossier = updates.paiementDossier;
    if (updates.paiementAccompagnement !== undefined) patch.paiement_accompagnement = updates.paiementAccompagnement;
    if (!Object.keys(patch).length) return;
    const { error } = await supabase.from('applications').update(patch).eq('id', id);
    if (!error) {
      // Optimistic update in local state
      setApplications(prev => prev.map(a => a.id === id ? { ...a, ...updates } : a));
    }
  };

  const refreshApplications = async () => { await loadApplications(true); };

  // ─── DOCUMENTS ─────────────────────────────────────────────────────────────

  const addDocumentToApplication = async (
    appId: string,
    file: File,
    meta: { nom: string; categorie: ApplicationDocument['categorie']; bucket: 'documents' | 'collect-uploads' }
  ) => {
    const ext = file.name.split('.').pop();
    const filePath = `${appId}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

    const { error: uploadError } = await supabase.storage.from(meta.bucket).upload(filePath, file);
    if (uploadError) throw uploadError;

    const { error: dbError } = await supabase.from('documents').insert({
      application_id: appId,
      nom: meta.nom,
      categorie: meta.categorie,
      file_path: filePath,
      bucket_name: meta.bucket,
      file_name: file.name,
      file_type: file.type,
      uploaded_by: 'admin',
    });
    if (dbError) throw dbError;

    await loadApplications();
  };

  const removeDocumentFromApplication = async (appId: string, docId: string, filePath: string, bucketName = 'documents') => {
    await supabase.storage.from(bucketName).remove([filePath]);
    const { error } = await supabase.from('documents').delete().eq('id', docId);
    if (!error) {
      setApplications(prev => prev.map(a =>
        a.id === appId ? { ...a, documents: a.documents.filter(d => d.id !== docId) } : a
      ));
    }
  };


  // ─── COLLECT REQUESTS ──────────────────────────────────────────────────────

  const createCollectRequest = async (appId: string, documentsRequested: string[]): Promise<string> => {
    const token = `collect-${appId}-${Math.random().toString(36).slice(2)}-${Date.now()}`;
    const { error } = await supabase.from('collect_requests').insert({
      application_id: appId,
      token,
      documents_requested: documentsRequested,
      status: 'actif',
    });
    if (error) throw error;
    await loadApplications();
    return token;
  };

  const findApplicationByToken = async (token: string): Promise<Application | null> => {
    const { data: collectData, error } = await supabase
      .from('collect_requests')
      .select('*')
      .eq('token', token)
      .eq('status', 'actif')
      .maybeSingle();

    if (error || !collectData) return null;

    const { data: appData } = await supabase
      .from('applications')
      .select('*')
      .eq('id', collectData.application_id)
      .maybeSingle();

    if (!appData) return null;
    return mapApplication(appData, [], [mapCollect(collectData)]);
  };

  const submitCollectedDocuments = async (token: string, files: { file: File; nom: string }[]) => {
    const { data: collectData, error } = await supabase
      .from('collect_requests')
      .select('*')
      .eq('token', token)
      .maybeSingle();

    if (error || !collectData) throw new Error('Token invalide');

    const appId = collectData.application_id;
    const bucket = 'collect-uploads';

    // Upload all files in parallel
    await Promise.all(files.map(async ({ file, nom }) => {
      const ext = file.name.split('.').pop();
      const filePath = `${appId}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      const { error: storErr } = await supabase.storage.from(bucket).upload(filePath, file, { upsert: true });
      if (storErr) { console.error('Upload error:', storErr); return; }

      // Determine categorie from nom
      let categorie = 'Autre';
      if (['Passeport National','Photo d\'Identité Fond Blanc','Carte d\'Identité Nationale'].some(n => nom.includes(n.split(' ')[0]))) {
        categorie = 'Identités & Administratif';
      } else if (['Diplôme','Relevés','Lettre de Motivation','HSK','TOEFL','Admission'].some(n => nom.includes(n))) {
        categorie = 'Académie & Scolarité';
      } else if (['Visa','Examen Physique','Casier','JW202'].some(n => nom.includes(n))) {
        categorie = 'Démarche Visa';
      }

      const { error: dbErr } = await supabase.from('documents').insert({
        application_id: appId,
        nom,
        categorie,
        file_path: filePath,
        bucket_name: 'collect-uploads',
        file_name: file.name,
        file_type: file.type,
        uploaded_by: 'candidat',
      });
      if (dbErr) console.error('DB insert error:', dbErr);
    }));

    // Mark collect request as completed
    await supabase.from('collect_requests').update({ status: 'complété' }).eq('token', token);
    // Update application status
    await supabase.from('applications').update({ status: 'En traitement' }).eq('id', appId);
  };

  // ─── AUTH ─────────────────────────────────────────────────────────────────

  const login = async (email: string, password: string): Promise<boolean> => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return !error;
  };

  const logout = async () => {
    await supabase.auth.signOut();
  };

  if (authLoading) return null;

  return (
    <AdminContext.Provider value={{
      isAuth, authLoading,
      login, logout,
      scholarships, applications,
      isLoading,
      refreshApplications,
      addScholarship, updateScholarship, deleteScholarship,
      addApplication, updateApplication,
      addDocumentToApplication,
      removeDocumentFromApplication,
      createCollectRequest,
      findApplicationByToken,
      submitCollectedDocuments,
    }}>
      {children}
    </AdminContext.Provider>
  );
};
