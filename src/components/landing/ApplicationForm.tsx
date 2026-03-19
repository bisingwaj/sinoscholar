import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";

interface FormData {
  nom: string;
  age: string;
  pays: string;
  ville: string;
  sexe: string;
  niveauEtude: string;
  domaineEtude: string;
  email: string;
  whatsapp: string;
  objectif: string;
  projet: string;
  dejaCandidate: string;
}

const initialData: FormData = {
  nom: "", age: "", pays: "", ville: "", sexe: "",
  niveauEtude: "", domaineEtude: "", email: "", whatsapp: "",
  objectif: "", projet: "", dejaCandidate: "",
};

const TOTAL_STEPS = 6;

interface ApplicationFormProps {
  onClose: () => void;
}

const ApplicationForm = ({ onClose }: ApplicationFormProps) => {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<FormData>(initialData);
  const [submitted, setSubmitted] = useState(false);
  const [direction, setDirection] = useState(1);
  const formRef = useRef<HTMLDivElement>(null);

  const update = (field: keyof FormData, value: string) =>
    setData((prev) => ({ ...prev, [field]: value }));

  const next = () => {
    if (step < TOTAL_STEPS) {
      setDirection(1);
      setStep((s) => s + 1);
    } else {
      setSubmitted(true);
    }
  };

  const prev = () => {
    if (step > 1) {
      setDirection(-1);
      setStep((s) => s - 1);
    }
  };

  const progress = (step / TOTAL_STEPS) * 100;

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 80 : -80, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -80 : 80, opacity: 0 }),
  };

  const inputClass =
    "w-full px-4 py-3 border border-border rounded bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-shadow";
  const labelClass = "block text-sm font-medium text-primary mb-2";

  if (submitted) {
    return (
      <div className="fixed inset-0 z-50 bg-background flex flex-col items-center justify-center px-6 text-center">
        <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center mb-6">
          <Check className="w-8 h-8 text-primary-foreground" />
        </div>
        <h2 className="text-2xl font-bold text-primary mb-3">Candidature envoyée</h2>
        <p className="text-muted-foreground max-w-sm mb-8">
          Votre dossier a été soumis avec succès. Nous vous contacterons prochainement par email ou WhatsApp.
        </p>
        <button onClick={onClose} className="px-6 py-3 border border-border rounded font-medium hover:bg-secondary transition-colors">
          Retour au site
        </button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-background flex flex-col" ref={formRef}>
      {/* Progress bar */}
      <div className="h-0.5 bg-border">
        <motion.div
          className="h-full bg-primary"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-border">
        <button onClick={onClose} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
          Fermer
        </button>
        <span className="text-sm text-muted-foreground">
          Étape {step} / {TOTAL_STEPS}
        </span>
      </div>

      {/* Form body */}
      <div className="flex-1 flex items-center justify-center px-6 overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={step}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3 }}
            className="w-full max-w-md"
          >
            {step === 1 && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-primary mb-6">Informations personnelles</h3>
                <div>
                  <label className={labelClass}>Nom complet</label>
                  <input
                    className={inputClass}
                    value={data.nom}
                    onChange={(e) => update("nom", e.target.value)}
                    placeholder="Votre nom complet"
                  />
                </div>
                <div>
                  <label className={labelClass}>Âge</label>
                  <input
                    className={inputClass}
                    type="number"
                    value={data.age}
                    onChange={(e) => update("age", e.target.value)}
                    placeholder="Votre âge"
                  />
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-primary mb-6">Localisation</h3>
                <div>
                  <label className={labelClass}>Pays / Ville</label>
                  <input
                    className={inputClass}
                    value={data.pays}
                    onChange={(e) => update("pays", e.target.value)}
                    placeholder="Ex: RDC, Kinshasa"
                  />
                </div>
                <div>
                  <label className={labelClass}>Sexe</label>
                  <div className="flex gap-3">
                    {["Homme", "Femme"].map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => update("sexe", s)}
                        className={`flex-1 py-3 rounded border text-sm font-medium transition-colors ${
                          data.sexe === s
                            ? "bg-primary text-primary-foreground border-primary"
                            : "border-border hover:bg-secondary"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-primary mb-6">Parcours académique</h3>
                <div>
                  <label className={labelClass}>Niveau d'étude</label>
                  <select
                    className={inputClass}
                    value={data.niveauEtude}
                    onChange={(e) => update("niveauEtude", e.target.value)}
                  >
                    <option value="">Sélectionnez</option>
                    <option value="Licence">Licence (en cours ou obtenue)</option>
                    <option value="Master">Master (en cours ou obtenu)</option>
                    <option value="Doctorat">Doctorat</option>
                    <option value="Autre">Autre</option>
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Domaine d'étude</label>
                  <input
                    className={inputClass}
                    value={data.domaineEtude}
                    onChange={(e) => update("domaineEtude", e.target.value)}
                    placeholder="Ex: Informatique, Médecine, Droit..."
                  />
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-primary mb-6">Coordonnées</h3>
                <div>
                  <label className={labelClass}>Adresse email</label>
                  <input
                    className={inputClass}
                    type="email"
                    value={data.email}
                    onChange={(e) => update("email", e.target.value)}
                    placeholder="votre@email.com"
                  />
                </div>
                <div>
                  <label className={labelClass}>Numéro WhatsApp</label>
                  <input
                    className={inputClass}
                    type="tel"
                    value={data.whatsapp}
                    onChange={(e) => update("whatsapp", e.target.value)}
                    placeholder="+243..."
                  />
                </div>
              </div>
            )}

            {step === 5 && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-primary mb-6">Projet académique</h3>
                <div>
                  <label className={labelClass}>Objectif académique</label>
                  <input
                    className={inputClass}
                    value={data.objectif}
                    onChange={(e) => update("objectif", e.target.value)}
                    placeholder="Quel est votre objectif principal ?"
                  />
                </div>
                <div>
                  <label className={labelClass}>Description du projet</label>
                  <textarea
                    className={`${inputClass} min-h-[120px] resize-none`}
                    value={data.projet}
                    onChange={(e) => update("projet", e.target.value)}
                    placeholder="Décrivez brièvement votre projet d'études..."
                  />
                </div>
              </div>
            )}

            {step === 6 && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-primary mb-6">Dernière question</h3>
                <div>
                  <label className={labelClass}>Avez-vous déjà candidaté à une bourse ?</label>
                  <div className="flex gap-3">
                    {["Oui", "Non"].map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => update("dejaCandidate", opt)}
                        className={`flex-1 py-3 rounded border text-sm font-medium transition-colors ${
                          data.dejaCandidate === opt
                            ? "bg-primary text-primary-foreground border-primary"
                            : "border-border hover:bg-secondary"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between px-6 py-5 border-t border-border">
        <button
          onClick={prev}
          disabled={step === 1}
          className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground disabled:opacity-30 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Précédent
        </button>
        <button
          onClick={next}
          className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded font-medium text-sm hover:opacity-90 transition-opacity"
        >
          {step === TOTAL_STEPS ? "Soumettre" : "Suivant"}
          {step < TOTAL_STEPS && <ArrowRight className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
};

export default ApplicationForm;
