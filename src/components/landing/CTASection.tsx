import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface CTASectionProps {
  onApply: () => void;
}

const CTASection = ({ onApply }: CTASectionProps) => {
  return (
    <>
      {/* =========================================
          MOBILE VERSION (Strictly Original)
          ========================================= */}
      <div className="md:hidden">
        <section className="bg-white text-[#0B3D91] flex flex-col pt-32 pb-24 px-8 w-full border-b border-gray-200">
          <div className="w-12 h-1 bg-[#DE2910] mb-12"></div>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#DE2910] mb-8">
            SESSION DE BOURSES 2026/2027
          </p>
          <h2 className="text-[40px] md:text-[52px] lg:text-[64px] font-black uppercase tracking-tighter leading-[0.9] mb-16 text-[#0B3D91] break-normal">
            CANDIDA-<br/>TURES<br/><span className="text-[#0B3D91] opacity-60">OUVERTES.</span>
          </h2>
          <p className="text-[15px] sm:text-base text-[#0B3D91]/80 leading-relaxed font-medium mb-12 border-l-2 border-[#DE2910] pl-6">
            Le registre de candidatures aux bourses d'études est actuellement actif. Les profils seront évalués selon les standards d'excellence du programme.
          </p>
          <Button size="lg" onClick={onApply} className="bg-[#DE2910] text-white hover:bg-[#B71C1C] w-full py-6 text-[11px] sm:text-xs font-black uppercase tracking-[0.2em] shadow-xl rounded-none relative">
            DÉPOSER MA CANDIDATURE
          </Button>
        </section>
      </div>

      {/* =========================================
          DESKTOP VERSION (Rouge Institutionnel Action)
          ========================================= */}
      <section className="hidden md:flex relative w-full bg-[#059669] py-32 overflow-hidden items-center justify-center text-center">
        {/* Decorative Diagonal Pill Patterns */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div className="absolute w-[800px] h-32 rounded-full bg-white -rotate-[15deg] -top-10 -left-64"></div>
          <div className="absolute w-[600px] h-32 rounded-full bg-white -rotate-[15deg] top-10 right-10"></div>
          <div className="absolute w-[1200px] h-32 rounded-full bg-white -rotate-[15deg] -bottom-20 -left-32"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-12">
          <div className="inline-flex items-center justify-center mb-8 border border-white/20 bg-white/10 backdrop-blur-md px-6 py-2 rounded-sm text-white text-xs font-black tracking-widest uppercase shadow-sm">
            <span className="flex h-3 w-3 rounded-full bg-white mr-3 animate-pulse"></span>
            Clôture imminente des dossiers
          </div>

          <h2 className="text-5xl lg:text-7xl font-black uppercase tracking-tight mb-8 text-white leading-[1.05]">
            Candidatures Ouvertes <br/> pour la Rentrée 2026
          </h2>
          
          <p className="text-xl lg:text-2xl text-white/90 mb-14 max-w-3xl mx-auto font-medium leading-relaxed">
            Les places limitées pour le programme de bourses d'excellence exigent un traitement rigoureux. Mettez toutes les chances de votre côté.
          </p>
          
          <Button size="lg" onClick={onApply} className="bg-[#DE2910] text-white hover:bg-white hover:text-[#DE2910] h-20 px-16 rounded-sm text-xl font-black uppercase tracking-widest shadow-2xl transition-transform hover:scale-105 border-0">
            Démarrer ma candidature officielle
            <ArrowRight className="ml-4 w-6 h-6 stroke-[3]" />
          </Button>
        </div>
      </section>
    </>
  );
};

export default CTASection;
