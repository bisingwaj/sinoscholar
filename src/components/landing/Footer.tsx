import logoHorizontal from "@/assets/logo-horizontal.svg";

const Footer = () => (
  <footer className="border-t border-border section-padding">
    <div className="container max-w-3xl mx-auto">
      <img src={logoHorizontal} alt="PCARC Logo" className="h-12 mb-8" />
      <div className="text-sm text-muted-foreground">
        <p className="font-semibold text-primary mb-1">Kinshasa</p>
        <p>5ème niveau, Immeuble Ex-Sozacom, Boulevard du 30 Juin, Commune de la Gombe, Kinshasa, République Démocratique du Congo.</p>
        <p className="mt-3">+243 995 892 888 · drc@sinoscholar.org</p>
      </div>
      <div className="mt-10 pt-6 border-t border-border text-xs text-muted-foreground">
        © {new Date().getFullYear()} PCARC — Programme de Coopération Académique RDC–Chine. Tous droits réservés.
      </div>
    </div>
  </footer>
);

export default Footer;
