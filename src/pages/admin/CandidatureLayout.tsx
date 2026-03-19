import { Outlet, useParams, useNavigate, useLocation, Navigate } from "react-router-dom";
import { useAdmin } from "../../context/AdminContext";
import { ArrowLeft } from "lucide-react";

const TABS = [
  { key: "dossier",  label: "01 · Dossier Administratif" },
  { key: "matrice",  label: "02 · Matrice & Tarification" },
  { key: "ged",      label: "03 · Espace Documentaire" },
];

export default function CandidatureLayout() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { applications, isAuth } = useAdmin();

  if (!isAuth) return <Navigate to="/admin/login" replace />;

  const app = applications.find(a => a.id === id);
  if (!app) return <div className="p-16 text-red-600 font-bold uppercase tracking-widest text-sm">Candidature introuvable.</div>;

  const activeTab = TABS.find(t => location.pathname.endsWith(t.key))?.key ?? "dossier";

  return (
    <div className="flex flex-col h-full overflow-hidden bg-white font-sans">

      {/* ── Sticky Header ── */}
      <div className="bg-[#0B3D91] text-white px-6 md:px-10 pt-4 md:pt-6 pb-0 shrink-0">
        <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6 mb-4 md:mb-6">
          <div className="flex items-center gap-4 md:gap-6 w-full">
            <button
              onClick={() => navigate("/admin/candidatures")}
              className="flex items-center gap-3 text-white/60 hover:text-white transition-colors focus:outline-none shrink-0"
            >
              <ArrowLeft className="w-5 h-5 md:w-4 md:h-4" />
              <span className="hidden md:inline text-[10px] font-black uppercase tracking-widest">Registre</span>
            </button>
            <div className="hidden md:block h-5 w-px bg-white/20 shrink-0" />
            <div className="flex-1 min-w-0 pr-4">
              <p className="text-[9px] font-bold uppercase tracking-[0.4em] text-[#8DE5A5] truncate">{app.receiptNumber}</p>
              <h1 className="text-xl md:text-2xl font-black uppercase tracking-tighter leading-none truncate">{app.nom}</h1>
            </div>
            <div className="shrink-0 text-right">
              <span className={`text-[8px] md:text-[9px] font-black uppercase tracking-widest px-3 py-1.5 ${
                app.status === 'Nouveau' ? 'bg-[#059669] text-white' :
                app.status === 'Validé'  ? 'bg-[#5BB774] text-white' :
                'bg-white/10 text-white'
              }`}>{app.status}</span>
            </div>
          </div>
        </div>

        {/* ── Tab Bar ── */}
        <div className="flex gap-0 border-t border-white/10 overflow-x-auto scrollbar-hide">
          {TABS.map(tab => {
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => navigate(`/admin/candidatures/${id}/${tab.key}`)}
                className={`px-6 md:px-8 py-4 text-[9px] md:text-[10px] shrink-0 whitespace-nowrap font-black uppercase tracking-[0.2em] transition-colors focus:outline-none border-b-2 ${
                  isActive
                    ? "border-white text-white"
                    : "border-transparent text-white/40 hover:text-white/70"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Content from sub-route ── */}
      <div className="flex-1 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
}
