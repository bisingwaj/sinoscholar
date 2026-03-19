import { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useAdmin, ApplicationDocument } from "../../context/AdminContext";
import { UploadCloud, FileText, Trash2, Eye, Copy, Check, Link2, X, Loader2 } from "lucide-react";
import { supabase } from "../../lib/supabase";

const DOC_CATEGORIES: ApplicationDocument['categorie'][] = [
  'Identités & Administratif',
  'Académie & Scolarité',
  'Démarche Visa',
  'Autre'
];

const DOC_SUGGESTIONS: Record<ApplicationDocument['categorie'], string[]> = {
  'Identités & Administratif': ["Passeport National", "Photo d'Identité Fond Blanc", "Carte d'Identité Nationale"],
  'Académie & Scolarité': ["Diplôme Certifié", "Relevés de Cotes", "Lettre de Motivation", "Certificat HSK / TOEFL"],
  'Démarche Visa': ["Formulaire d'Examen Physique (JW202)", "Casier Judiciaire Vierge", "Formulaire de Visa Étudiant"],
  'Autre': ["Document Complémentaire"]
};

export default function CandidatureGEDTab() {
  const { id } = useParams<{ id: string }>();
  const { applications, addDocumentToApplication, removeDocumentFromApplication, createCollectRequest } = useAdmin();
  const app = applications.find(a => a.id === id);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedCat, setSelectedCat] = useState<ApplicationDocument['categorie']>('Identités & Administratif');
  const [selectedNom, setSelectedNom] = useState(DOC_SUGGESTIONS['Identités & Administratif'][0]);
  const [uploading, setUploading] = useState(false);

  // Collect link modal
  const [showCollectModal, setShowCollectModal] = useState(false);
  const [collectSelected, setCollectSelected] = useState<string[]>([]);
  const [generatedLink, setGeneratedLink] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [generating, setGenerating] = useState(false);

  // Signed URLs for previewing documents
  const [signedUrls, setSignedUrls] = useState<Record<string, string>>({});

  if (!app) return null;

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      await addDocumentToApplication(app.id, file, {
        nom: selectedNom,
        categorie: selectedCat,
        bucket: 'documents'
      });
    } catch (err) {
      console.error('Upload error:', err);
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleGenerateLink = async () => {
    if (!collectSelected.length) return;
    setGenerating(true);
    try {
      const token = await createCollectRequest(app.id, collectSelected);
      const link = `${window.location.origin}/collect/${token}`;
      setGeneratedLink(link);
    } finally {
      setGenerating(false);
    }
  };

  const handleCopy = (link: string) => {
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getDocumentUrl = async (doc: ApplicationDocument): Promise<string | null> => {
    const cacheKey = doc.id;
    if (signedUrls[cacheKey]) return signedUrls[cacheKey];

    // Public bucket → use public URL directly (no auth needed)
    if (doc.bucketName === 'collect-uploads') {
      const { data } = supabase.storage.from('collect-uploads').getPublicUrl(doc.filePath);
      if (data?.publicUrl) {
        setSignedUrls(prev => ({ ...prev, [cacheKey]: data.publicUrl }));
        return data.publicUrl;
      }
      return null;
    }

    // Private bucket → create signed URL (valid 1h)
    const { data } = await supabase.storage.from('documents').createSignedUrl(doc.filePath, 3600);
    if (data?.signedUrl) {
      setSignedUrls(prev => ({ ...prev, [cacheKey]: data.signedUrl }));
      return data.signedUrl;
    }
    return null;
  };

  const allDocSuggestions = Object.values(DOC_SUGGESTIONS).flat();

  return (
    <div className="p-6 md:p-10 pb-24 md:pb-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 md:gap-4 mb-8 border-b-2 border-[#0B3D91] pb-4">
        <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tighter text-[#0B3D91] leading-none">
          ESPACE DOCUMENTAIRE_
        </h2>
        <button
          onClick={() => { setShowCollectModal(true); setGeneratedLink(null); setCollectSelected([]); }}
          className="w-full md:w-auto flex justify-center items-center gap-3 bg-[#059669] text-white px-6 py-4 md:py-3 text-[10px] font-black uppercase tracking-widest hover:bg-[#B71C1C] transition-colors focus:outline-none shrink-0"
        >
          <Link2 className="w-4 h-4" /> Créer un Lien de Collecte
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

        {/* ── Upload Panel ── */}
        <div className="lg:col-span-1 flex flex-col gap-4">
          <div className="bg-[#F8F9FA] border border-gray-200 p-6">
            <h3 className="text-[9px] uppercase font-black tracking-widest text-[#0B3D91] mb-5">Joindre un Document</h3>

            <label className="block text-[9px] font-bold uppercase tracking-widest text-gray-500 mb-2">Catégorie</label>
            <select
              className="w-full bg-white border border-gray-200 p-3 text-xs font-bold text-[#0B3D91] focus:outline-none appearance-none mb-4"
              value={selectedCat}
              onChange={e => {
                const c = e.target.value as ApplicationDocument['categorie'];
                setSelectedCat(c);
                setSelectedNom(DOC_SUGGESTIONS[c][0]);
              }}
            >
              {DOC_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>

            <label className="block text-[9px] font-bold uppercase tracking-widest text-gray-500 mb-2">Type de Document</label>
            <select
              className="w-full bg-white border border-gray-200 p-3 text-xs font-bold text-[#0B3D91] focus:outline-none appearance-none mb-6"
              value={selectedNom}
              onChange={e => setSelectedNom(e.target.value)}
            >
              {DOC_SUGGESTIONS[selectedCat].map(n => <option key={n} value={n}>{n}</option>)}
            </select>

            <input ref={fileInputRef} type="file" accept="image/*,.pdf" className="hidden" onChange={handleFileChange} />
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="w-full flex items-center justify-center gap-3 bg-[#0B3D91] text-white py-4 text-[10px] font-black uppercase tracking-widest hover:bg-[#059669] transition-colors focus:outline-none disabled:opacity-50"
            >
              {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <UploadCloud className="w-4 h-4" />}
              {uploading ? 'CHARGEMENT...' : 'SÉLECTIONNER LE FICHIER'}
            </button>
            <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest mt-3 text-center">PDF, JPG, PNG — Max 50MB</p>
          </div>

          {/* Active collect requests */}
          {(app.collectRequests || []).length > 0 && (
            <div className="bg-white border border-gray-200 p-6">
              <h3 className="text-[9px] uppercase font-black tracking-widest text-[#0B3D91] mb-4">Liens de Collecte</h3>
              {app.collectRequests.map(r => (
                <div key={r.token} className="flex items-center justify-between p-3 bg-gray-50 border border-gray-100 mb-2">
                  <div>
                    <p className={`text-[9px] font-black uppercase tracking-wide ${r.status === 'complété' ? 'text-[#5BB774]' : 'text-[#059669]'}`}>{r.status}</p>
                    <p className="text-[8px] font-mono text-gray-400 mt-0.5">{r.documentsRequested.length} doc(s)</p>
                  </div>
                  <button
                    onClick={() => handleCopy(`${window.location.origin}/collect/${r.token}`)}
                    className="text-[9px] font-black uppercase tracking-widest text-[#0B3D91] hover:text-[#059669] flex items-center gap-1 transition-colors focus:outline-none"
                  >
                    <Copy className="w-3 h-3" /> Copier
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ── Document Grid ── */}
        <div className="lg:col-span-2">
          {DOC_CATEGORIES.map(cat => {
            const catDocs = (app.documents || []).filter(d => d.categorie === cat);
            if (!catDocs.length) return null;
            return (
              <div key={cat} className="mb-8">
                <h3 className="text-[9px] uppercase font-black tracking-[0.3em] text-gray-400 border-b border-gray-200 pb-3 mb-4">{cat}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {catDocs.map(doc => {
                    const isPDF = doc.fileType?.includes('pdf');
                    return (
                      <div key={doc.id} className="border border-gray-200 bg-white p-4 flex flex-col gap-3">
                        <div className="flex items-center justify-center bg-gray-50 h-20 border border-gray-100">
                          <FileText className={`w-8 h-8 ${isPDF ? 'text-[#059669]' : 'text-[#0B3D91]'} opacity-60`} />
                        </div>
                        <div>
                          <p className="text-xs font-black text-[#0B3D91] uppercase tracking-wide">{doc.nom}</p>
                          <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest mt-1">
                            {doc.uploadedBy === 'candidat' ? '📩 Envoyé par le candidat' : '📋 Admin'}
                          </p>
                          <p className="text-[8px] text-gray-300 font-mono mt-1">{doc.fileName}</p>
                        </div>
                        <div className="flex gap-2 items-center">
                          <button
                            onClick={async () => {
                              const url = await getDocumentUrl(doc);
                              if (url) window.open(url, '_blank');
                            }}
                            className="text-[9px] font-black uppercase tracking-widest text-[#0B3D91] hover:text-[#059669] flex items-center gap-1.5 transition-colors"
                          >
                            <Eye className="w-3 h-3" /> Visualiser
                          </button>
                          <button
                            onClick={() => removeDocumentFromApplication(app.id, doc.id, doc.filePath, doc.bucketName)}
                            className="text-[9px] font-black uppercase tracking-widest text-gray-300 hover:text-[#059669] flex items-center gap-1.5 transition-colors focus:outline-none ml-auto"
                          >
                            <Trash2 className="w-3 h-3" /> Retirer
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}

          {!(app.documents || []).length && (
            <div className="flex flex-col items-center justify-center h-64 border-2 border-dashed border-gray-200 text-center">
              <FileText className="w-10 h-10 text-gray-200 mb-4" />
              <p className="text-[10px] font-black uppercase tracking-widest text-gray-300">Aucun document dans ce dossier.</p>
              <p className="text-[9px] text-gray-200 font-bold uppercase tracking-widest mt-1">Utilisez le panneau gauche pour joindre des pièces.</p>
            </div>
          )}
        </div>
      </div>

      {/* ── Collect Modal ── */}
      {showCollectModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-lg shadow-2xl">
            <div className="bg-[#0B3D91] text-white p-6 flex justify-between items-center">
              <h3 className="text-xl font-black uppercase tracking-tighter">LIEN DE COLLECTE</h3>
              <button onClick={() => setShowCollectModal(false)} className="focus:outline-none hover:text-[#059669]"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-8">
              {!generatedLink ? (
                <>
                  <p className="text-[10px] font-black uppercase tracking-widest text-[#0B3D91] mb-6">Documents à demander au candidat :</p>
                  <div className="flex flex-col gap-2 max-h-64 overflow-y-auto mb-8">
                    {allDocSuggestions.map(s => (
                      <label key={s} className="flex items-center gap-3 p-3 bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
                        <input
                          type="checkbox"
                          checked={collectSelected.includes(s)}
                          onChange={() => setCollectSelected(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s])}
                          className="accent-[#059669] w-4 h-4"
                        />
                        <span className="text-xs font-bold uppercase tracking-widest text-[#0B3D91]">{s}</span>
                      </label>
                    ))}
                  </div>
                  <button
                    onClick={handleGenerateLink}
                    disabled={!collectSelected.length || generating}
                    className="w-full flex justify-center items-center gap-3 bg-[#059669] text-white py-4 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-[#B71C1C] transition-colors focus:outline-none disabled:opacity-40"
                  >
                    {generating ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                    GÉNÉRER LE LIEN ({collectSelected.length} doc{collectSelected.length !== 1 ? 's' : ''})
                  </button>
                </>
              ) : (
                <div className="text-center">
                  <div className="w-16 h-16 bg-[#5BB774] flex items-center justify-center mx-auto mb-6">
                    <Link2 className="w-8 h-8 text-white" />
                  </div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-[#5BB774] mb-1">Lien Généré</p>
                  <div className="bg-gray-50 border border-gray-200 p-4 text-left mb-6 mt-6">
                    <p className="text-[9px] font-mono text-gray-600 break-all">{generatedLink}</p>
                  </div>
                  <button
                    onClick={() => handleCopy(generatedLink)}
                    className="w-full flex items-center justify-center gap-3 bg-[#0B3D91] text-white py-4 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-[#059669] transition-colors focus:outline-none"
                  >
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    {copied ? 'COPIÉ !' : 'COPIER LE LIEN'}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
