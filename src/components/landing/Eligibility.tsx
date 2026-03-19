import SectionWrapper from "./SectionWrapper";
import { GraduationCap, Flame, FolderCheck, ArrowRightCircle } from "lucide-react";

const criteria = [
  { icon: GraduationCap, text: "Diplôme d'État obtenu (ou niveau supérieur : Graduat, Licence, Master, Doctorat)" },
  { icon: Flame, text: "Motivation clairement exprimée et projet défini" },
  { icon: FolderCheck, text: "Sérieux du projet académique et professionnel" },
  { icon: ArrowRightCircle, text: "Engagement actif dans le processus de candidature" },
];

const Eligibility = () => (
  <SectionWrapper id="eligibilite">
    <p className="text-sm font-semibold tracking-widest uppercase text-accent mb-2">Critères</p>
    <h2 className="text-2xl md:text-3xl font-bold mb-10">Conditions d'éligibilité</h2>
    <div className="space-y-5">
      {criteria.map((c) => {
        const Icon = c.icon;
        return (
          <div key={c.text} className="flex items-center gap-4">
            <div className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
              <Icon className="w-4 h-4 text-primary" />
            </div>
            <p className="text-foreground">{c.text}</p>
          </div>
        );
      })}
    </div>
  </SectionWrapper>
);

export default Eligibility;
