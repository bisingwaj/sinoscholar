import { AlertTriangle } from "lucide-react";

const ConfigError = () => {
  return (
    <div className="min-h-screen bg-[#0B3D91] flex items-center justify-center p-6 text-white text-center">
      <div className="max-w-xl w-full border border-white/20 bg-white/5 backdrop-blur-xl p-12 rounded-sm shadow-2xl">
        <div className="flex justify-center mb-8">
          <div className="w-16 h-16 rounded-full bg-[#DE2910] flex items-center justify-center animate-pulse">
            <AlertTriangle className="w-8 h-8 text-white" />
          </div>
        </div>
        
        <h1 className="text-3xl font-black uppercase tracking-tighter mb-4">
          Configuration Manquante
        </h1>
        
        <div className="w-12 h-1 bg-[#DE2910] mx-auto mb-8"></div>
        
        <p className="text-white/70 mb-8 leading-relaxed font-medium">
          L'application est déployée mais les variables d'environnement **Supabase** ne sont pas configurées dans le tableau de bord de votre hébergeur (Netlify/Vercel).
        </p>

        <div className="bg-black/20 p-6 rounded-sm text-left mb-8 border border-white/10 font-mono text-xs space-y-3">
          <p className="text-[#8DE5A5]"># Ajoutez ces variables dans Netlify :</p>
          <p>VITE_SUPABASE_URL=https://your-id.supabase.co</p>
          <p>VITE_SUPABASE_ANON_KEY=your-anon-key</p>
        </div>

        <p className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-bold">
          Sinoscholar — Système d'Admissibilité
        </p>
      </div>
    </div>
  );
};

export default ConfigError;
