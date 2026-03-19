import { useParams, useNavigate } from "react-router-dom";
import { useAdmin } from "../../context/AdminContext";
import { ArrowLeft, CheckCircle2, Circle, UploadCloud, FileText } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

const DOCUMENTS_REQUIS = [
  { id: 'doc-passeport', nom: 'Passeport National (Page Data)', categorie: 'Identités & Administratif' },
  { id: 'doc-photo', nom: 'Photo d\'Identité Fond Blanc', categorie: 'Identités & Administratif' },
  { id: 'doc-diplome', nom: 'Diplôme certifié', categorie: 'Académie & Scolarité' },
  { id: 'doc-releves', nom: 'Relevés de cotes officiels', categorie: 'Académie & Scolarité' },
  { id: 'doc-langue', nom: 'Certificat HSK ou TOEFL', categorie: 'Académie & Scolarité' },
  { id: 'doc-medical', nom: 'Formulaire d\'Examen Physique', categorie: 'Démarche Visa' },
  { id: 'doc-police', nom: 'Casier Judiciaire Vierge', categorie: 'Démarche Visa' },
];

export default function ApplicationDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { applications, scholarships, updateApplication } = useAdmin();

  const app = applications.find(a => a.id === id);
  const scholarship = app?.bourseId ? scholarships.find(s => s.id === app.bourseId) : null;

  if (!app) return <div className="p-16 text-red-500 text-sm font-bold uppercase tracking-widest">Candidature introuvable.</div>;

  const handleStepToggle = (stepId: string) => {
    const etapes = app.etapesValidees.includes(stepId)
      ? app.etapesValidees.filter(e => e !== stepId)
      : [...app.etapesValidees, stepId];
    updateApplication(app.id, { etapesValidees: etapes });
  };

  const handleDocToggle = (docId: string) => {
    const docs = app.documentsFournis?.includes(docId)
      ? app.documentsFournis.filter(d => d !== docId)
      : [...(app.documentsFournis || []), docId];
    updateApplication(app.id, { documentsFournis: docs });
  };

  const handleAttach = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    updateApplication(app.id, { bourseId: val === "" ? null : val, status: "En traitement" });
  };

  const DataGroup = ({ label, value }: { label: string, value: React.ReactNode }) => (
    <div className="mb-6 border-b border-gray-100 pb-2">
       <span className="block text-[10px] uppercase font-black tracking-widest text-[#0B3D91]/40 mb-1">{label}</span>
       <span className="block text-lg font-bold text-[#0B3D91]">{value || "—"}</span>
    </div>
  );

  return (
    <div className="flex flex-col h-full overflow-hidden bg-white">
      {/* Top Header strictly separated */}
      <div className="bg-[#0B3D91] text-white p-6 px-12 flex items-center justify-between shrink-0 shadow-lg z-10">
         <div className="flex items-center gap-8">
            <button onClick={() => navigate(-1)} className="p-4 bg-white/10 hover:bg-white/20 transition-colors rounded-none focus:outline-none flex items-center gap-3">
               <ArrowLeft className="w-5 h-5" />
               <span className="text-[10px] font-black uppercase tracking-widest">Retour</span>
            </button>
            <div>
               <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#5BB774] mb-1">Dossier N° {app.receiptNumber}</p>
               <h1 className="text-3xl font-black uppercase tracking-tighter leading-none">{app.nom}</h1>
            </div>
         </div>
         <div className="text-right border-l-2 border-white/20 pl-8">
            <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/50 mb-1">Date de Soumission</p>
            <p className="text-lg font-bold tracking-widest">{format(new Date(app.date), 'dd MMM yyyy', { locale: fr }).toUpperCase()}</p>
         </div>
      </div>

      <div className="flex-1 overflow-y-auto p-12 lg:p-16 grid grid-cols-1 lg:grid-cols-2 gap-16 font-sans">
         {/* Left Column: Data Grid */}
         <div className="flex flex-col gap-12">
            <div>
              <h2 className="text-4xl font-black uppercase tracking-tighter text-[#0B3D91] mb-12">DONNÉES<br/>ADMINISTRATIVES_</h2>
              
              <div className="grid grid-cols-2 gap-x-12 gap-y-2">
                 <DataGroup label="Identité Complète" value={`${app.sexe === 'Homme' ? 'M.' : 'Mme'} ${app.nom}, ${app.age} ans`} />
                 <DataGroup label="Contact WhatsApp" value={`+243 ${app.whatsapp}`} />
                 
                 <DataGroup label="Courriel Électronique" value={app.email} />
                 <DataGroup label="Base de résidence" value={`${app.ville}, ${app.province}`} />
                 
                 <DataGroup label="Niveau d'Études" value={app.niveauEtude} />
                 <DataGroup label="Domaine / Filière" value={app.domaineEtude} />
                 
                 <DataGroup label="Objectif Ciblé" value={app.objectif} />
                 <DataGroup label="Nature du Dossier" value={app.dejaCandidate} />
              </div>
            </div>

            <div className="mt-4">
               <span className="block text-[10px] uppercase font-black tracking-widest text-[#0B3D91]/40 mb-3">Note d'Intention Conceptuelle</span>
               <p className="text-sm text-gray-700 leading-relaxed font-serif bg-gray-50 p-8 border-l-4 border-[#0B3D91] shadow-inner">
                 {app.projet}
               </p>
            </div>
         </div>

         {/* Right Column: Validation Dashboard */}
         <div className="flex flex-col gap-12 border-t lg:border-t-0 lg:border-l border-gray-200 pt-12 lg:pt-0 lg:pl-16">
             
             {/* Box 1: Scholarship Attachment */}
             <div className="bg-[#F8F9FA] border-2 border-dashed border-[#0B3D91]/20 p-8">
                <h3 className="text-[10px] uppercase font-black tracking-[0.3em] text-[#0B3D91] mb-6">Attribution & Rattachement</h3>
                
                <select 
                  className="w-full bg-white border-2 border-[#0B3D91] p-5 text-lg font-black text-[#0B3D91] uppercase tracking-tighter focus:outline-none appearance-none cursor-pointer hover:bg-gray-50 transition-colors"
                  value={app.bourseId || ""}
                  onChange={handleAttach}
                >
                   <option value="" disabled>--- SÉLECTIONNER UN PROGRAMME ---</option>
                   {scholarships.map(s => (
                     <option key={s.id} value={s.id}>{s.id} · {s.titre}</option>
                   ))}
                </select>

                {!app.bourseId && <p className="text-[9px] font-bold text-[#059669] uppercase tracking-[0.2em] mt-4 flex items-center gap-2"><Circle className="w-3 h-3 fill-current"/> Veuillez rattacher ce dossier pour débloquer le terminal logistique.</p>}
             </div>

             {/* Functional features UNLOCKED if scholarship selected */}
             {scholarship && (
               <div className="flex flex-col gap-12">
                 
                 {/* Box 2: Payment */}
                 <div className="bg-white p-8 border border-gray-200 shadow-sm border-l-8 border-l-[#5BB774]">
                    <h3 className="text-[10px] uppercase font-black tracking-[0.3em] text-[#5BB774] mb-8">Flux de Trésorerie</h3>
                    
                    <div className="flex flex-col gap-4">
                       <button 
                          onClick={() => updateApplication(app.id, { paiementDossier: !app.paiementDossier })}
                          className="flex items-center justify-between p-5 bg-gray-50 border border-gray-200 hover:border-[#5BB774] hover:bg-white transition-colors focus:outline-none group"
                       >
                          <div className="flex items-center gap-4">
                             {app.paiementDossier ? <CheckCircle2 className="w-6 h-6 text-[#5BB774]" /> : <Circle className="w-6 h-6 text-gray-300 group-hover:text-[#5BB774]/50" />}
                             <span className="text-xs font-black uppercase tracking-widest text-[#0B3D91]">Frais de Traitement</span>
                          </div>
                          <span className="text-2xl font-mono font-black text-[#0B3D91]">${scholarship.fraisDossier}</span>
                       </button>

                       <button 
                          onClick={() => updateApplication(app.id, { paiementAccompagnement: !app.paiementAccompagnement })}
                          className="flex items-center justify-between p-5 bg-gray-50 border border-gray-200 hover:border-[#5BB774] hover:bg-white transition-colors focus:outline-none group"
                       >
                          <div className="flex items-center gap-4">
                             {app.paiementAccompagnement ? <CheckCircle2 className="w-6 h-6 text-[#5BB774]" /> : <Circle className="w-6 h-6 text-gray-300 group-hover:text-[#5BB774]/50" />}
                             <span className="text-xs font-black uppercase tracking-widest text-[#0B3D91]">Pack Accompagnement</span>
                          </div>
                          <span className="text-2xl font-mono font-black text-[#0B3D91]">${scholarship.fraisAccompagnement}</span>
                       </button>
                    </div>
                 </div>

                 {/* Box 3: Espace Documentaire (GED) */}
                 <div className="bg-white p-8 border border-gray-200 shadow-sm">
                    <h3 className="text-[10px] uppercase font-black tracking-[0.3em] text-[#0B3D91] mb-8 flex items-center gap-3"><FileText className="w-4 h-4"/> Espace Documentaire (GED)</h3>
                    
                    {['Identités & Administratif', 'Académie & Scolarité', 'Démarche Visa'].map(cat => (
                      <div key={cat} className="mb-8 last:mb-0">
                        <h4 className="text-[8px] uppercase font-bold tracking-[0.2em] text-[#0B3D91]/50 mb-3 border-b border-gray-100 pb-2">{cat}</h4>
                        <div className="flex flex-col gap-2">
                          {DOCUMENTS_REQUIS.filter(d => d.categorie === cat).map(doc => {
                            const isUploaded = app.documentsFournis?.includes(doc.id);
                            return (
                              <div key={doc.id} className="flex justify-between items-center group p-3 bg-[#F8F9FA] hover:bg-[#0B3D91]/5 transition-colors">
                                 <span className={`text-[10px] font-bold uppercase tracking-widest transition-colors ${isUploaded ? 'text-[#0B3D91]' : 'text-gray-400'}`}>{doc.nom}</span>
                                 <button
                                   onClick={() => handleDocToggle(doc.id)}
                                   className={`px-4 py-2 text-[8px] font-black uppercase tracking-widest focus:outline-none transition-colors flex items-center gap-2 ${isUploaded ? 'bg-[#5BB774] text-white' : 'bg-white border border-gray-200 text-gray-500 hover:border-[#0B3D91] hover:text-[#0B3D91]'}`}
                                 >
                                   <UploadCloud className="w-3 h-3" />
                                   {isUploaded ? 'TÉLÉCHARGÉ' : 'REQUÉRIR JOINTURE'}
                                 </button>
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    ))}
                 </div>

                 {/* Box 4: Custom Scholarship Steps */}
                 {scholarship.etapes && scholarship.etapes.length > 0 && (
                   <div className="bg-white p-8 border-4 border-[#0B3D91]">
                      <h3 className="text-[10px] uppercase font-black tracking-[0.3em] text-[#0B3D91] mb-8">Matrice de Progression</h3>
                      
                      {['Pré-requis', 'Académique', 'Visa & Logistique', 'Autre'].map(cat => {
                         const catSteps = scholarship.etapes.filter(e => e.categorie === cat);
                         if (catSteps.length === 0) return null;
                         return (
                           <div key={cat} className="mb-8 last:mb-0">
                             <h4 className="text-[8px] uppercase font-bold tracking-[0.2em] text-[#0B3D91]/50 mb-3 border-b border-gray-100 pb-2">{cat}</h4>
                             <div className="flex flex-col gap-2">
                               {catSteps.map(etape => {
                                 const isDone = app.etapesValidees.includes(etape.id);
                                 return (
                                   <button 
                                     key={etape.id}
                                     onClick={() => handleStepToggle(etape.id)} 
                                     className="flex items-center gap-4 group p-3 hover:bg-gray-50 transition-colors focus:outline-none text-left w-full"
                                   >
                                      {isDone ? <CheckCircle2 className="w-5 h-5 text-[#059669] shrink-0" /> : <Circle className="w-5 h-5 text-gray-300 shrink-0 group-hover:text-[#059669]/30" />}
                                      <span className={`text-[10px] font-bold uppercase tracking-widest transition-colors ${isDone ? 'text-gray-900' : 'text-gray-400 group-hover:text-gray-600'}`}>
                                        {etape.nom}
                                      </span>
                                   </button>
                                 );
                               })}
                             </div>
                           </div>
                         )
                      })}
                   </div>
                 )}
               </div>
             )}
         </div>
      </div>
    </div>
  );
}
