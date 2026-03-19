import { motion } from "framer-motion";
import embleme from "@/assets/embleme.svg";

interface HeroProps {
  onApply: () => void;
}

const Hero = ({ onApply }: HeroProps) => {
  return (
    <section className="relative min-h-[100vh] flex flex-col items-center justify-center section-padding text-center overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--primary)) 1px, transparent 0)`,
        backgroundSize: '40px 40px',
      }} />
      
      {/* Gradient accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative mb-8"
      >
        <div className="w-24 h-24 md:w-28 md:h-28 rounded-2xl bg-primary/5 flex items-center justify-center backdrop-blur-sm border border-primary/10">
          <img src={embleme} alt="PCARC" className="w-16 h-16 md:w-20 md:h-20" />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15 }}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-8"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
        </span>
        <span className="text-xs font-semibold tracking-wide uppercase text-accent">
          Cohorte Septembre 2026 — Candidatures ouvertes
        </span>
      </motion.div>

      <motion.h1
        className="text-[2rem] leading-[1.15] md:text-5xl lg:text-6xl font-extrabold max-w-3xl relative"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        Programme de Coopération{" "}
        <span className="relative">
          Académique
          <svg className="absolute -bottom-1 left-0 w-full" viewBox="0 0 200 8" fill="none">
            <motion.path
              d="M2 6C40 2 80 2 100 4C120 6 160 3 198 5"
              stroke="hsl(var(--gold))"
              strokeWidth="3"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            />
          </svg>
        </span>{" "}
        RDC–Chine
      </motion.h1>

      <motion.p
        className="mt-6 text-base md:text-lg text-muted-foreground max-w-lg leading-relaxed"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.35 }}
      >
        Accès structuré aux opportunités de bourses internationales en Chine pour les étudiants congolais
      </motion.p>

      <motion.button
        onClick={onApply}
        className="mt-10 group relative px-10 py-4 bg-primary text-primary-foreground font-semibold text-base rounded-lg hover:shadow-lg hover:shadow-primary/20 transition-all duration-300"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        Commencer ma candidature
        <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">→</span>
      </motion.button>

      <motion.p
        className="mt-4 text-xs text-muted-foreground/60"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        Places limitées · Processus sélectif · 100% gratuit
      </motion.p>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
};

export default Hero;
