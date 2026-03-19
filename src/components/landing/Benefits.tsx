import SectionWrapper from "./SectionWrapper";
import { Target, BookOpen, Globe, UserCog } from "lucide-react";

const benefits = [
  { icon: Target, title: "Accompagnement structuré", desc: "Un cadre méthodique pour chaque étape de votre parcours." },
  { icon: BookOpen, title: "Positionnement académique", desc: "Identification des programmes les plus adaptés à votre profil." },
  { icon: Globe, title: "Accès international", desc: "Connexion directe avec les opportunités de bourses en Chine." },
  { icon: UserCog, title: "Suivi personnalisé", desc: "Un encadrement individuel tout au long du processus." },
];

const Benefits = () => (
  <SectionWrapper id="benefits" className="bg-secondary">
    <p className="text-sm font-semibold tracking-widest uppercase text-accent mb-2">Avantages</p>
    <h2 className="text-2xl md:text-3xl font-bold mb-10">Ce que le programme vous offre</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {benefits.map((b) => {
        const Icon = b.icon;
        return (
          <div key={b.title} className="p-6 border border-border rounded bg-background">
            <Icon className="w-5 h-5 text-primary mb-3" />
            <h3 className="font-semibold text-primary">{b.title}</h3>
            <p className="text-sm text-muted-foreground mt-2">{b.desc}</p>
          </div>
        );
      })}
    </div>
  </SectionWrapper>
);

export default Benefits;
