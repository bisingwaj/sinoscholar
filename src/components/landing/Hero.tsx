import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface HeroProps {
  onApply: () => void;
}

const Hero = ({ onApply }: HeroProps) => {
  return (
    <>
      {/* =========================================
          MOBILE VERSION (Strictly Original)
          ========================================= */}
      <div className="md:hidden">
        <section className="min-h-[90vh] pt-32 pb-24 px-8 flex flex-col justify-center bg-[#F8F9FA] border-b border-gray-200">
          <div className="w-full flex flex-col mt-auto mb-auto text-left">
            <div className="w-12 h-1 bg-[#DE2910] mb-12"></div>
            <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#DE2910] mb-8">
              Candidature Bourses d'Études - Cohorte 2026
            </p>
            <h1 className="text-[32px] sm:text-[42px] md:text-[48px] font-black uppercase tracking-tighter leading-[1.0] mb-12 text-[#0B3D91] break-normal">
              PROGRAMME DE<br/>COOPÉRATION<br/>ACADÉMIQUE<br/><span className="text-[#0B3D91] opacity-60">SINO-CONGOLAISE.</span>
            </h1>
            <p className="text-[15px] sm:text-base text-[#0B3D91] leading-relaxed font-medium pl-6 border-l-2 border-[#DE2910] max-w-sm mb-16 opacity-90">
              Une initiative d'excellence offrant des bourses d'études complètes pour accéder aux meilleures institutions universitaires chinoises.
            </p>
            
            <div className="flex flex-col space-y-4 w-full">
              <button 
                onClick={onApply} 
                className="w-full bg-[#0B3D91] text-white px-8 py-6 text-[11px] sm:text-xs font-black uppercase tracking-[0.2em] shadow-xl hover:bg-[#DE2910] transition-all rounded-none"
              >
                DÉPOSER MA CANDIDATURE
              </button>
              <button 
                onClick={() => { document.getElementById('pourquoi-chine')?.scrollIntoView({ behavior: 'smooth' }); }} 
                className="w-full border-2 border-[#0B3D91] bg-transparent text-[#0B3D91] hover:bg-[#0B3D91] hover:text-white px-8 py-6 text-[11px] sm:text-xs font-black uppercase tracking-[0.2em] transition-all rounded-none"
              >
                CONSULTER LE PROTOCOLE
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* =========================================
          DESKTOP VERSION (Dossier Diplomatique)
          ========================================= */}
      <section className="hidden md:flex relative w-full bg-[#0B3D91] min-h-[90vh] items-center overflow-hidden pt-20">
        {/* Decorative Diagonal Pill Patterns */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.10]">
          <div className="absolute w-[1000px] h-48 rounded-[100px] bg-white -rotate-[15deg] -top-20 -left-64"></div>
          <div className="absolute w-[800px] h-48 rounded-[100px] bg-white -rotate-[15deg] top-64 right-10"></div>
          <div className="absolute w-[1200px] h-48 rounded-[100px] bg-white -rotate-[15deg] -bottom-32 -left-32"></div>
        </div>

        <div className="relative z-10 max-w-[1400px] mx-auto px-12 w-full grid grid-cols-12 gap-16 items-center">
          
          {/* Left Zone: The Imposing Title and Text */}
          <div className="col-span-12 lg:col-span-8 flex flex-col justify-center">
            <div className="inline-flex items-center mb-10 text-white text-[10px] font-black tracking-[0.2em] uppercase opacity-80">
              <span className="flex h-2 w-2 bg-[#DE2910] mr-4"></span>
              Bourses d'Études — Cohorte 2026/2027
            </div>
            
            <h1 className="text-6xl lg:text-7xl xl:text-[80px] font-black uppercase tracking-tighter mb-8 leading-[0.95] text-white">
              Programme de <br/> Coopération <br/> Académique <br/> RDC-Chine
            </h1>
            
            <div className="w-16 h-1.5 bg-[#DE2910] mb-8"></div>

            <p className="text-sm lg:text-base text-white/70 mb-12 max-w-lg font-medium leading-relaxed tracking-wide">
              L'excellence académique au service des talents congolais. Intégrez les universités chinoises de rang mondial via un accompagnement structuré, sécurisé et exclusif pour le cycle 2026.
            </p>
            
            <div className="flex items-center gap-6">
              <Button size="lg" onClick={onApply} className="bg-[#DE2910] text-white hover:bg-[#B71C1C] h-14 px-8 rounded-sm text-sm font-black uppercase tracking-widest shadow-lg transition-transform hover:scale-105 border-0">
                Déposer un dossier
                <ArrowRight className="ml-3 w-4 h-4 stroke-[2.5]" />
              </Button>
              <Button size="lg" variant="outline" onClick={() => {
                document.getElementById('pourquoi-chine-desktop')?.scrollIntoView({ behavior: 'smooth' });
              }} className="h-14 px-8 rounded-sm text-sm font-bold uppercase tracking-widest border border-white/30 text-white bg-transparent hover:bg-white/10 transition-colors">
                Découvrir le programme
              </Button>
            </div>
          </div>

          {/* Right Zone: The Metadata Cartouche */}
          <div className="col-span-12 lg:col-span-4 hidden lg:flex flex-col justify-center">
             <div className="border border-white/20 bg-white/5 backdrop-blur-md p-10 rounded-sm shadow-2xl relative">
                {/* Official Stamp Corner */}
                <div className="absolute top-0 right-0 w-16 h-16 border-l border-b border-white/20 flex items-center justify-center bg-white/5">
                   <div className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center">
                      <div className="w-3 h-3 rounded-full border border-white/30"></div>
                   </div>
                </div>

                <div className="mb-8">
                  <p className="text-[10px] font-bold text-white/50 tracking-[0.2em] uppercase mb-1">Coordination des Admissions</p>
                  <p className="text-sm font-black text-white tracking-widest uppercase">PCARC Kinshasa</p>
                </div>

                <div className="space-y-6">
                  {/* Item 1 */}
                  <div className="border-b border-white/10 pb-4">
                    <p className="text-[9px] font-bold text-white/50 tracking-[0.2em] uppercase mb-2">Statut Session 2026</p>
                    <div className="flex items-center">
                      <span className="flex h-2 w-2 rounded-full bg-[#5BB774] mr-3 animate-pulse shadow-[0_0_8px_#5BB774]"></span>
                      <p className="text-xs font-black text-white tracking-widest uppercase">Active - Phase 1</p>
                    </div>
                  </div>
                  {/* Item 2 */}
                  <div className="border-b border-white/10 pb-4">
                    <p className="text-[9px] font-bold text-white/50 tracking-[0.2em] uppercase mb-2">Places Allouées</p>
                    <p className="text-xs font-black text-white tracking-widest uppercase">Sélection Stricte</p>
                  </div>
                  {/* Item 3 */}
                  <div className="border-b border-white/10 pb-4">
                    <p className="text-[9px] font-bold text-white/50 tracking-[0.2em] uppercase mb-2">Prise en charge</p>
                    <p className="text-xs font-black text-white tracking-widest uppercase">Frais Scolaires & Logement</p>
                  </div>
                  {/* Item 4 */}
                  <div>
                    <p className="text-[9px] font-bold text-white/50 tracking-[0.2em] uppercase mb-2">Voie d'Admission</p>
                    <p className="text-xs font-black text-[#5BB774] tracking-widest uppercase">Sélection d'Excellence</p>
                  </div>
                </div>
             </div>
          </div>

        </div>
      </section>
    </>
  );
};

export default Hero;
