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
    const isDesktop = window.innerWidth >= 768;
    const targetId = isDesktop ? `${href}-desktop` : href;
    const el = document.querySelector(targetId) || document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* Mobile Nav */}
      <nav
        className={`md:hidden fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? "bg-background/95 backdrop-blur-md border-b border-border shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="flex items-center justify-between px-5 py-3">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5 shrink-0">
            <img src={embleme} alt="PCARC" className="w-8 h-8" />
            <div className="flex flex-col leading-none">
              <span className="text-[11px] font-bold text-primary tracking-wide">PCARC</span>
              <span className="text-[9px] text-muted-foreground font-medium hidden xs:block">Coopération Académique RDC–Chine</span>
            </div>
          </a>

          {/* Mobile Menu Button Brutalist */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="text-[10px] sm:text-[11px] font-black uppercase tracking-[0.25em] border-2 border-[#0B3D91] px-4 py-2 text-[#0B3D91] hover:bg-[#0B3D91] hover:text-white transition-colors focus:outline-none rounded-none"
          >
            {mobileOpen ? "FERMER" : "MENU"}
          </button>
        </div>
      </nav>

      {/* Desktop Institutional Nav */}
      <nav className="hidden md:block fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100 shadow-sm transition-all">
        {/* Liseré Rouge Institutionnel */}
        <div className="h-1.5 w-full bg-[#DE2910]"></div>

        <div className="max-w-screen-2xl mx-auto px-8 lg:px-12 flex items-center justify-between h-[84px]">
          <a href="#" className="flex items-center gap-6 shrink-0 hover:opacity-80 transition-opacity mr-auto">
            <img src={embleme} alt="PCARC Logo" className="w-12 h-12 object-contain" />
            <div className="flex flex-col border-l border-gray-300 pl-6 justify-center">
              <span className="text-sm font-black text-[#0B3D91] tracking-widest uppercase leading-tight">PCARC</span>
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest leading-tight mt-1.5">Programme d'Excellence RDC-Chine</span>
            </div>
          </a>

          <div className="flex items-center gap-10">
            {navLinks.map((link) => (
              <button key={link.href} onClick={() => handleNav(link.href)} className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#0B3D91]/70 hover:text-[#0B3D91] transition-colors">
                {link.label}
              </button>
            ))}
            <div className="pl-6 border-l border-gray-200">
              <button onClick={onApply} className="text-[12px] font-black uppercase tracking-widest px-8 py-3.5 bg-[#DE2910] text-white hover:bg-[#B71C1C] rounded-sm transition-colors shadow-md focus:outline-none">
                Candidater
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Fullscreen Swiss - Airy & Animated */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="md:hidden fixed inset-0 top-[60px] bg-[#F8F9FA] text-[#0B3D91] z-40 overflow-y-auto"
          >
            <div className="flex flex-col min-h-[calc(100vh-60px)] justify-between px-8 py-12 border-t border-gray-200/50">
              <div className="flex flex-col space-y-12 mt-4">
                {[
                  { label: "La Mission", href: "#programme" },
                  { label: "Le Protocole", href: "#pourquoi-chine" },
                  { label: "Éligibilité", href: "#eligibilite" }
                ].map((link, i) => (
                  <motion.button
                    key={link.href}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.1, duration: 0.6, ease: "easeOut" }}
                    onClick={() => handleNav(link.href)}
                    className="text-left text-[36px] sm:text-[48px] font-black uppercase tracking-tighter hover:text-[#059669] transition-colors leading-[0.9] flex flex-col gap-3 group"
                  >
                    <span className="text-[10px] font-bold tracking-[0.3em] block text-[#059669]">0{i+1}.</span>
                    {link.label}
                  </motion.button>
                ))}
              </div>
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="mt-20 pb-12 w-full"
              >
                <div className="w-12 h-1 bg-[#059669] mb-8"></div>
                <button 
                  onClick={() => { setMobileOpen(false); onApply(); }}
                  className="w-full bg-[#0B3D91] text-white hover:bg-[#DE2910] px-8 py-6 text-xs sm:text-sm font-black uppercase tracking-[0.2em] transition-colors rounded-none shadow-xl focus:outline-none"
                >
                  DÉPOSER MA CANDIDATURE
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
