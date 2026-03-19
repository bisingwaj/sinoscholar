import SectionWrapper from "./SectionWrapper";
import { GraduationCap, Flame, FolderCheck, ArrowRightCircle } from "lucide-react";

const criteria = [
  { icon: GraduationCap, text: "Diplôme d'État obtenu (ou niveau supérieur : Graduat, Licence, Master, Doctorat)" },
  { icon: Flame, text: "Motivation clairement exprimée et projet défini" },
  { icon: FolderCheck, text: "Sérieux du projet académique et professionnel" },
  { icon: ArrowRightCircle, text: "Engagement actif dans le processus de candidature" },
];

const Eligibility = () => (
  <>
    {/* =========================================
        MOBILE VERSION (Strictly Original)
        ========================================= */}
    <div className="md:hidden">
      <div id="eligibilite" className="w-full bg-[#0B3D91] border-b border-white/20 flex flex-col pt-32 pb-24 px-8">
        <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#5BB774] mb-8">
          CRITÈRES ACADÉMIQUES
        </p>
        <h2 className="text-[52px] sm:text-[64px] font-black uppercase tracking-tighter leading-[0.9] mb-16 text-white break-words">
          SÉLECTION<br/><span className="text-white/60">RIGOUREUSE.</span>
        </h2>
        <div className="flex flex-col border-t border-white/20">
          {criteria.map((c) => {
            const Icon = c.icon;
            return (
              <div key={c.text} className="py-8 border-b border-white/20 flex items-start gap-6 group">
                <div className="mt-1 shrink-0">
                  <Icon className="w-6 h-6 text-[#5BB774] opacity-80 group-hover:opacity-100 transition-opacity" />
                </div>
                <p className="text-[14px] sm:text-[15px] text-white/90 font-medium uppercase tracking-[0.15em] leading-relaxed">{c.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>

    {/* =========================================
        DESKTOP VERSION (Institutionnel Blanc/Gris)
        ========================================= */}
    <section id="eligibilite-desktop" className="hidden md:block py-28 px-12 bg-white w-full border-t border-gray-100">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        <div className="h-1 w-12 bg-[#0B3D91] mb-6"></div>
        <h2 className="text-4xl font-black uppercase text-[#0B3D91] leading-tight mb-20 text-center">
          Les conditions d'éligibilité académique
        </h2>
        
        <div className="grid grid-cols-2 gap-x-16 gap-y-10 w-full max-w-5xl">
          {criteria.map((c, i) => {
            const Icon = c.icon;
            return (
              <div key={c.text} className="flex items-center gap-6 p-8 bg-[#F8F9FA] border-l-4 border-[#5BB774] shadow-sm hover:shadow-md transition-shadow">
                <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center flex-shrink-0 shadow-sm">
                  <Icon className="w-6 h-6 text-[#5BB774] stroke-[2]" />
                </div>
                <p className="text-slate-800 font-bold uppercase tracking-wide text-sm leading-relaxed">{c.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  </>
);

export default Eligibility;
