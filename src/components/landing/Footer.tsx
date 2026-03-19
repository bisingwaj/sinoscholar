import logoHorizontal from "@/assets/logo-horizontal.svg";

const Footer = () => (
  <footer className="border-t border-border section-padding">
    <div className="container max-w-3xl mx-auto">
      <img src={logoHorizontal} alt="PCARC Logo" className="h-12 mb-8" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm text-muted-foreground">
        <div>
          <p className="font-semibold text-primary mb-1">Kinshasa</p>
          <p>[Adresse du bureau — Kinshasa]</p>
        </div>
        <div>
          <p className="font-semibold text-primary mb-1">Lubumbashi</p>
          <p>[Adresse du bureau — Lubumbashi]</p>
        </div>
      </div>
      <div className="mt-10 pt-6 border-t border-border text-xs text-muted-foreground">
        © {new Date().getFullYear()} PCARC — Programme de Coopération Académique RDC–Chine. Tous droits réservés.
      </div>
    </div>
  </footer>
);

export default Footer;
