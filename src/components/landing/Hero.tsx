import { motion } from "framer-motion";
import embleme from "@/assets/embleme.svg";

interface HeroProps {
  onApply: () => void;
}

const Hero = ({ onApply }: HeroProps) => {
  return (
    <section className="relative min-h-[85vh] flex flex-col items-center justify-center px-6 pt-24 pb-16 text-center overflow-hidden bg-primary">
      {/* Diagonal lines pattern */}
      <div className="absolute inset-0 opacity-[0.07]" style={{
        backgroundImage: `repeating-linear-gradient(
          45deg,
          transparent,
          transparent 30px,
          hsl(0 0% 100%) 30px,
          hsl(0 0% 100%) 31px
        )`,
      }} />

      {/* Large geometric diamond shapes */}
      <div className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: `
          linear-gradient(45deg, hsl(0 0% 100%) 25%, transparent 25%),
          linear-gradient(-45deg, hsl(0 0% 100%) 25%, transparent 25%),
          linear-gradient(45deg, transparent 75%, hsl(0 0% 100%) 75%),
          linear-gradient(-45deg, transparent 75%, hsl(0 0% 100%) 75%)
        `,
        backgroundSize: '120px 120px',
        backgroundPosition: '0 0, 0 60px, 60px -60px, -60px 0',
      }} />

      {/* Soft gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/95 to-primary/85 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="relative inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 mb-6"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-gold" />
        </span>
        <span className="text-[11px] font-semibold tracking-wide uppercase text-white/90">
          Cohorte Sept. 2026 — Candidatures ouvertes
        </span>
      </motion.div>

      <motion.h1
        className="text-[1.65rem] leading-[1.2] sm:text-4xl md:text-5xl lg:text-6xl font-extrabold max-w-3xl relative text-white"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
        </span>
        <span className="text-[11px] font-semibold tracking-wide uppercase text-accent">
          Cohorte Sept. 2026 — Candidatures ouvertes
        </span>
      </motion.div>

      <motion.h1
        className="text-[1.65rem] leading-[1.2] sm:text-4xl md:text-5xl lg:text-6xl font-extrabold max-w-3xl relative"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
      >
        Programme de Coopération Académique{" "}
        <span className="whitespace-nowrap relative">
          RDC–Chine
          <svg className="absolute -bottom-1 left-0 w-full" viewBox="0 0 120 6" fill="none" preserveAspectRatio="none">
            <motion.path
              d="M2 4C20 2 50 2 60 3C70 4 100 2 118 4"
              stroke="hsl(var(--gold))"
              strokeWidth="2.5"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            />
          </svg>
        </span>
      </motion.h1>

      <motion.p
        className="mt-5 text-[15px] sm:text-base md:text-lg text-muted-foreground max-w-md leading-relaxed"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        Accès structuré aux opportunités de bourses internationales en Chine pour les étudiants congolais
      </motion.p>

      <motion.button
        onClick={onApply}
        className="mt-8 group relative px-9 py-3.5 bg-primary text-primary-foreground font-semibold text-[15px] rounded-lg hover:shadow-lg hover:shadow-primary/20 transition-all duration-300"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.45 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        Commencer ma candidature
        <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">→</span>
      </motion.button>

      <motion.p
        className="mt-3 text-[11px] text-muted-foreground/60"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        Places limitées · Processus sélectif · 100% gratuit
      </motion.p>
    </section>
  );
};

export default Hero;
