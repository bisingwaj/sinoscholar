import SectionWrapper from "./SectionWrapper";

const items = [
  {
    title: "Orientation académique",
    description: "Un accompagnement structuré pour identifier les programmes universitaires adaptés à votre profil et à vos objectifs professionnels.",
  },
  {
    title: "Processus encadré",
    description: "Chaque étape — de la préparation du dossier à la soumission finale — est guidée par une méthodologie éprouvée.",
  },
  {
    title: "Ouverture internationale",
    description: "Le programme facilite l'accès aux institutions d'enseignement supérieur chinoises reconnues à l'échelle mondiale.",
  },
];

const About = () => (
  <>
    {/* =========================================
        MOBILE VERSION (Strictly Original)
        ========================================= */}
    <div className="md:hidden">
      <div id="programme" className="w-full bg-[#F8F9FA] border-b border-gray-200 flex flex-col pt-32 pb-24 px-8">
        <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#059669] mb-8">
          LA MISSION
        </p>
        <h2 className="text-[40px] md:text-[52px] lg:text-[64px] font-black uppercase tracking-tighter leading-[0.9] mb-16 text-[#0B3D91] break-normal">
          L'EXCELLENCE<br/>ACADÉMIQUE.
        </h2>
        <div className="flex flex-col border-t border-[#0B3D91]/20">
          {items.map((item, idx) => (
            <div key={item.title} className="py-8 border-b border-[#0B3D91]/20">
              <span className="text-4xl font-light text-[#0B3D91] mb-2 block">0{idx + 1}</span>
              <h3 className="text-xl font-black text-[#0B3D91] uppercase tracking-tighter mb-4">{item.title}</h3>
              <p className="text-[15px] sm:text-base text-[#0B3D91]/80 font-medium leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* =========================================
        DESKTOP VERSION (Institutionnel Blanc/Gris)
        ========================================= */}
    <section id="programme-desktop" className="hidden md:block py-28 px-12 bg-[#F8F9FA] w-full">
      <div className="max-w-7xl mx-auto flex gap-16">
        <div className="w-1/3 shrink-0">
          <div className="h-1 w-12 bg-[#059669] mb-6"></div>
          <h2 className="text-4xl font-black uppercase text-[#0B3D91] leading-tight mb-6">La mission du Programme d'Excellence</h2>
          <p className="text-lg text-slate-600 font-medium leading-relaxed">
            Former les futurs leaders de la République Démocratique du Congo en structurant rigoureusement leur intégration dans l'élite académique asiatique.
          </p>
        </div>
        <div className="flex-1 grid grid-cols-2 gap-x-12 gap-y-10">
          {items.map((item, idx) => (
            <div key={item.title} className="bg-white p-8 border-l-4 border-[#0B3D91] shadow-sm">
              <span className="text-[#0B3D91]/20 font-black text-5xl block mb-2 leading-none">0{idx + 1}</span>
              <h3 className="text-lg font-bold text-[#0B3D91] uppercase mb-3">{item.title}</h3>
              <p className="text-sm text-slate-600 font-medium leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  </>
);

export default About;
