import SectionWrapper from "./SectionWrapper";

const items = [
  {
    title: "Orientation académique",
    description: "Un accompagnement structuré pour identifier les programmes universitaires adaptés à votre profil et à vos objectifs professionnels.",
  },
  {
    title: "Processus de candidature encadré",
    description: "Chaque étape — de la préparation du dossier à la soumission finale — est guidée par une méthodologie éprouvée.",
  },
  {
    title: "Ouverture internationale",
    description: "Le programme facilite l'accès aux institutions d'enseignement supérieur chinoises reconnues à l'échelle mondiale.",
  },
];

const About = () => (
  <SectionWrapper id="about">
    <p className="text-sm font-semibold tracking-widest uppercase text-accent mb-2">À propos</p>
    <h2 className="text-2xl md:text-3xl font-bold mb-10">Un programme d'excellence académique</h2>
    <div className="space-y-8">
      {items.map((item) => (
        <div key={item.title} className="border-l-2 border-primary pl-6">
          <h3 className="text-lg font-semibold text-primary">{item.title}</h3>
          <p className="mt-2 text-muted-foreground">{item.description}</p>
        </div>
      ))}
    </div>
  </SectionWrapper>
);

export default About;
