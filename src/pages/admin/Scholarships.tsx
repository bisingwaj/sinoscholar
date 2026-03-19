import { useState } from "react";
import { useAdmin, ScholarshipStepCategory, ScholarshipStep, Scholarship } from "../../context/AdminContext";
import { Plus, X, Check, ChevronLeft, ChevronRight, Trash2, Edit2 } from "lucide-react";

const STANDARD_STEPS: Omit<ScholarshipStep, 'id'>[] = [
  { nom: "Paiement Frais d'Ouverture", categorie: "Pré-requis" },
  { nom: "Dépôt Passeport National", categorie: "Pré-requis" },
  { nom: "Traduction Notariée", categorie: "Pré-requis" },
  { nom: "Pré-sélection du candidat", categorie: "Académique" },
  { nom: "Admission Universitaire", categorie: "Académique" },
  { nom: "Confirmation JW201/JW202", categorie: "Académique" },
  { nom: "Examen Médical", categorie: "Visa & Logistique" },
  { nom: "Dépôt Visa Étudiant (X1/X2)", categorie: "Visa & Logistique" },
  { nom: "Achat Billet d'Avion", categorie: "Visa & Logistique" },
];

const CATEGORIES: ScholarshipStepCategory[] = ['Pré-requis', 'Académique', 'Visa & Logistique', 'Autre'];

