import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, ChevronDown, User, MapPin, GraduationCap, Phone, Target, Shield, HelpCircle } from "lucide-react";
import { provinces, objectifsAcademiques } from "@/data/rdc-geo";

interface FormData {
  nom: string;
  age: string;
  province: string;
  ville: string;
  sexe: string;
  niveauEtude: string;
  domaineEtude: string;
  email: string;
  whatsapp: string;
  objectif: string;
  projet: string;
  passeport: string;
  carteVaccination: string;
  dejaCandidate: string;
}

const initialData: FormData = {
  nom: "", age: "", province: "", ville: "", sexe: "",
  niveauEtude: "", domaineEtude: "", email: "", whatsapp: "",
  objectif: "", projet: "", passeport: "", carteVaccination: "", dejaCandidate: "",
};

const TOTAL_STEPS = 7;

const stepMeta = [
  { icon: User, title: "Identité", subtitle: "Parlez-nous de vous" },
  { icon: MapPin, title: "Localisation", subtitle: "Où résidez-vous ?" },
  { icon: GraduationCap, title: "Parcours", subtitle: "Votre profil académique" },
  { icon: Phone, title: "Contact", subtitle: "Comment vous joindre" },
  { icon: Target, title: "Objectif", subtitle: "Votre projet d'études" },
  { icon: Shield, title: "Documents", subtitle: "Vos documents de voyage" },
  { icon: HelpCircle, title: "Dernière étape", subtitle: "Presque terminé !" },
];

interface ApplicationFormProps {
  onClose: () => void;
}

const DRCFlag = () => (
  <svg width="24" height="16" viewBox="0 0 900 600" className="rounded-[3px] shrink-0 border border-border/30">
    <rect width="900" height="600" fill="#007FFF" />
    <g>
      <line x1="0" y1="0" x2="900" y2="600" stroke="#CE1021" strokeWidth="60" />
      <line x1="0" y1="0" x2="900" y2="600" stroke="#F7D618" strokeWidth="30" />
      <line x1="900" y1="0" x2="0" y2="600" stroke="#CE1021" strokeWidth="60" />
      <line x1="900" y1="0" x2="0" y2="600" stroke="#F7D618" strokeWidth="30" />
    </g>
    <g transform="translate(100,32)">
      <polygon points="45,0 58,30 90,35 65,55 72,90 45,72 18,90 25,55 0,35 32,30" fill="#F7D618" />
    </g>
  </svg>
);

