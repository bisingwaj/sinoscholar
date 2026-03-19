import SectionWrapper from "./SectionWrapper";

const stats = [
  { value: "3 000+", label: "Universités accréditées" },
  { value: "Top 10", label: "Investissement mondial en R&D" },
  { value: "500 000+", label: "Étudiants internationaux accueillis" },
];

const WhyChina = () => (
  <SectionWrapper id="why-china" className="bg-secondary">
    <p className="text-sm font-semibold tracking-widest uppercase text-accent mb-2">Pourquoi la Chine</p>
    <h2 className="text-2xl md:text-3xl font-bold mb-4">Un pôle mondial d'excellence académique</h2>
    <p className="text-muted-foreground mb-10 max-w-2xl">
      La Chine s'est imposée comme une destination de premier plan pour les études supérieures, portée par des investissements massifs dans la recherche, l'innovation technologique et l'internationalisation de ses universités.
    </p>
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
      {stats.map((s) => (
        <div key={s.label} className="text-center py-6 border border-border rounded bg-background">
          <p className="text-2xl md:text-3xl font-bold text-primary">{s.value}</p>
          <p className="mt-2 text-sm text-muted-foreground">{s.label}</p>
        </div>
      ))}
    </div>
  </SectionWrapper>
);

export default WhyChina;
