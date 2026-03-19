import { motion } from "framer-motion";
import embleme from "@/assets/embleme.svg";

interface HeroProps {
  onApply: () => void;
}

const Hero = ({ onApply }: HeroProps) => {
  return (
    <section className="min-h-[90vh] flex flex-col items-center justify-center section-padding text-center">
      <motion.img
        src={embleme}
        alt="PCARC Emblème"
        className="w-20 h-20 md:w-24 md:h-24 mb-8"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      />
      <motion.h1
        className="text-3xl md:text-5xl lg:text-6xl font-extrabold leading-tight max-w-3xl"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        Programme de Coopération Académique RDC–Chine
      </motion.h1>
      <motion.p
        className="mt-6 text-lg md:text-xl text-muted-foreground max-w-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.25 }}
      >
        Accès structuré aux opportunités de bourses internationales
      </motion.p>
      <motion.div
        className="mt-3 inline-flex items-center gap-2 text-sm text-accent font-medium"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-accent" />
        Cohorte Septembre 2026 — Appel à candidatures
      </motion.div>
      <motion.button
        onClick={onApply}
        className="mt-10 px-8 py-4 bg-primary text-primary-foreground font-semibold text-base rounded hover:opacity-90 transition-opacity"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        Commencer ma candidature
      </motion.button>
      <motion.div
        className="mt-16 w-8 h-px bg-border"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      />
    </section>
  );
};

export default Hero;
