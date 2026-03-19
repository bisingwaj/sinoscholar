import { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAdmin, Application, ApplicationDocument } from "../../context/AdminContext";
import { UploadCloud, ChevronRight, CheckCircle2, ArrowLeft, Send, Loader2 } from "lucide-react";

const CATEGORY_FOR_DOC: Record<string, ApplicationDocument['categorie']> = {
  "Passeport National": "Identités & Administratif",
  "Photo d'Identité Fond Blanc": "Identités & Administratif",
  "Carte d'Identité Nationale": "Identités & Administratif",
  "Diplôme Certifié": "Académie & Scolarité",
  "Relevés de Cotes": "Académie & Scolarité",
  "Lettre de Motivation": "Académie & Scolarité",
  "Certificat HSK / TOEFL": "Académie & Scolarité",
  "Formulaire d'Examen Physique (JW202)": "Démarche Visa",
  "Casier Judiciaire Vierge": "Démarche Visa",
  "Formulaire de Visa Étudiant": "Démarche Visa",
};

export default function CollectFlow() {
  const { token } = useParams<{ token: string }>();
  const { findApplicationByToken, submitCollectedDocuments } = useAdmin();

  const [app, setApp] = useState<Application | null | undefined>(undefined); // undefined = loading
  const [collectToken, setCollectToken] = useState<string | null>(null);
  const [docsRequested, setDocsRequested] = useState<string[]>([]);

  const [currentDocIndex, setCurrentDocIndex] = useState(0);
  const [uploadedFiles, setUploadedFiles] = useState<Record<number, File>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load application from token
  useEffect(() => {
    if (!token) { setApp(null); return; }
    findApplicationByToken(token).then(found => {
      setApp(found);
      if (found) {
        const req = found.collectRequests.find(r => r.token === token);
        if (req) {
          setDocsRequested(req.documentsRequested);
          setCollectToken(req.token);
        }
      }
    });
  }, [token]);

  // ── Loading ──
  if (app === undefined) {
    return (
      <div className="min-h-screen bg-[#0B3D91] flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-white animate-spin" />
      </div>
    );
  }

  // ── Token invalid ──
  if (!app || !collectToken) {
    return (
      <div className="min-h-screen bg-[#0B3D91] flex items-center justify-center p-8">
        <div className="bg-white p-16 max-w-lg w-full text-center">
          <p className="text-[10px] font-black uppercase tracking-widest text-[#059669] mb-4">Lien Invalide</p>
          <p className="text-2xl font-black uppercase tracking-tighter text-[#0B3D91] leading-tight">Ce lien de collecte n'est plus valide.</p>
          <p className="text-sm text-gray-500 mt-4">Veuillez contacter votre chargé de dossier.</p>
        </div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#0B3D91] flex items-center justify-center p-8">
        <div className="bg-white p-16 max-w-lg w-full text-center">
          <CheckCircle2 className="w-20 h-20 text-[#5BB774] mx-auto mb-8" />
          <p className="text-[10px] font-black uppercase tracking-widest text-[#5BB774] mb-3">Envoi Confirmé</p>
          <h2 className="text-3xl font-black uppercase tracking-tighter text-[#0B3D91] leading-tight mb-6">
            Merci, {app.nom.split(' ')[0]} !
          </h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            {docsRequested.length} document{docsRequested.length > 1 ? 's ont' : ' a'} été transmis avec succès à votre chargé de dossier.
          </p>
          <div className="mt-10 bg-[#F8F9FA] p-6 border-l-4 border-[#0B3D91]">
            <p className="text-[9px] font-bold uppercase tracking-widest text-gray-500">Référence Dossier</p>
            <p className="text-lg font-mono font-black text-[#0B3D91]">{app.receiptNumber}</p>
          </div>
        </div>
      </div>
    );
  }

  const totalDocs = docsRequested.length;
  const isConfirmScreen = currentDocIndex >= totalDocs;
  const currentDoc = docsRequested[currentDocIndex];
  const currentFile = uploadedFiles[currentDocIndex];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadedFiles(prev => ({ ...prev, [currentDocIndex]: file }));
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const files = Object.entries(uploadedFiles).map(([index, file]) => ({
        file,
        nom: docsRequested[parseInt(index)],
      }));
      await submitCollectedDocuments(collectToken, files);
      setSubmitted(true);
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  // ── Confirmation screen ──
  if (isConfirmScreen) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <div className="bg-[#0B3D91] text-white px-8 py-6">
          <p className="text-[9px] font-bold uppercase tracking-[0.4em] text-[#8DE5A5] mb-1">COOPÉRATION ACADÉMIQUE SINO-CONGOLAISE</p>
          <p className="text-[10px] font-black uppercase tracking-widest text-white/60">Dossier de {app.nom}</p>
        </div>
        <div className="bg-[#5BB774] h-2 w-full" />
        <div className="flex-1 flex flex-col items-center justify-center p-8">
          <div className="w-full max-w-lg">
            <h2 className="text-4xl font-black uppercase tracking-tighter text-[#0B3D91] leading-none mb-2">CONFIRMATION</h2>
            <p className="text-sm text-gray-500 font-bold uppercase tracking-widest mb-10">Vérifiez avant d'envoyer</p>
            <div className="flex flex-col gap-3 mb-10">
              {docsRequested.map((doc, i) => (
                <div key={i} className="flex items-center gap-4 p-4 bg-[#F8F9FA] border border-gray-100">
                  {uploadedFiles[i]
                    ? <CheckCircle2 className="w-5 h-5 text-[#5BB774] shrink-0" />
                    : <div className="w-5 h-5 border-2 border-[#059669] rounded-full shrink-0" />
                  }
                  <div>
                    <p className="text-xs font-black uppercase tracking-wide text-[#0B3D91]">{doc}</p>
                    {uploadedFiles[i]
                      ? <p className="text-[9px] text-[#5BB774] font-bold uppercase tracking-widest mt-0.5">{uploadedFiles[i].name}</p>
                      : <p className="text-[9px] text-[#059669] font-bold uppercase tracking-widest mt-0.5">Non soumis</p>
                    }
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-4">
              <button onClick={() => setCurrentDocIndex(totalDocs - 1)} className="flex items-center gap-2 border border-gray-200 text-gray-500 px-6 py-4 text-[10px] font-black uppercase tracking-widest hover:border-gray-400 focus:outline-none">
                <ArrowLeft className="w-4 h-4" /> Retour
              </button>
              <button onClick={handleSubmit} disabled={submitting} className="flex-1 flex items-center justify-center gap-3 bg-[#059669] text-white py-4 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-[#B71C1C] transition-colors focus:outline-none disabled:opacity-60">
                {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                {submitting ? 'ENVOI EN COURS...' : 'SOUMETTRE LE DOSSIER'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── Document step ──
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="bg-[#0B3D91] text-white px-8 py-6">
        <p className="text-[9px] font-bold uppercase tracking-[0.4em] text-[#8DE5A5] mb-1">COOPÉRATION ACADÉMIQUE SINO-CONGOLAISE</p>
        <h1 className="text-xl font-black uppercase tracking-tighter leading-none">{app.nom}</h1>
      </div>
      <div className="bg-gray-100 h-1.5 w-full">
        <div className="bg-[#059669] h-full transition-all duration-500" style={{ width: `${((currentDocIndex + 1) / (totalDocs + 1)) * 100}%` }} />
      </div>
      <div className="px-8 py-4 bg-[#F8F9FA] border-b border-gray-200 flex items-center justify-between">
        <p className="text-[9px] font-black uppercase tracking-widest text-gray-400">Document {currentDocIndex + 1} / {totalDocs}</p>
        <div className="flex gap-1.5">
          {docsRequested.map((_, i) => (
            <div key={i} className={`h-1.5 rounded-full transition-all ${i < currentDocIndex ? 'w-6 bg-[#5BB774]' : i === currentDocIndex ? 'w-6 bg-[#059669]' : 'w-3 bg-gray-200'}`} />
          ))}
        </div>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center p-8">
        <div className="w-full max-w-md">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#059669] mb-3">Document Requis</p>
          <h2 className="text-4xl font-black uppercase tracking-tighter text-[#0B3D91] leading-none mb-2">{currentDoc}</h2>
          <p className="text-sm text-gray-400 font-bold uppercase tracking-widest mb-10">{CATEGORY_FOR_DOC[currentDoc] ?? 'Autre'}</p>

          <input ref={fileInputRef} type="file" accept="image/*,.pdf" className="hidden" onChange={handleFileChange} />

          {!currentFile ? (
            <button onClick={() => fileInputRef.current?.click()} className="w-full border-4 border-dashed border-gray-200 hover:border-[#0B3D91] transition-colors flex flex-col items-center justify-center py-16 px-8 gap-5 focus:outline-none group">
              <UploadCloud className="w-12 h-12 text-gray-300 group-hover:text-[#0B3D91] transition-colors" />
              <div className="text-center">
                <p className="text-sm font-black uppercase tracking-widest text-gray-400 group-hover:text-[#0B3D91] transition-colors">Appuyez pour sélectionner</p>
                <p className="text-[9px] font-bold uppercase tracking-widest text-gray-300 mt-1">PDF, JPG, PNG — Max 50MB</p>
              </div>
            </button>
          ) : (
            <div className="border-4 border-[#5BB774] p-8 flex flex-col items-center gap-4">
              <CheckCircle2 className="w-10 h-10 text-[#5BB774]" />
              <div className="text-center">
                <p className="text-sm font-black uppercase tracking-widest text-[#5BB774]">Fichier Sélectionné</p>
                <p className="text-[10px] font-mono text-gray-500 mt-1">{currentFile.name}</p>
              </div>
              <button onClick={() => fileInputRef.current?.click()} className="text-[9px] font-black uppercase tracking-widest text-gray-400 hover:text-[#059669] transition-colors focus:outline-none border-b border-gray-200">
                Changer de fichier
              </button>
            </div>
          )}

          <div className="flex gap-4 mt-8">
            {currentDocIndex > 0 && (
              <button onClick={() => setCurrentDocIndex(prev => prev - 1)} className="flex items-center gap-2 border border-gray-200 text-gray-500 px-6 py-4 text-[10px] font-black uppercase tracking-widest hover:border-gray-400 focus:outline-none">
                <ArrowLeft className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={() => setCurrentDocIndex(prev => prev + 1)}
              disabled={!currentFile}
              className="flex-1 flex items-center justify-center gap-3 bg-[#0B3D91] text-white py-4 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-[#059669] transition-colors focus:outline-none disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {currentDocIndex === totalDocs - 1 ? 'VÉRIFIER & CONFIRMER' : 'DOCUMENT SUIVANT'}
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
