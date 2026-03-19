import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import embleme from "@/assets/embleme.svg";

const navLinks = [
  { label: "Programme", href: "#programme" },
  { label: "Pourquoi la Chine", href: "#pourquoi-chine" },
  { label: "Processus", href: "#processus" },
  { label: "Avantages", href: "#avantages" },
  { label: "Éligibilité", href: "#eligibilite" },
  { label: "Contact", href: "#contact" },
];

interface NavbarProps {
  onApply: () => void;
}

const Navbar = ({ onApply }: NavbarProps) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? "bg-background/95 backdrop-blur-md border-b border-border shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between px-5 py-3">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5 shrink-0">
            <img src={embleme} alt="PCARC" className="w-8 h-8" />
            <span className="text-sm font-bold text-primary hidden sm:inline">PCARC</span>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNav(link.href)}
                className="text-[13px] font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Desktop CTA */}
          <button
            onClick={onApply}
            className="hidden md:block text-xs font-semibold px-5 py-2 bg-primary text-primary-foreground rounded-md hover:opacity-90 transition-opacity"
          >
            Postuler
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-foreground"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[52px] z-40 bg-background/98 backdrop-blur-lg border-b border-border shadow-lg md:hidden"
          >
            <div className="flex flex-col px-6 py-4 gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNav(link.href)}
                  className="text-left py-3 text-sm font-medium text-foreground hover:text-primary transition-colors border-b border-border/50 last:border-0"
                >
                  {link.label}
                </button>
              ))}
              <button
                onClick={() => { setMobileOpen(false); onApply(); }}
                className="mt-3 w-full py-3 bg-primary text-primary-foreground rounded-md font-semibold text-sm"
              >
                Postuler maintenant
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
