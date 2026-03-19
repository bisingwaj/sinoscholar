import SectionWrapper from "./SectionWrapper";

interface CTASectionProps {
  onApply: () => void;
}

const CTASection = ({ onApply }: CTASectionProps) => (
  <SectionWrapper className="bg-primary text-center">
    <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
      Rejoignez la cohorte Septembre 2026
    </h2>
    <p className="text-primary-foreground/70 mb-8 max-w-md mx-auto">
      Les places sont limitées. Soumettez votre candidature dès maintenant pour intégrer le programme.
    </p>
    <button
      onClick={onApply}
      className="px-8 py-4 bg-background text-primary font-semibold rounded hover:opacity-90 transition-opacity"
    >
      Postuler maintenant
    </button>
  </SectionWrapper>
);

export default CTASection;
