import SectionWrapper from "./SectionWrapper";
import { Shield, BarChart3, Users, Layers } from "lucide-react";

const items = [
  { icon: Shield, label: "Programme sélectif" },
  { icon: BarChart3, label: "Analyse des candidatures" },
  { icon: Users, label: "Places limitées" },
  { icon: Layers, label: "Processus structuré" },
];

const Trust = () => (
  <>
    {/* =========================================
        MOBILE VERSION (Strictly Original)
        ========================================= */}
    <div className="md:hidden">
      <SectionWrapper className="bg-secondary">
        <div className="grid grid-cols-2 gap-6 text-center">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.label} className="py-4">
                <Icon className="w-6 h-6 text-primary mx-auto mb-3" />
                <p className="text-sm font-medium text-primary">{item.label}</p>
              </div>
            );
          })}
        </div>
      </SectionWrapper>
    </div>

    {/* =========================================
        DESKTOP VERSION (Institutionnel Bandeau)
        ========================================= */}
    <section className="hidden md:block py-16 px-12 bg-white w-full border-y border-gray-200">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-4 divide-x divide-gray-200 text-center">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.label} className="py-6 flex flex-col items-center justify-center group">
                <Icon className="w-8 h-8 text-[#0B3D91] mx-auto mb-4 stroke-[1.5] group-hover:scale-110 transition-transform" />
                <p className="text-sm font-black uppercase tracking-widest text-slate-800">{item.label}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  </>
);

export default Trust;
