import SectionWrapper from "./SectionWrapper";
import { Target, BookOpen, Globe, UserCog } from "lucide-react";

const benefits = [
  { icon: Target, title: "Encadrement Structuré", desc: "Un cadre de contrôle méthodique pour vous guider à chaque étape critique du processus." },
  { icon: BookOpen, title: "Positionnement Élite", desc: "Une identification précise des programmes compatibles avec votre parcours initial." },
  { icon: Globe, title: "Réseau Académique", desc: "Une connexion institutionnelle avec les plateformes boursières chinoises majeures." },
  { icon: UserCog, title: "Suivi Nominatif", desc: "Un examen individuel et de conformité assuré pour l'ensemble du dossier déposé." },
];

const Benefits = () => (
  <>
    {/* =========================================
        MOBILE VERSION (Strictly Original)
        ========================================= */}
    <div className="md:hidden">
      <div id="avantages" className="w-full bg-[#F8F9FA] border-b border-gray-200 flex flex-col pt-32 pb-24 px-8">
        <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#0B3D91] mb-8">
          LA PLUS-VALUE
        </p>
        <h2 className="text-[52px] sm:text-[64px] font-black uppercase tracking-tighter leading-[0.9] mb-16 text-[#0B3D91] break-words">
          AVANTAGES<br/>PRO.
        </h2>
        <div className="flex flex-col space-y-12">
          {benefits.map((b) => {
            return (
              <div key={b.title} className="flex flex-col group">
                <div className="flex items-center gap-4 border-b-2 border-[#059669] pb-4 mb-4">
                  <h3 className="text-xl font-black text-[#0B3D91] uppercase tracking-widest">{b.title}</h3>
                </div>
                <p className="text-[15px] sm:text-base font-medium text-[#0B3D91]/80 leading-relaxed">{b.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>

    {/* =========================================
        DESKTOP VERSION (Institutionnel Blanc/Gris)
        ========================================= */}
    <section id="avantages-desktop" className="hidden md:block py-28 px-12 bg-[#F8F9FA] w-full">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-16">
          <div className="w-1/2">
            <div className="h-1 w-12 bg-[#059669] mb-6"></div>
            <h2 className="text-4xl font-black uppercase text-[#0B3D91] leading-tight">La Plus-Value Opérationnelle</h2>
          </div>
          <p className="w-1/3 text-slate-600 font-medium pb-2">
            Un déploiement logistique et administratif pensé pour maximiser vos chances d'intégration de haut niveau.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-8">
          {benefits.map((b) => {
            const Icon = b.icon;
            return (
              <div key={b.title} className="bg-white p-10 flex items-start gap-8 border border-gray-100 group hover:border-[#0B3D91]/30 transition-colors shadow-sm">
                <div className="bg-[#0B3D91]/5 p-5 rounded-sm flex-shrink-0 group-hover:bg-[#0B3D91] transition-colors">
                  <Icon className="w-8 h-8 text-[#0B3D91] group-hover:text-white transition-colors stroke-[2]" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#0B3D91] uppercase mb-3 tracking-wide">{b.title}</h3>
                  <p className="text-slate-600 leading-relaxed font-medium text-sm">{b.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  </>
);

export default Benefits;
