import { useState, useMemo, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, ChevronDown, User, MapPin, GraduationCap, Phone, Target, Shield, HelpCircle, X } from "lucide-react";
import { provinces, objectifsAcademiques } from "@/data/rdc-geo";
import { supabase } from "@/lib/supabase";

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
  { icon: User, title: "Identité", subtitle: "État civil complet" },
  { icon: MapPin, title: "Localisation", subtitle: "Résidence actuelle" },
  { icon: GraduationCap, title: "Parcours", subtitle: "Historique académique" },
  { icon: Phone, title: "Contact", subtitle: "Coordonnées officielles" },
  { icon: Target, title: "Objectif", subtitle: "Projet d'admission" },
  { icon: Shield, title: "Documents", subtitle: "Situation administrative" },
  { icon: HelpCircle, title: "Validation", subtitle: "Serment académique" },
];

interface ApplicationFormProps {
  onClose: () => void;
}

const DRCFlag = () => (
  <img
    src="https://flagcdn.com/w40/cd.png"
    srcSet="https://flagcdn.com/w80/cd.png 2x"
    width="32"
    height="22"
    alt="Drapeau RDC"
    className="rounded-sm shrink-0 shadow-sm border border-gray-200 object-cover"
  />
);

const SubmissionGrid = ({ data, onClose, submitState }: { data: FormData, onClose: () => void, submitState: 'submitting' | 'success' }) => {
  const [ms, setMs] = useState(0);
  const [randomStr, setRandomStr] = useState("");
  const [timeStr, setTimeStr] = useState("");

  useEffect(() => {
      let interval: NodeJS.Timeout;
      if (submitState === 'submitting') {
          interval = setInterval(() => {
              setMs(new Date().getMilliseconds());
              setRandomStr(Math.random().toString(36).substring(2,10).toUpperCase());
              setTimeStr(new Date().getTime().toString());
          }, 35);
      }
      return () => clearInterval(interval);
  }, [submitState]);

  const receiptNum = useMemo(() => `RDC-${new Date().getFullYear().toString().slice(-2)}-${(data.nom || "ANON").replace(/[^A-Za-z]/g, '').substring(0,3).toUpperCase()}${Math.floor(Math.random()*9000+1000)}`, [data.nom]);
  const finalDate = useMemo(() => new Intl.DateTimeFormat('fr-FR', { dateStyle: 'full', timeStyle: 'long'}).format(new Date()), []);

  return (
     <div className="fixed inset-0 z-[100] bg-[#F8F9FA] flex p-2 md:p-3">
       
       {submitState === 'submitting' && (
         <div className="w-full h-full grid grid-cols-1 md:grid-cols-12 grid-rows-6 gap-0 border-4 md:border-8 border-[#0B3D91] overflow-hidden bg-[#0B3D91]">
            
            <motion.div 
               initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 0, 1] }} transition={{ duration: 0.6, repeat: Infinity, repeatType: "mirror", ease: "linear" }}
               className="hidden md:flex col-span-8 row-span-4 border-r-4 border-b-4 border-[#0B3D91] bg-white flex-col justify-between p-12">
               <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#0B3D91]">Traitement des métadonnées protocolaires</p>
               <h2 className="text-8xl xl:text-[120px] font-black text-[#0B3D91] uppercase tracking-tighter leading-[0.85] break-normal">ENCODAGE<br/>EN COURS...</h2>
            </motion.div>
            
            <div className="md:col-span-4 md:row-span-4 border-b-4 border-[#0B3D91] bg-[#0B3D91] text-white flex flex-col justify-end p-8 md:p-12 relative overflow-hidden">
               <motion.div animate={{ top: ["-20%", "120%"] }} transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }} className="absolute left-0 right-0 h-2 bg-[#059669] shadow-[0_0_40px_#059669] z-10"/>
               <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#5BB774] mb-4 z-20">Hash Security M-256</p>
               <p className="text-3xl md:text-5xl font-light font-mono truncate z-20 text-white/90">{ms.toString().padStart(3, '0')}:{randomStr}</p>
               <h2 className="md:hidden text-5xl font-black text-white uppercase tracking-tighter leading-none mt-12 z-20">ENCODAGE...</h2>
            </div>

            <div className="hidden md:flex col-span-4 row-span-2 border-r-4 border-[#0B3D91] bg-white p-12 flex-col justify-end">
               <span className="w-8 h-8 rounded-full bg-[#059669] animate-pulse mb-6"></span>
               <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#0B3D91]">Transmission Serveur Central Pékin</p>
            </div>

            <div className="md:col-span-8 row-span-2 bg-[#F8F9FA] p-8 md:p-12 flex flex-col justify-end md:justify-between items-start md:items-end text-left md:text-right">
               <p className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400 mb-2 md:mb-0">Horloge Système</p>
               <p className="text-4xl md:text-6xl font-light text-[#0B3D91] uppercase font-mono">{timeStr}</p>
            </div>

         </div>
       )}

       {submitState === 'success' && (
         <motion.div 
            initial={{ opacity: 0, scale: 0.99 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ duration: 0.2 }} 
            className="w-full h-full grid grid-cols-1 md:grid-cols-12 grid-rows-6 gap-0 border-4 md:border-8 border-[#0B3D91] bg-[#0B3D91] text-white">
            
            <div className="md:col-span-12 row-span-4 border-b-4 border-white/20 p-8 md:p-12 flex flex-col justify-between">
               <div className="flex items-center gap-6 mb-12 md:mb-0">
                  <span className="w-4 h-4 bg-[#5BB774]"></span>
                  <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#5BB774]">PROCÉDURE D'ENREGISTREMENT COMPLÉTÉE</p>
               </div>
               <div>
                 <h2 className="text-[52px] md:text-[100px] xl:text-[130px] font-black text-white uppercase tracking-tighter leading-[0.85] break-normal mb-6 md:mb-8 mt-12 md:mt-0">CANDIDATURE<br/><span className="text-[#5BB774]">SOUMISE.</span></h2>
                 <p className="text-lg md:text-2xl text-white max-w-3xl font-medium leading-relaxed opacity-90 border-l-4 border-[#5BB774] pl-6">
                   Votre dossier a été formellement réceptionné par l'administration du programme. L'évaluation de conformité est en cours. Vous serez notifié des suites données à votre candidature.
                 </p>
               </div>
            </div>

            <div className="md:col-span-4 row-span-2 border-b-4 border-white/20 md:border-b-0 md:border-r-4 p-8 md:p-12 flex flex-col justify-end">
               <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/50 mb-3">N° DE QUITTANCE OFFICIEL</p>
               <p className="text-2xl md:text-3xl font-light font-mono text-white">{receiptNum}</p>
            </div>

            <div className="md:col-span-8 row-span-2 p-8 md:p-12 flex flex-col md:flex-row items-start md:items-end justify-between gap-8 md:gap-0">
               <div>
                 <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/50 mb-3">Horodatage d'enregistrement</p>
                 <p className="text-[10px] md:text-xs font-bold text-white uppercase tracking-widest leading-relaxed">{finalDate}</p>
               </div>
               
               <button onClick={onClose} className="w-full md:w-auto border-2 border-white bg-white text-[#0B3D91] hover:bg-transparent hover:text-white px-8 md:px-12 py-5 md:py-6 text-[10px] md:text-xs font-black uppercase tracking-[0.25em] transition-colors rounded-none shadow-xl focus:outline-none shrink-0 group">
                 CLÔTURER LA PROCÉDURE
                 <ArrowRight className="inline-block ml-4 w-5 h-5 group-hover:translate-x-2 transition-transform" />
               </button>
            </div>

         </motion.div>
       )}
     </div>
  );
};

