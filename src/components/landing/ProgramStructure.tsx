import SectionWrapper from "./SectionWrapper";
import { FileText, UserCheck, Compass, Handshake, Send } from "lucide-react";

const steps = [
  { icon: FileText, title: "Candidature", desc: "Soumission du formulaire de candidature en ligne" },
  { icon: UserCheck, title: "Analyse du profil", desc: "Évaluation académique et vérification des critères" },
  { icon: Compass, title: "Orientation académique", desc: "Identification des programmes et universités ciblées" },
  { icon: Handshake, title: "Accompagnement", desc: "Préparation personnalisée du dossier de bourse" },
  { icon: Send, title: "Soumission des dossiers", desc: "Dépôt officiel auprès des institutions partenaires" },
];

const ProgramStructure = () => (
  <SectionWrapper id="processus">
    <p className="text-sm font-semibold tracking-widest uppercase text-accent mb-2">Processus</p>
    <h2 className="text-2xl md:text-3xl font-bold mb-12">Structure du programme</h2>
    <div className="relative">
      {/* Vertical line */}
      <div className="absolute left-5 top-0 bottom-0 w-px bg-border hidden md:block" />
      <div className="space-y-8 md:space-y-10">
        {steps.map((step, i) => {
          const Icon = step.icon;
          return (
            <div key={step.title} className="flex items-start gap-5 relative">
              <div className="flex-shrink-0 w-10 h-10 rounded-full border-2 border-primary bg-background flex items-center justify-center z-10">
                <Icon className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground mb-1">Étape {i + 1}</p>
                <h3 className="text-base font-semibold text-primary">{step.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{step.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  </SectionWrapper>
);

export default ProgramStructure;