export default function Scholarships() {
  const { scholarships, addScholarship, updateScholarship, deleteScholarship } = useAdmin();
  const [showAdd, setShowAdd] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<{
    titre: string; institution: string; fraisDossier: number | string; fraisAccompagnement: number | string;
  }>({
    titre: "", institution: "", fraisDossier: "", fraisAccompagnement: ""
  });
  const [selectedSteps, setSelectedSteps] = useState<Omit<ScholarshipStep, 'id'>[]>([]);
  const [customStepName, setCustomStepName] = useState("");
  const [customStepCat, setCustomStepCat] = useState<ScholarshipStepCategory>('Autre');
  const [mobileStep, setMobileStep] = useState(1);

  const toggleStep = (step: Omit<ScholarshipStep, 'id'>) => {
    setSelectedSteps(prev => 
      prev.some(p => p.nom === step.nom) 
        ? prev.filter(p => p.nom !== step.nom)
        : [...prev, step]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.titre.trim() || !formData.institution.trim()) {
      alert("Veuillez remplir le titre et l'institution.");
      setMobileStep(1);
      return;
    }
    
    if (editingId) {
      updateScholarship(editingId, {
        titre: formData.titre,
        institution: formData.institution,
        fraisDossier: Number(formData.fraisDossier) || 0,
        fraisAccompagnement: Number(formData.fraisAccompagnement) || 0,
        etapes: selectedSteps.map((s, i) => ({ ...s, id: (s as unknown as ScholarshipStep).id || `step-${Date.now()}-${i}` }))
      });
    } else {
      addScholarship({
        titre: formData.titre,
        institution: formData.institution,
        fraisDossier: Number(formData.fraisDossier) || 0,
        fraisAccompagnement: Number(formData.fraisAccompagnement) || 0,
        etapes: selectedSteps.map((s, i) => ({ ...s, id: `step-${Date.now()}-${i}` })),
        statut: 'Actif'
      });
    }
    
    setShowAdd(false);
    setMobileStep(1);
    setEditingId(null);
    setFormData({ titre: "", institution: "", fraisDossier: "", fraisAccompagnement: "" });
    setSelectedSteps([]);
  };

  const handleEdit = (s: Scholarship) => {
    setEditingId(s.id);
    setFormData({ titre: s.titre, institution: s.institution, fraisDossier: s.fraisDossier, fraisAccompagnement: s.fraisAccompagnement });
    setSelectedSteps(s.etapes);
    setShowAdd(true);
    setMobileStep(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer définitivement cette bourse ?")) {
      await deleteScholarship(id);
    }
  };

  const handleAddCustomStep = () => {
    if (!customStepName.trim()) return;
    const newStep: Omit<ScholarshipStep, 'id'> = { nom: customStepName.trim(), categorie: customStepCat };
    setSelectedSteps(prev => [...prev, newStep]);
    setCustomStepName("");
  };

  return (
    <div className="p-6 md:p-16 h-full overflow-y-auto bg-[#F8F9FA] md:bg-white font-sans text-[#0B3D91] pb-24 md:pb-16">
      <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6 mb-8 md:mb-12 border-b border-gray-200 pb-6">
         <div>
            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none">BOURSES_</h1>
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-500 mt-2">Architecture des Programmes</p>
         </div>
         <button onClick={() => { 
            const willShow = !showAdd;
            setShowAdd(willShow); 
            setMobileStep(1);
            if (!willShow) {
              setEditingId(null);
              setFormData({ titre: "", institution: "", fraisDossier: "", fraisAccompagnement: "" });
              setSelectedSteps([]);
            }
          }} className="w-full md:w-auto justify-center bg-[#059669] text-white px-8 py-4 font-black uppercase tracking-widest text-xs flex items-center gap-4 hover:bg-[#B71C1C] transition-colors focus:outline-none">
            {showAdd ? <X className="w-4 h-4"/> : <Plus className="w-4 h-4"/>}
            {showAdd ? (editingId ? "Annuler Modification" : "Annuler Opération") : "Initier un Programme"}
         </button>
      </div>

      {showAdd && (
        <div className="bg-white border-4 border-[#0B3D91] shadow-2xl p-6 md:p-12 mb-16">
           <div className="flex justify-between items-center mb-8">
             <h2 className="text-xl md:text-2xl font-black uppercase tracking-tighter text-[#0B3D91]">
               {editingId ? "Modification du Programme" : "Définition du Programme"}
             </h2>
             <span className="md:hidden text-[10px] font-black uppercase tracking-widest text-[#0B3D91] bg-[#0B3D91]/5 border border-[#0B3D91]/10 px-3 py-1">Étape {mobileStep}/3</span>
           </div>
           
           <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-8">
             {/* Step 1: Definition */}
             <div className={`${mobileStep === 1 ? 'flex flex-col gap-6 col-span-2' : 'hidden'} md:contents`}>
               <div className="col-span-2 md:col-span-1">
                 <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-3">Titre de la bourse *</label>
                 <input className="w-full bg-gray-50 border-b-2 border-gray-200 p-4 text-xl font-bold uppercase text-[#0B3D91] focus:outline-none focus:border-[#059669] transition-colors" value={formData.titre} onChange={e => setFormData({...formData, titre: e.target.value})} placeholder="Ex: Bourse d'Excellence..." />
               </div>
               <div className="col-span-2 md:col-span-1">
                 <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-3">Institution / Université *</label>
                 <input className="w-full bg-gray-50 border-b-2 border-gray-200 p-4 text-xl font-bold text-[#0B3D91] focus:outline-none focus:border-[#059669] transition-colors" value={formData.institution} onChange={e => setFormData({...formData, institution: e.target.value})} placeholder="Ex: Tsinghua University" />
               </div>
               
               <div className="col-span-2 md:col-span-1 border-t border-gray-100 pt-6">
                 <label className="block text-[10px] font-bold uppercase tracking-widest text-[#5BB774] mb-3">Frais d'Ouverture Ciblés ($) *</label>
                 <input type="number" min="0" className="w-full bg-gray-50 border-b-2 border-gray-200 p-4 text-2xl font-mono text-[#0B3D91] focus:outline-none focus:border-[#5BB774] transition-colors" value={formData.fraisDossier} onChange={e => setFormData({...formData, fraisDossier: e.target.value === '' ? '' : Number(e.target.value)})} />
               </div>
               <div className="col-span-2 md:col-span-1 border-t border-gray-100 pt-6">
                 <label className="block text-[10px] font-bold uppercase tracking-widest text-[#5BB774] mb-3">Services Logistiques & Accomp. ($) *</label>
                 <input type="number" min="0" className="w-full bg-gray-50 border-b-2 border-gray-200 p-4 text-2xl font-mono text-[#0B3D91] focus:outline-none focus:border-[#5BB774] transition-colors" value={formData.fraisAccompagnement} onChange={e => setFormData({...formData, fraisAccompagnement: e.target.value === '' ? '' : Number(e.target.value)})} />
               </div>
             </div>

             {/* Step 2: Matrice */}
             <div className={`${mobileStep === 2 ? 'flex flex-col gap-6 col-span-2' : 'hidden'} md:contents`}>
               <div className="col-span-2 border-t border-gray-100 pt-6 mt-4">
                 <label className="block text-xs font-black uppercase tracking-widest text-[#0B3D91] mb-6">Matrice Procédurale (Étapes requises)</label>
                 
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                   {CATEGORIES.filter(c => c !== 'Autre').map(cat => (
                     <div key={cat} className="bg-gray-50 p-6 border-t-2 border-[#0B3D91]">
                       <h4 className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#0B3D91] mb-4">{cat}</h4>
                       <div className="flex flex-col gap-3">
                         {STANDARD_STEPS.filter(s => s.categorie === cat).map(step => {
                           const isSelected = selectedSteps.some(s => s.nom === step.nom);
                           return (
                             <button 
                               key={step.nom}
                               type="button"
                               onClick={() => toggleStep(step)}
                               className="flex items-start text-left gap-3 focus:outline-none group"
                             >
                               <div className={`mt-1 flex-shrink-0 w-4 h-4 border flex items-center justify-center transition-colors ${isSelected ? 'bg-[#059669] border-[#059669]' : 'border-gray-300 group-hover:border-[#0B3D91]'}`}>
                                 {isSelected && <Check className="w-3 h-3 text-white" />}
                               </div>
                               <span className={`text-[10px] font-bold uppercase tracking-widest leading-snug transition-colors ${isSelected ? 'text-[#059669]' : 'text-gray-500 group-hover:text-gray-900'}`}>{step.nom}</span>
                             </button>
                           )
                         })}
                       </div>
                     </div>
                   ))}
                 </div>
               </div>
             </div>

             {/* Step 3: Custom Steps */}
             <div className={`${mobileStep === 3 ? 'flex flex-col gap-6 col-span-2' : 'hidden'} md:contents`}>
               <div className="col-span-2">
                 <div className="mt-8 bg-[#0B3D91]/5 p-6 border border-[#0B3D91]/10 flex flex-col md:flex-row gap-4 items-end">
                    <div className="flex-1 w-full">
                      <label className="block text-[8px] font-bold uppercase tracking-widest text-[#0B3D91] mb-2">Ajouter une étape spécifique</label>
                      <input 
                        type="text" 
                        className="w-full bg-white border border-gray-200 p-3 text-xs font-bold text-[#0B3D91] focus:outline-none focus:border-[#059669] transition-colors" 
                        value={customStepName} 
                        onChange={e => setCustomStepName(e.target.value)} 
                        placeholder="Ex: Entretien consulaire..." 
                      />
                    </div>
                    <div className="w-full md:w-1/3">
                      <label className="block text-[8px] font-bold uppercase tracking-widest text-[#0B3D91] mb-2">Catégorie</label>
                      <select 
                        className="w-full bg-white border border-gray-200 p-3 text-xs font-bold text-[#0B3D91] focus:outline-none appearance-none"
                        value={customStepCat}
                        onChange={e => setCustomStepCat(e.target.value as ScholarshipStepCategory)}
                      >
                        {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                    <button 
                      type="button" 
                      onClick={handleAddCustomStep}
                      className="w-full md:w-auto bg-[#0B3D91] md:bg-white border border-[#0B3D91] text-white md:text-[#0B3D91] px-6 py-4 md:py-3 text-[10px] font-black uppercase tracking-widest hover:bg-[#0B3D91] hover:text-white transition-colors focus:outline-none"
                    >
                      Ajouter
                    </button>
                 </div>

                 {/* Affichage des étapes custom déjà ajoutées */}
                 {selectedSteps.filter(s => !STANDARD_STEPS.some(st => st.nom === s.nom)).length > 0 && (
                   <div className="mt-6">
                      <h4 className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#0B3D91] mb-3">Étapes Personnalisées Ajoutées :</h4>
                      <div className="flex flex-wrap gap-2">
                         {selectedSteps.filter(s => !STANDARD_STEPS.some(st => st.nom === s.nom)).map((cs, idx) => (
                           <span key={idx} className="bg-[#059669] text-white px-3 py-1 text-[9px] font-bold uppercase tracking-widest flex items-center gap-2">
                              {cs.nom} <span className="text-white/50">({cs.categorie})</span>
                           </span>
                         ))}
                      </div>
                   </div>
                 )}
               </div>
             </div>

             {/* Mobile Navigation */}
             <div className="md:hidden col-span-2 flex justify-between gap-4 mt-6">
                {mobileStep > 1 && (
                  <button type="button" onClick={() => setMobileStep(m => m - 1)} className="flex items-center justify-center gap-2 bg-gray-200 text-gray-700 w-1/3 py-4 text-[10px] font-black uppercase tracking-widest transition-colors focus:outline-none">
                     <ChevronLeft className="w-4 h-4" /> RETOUR
                  </button>
                )}
                {mobileStep < 3 ? (
                  <button type="button" onClick={() => {
                    if (mobileStep === 1 && (!formData.titre.trim() || !formData.institution.trim())) {
                      alert("Veuillez remplir le titre et l'institution.");
                      return;
                    }
                    setMobileStep(m => m + 1);
                  }} className={`${mobileStep === 1 ? 'w-full' : 'flex-1'} flex items-center justify-center gap-2 bg-[#0B3D91] text-white py-4 text-[10px] font-black uppercase tracking-widest transition-colors focus:outline-none`}>
                     ÉTAPE SUIVANTE <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button type="submit" className="flex-1 flex items-center justify-center gap-2 bg-[#5BB774] text-white py-4 text-[10px] font-black uppercase tracking-widest transition-colors focus:outline-none">
                     VALIDER <Check className="w-4 h-4" />
                  </button>
                )}
             </div>

             {/* Desktop Submit */}
             <div className="hidden md:block col-span-2 mt-8">
                <button type="submit" className="w-full bg-[#0B3D91] text-white px-12 py-6 font-black uppercase tracking-[0.3em] text-sm hover:bg-[#059669] transition-colors focus:outline-none shadow-xl">
                  VALIDER MATRICE OPÉRATIONNELLE
                </button>
             </div>
           </form>
        </div>
      )}

      <div className="w-full">
        {scholarships.length === 0 ? (
          <p className="text-gray-500 font-bold uppercase tracking-widest text-xs py-12 text-center bg-white border border-gray-200">Aucune donnée trouvée.</p>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden md:block">
              <table className="w-full text-left border-collapse border border-gray-200 bg-white">
                <thead>
                  <tr className="bg-gray-100 border-b-2 border-[#0B3D91]">
                    <th className="py-6 px-6 text-[9px] font-black uppercase tracking-[0.2em] text-gray-500">ID.</th>
                    <th className="py-6 px-6 text-[9px] font-black uppercase tracking-[0.2em] text-gray-500">Programme Universitaire</th>
                    <th className="py-6 px-6 text-[9px] font-black uppercase tracking-[0.2em] text-gray-500">Flux (A / B)</th>
                    <th className="py-6 px-6 text-[9px] font-black uppercase tracking-[0.2em] text-gray-500">Procédure</th>
                    <th className="py-6 px-6 text-[9px] font-black uppercase tracking-[0.2em] text-gray-500">Statut</th>
                  </tr>
                </thead>
                <tbody>
                  {scholarships.map(s => (
                    <tr key={s.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="py-6 px-6 font-mono text-[10px] font-bold text-gray-400">{s.id}</td>
                      <td className="py-6 px-6">
                         <p className="font-black text-[#0B3D91] uppercase tracking-tighter text-base">{s.titre}</p>
                         <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mt-1">{s.institution}</p>
                      </td>
                      <td className="py-6 px-6">
                         <span className="font-mono font-black text-gray-900">${s.fraisDossier}</span> 
                         <span className="text-gray-300 mx-2">/</span> 
                         <span className="font-mono font-bold text-[#5BB774]">${s.fraisAccompagnement}</span>
                      </td>
                      <td className="py-6 px-6">
                         <span className="text-[10px] font-bold uppercase tracking-widest text-[#0B3D91] px-2 py-1 bg-[#0B3D91]/5 border border-[#0B3D91]/10">
                           {s.etapes.length} ÉTAPES
                         </span>
                      </td>
                      <td className="py-6 px-6">
                         <div className="flex gap-4 items-center">
                           <span className={`text-[9px] font-black uppercase tracking-[0.3em] px-3 py-2 ${s.statut === 'Actif' ? 'bg-[#5BB774] text-white' : 'bg-gray-200 text-gray-500'}`}>
                             {s.statut}
                           </span>
                           <button onClick={() => handleEdit(s)} className="p-2 text-gray-400 hover:text-[#0B3D91] transition-colors" title="Modifier">
                             <Edit2 className="w-4 h-4" />
                           </button>
                           <button onClick={() => handleDelete(s.id)} className="p-2 text-gray-400 hover:text-[#059669] transition-colors" title="Supprimer">
                             <Trash2 className="w-4 h-4" />
                           </button>
                         </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden flex flex-col gap-4">
              {scholarships.map(s => (
                <div key={s.id} className="bg-white border top-0 border-gray-200 p-5 flex flex-col gap-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-black text-[#0B3D91] uppercase tracking-tighter text-lg leading-tight mb-1">{s.titre}</p>
                      <p className="text-[9px] font-bold uppercase tracking-widest text-gray-400">{s.institution}</p>
                    </div>
                    <span className={`shrink-0 text-[8px] font-black uppercase tracking-[0.3em] px-2 py-1 ml-4 ${s.statut === 'Actif' ? 'bg-[#5BB774] text-white' : 'bg-gray-200 text-gray-500'}`}>
                      {s.statut}
                    </span>
                  </div>

                  <div className="flex justify-between items-end pt-4 border-t border-gray-100">
                    <div>
                      <p className="font-mono text-[9px] font-bold text-gray-400 mb-2">{s.id}</p>
                      <div className="flex items-center gap-3">
                         <span className="text-[9px] font-bold uppercase tracking-widest text-[#0B3D91] px-2 py-1 bg-[#0B3D91]/5 border border-[#0B3D91]/10">
                           {s.etapes.length} ÉTAPES
                         </span>
                         <button onClick={() => handleEdit(s)} className="text-gray-400 hover:text-[#0B3D91] p-1"><Edit2 className="w-4 h-4" /></button>
                         <button onClick={() => handleDelete(s.id)} className="text-gray-400 hover:text-[#059669] p-1"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-[8px] font-bold uppercase tracking-widest text-gray-400 mb-0.5">Frais / Accomp.</p>
                      <span className="font-mono text-xs font-black text-[#0B3D91]">${s.fraisDossier}</span> 
                      <span className="text-gray-300 mx-1">/</span> 
                      <span className="font-mono text-xs font-bold text-[#5BB774]">${s.fraisAccompagnement}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
