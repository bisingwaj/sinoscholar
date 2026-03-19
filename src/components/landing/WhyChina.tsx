import SectionWrapper from "./SectionWrapper";
import { Globe, ShieldCheck, Landmark } from "lucide-react";

const WhyChina = () => {
  return (
    <>
      {/* =========================================
          MOBILE VERSION (Strictly Original)
          ========================================= */}
      <div className="md:hidden w-full bg-white border-b border-gray-200">
        <div id="pourquoi-chine" className="pt-32 pb-24 px-8 w-full flex flex-col">
          <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#5BB774] mb-8">
            UN TREMPLIN EXCLUSIF
          </p>
          <h2 className="text-[52px] sm:text-[64px] font-black uppercase tracking-tighter leading-[0.9] mb-16 text-[#0B3D91] break-words">
            LE PREMIER<br/>HUB<br/><span className="text-[#0B3D91] opacity-60">MONDIAL.</span>
          </h2>

          {/* Stats List */}
          <div className="flex flex-col border-t border-[#0B3D91]/20 mb-16">
            <div className="py-8 border-b border-[#0B3D91]/20 flex justify-between items-center group">
              <span className="text-[10px] sm:text-[11px] uppercase font-bold text-[#0B3D91]/60 tracking-[0.2em] w-1/2 group-hover:text-[#0B3D91] transition-colors">Dépôt Mondial de Brevets</span>
              <span className="text-6xl sm:text-7xl font-light text-[#0B3D91] tracking-tighter">N°1</span>
            </div>
            <div className="py-8 border-b border-[#0B3D91]/20 flex justify-between items-center group">
              <span className="text-[10px] sm:text-[11px] uppercase font-bold text-[#0B3D91]/60 tracking-[0.2em] w-1/2 group-hover:text-[#0B3D91] transition-colors">Top 500 Universitaire</span>
              <span className="text-6xl sm:text-7xl font-light text-[#0B3D91] tracking-tighter">+100</span>
            </div>
            <div className="py-8 border-b border-[#0B3D91]/20 flex justify-between items-center group">
              <span className="text-[10px] sm:text-[11px] uppercase font-bold text-[#0B3D91]/60 tracking-[0.2em] w-1/2 group-hover:text-[#0B3D91] transition-colors">Allocations Centrales</span>
              <span className="text-6xl sm:text-7xl font-light text-[#0B3D91] tracking-tighter">100%</span>
            </div>
          </div>

          {/* Pillars Linear List */}
          <div className="flex flex-col space-y-12">
            <div>
              <h3 className="text-lg font-black uppercase text-[#0B3D91] mb-4 tracking-widest border-l-2 border-[#5BB774] pl-5">1. INTÉGRATION ACADÉMIQUE</h3>
              <p className="text-[15px] sm:text-base text-[#0B3D91]/80 leading-relaxed font-medium pl-6">
                Accès exclusif aux institutions du Projet 985 et Double First Class. Validation de cursus accrédités.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-black uppercase text-[#0B3D91] mb-4 tracking-widest border-l-2 border-[#5BB774] pl-5">2. ENCADREMENT CONSULAIRE</h3>
              <p className="text-[15px] sm:text-base text-[#0B3D91]/80 leading-relaxed font-medium pl-6">
                Prise en charge administrative stricte, de la constitution du dossier de visa jusqu'à l'incorporation sur campus.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-black uppercase text-[#0B3D91] mb-4 tracking-widest border-l-2 border-[#5BB774] pl-5">3. FINANCEMENT BILATÉRAL</h3>
              <p className="text-[15px] sm:text-base text-[#0B3D91]/80 leading-relaxed font-medium pl-6">
                Assignation de fonds couvrant l'exonération des frais de scolarité en vertu des accords en vigueur.
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* =========================================
          DESKTOP VERSION (Minimaliste, Fluide & Structuré)
          ========================================= */}
      <section id="pourquoi-chine-desktop" className="hidden md:block relative w-full bg-[#5BB774] py-32 overflow-hidden">
        {/* Decorative Diagonal Patterns Softened */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.05]">
          <div className="absolute w-[800px] h-32 rounded-full bg-white -rotate-[15deg] -top-10 -left-64"></div>
          <div className="absolute w-[1200px] h-48 rounded-full bg-white -rotate-[15deg] top-64 right-10"></div>
          <div className="absolute w-[1000px] h-48 rounded-full bg-white -rotate-[15deg] -bottom-32 -left-32"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-12">
          
          <div className="flex flex-col items-center text-center mb-20">
            <p className="text-sm font-bold tracking-widest uppercase text-white/90 mb-4">
              La Superpuissance Académique Mondiale
            </p>
            <h2 className="text-4xl lg:text-5xl font-black uppercase tracking-tight leading-[1.1] max-w-4xl text-white">
              Les opportunités d'excellence <br/>pour les étudiants congolais
            </h2>
          </div>

          {/* The Stats Ribbon - One single elegant floating element */}
          <div className="bg-white rounded-2xl shadow-xl flex items-stretch mb-24 max-w-5xl mx-auto">
            <div className="flex-1 px-8 py-10 text-center border-r border-gray-100 flex flex-col justify-center">
              <span className="text-5xl font-black text-[#0B3D91] mb-2 tracking-tighter">N°1</span>
              <span className="text-[11px] uppercase font-bold text-slate-500 tracking-widest leading-relaxed">Déposant mondial<br/>de Brevets R&D</span>
            </div>
            <div className="flex-1 px-8 py-10 text-center border-r border-gray-100 flex flex-col justify-center">
              <span className="text-5xl font-black text-[#0B3D91] mb-2 tracking-tighter">+100</span>
              <span className="text-[11px] uppercase font-bold text-slate-500 tracking-widest leading-relaxed">Universités dans le<br/>TOP 500 Mondial</span>
            </div>
            <div className="flex-1 px-8 py-10 text-center flex flex-col justify-center">
              <span className="text-5xl font-black text-[#0B3D91] mb-2 tracking-tighter">1er</span>
              <span className="text-[11px] uppercase font-bold text-slate-500 tracking-widest leading-relaxed">Partenaire économique<br/>de l'Afrique</span>
            </div>
          </div>

          {/* The 3 Pillars - Ultra Minimalist, rounded, floating */}
          <div className="grid grid-cols-3 gap-10 max-w-6xl mx-auto">
            {/* Pillar 1 */}
            <div className="bg-white rounded-2xl p-10 hover:shadow-2xl transition-all duration-300 group">
              <div className="w-14 h-14 bg-[#5BB774]/10 rounded-xl flex items-center justify-center mb-8 group-hover:bg-[#5BB774] transition-colors">
                <Globe className="w-7 h-7 text-[#5BB774] group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-lg font-black uppercase mb-4 text-[#0B3D91]">Éducation Mondialisée</h3>
              <p className="text-slate-600 leading-relaxed font-medium text-sm">
                Accès direct aux institutions prestigieuses du Projet 985 et Double First Class. Validez un diplôme d'ingénierie ou de commerce de haute volée internationale.
              </p>
            </div>

            {/* Pillar 2 */}
            <div className="bg-white rounded-2xl p-10 hover:shadow-2xl transition-all duration-300 group">
              <div className="w-14 h-14 bg-[#5BB774]/10 rounded-xl flex items-center justify-center mb-8 group-hover:bg-[#5BB774] transition-colors">
                <ShieldCheck className="w-7 h-7 text-[#5BB774] group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-lg font-black uppercase mb-4 text-[#0B3D91]">Accompagnement Sécurisé</h3>
              <p className="text-slate-600 leading-relaxed font-medium text-sm">
                Profitez d'une prise en charge structurée. De la constitution infaillible de votre dossier de visa, jusqu'à votre installation sur le campus.
              </p>
            </div>

            {/* Pillar 3 */}
            <div className="bg-white rounded-2xl p-10 hover:shadow-2xl transition-all duration-300 group">
              <div className="w-14 h-14 bg-[#5BB774]/10 rounded-xl flex items-center justify-center mb-8 group-hover:bg-[#5BB774] transition-colors">
                <Landmark className="w-7 h-7 text-[#5BB774] group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-lg font-black uppercase mb-4 text-[#0B3D91]">Bourses d'Excellence</h3>
              <p className="text-slate-600 leading-relaxed font-medium text-sm">
                La Chine investit massivement. Intégrez les programmes bilatéraux majeurs octroyant la prise en charge complète des frais de scolarité et de vie.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default WhyChina;
