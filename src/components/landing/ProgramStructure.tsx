import SectionWrapper from "./SectionWrapper";
import { FileText, UserCheck, Compass, Handshake, Send } from "lucide-react";

const steps = [
  { icon: FileText, title: "Dossier", desc: "Soumission du formulaire de candidature" },
  { icon: UserCheck, title: "Analyse", desc: "Évaluation et vérification des critères" },
  { icon: Compass, title: "Orientation", desc: "Identification des universités ciblées" },
  { icon: Handshake, title: "Acheminement", desc: "Préparation certifiée du dossier" },
  { icon: Send, title: "Soumission", desc: "Dépôt officiel auprès des institutions" },
];

const ProgramStructure = () => (
  <>
    {/* =========================================
        MOBILE VERSION (Strictly Original)
        ========================================= */}
    <div className="md:hidden">
      <div id="processus" className="w-full bg-white border-b border-gray-200 flex flex-col pt-32 pb-24 px-8">
        <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#5BB774] mb-8">
          LE PROTOCOLE
        </p>
        <h2 className="text-[52px] sm:text-[64px] font-black uppercase tracking-tighter leading-[0.9] mb-16 text-[#0B3D91] break-words">
          SÉLECTION<br/>STRICTE.
        </h2>
        <div className="flex flex-col border-t border-[#0B3D91]/20">
          {steps.map((step, i) => {
            return (
              <div key={step.title} className="py-8 border-b border-[#0B3D91]/20 flex flex-col">
                <div className="flex justify-between items-end mb-4">
                  <h3 className="text-2xl font-black uppercase text-[#0B3D91] tracking-tighter">{step.title}</h3>
                  <span className="text-2xl font-light text-[#059669]">0{i + 1}</span>
                </div>
                <p className="text-[11px] text-[#0B3D91]/70 font-bold uppercase tracking-[0.1em]">{step.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>

    {/* =========================================
        DESKTOP VERSION (Institutionnel structuré)
        ========================================= */}
    <section id="processus-desktop" className="hidden md:block py-28 px-12 bg-white w-full border-y border-gray-100">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <div className="h-1 w-12 bg-[#0B3D91] mx-auto mb-6"></div>
          <h2 className="text-4xl font-black uppercase text-[#0B3D91] tracking-tight">Le Protocole de Sélection</h2>
        </div>
        <div className="flex justify-between relative max-w-5xl mx-auto">
          {/* Ligne connectrice fond */}
          <div className="absolute top-8 left-0 right-0 h-1 bg-gray-100 z-0 hidden lg:block"></div>
          
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div key={step.title} className="relative z-10 flex flex-col items-center text-center w-40">
                <div className="w-16 h-16 rounded-full border-4 border-white bg-[#5BB774] text-white flex items-center justify-center mb-6 shadow-md transition-transform hover:scale-110">
                  <span className="font-bold text-xl">{i + 1}</span>
                </div>
                <h3 className="text-sm font-bold text-[#0B3D91] uppercase mb-3">{step.title}</h3>
                <p className="text-xs font-medium text-slate-500 tracking-wide leading-relaxed">{step.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  </>
);

export default ProgramStructure;
