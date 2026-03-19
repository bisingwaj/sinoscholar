import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAdmin } from "../../context/AdminContext";
import { CheckCircle2, Circle, ChevronDown, ChevronUp } from "lucide-react";

export default function CandidatureMatriceTab() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { applications, scholarships, updateApplication } = useAdmin();
  const app = applications.find(a => a.id === id);
  const scholarship = app?.bourseId ? scholarships.find(s => s.id === app.bourseId) : null;

  const [attachValue, setAttachValue] = useState(app?.bourseId ?? "");

  if (!app) return null;

  const handleAttach = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setAttachValue(val);
    updateApplication(app.id, {
      bourseId: val || null,
      status: val ? "En traitement" : app.status
    });
  };

  const handleStepToggle = (stepId: string) => {
    const etapes = app.etapesValidees.includes(stepId)
      ? app.etapesValidees.filter(e => e !== stepId)
      : [...app.etapesValidees, stepId];
    updateApplication(app.id, { etapesValidees: etapes });
  };

  const handleOptionToggle = (stepId: string, option: 'gratuit' | 'accompagne') => {
    const opts = { ...(app.etapesOptions || {}), [stepId]: option };
    updateApplication(app.id, { etapesOptions: opts });
  };

  // Compute total
  const totalCost = scholarship?.etapes.reduce((acc, e) => {
    const isAccompagne = app.etapesOptions?.[e.id] === 'accompagne';
    const isGratuit = app.etapesOptions?.[e.id] === 'gratuit';
    if (isGratuit) return acc;
    return acc + (e.cout ?? 0);
  }, 0) ?? 0;

  return (
    <div className="p-6 md:p-10 pb-24 md:pb-10">
      <h2 className="text-3xl font-black uppercase tracking-tighter text-[#0B3D91] leading-none mb-8 border-b-2 border-[#0B3D91] pb-4">
        MATRICE & TARIFICATION_
      </h2>

      {/* Scholarship selector */}
      <div className="mb-10 bg-[#F8F9FA] border-2 border-dashed border-[#0B3D91]/30 p-8">
        <label className="block text-[9px] font-black uppercase tracking-widest text-[#0B3D91] mb-4">
          Programme Associé
        </label>
        <select
          className="w-full bg-white border-2 border-[#0B3D91] p-4 text-base font-black text-[#0B3D91] uppercase focus:outline-none appearance-none cursor-pointer"
          value={attachValue}
          onChange={handleAttach}
        >
          <option value="">— SÉLECTIONNER UN PROGRAMME —</option>
          {scholarships.map(s => (
            <option key={s.id} value={s.id}>{s.titre} ({s.id})</option>
          ))}
        </select>
      </div>

      {!scholarship && (
        <div className="bg-[#FFF3F3] border border-[#059669] p-8 text-[#059669] text-sm font-bold uppercase tracking-widest">
          Veuillez sélectionner un programme pour afficher la matrice.
        </div>
      )}

      {scholarship && (
        <>
          {/* Grouped steps */}
          {(['Pré-requis', 'Académique', 'Visa & Logistique', 'Autre'] as const).map(cat => {
            const steps = scholarship.etapes.filter(e => e.categorie === cat);
            if (!steps.length) return null;
            return (
              <div key={cat} className="mb-8">
                <h3 className="text-[10px] uppercase font-black tracking-[0.3em] text-gray-400 border-b border-gray-200 pb-3 mb-4">{cat}</h3>
                <div className="flex flex-col gap-3">
                  {steps.map(etape => {
                    const isDone = app.etapesValidees.includes(etape.id);
                    const option = app.etapesOptions?.[etape.id];
                    const isGratuit = option === 'gratuit';
                    const isAccompagne = option === 'accompagne';

                    return (
                      <div key={etape.id} className={`flex flex-col md:flex-row md:items-center gap-3 p-4 md:p-5 border ${isDone ? 'border-[#5BB774] bg-[#5BB774]/5' : 'border-gray-100 bg-white hover:bg-gray-50'} transition-colors`}>
                        <div className="flex items-center gap-3 w-full md:w-auto md:flex-1 min-w-0">
                          {/* Step toggle */}
                          <button onClick={() => handleStepToggle(etape.id)} className="focus:outline-none shrink-0">
                            {isDone
                              ? <CheckCircle2 className="w-6 h-6 text-[#5BB774]" />
                              : <Circle className="w-6 h-6 text-gray-300" />
                            }
                          </button>
  
                          {/* Step name */}
                          <div className="flex-1 min-w-0">
                            <p className={`text-xs md:text-sm font-bold uppercase tracking-wide ${isDone ? 'text-[#5BB774]' : 'text-[#0B3D91]'}`}>
                              {etape.nom}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between w-full md:w-auto gap-4 pl-9 md:pl-0">
                          {/* Cost badge */}
                          <div className="shrink-0 text-left md:text-right">
                            {etape.cout === 0 || etape.cout === undefined ? (
                              <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 bg-gray-100 px-3 py-1">INCLUS</span>
                            ) : (
                              <span className={`text-lg font-mono font-black ${isGratuit ? 'text-gray-400 line-through' : 'text-[#0B3D91]'}`}>
                                ${etape.cout}
                              </span>
                            )}
                          </div>

                          {/* Gratuit / Accompagnement toggle (only if available) */}
                          {etape.accompagnementDisponible && (etape.cout ?? 0) > 0 && (
                            <div className="flex gap-2 shrink-0">
                              <button
                                onClick={() => handleOptionToggle(etape.id, 'gratuit')}
                                className={`px-2 py-1.5 md:px-3 text-[8px] md:text-[9px] font-black uppercase tracking-widest focus:outline-none transition-colors ${isGratuit ? 'bg-gray-800 text-white' : 'border border-gray-200 text-gray-400 hover:border-gray-400'}`}
                              >
                                Gratuit
                              </button>
                              <button
                                onClick={() => handleOptionToggle(etape.id, 'accompagne')}
                                className={`px-2 py-1.5 md:px-3 text-[8px] md:text-[9px] font-black uppercase tracking-widest focus:outline-none transition-colors ${isAccompagne ? 'bg-[#059669] text-white' : 'border border-gray-200 text-gray-400 hover:border-[#059669] hover:text-[#059669]'}`}
                              >
                                Accomp.
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}

          {/* Summary total */}
          {/* Summary total */}
          <div className="mt-10 bg-[#0B3D91] text-white p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <p className="text-[9px] font-black uppercase tracking-[0.3em] text-[#8DE5A5] mb-1">Total Estimé du Programme</p>
              <p className="text-[10px] font-bold text-white/60">(hors étapes marquées « Gratuit »)</p>
            </div>
            <p className="text-4xl md:text-5xl font-mono font-black text-[#8DE5A5]">${totalCost.toLocaleString()}</p>
          </div>
        </>
      )}
    </div>
  );
}
