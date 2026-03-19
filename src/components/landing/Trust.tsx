import SectionWrapper from "./SectionWrapper";
import { Shield, BarChart3, Users, Layers } from "lucide-react";

const items = [
  { icon: Shield, label: "Programme sélectif" },
  { icon: BarChart3, label: "Analyse des candidatures" },
  { icon: Users, label: "Places limitées" },
  { icon: Layers, label: "Processus structuré" },
];

const Trust = () => (
  <SectionWrapper className="bg-secondary">
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
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
);

export default Trust;