const CustomSelect = ({ value, options, onChange, placeholder }: { value: string, options: string[], onChange: (v: string) => void, placeholder: string }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative w-full">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`w-full text-left bg-transparent border-b-2 ${open ? 'border-[#0B3D91]' : 'border-gray-200'} pb-4 text-2xl md:text-3xl font-light ${value ? 'text-[#0B3D91]' : 'text-gray-300'} transition-colors rounded-none flex justify-between items-center focus:outline-none`}
      >
        <span className="truncate">{value || placeholder}</span>
        <ChevronDown className={`w-8 h-8 ${value ? 'text-[#0B3D91]' : 'text-gray-300'} transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-[#0B3D91] shadow-2xl z-50 max-h-[40vh] overflow-y-auto"
          >
            {options.map(opt => (
              <button
                key={opt}
                type="button"
                onClick={() => { onChange(opt); setOpen(false); }}
                className={`w-full text-left px-6 py-4 text-xl md:text-2xl font-light transition-colors focus:outline-none ${
                  value === opt
                    ? 'bg-[#0B3D91] text-white font-bold'
                    : 'bg-white text-[#0B3D91] hover:bg-[#F8F9FA] hover:text-[#059669]'
                }`}
              >
                {opt}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const DynamicInput = ({ value, placeholder, type = "text", onChange, ...props }: any) => {
  const [focused, setFocused] = useState(false);
  const spanRef = useRef<HTMLSpanElement>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const updateWidth = () => {
      if (spanRef.current) {
        setWidth(spanRef.current.offsetWidth);
      }
    };
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, [value, placeholder, focused]);

  return (
    <div className="relative w-full overflow-hidden">
      <input
        {...props}
        type={type}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={focused ? '' : placeholder}
        className="w-full bg-transparent border-b-2 border-gray-200 pb-4 text-2xl md:text-3xl font-light text-[#0B3D91] placeholder:text-gray-300 focus:outline-none transition-colors rounded-none relative z-10"
      />
      <span 
        ref={spanRef} 
        className="absolute left-0 top-0 text-2xl md:text-3xl font-light opacity-0 pointer-events-none whitespace-pre"
      >
        {value || (focused ? '' : placeholder)}
      </span>
      <div 
        className="absolute bottom-0 left-0 h-[4px] bg-[#059669] transition-all duration-150 ease-out z-20 pointer-events-none"
        style={{ width: width > 0 ? `${width}px` : '0px', maxWidth: '100%', opacity: focused || value ? 1 : 0 }}
      />
    </div>
  );
};

const ToggleGroup = ({ options, value, onChange }: { options: string[]; value: string; onChange: (val: string) => void }) => (
  <div className="flex flex-col sm:flex-row gap-4">
    {options.map((opt) => (
      <button
        key={opt}
        type="button"
        onClick={() => onChange(opt)}
        className={`flex-1 py-6 border-2 text-sm font-black uppercase tracking-widest transition-all rounded-sm flex items-center justify-center gap-3 ${
          value === opt
            ? "bg-[#0B3D91] text-white border-[#0B3D91]"
            : "bg-transparent text-gray-400 border-gray-200 hover:border-[#0B3D91] hover:text-[#0B3D91]"
        }`}
      >
        {value === opt && <div className="w-2 h-2 rounded-full bg-white"></div>}
        {opt}
      </button>
    ))}
  </div>
);

type FieldKey = keyof FormData;


const desktopSteps: FieldKey[][] = [
  ['nom', 'age', 'sexe'],
  ['province', 'ville'],
  ['niveauEtude', 'domaineEtude'],
  ['email', 'whatsapp'],
  ['objectif', 'projet'],
  ['passeport', 'carteVaccination'],
  ['dejaCandidate']
];

const mobileSteps: FieldKey[][] = [
  ['nom'],
  ['age', 'sexe'],
  ['province', 'ville'],
  ['niveauEtude'],
  ['domaineEtude'],
  ['email', 'whatsapp'],
  ['objectif'],
  ['projet'],
  ['passeport', 'carteVaccination'],
  ['dejaCandidate']
];

const mobileMeta = [
  { title: "Identité" },
  { title: "Profil" },
  { title: "Localisation" },
  { title: "Grade Académique" },
  { title: "Spécialité" },
  { title: "Contact" },
  { title: "Objectif" },
  { title: "Projet" },
  { title: "Documents" },
  { title: "Validation" },
];

const ApplicationForm = ({ onClose }: ApplicationFormProps) => {
  const [isMobile, setIsMobile] = useState(false);
  const [step, setStep] = useState(1);
  const [data, setData] = useState<FormData>(initialData);
  const [submitState, setSubmitState] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const currentStructure = isMobile ? mobileSteps : desktopSteps;
  const currentMeta = isMobile ? mobileMeta : stepMeta;
  const TOTAL_STEPS = currentStructure.length;

  // Auto-correct out of bounds step if resize happens
  useEffect(() => {
    if (step > TOTAL_STEPS) setStep(TOTAL_STEPS);
  }, [TOTAL_STEPS, step]);

  const update = (field: keyof FormData, value: string) =>
    setData((prev) => ({ ...prev, [field]: value }));

  const cities = useMemo(() => {
    if (!data.province) return [];
    return provinces.find((p) => p.name === data.province)?.cities ?? [];
  }, [data.province]);

  const validateStep = (currentStep: number) => {
    const fields = currentStructure[currentStep - 1] || [];
    return fields.every(field => {
      if (field === 'ville' && data.province === '') return false; // Edge case
      return data[field].trim() !== "";
    });
  };

  const next = async () => {
    if (!validateStep(step)) return;
    if (step < TOTAL_STEPS) { 
      setDirection(1); 
      setStep((s) => s + 1); 
    } else {
      setSubmitState('submitting');
      try {
        const id = `A-${Date.now()}`;
        const receiptNumber = `PCARC-${new Date().getFullYear()}-${Math.floor(Math.random() * 9000 + 1000)}`;
        const { error } = await supabase.from('applications').insert({
          id,
          receipt_number: receiptNumber,
          status: 'Nouveau',
          bourse_id: null,
          etapes_validees: [],
          etapes_options: {},
          paiement_dossier: false,
          paiement_accompagnement: false,
          nom: data.nom,
          age: data.age,
          province: data.province,
          ville: data.ville,
          sexe: data.sexe,
          niveau_etude: data.niveauEtude,
          domaine_etude: data.domaineEtude,
          email: data.email,
          whatsapp: data.whatsapp,
          objectif: data.objectif,
          projet: data.projet,
          passeport: data.passeport,
          carte_vaccination: data.carteVaccination,
          deja_candidate: data.dejaCandidate,
        });
        if (error) throw error;
      } catch (err) {
        console.error('Supabase insert error:', err);
      } finally {
        setSubmitState('success');
      }
    }
  };

  const prev = () => {
    if (step > 1) { setDirection(-1); setStep((s) => s - 1); }
  };

  const variants = {
    enter: (dir: number) => ({ y: dir > 0 ? 30 : -30, opacity: 0 }),
    center: { y: 0, opacity: 1 },
    exit: (dir: number) => ({ y: dir > 0 ? -30 : 30, opacity: 0 }),
  };

  const labelClass = "block text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-[#0B3D91]/60 mb-4 md:mb-6";
  const textareaClass = "w-full bg-transparent border-2 border-gray-200 p-4 md:p-6 text-xl md:text-2xl font-light text-[#0B3D91] placeholder:text-gray-300 focus:outline-none focus:border-[#059669] transition-colors rounded-none min-h-[160px] md:min-h-[240px] resize-none leading-relaxed";

  const renderField = (field: FieldKey) => {
    switch (field) {
      case 'nom': return (
        <div key="nom">
          <label className={labelClass}>Nom complet (Filiation légale)</label>
          <DynamicInput value={data.nom} onChange={(e: any) => update("nom", e.target.value.toUpperCase())} placeholder="Ex: Jean-Mutombo" />
        </div>
      );
      case 'age': return (
        <div key="age">
          <label className={labelClass}>Âge officiel</label>
          <DynamicInput type="number" value={data.age} onChange={(e: any) => update("age", e.target.value)} placeholder="Ex: 24" min="15" max="60" />
        </div>
      );
      case 'sexe': return (
        <div key="sexe">
          <label className={labelClass}>Identité de genre</label>
          <ToggleGroup options={["Homme", "Femme"]} value={data.sexe} onChange={(v) => update("sexe", v)} />
        </div>
      );
      case 'province': return (
        <div key="province">
          <label className={labelClass}>Province de résidence</label>
          <CustomSelect value={data.province} options={provinces.map(p => p.name)} onChange={(v) => { update("province", v); update("ville", ""); }} placeholder="Province" />
        </div>
      );
      case 'ville': return (
        <div key="ville" className={`transition-opacity duration-300 ${!data.province ? 'opacity-30 pointer-events-none hidden md:block' : 'opacity-100'}`}>
          <label className={labelClass}>Ville de résidence</label>
          <CustomSelect value={data.ville} options={cities} onChange={(v) => update("ville", v)} placeholder="Ville principale" />
        </div>
      );
      case 'niveauEtude': return (
        <div key="niveauEtude">
          <label className={labelClass}>Plus haut niveau d'étude validé</label>
          <CustomSelect value={data.niveauEtude} options={["Diplôme d'État", "Graduat", "Licence LMD", "Master", "Doctorat"]} onChange={(v) => update("niveauEtude", v)} placeholder="Grade académique" />
        </div>
      );
      case 'domaineEtude': return (
        <div key="domaineEtude">
          <label className={labelClass}>Domaine / Filière d'expertise</label>
          <DynamicInput value={data.domaineEtude} onChange={(e: any) => update("domaineEtude", e.target.value)} placeholder="Ex: Informatique..." />
        </div>
      );
      case 'email': return (
        <div key="email">
          <label className={labelClass}>Adresse courriel officielle</label>
          <DynamicInput type="email" value={data.email} onChange={(e: any) => update("email", e.target.value)} placeholder="étudiant@faculte.cd" />
        </div>
      );
      case 'whatsapp': return (
        <div key="whatsapp">
          <label className={labelClass}>Numéro de contact (WhatsApp)</label>
          <div className="flex items-end gap-4 md:gap-6 overflow-hidden">
            <div className="flex items-center gap-2 pb-4 border-b-2 border-[#0B3D91] shrink-0">
              <DRCFlag />
              <span className="text-xl md:text-3xl font-light text-[#0B3D91]">+243</span>
            </div>
            <DynamicInput type="tel" value={data.whatsapp} onChange={(e: any) => update("whatsapp", e.target.value)} placeholder="8XX XXX XXX" />
          </div>
        </div>
      );
      case 'objectif': return (
        <div key="objectif">
          <label className={labelClass}>Finalité de la mission</label>
          <CustomSelect value={data.objectif} options={objectifsAcademiques} onChange={(v) => update("objectif", v)} placeholder="Objectif académique" />
        </div>
      );
      case 'projet': return (
        <div key="projet" className="h-full flex flex-col">
          <label className={labelClass}>Note d'intention conceptuelle</label>
          <textarea className={textareaClass} value={data.projet} onChange={(e) => update("projet", e.target.value)} placeholder="Décrivez votre projet avec rigueur..." />
        </div>
      );
      case 'passeport': return (
        <div key="passeport">
          <label className={labelClass}>Titre de voyage (Passeport) valide</label>
          <ToggleGroup options={["Oui", "Non"]} value={data.passeport} onChange={(v) => update("passeport", v)} />
        </div>
      );
      case 'carteVaccination': return (
        <div key="carteVaccination">
          <label className={labelClass}>Certificat de Vaccination International</label>
          <ToggleGroup options={["Oui", "Non"]} value={data.carteVaccination} onChange={(v) => update("carteVaccination", v)} />
          <div className="mt-6 md:mt-8 border-l-4 border-[#0B3D91] pl-6 py-2">
            <p className="text-xs md:text-sm text-gray-400 leading-relaxed font-bold">
              Obligation documentaire à remplir ultérieurement en cas de sélection.
            </p>
          </div>
        </div>
      );
      case 'dejaCandidate': return (
        <div key="dejaCandidate">
          <label className={labelClass}>Antécédent de candidature bilatérale</label>
          <ToggleGroup options={["Nouvelle candidature", "Renouvellement"]} value={data.dejaCandidate} onChange={(v) => update("dejaCandidate", v)} />
          <div className="mt-8 md:mt-12 bg-[#F8F9FA] p-6 md:p-8 border-l-4 border-[#059669]">
            <p className="text-xs md:text-sm text-[#0B3D91] leading-relaxed font-black">
              Je certifie sur l'honneur l'exactitude des informations administratives saisies dans le présent formulaire d'admission.
            </p>
          </div>
        </div>
      );
      default: return null;
    }
  }

  if (submitState !== 'idle') {
    return <SubmissionGrid data={data} onClose={onClose} submitState={submitState} />;
  }

  return (
    <div className="fixed inset-0 z-[100] bg-white flex flex-col lg:flex-row font-sans overflow-hidden">
      
      {/* Left Panel: Vertical Index (Consular Style - Desktop Only) */}
      <div className="hidden lg:flex flex-col w-[320px] xl:w-[420px] bg-[#F8F9FA] border-r border-gray-200 p-12 shrink-0">
        <div className="mb-20">
          <div className="w-12 h-1 bg-[#059669] mb-6"></div>
          <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#0B3D91]">PCARC — Admission Officielle</h2>
          <p className="text-xs text-gray-400 mt-2 font-bold tracking-widest uppercase">Session 2026</p>
        </div>
        
        <div className="flex-1 flex flex-col justify-center space-y-10">
           {stepMeta.map((meta, i) => {
             const isActive = !isMobile && step === i + 1;
             const isPast = !isMobile && step > i + 1;
             return (
               <div key={i} className={`flex items-center gap-6 transition-all duration-500 ${isActive ? 'opacity-100 translate-x-3' : isPast ? 'opacity-40' : 'opacity-20'}`}>
                  <span className={`text-sm font-black ${isActive ? 'text-[#059669]' : 'text-[#0B3D91]'}`}>
                    {String(i+1).padStart(2, '0')}.
                  </span>
                  <div>
                    <h3 className={`uppercase tracking-widest ${isActive ? 'text-lg font-black text-[#0B3D91]' : 'text-xs font-bold text-[#0B3D91]'}`}>
                      {meta.title}
                    </h3>
                  </div>
               </div>
             )
           })}
        </div>
        
        <div className="mt-auto pt-8 border-t border-gray-200">
           <button onClick={onClose} className="text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-[#059669] transition-colors flex items-center gap-2">
             <X className="w-3 h-3" /> Annuler la procédure
           </button>
        </div>
      </div>

      {/* Top Bar for Mobile */}
      <div className="lg:hidden flex flex-col bg-[#F8F9FA] border-b border-gray-100">
          <div className="flex items-center justify-between p-3 md:p-5">
            <button onClick={onClose} className="p-3 text-gray-400 hover:text-[#059669]"><X className="w-6 h-6" /></button>
            <div className="flex gap-1 pr-4 max-w-[60%] overflow-hidden">
              {Array.from({length: TOTAL_STEPS}).map((_, i) => (
                <div key={i} className={`h-1 transition-all rounded-full ${i+1===step ? 'w-6 bg-[#059669]' : i+1<step ? 'w-2 bg-[#0B3D91]' : 'w-2 bg-gray-200'}`} />
              ))}
            </div>
          </div>
      </div>

      {/* Right Panel: The Form Area */}
      <div className="flex-1 flex flex-col bg-white overflow-hidden supports-[height:100dvh]:h-[calc(100dvh-70px)]">
          <div className="flex-1 overflow-y-auto w-full flex flex-col">
            <div className="flex-1 flex flex-col justify-center px-6 md:px-20 lg:px-32 py-6 md:py-12">
                
                {/* Mobile Header indicator */}
                <div className="lg:hidden mb-8 border-l-4 border-[#059669] pl-4 mt-2">
                   <h2 className="text-[32px] md:text-[40px] font-black text-[#0B3D91] uppercase tracking-tighter mt-1 leading-[0.9] break-normal">{currentMeta[step-1]?.title || "Candidature"}</h2>
                </div>

                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={step}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                    className="w-full max-w-2xl flex flex-col space-y-8 md:space-y-16"
                  >
                    {currentStructure[step-1]?.map(field => renderField(field))}
                  </motion.div>
                </AnimatePresence>
            </div>
          </div>

          {/* Navigation Footer (Strict Geometry) */}
          <div className="px-0 md:px-20 lg:px-32 py-0 md:py-8 bg-white border-t border-gray-200 shrink-0 flex items-center justify-between w-full mt-auto">
              <button onClick={prev} className={`hidden lg:flex items-center gap-4 text-[11px] uppercase font-black tracking-[0.2em] transition-all ${step===1 ? 'opacity-0 pointer-events-none' : 'text-gray-400 hover:text-[#0B3D91]'}`}>
                <ArrowLeft className="w-5 h-5" /> Précédent
              </button>
              
              <div className="flex w-full lg:w-auto">
                <button onClick={prev} className={`lg:hidden shrink-0 bg-gray-50 flex items-center justify-center w-[72px] md:w-[90px] transition-all border-r border-gray-200 ${step===1 ? 'opacity-0 pointer-events-none w-0 border-0' : 'text-gray-600 hover:bg-gray-200'}`}>
                  <ArrowLeft className="w-5 h-5 md:w-6 md:h-6" />
                </button>
                <button 
                  onClick={next} 
                  disabled={!validateStep(step)}
                  className={`flex-1 lg:flex-none flex items-center justify-center gap-4 md:gap-6 px-6 md:px-14 py-6 md:py-6 text-[11px] md:text-[13px] font-black uppercase tracking-[0.2em] md:tracking-[0.25em] transition-all rounded-none shadow-none md:shadow-2xl group focus:outline-none ${!validateStep(step) ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-[#0B3D91] text-white hover:bg-[#059669]'}`}
                >
                  {step === TOTAL_STEPS ? (
                    "TRANSMETTRE DOSSIER"
                  ) : (
                    <>CONTINUER <ArrowRight className={`w-4 h-4 md:w-5 md:h-5 transition-transform ${validateStep(step) ? 'group-hover:translate-x-2' : ''}`} /></>
                  )}
                </button>
              </div>
          </div>
      </div>
    </div>
  );
};

export default ApplicationForm;
