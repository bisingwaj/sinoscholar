import { useState } from "react";
import { useAdmin } from "../../context/AdminContext";
import { Navigate, useNavigate } from "react-router-dom";
import { Lock, Mail } from "lucide-react";

export default function Login() {
  const { isAuth, login } = useAdmin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  if (isAuth) return <Navigate to="/admin/dashboard" replace />;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    const ok = await login(email, password);
    setLoading(false);
    if (ok) {
      navigate("/admin/dashboard");
    } else {
      setError(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B3D91] flex items-center justify-center p-8 font-sans">
      <div className="w-full max-w-md bg-white border-8 border-transparent shadow-2xl p-16">
         <div className="mb-12">
            <h1 className="text-3xl font-black uppercase tracking-tighter text-[#0B3D91] leading-none mb-2">ADMIN<br/>PCARC.</h1>
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#059669]">Accès Restreint — Authentification Supabase</p>
         </div>

         <form onSubmit={handleSubmit} className="flex flex-col gap-8">
            <div>
               <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-4">Adresse Courriel</label>
               <div className="relative">
                 <Mail className="absolute left-0 top-1/2 -translate-y-1/2 w-5 h-5 text-[#0B3D91]" />
                 <input
                   type="email"
                   required
                   autoFocus
                   value={email}
                   onChange={e => { setEmail(e.target.value); setError(false); }}
                   placeholder="admin@sinoscholar.org"
                   className={`w-full bg-transparent border-b-4 ${error ? 'border-[#059669] text-[#059669]' : 'border-[#0B3D91] text-[#0B3D91]'} pl-10 pb-4 text-lg font-black tracking-widest focus:outline-none transition-colors`}
                 />
               </div>
            </div>

            <div>
               <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-4">Clé d'Accès Consulaire</label>
               <div className="relative">
                 <Lock className="absolute left-0 top-1/2 -translate-y-1/2 w-5 h-5 text-[#0B3D91]" />
                 <input
                   type="password"
                   required
                   value={password}
                   onChange={e => { setPassword(e.target.value); setError(false); }}
                   placeholder="•••••••••"
                   className={`w-full bg-transparent border-b-4 ${error ? 'border-[#059669] text-[#059669]' : 'border-[#0B3D91] text-[#0B3D91]'} pl-10 pb-4 text-2xl font-black uppercase tracking-widest focus:outline-none transition-colors`}
                 />
               </div>
               {error && <p className="text-[10px] uppercase font-bold text-[#059669] tracking-widest mt-4">Identification refusée. Vérifiez vos identifiants.</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#0B3D91] text-white py-6 text-xs font-black uppercase tracking-[0.2em] hover:bg-[#059669] transition-colors mt-8 disabled:opacity-50"
            >
               {loading ? 'AUTHENTIFICATION...' : 'AUTORISER L\'ACCÈS'}
            </button>
         </form>

         <div className="mt-12 pt-8 border-t border-gray-100 flex items-center gap-4">
            <div className="w-2 h-2 rounded-full bg-[#5BB774] animate-pulse"></div>
            <p className="text-[8px] font-bold uppercase tracking-[0.3em] text-gray-400">Connexion sécurisée via Supabase Auth</p>
         </div>
      </div>
    </div>
  );
}