const ApplicationForm = ({ onClose }: ApplicationFormProps) => {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<FormData>(initialData);
  const [submitted, setSubmitted] = useState(false);
  const [direction, setDirection] = useState(1);

  const update = (field: keyof FormData, value: string) =>
    setData((prev) => ({ ...prev, [field]: value }));

  const cities = useMemo(() => {
    if (!data.province) return [];
    return provinces.find((p) => p.name === data.province)?.cities ?? [];
  }, [data.province]);

  const next = () => {
    if (step < TOTAL_STEPS) { setDirection(1); setStep((s) => s + 1); }
    else setSubmitted(true);
  };

  const prev = () => {
    if (step > 1) { setDirection(-1); setStep((s) => s - 1); }
  };

  const progress = (step / TOTAL_STEPS) * 100;
  const meta = stepMeta[step - 1];

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -60 : 60, opacity: 0 }),
  };

  const inputClass =
    "w-full px-4 py-3.5 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all text-[15px]";
  const selectClass = `${inputClass} appearance-none cursor-pointer`;
  const labelClass = "block text-xs font-semibold tracking-wide uppercase text-muted-foreground mb-2";

  const SelectWrapper = ({ children }: { children: React.ReactNode }) => (
    <div className="relative">
      {children}
      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
    </div>
  );

  const ToggleGroup = ({ options, value, field }: { options: string[]; value: string; field: keyof FormData }) => (
    <div className="flex gap-3">
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          onClick={() => update(field, opt)}
          className={`flex-1 py-3.5 rounded-lg border text-sm font-medium transition-all ${
            value === opt
              ? "bg-primary text-primary-foreground border-primary shadow-sm"
              : "border-border text-foreground hover:bg-secondary hover:border-primary/20"
          }`}
        >
          {opt}
        </button>
      ))}
    </div>
  );

  if (submitted) {
    return (
      <div className="fixed inset-0 z-50 bg-background flex flex-col items-center justify-center px-6 text-center">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="w-20 h-20 rounded-full bg-primary flex items-center justify-center mb-6"
        >
          <Check className="w-10 h-10 text-primary-foreground" />
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-2xl font-bold text-primary mb-3"
        >
          Candidature envoyée !
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-muted-foreground max-w-sm mb-8"
        >
          Votre dossier a été soumis avec succès. Nous vous contacterons prochainement par email ou WhatsApp.
        </motion.p>
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          onClick={onClose}
          className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity"
        >
          Retour au site
        </motion.button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-background flex flex-col">
      {/* Progress bar */}
      <div className="h-1 bg-secondary">
        <motion.div
          className="h-full bg-primary rounded-r-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      </div>

      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-border">
        <button onClick={onClose} className="text-sm text-muted-foreground hover:text-foreground transition-colors font-medium">
          ✕ Fermer
        </button>
        <div className="flex items-center gap-1.5">
          {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i < step ? "w-6 bg-primary" : i === step ? "w-4 bg-primary/30" : "w-2 bg-border"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Step header */}
      <div className="px-6 pt-6 pb-2">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <meta.icon className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground font-medium">Étape {step}/{TOTAL_STEPS}</p>
            <h3 className="text-lg font-bold text-primary">{meta.title}</h3>
          </div>
        </div>
        <p className="text-sm text-muted-foreground ml-[52px]">{meta.subtitle}</p>
      </div>

      {/* Form body */}
      <div className="flex-1 flex items-start justify-center px-6 pt-4 pb-6 overflow-y-auto">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={step}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.25 }}
            className="w-full max-w-md space-y-5"
          >
            {step === 1 && (
              <>
                <div>
                  <label className={labelClass}>Nom complet</label>
                  <input className={inputClass} value={data.nom} onChange={(e) => update("nom", e.target.value)} placeholder="Ex: Jean-Pierre Kabila" />
                </div>
                <div>
                  <label className={labelClass}>Âge</label>
                  <input className={inputClass} type="number" value={data.age} onChange={(e) => update("age", e.target.value)} placeholder="Ex: 24" min="15" max="60" />
                </div>
                <div>
                  <label className={labelClass}>Sexe</label>
                  <ToggleGroup options={["Homme", "Femme"]} value={data.sexe} field="sexe" />
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <div>
                  <label className={labelClass}>Province</label>
                  <SelectWrapper>
                    <select
                      className={selectClass}
                      value={data.province}
                      onChange={(e) => {
                        update("province", e.target.value);
                        update("ville", "");
                      }}
                    >
                      <option value="">Sélectionnez votre province</option>
                      {provinces.map((p) => (
                        <option key={p.name} value={p.name}>{p.name}</option>
                      ))}
                    </select>
                  </SelectWrapper>
                </div>
                <div>
                  <label className={labelClass}>Ville</label>
                  <SelectWrapper>
                    <select
                      className={selectClass}
                      value={data.ville}
                      onChange={(e) => update("ville", e.target.value)}
                      disabled={!data.province}
                    >
                      <option value="">{data.province ? "Sélectionnez votre ville" : "Choisissez d'abord une province"}</option>
                      {cities.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </SelectWrapper>
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <div>
                  <label className={labelClass}>Niveau d'étude</label>
                  <SelectWrapper>
                    <select className={selectClass} value={data.niveauEtude} onChange={(e) => update("niveauEtude", e.target.value)}>
                      <option value="">Sélectionnez</option>
                      <option value="Licence">Licence (en cours ou obtenue)</option>
                      <option value="Master">Master (en cours ou obtenu)</option>
                      <option value="Doctorat">Doctorat</option>
                      <option value="Autre">Autre</option>
                    </select>
                  </SelectWrapper>
                </div>
                <div>
                  <label className={labelClass}>Domaine d'étude</label>
                  <input className={inputClass} value={data.domaineEtude} onChange={(e) => update("domaineEtude", e.target.value)} placeholder="Ex: Informatique, Médecine, Droit..." />
                </div>
              </>
            )}

            {step === 4 && (
              <>
                <div>
                  <label className={labelClass}>Adresse email</label>
                  <input className={inputClass} type="email" value={data.email} onChange={(e) => update("email", e.target.value)} placeholder="votre@email.com" />
                </div>
                <div>
                  <label className={labelClass}>Numéro WhatsApp</label>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-2 px-3 py-3.5 border border-border rounded-lg bg-secondary/50 shrink-0">
                      <DRCFlag />
                      <span className="text-sm font-medium text-foreground">+243</span>
                    </div>
                    <input
                      className={inputClass}
                      type="tel"
                      value={data.whatsapp}
                      onChange={(e) => update("whatsapp", e.target.value)}
                      placeholder="8XX XXX XXX"
                    />
                  </div>
                </div>
              </>
            )}

            {step === 5 && (
              <>
                <div>
                  <label className={labelClass}>Objectif académique</label>
                  <SelectWrapper>
                    <select className={selectClass} value={data.objectif} onChange={(e) => update("objectif", e.target.value)}>
                      <option value="">Quel est votre objectif ?</option>
                      {objectifsAcademiques.map((obj) => (
                        <option key={obj} value={obj}>{obj}</option>
                      ))}
                    </select>
                  </SelectWrapper>
                </div>
                <div>
                  <label className={labelClass}>Description du projet</label>
                  <textarea
                    className={`${inputClass} min-h-[140px] resize-none`}
                    value={data.projet}
                    onChange={(e) => update("projet", e.target.value)}
                    placeholder="Décrivez brièvement votre projet d'études, ce que vous recherchez et vos motivations..."
                  />
                </div>
              </>
            )}

            {step === 6 && (
              <>
                <div>
                  <label className={labelClass}>Avez-vous déjà candidaté à une bourse ?</label>
                  <ToggleGroup options={["Oui", "Non"]} value={data.dejaCandidate} field="dejaCandidate" />
                </div>
                <div className="mt-4 p-4 rounded-lg bg-secondary/50 border border-border">
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    En soumettant ce formulaire, vous confirmez l'exactitude des informations fournies et acceptez d'être contacté dans le cadre du Programme de Coopération Académique RDC–Chine.
                  </p>
                </div>
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between px-6 py-4 border-t border-border bg-background">
        <button
          onClick={prev}
          disabled={step === 1}
          className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground disabled:opacity-0 disabled:pointer-events-none transition-all rounded-lg hover:bg-secondary"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour
        </button>
        <button
          onClick={next}
          className="flex items-center gap-2 px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold text-sm hover:opacity-90 transition-all shadow-sm"
        >
          {step === TOTAL_STEPS ? "Soumettre ma candidature" : "Continuer"}
          {step < TOTAL_STEPS && <ArrowRight className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
};

export default ApplicationForm;
