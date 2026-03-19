import { useAdmin } from "../../context/AdminContext";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { format, subDays } from "date-fns";
import { fr } from "date-fns/locale";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function Dashboard() {
  const { scholarships, applications } = useAdmin();
  const navigate = useNavigate();

  const totalDossiers = applications.length;
  const enAttente = applications.filter(a => a.status === 'Nouveau').length;
  const boursesActives = scholarships.filter(s => s.statut === 'Actif').length;

  const revenueDossiers = applications.filter(a => a.paiementDossier).reduce((acc, a) => {
    const s = scholarships.find(s => s.id === a.bourseId);
    return acc + (s ? s.fraisDossier : 0);
  }, 0);

  const revenueAccompagnement = applications.filter(a => a.paiementAccompagnement).reduce((acc, a) => {
    const s = scholarships.find(s => s.id === a.bourseId);
    return acc + (s ? s.fraisAccompagnement : 0);
  }, 0);

  // Generate last 7 days data for chart
  const chartData = Array.from({ length: 7 }).map((_, i) => {
    const d = subDays(new Date(), 6 - i);
    const dateStr = format(d, 'yyyy-MM-dd');
    const label = format(d, 'EEE dd', { locale: fr }).toUpperCase();
    const count = applications.filter(a => a.date.startsWith(dateStr)).length;
    return { name: label, Dossiers: count };
  });

  const urgentApplications = applications.filter(a => a.status === 'Nouveau').slice(0, 5);

  return (
    <div className="p-6 md:p-12 h-full overflow-y-auto bg-[#F8F9FA] md:bg-white font-sans text-[#0B3D91]">
      <div className="mb-8 md:mb-12 border-b border-gray-200 pb-6 flex flex-col gap-4 md:flex-row md:justify-between md:items-end">
        <div>
           <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none">DASHBOARD_</h1>
           <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-500 mt-2">Terminal Opérationnel PCARC</p>
        </div>
        <div className="md:text-right">
           <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 mb-1">Date Système</p>
           <p className="text-sm font-mono font-bold">{format(new Date(), 'dd.MM.yyyy')}</p>
        </div>
      </div>
      
      {/* Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-gray-200 border border-gray-200 mb-8 shadow-sm md:shadow-none">
         <div className="bg-white p-4 md:p-6 flex flex-col justify-between h-24 md:h-32 hover:bg-gray-50 transition-colors">
           <h3 className="text-[8px] md:text-[9px] uppercase font-black tracking-[0.3em] text-gray-400">Total Dossiers</h3>
           <p className="text-3xl md:text-5xl font-black tracking-tighter">{totalDossiers}</p>
         </div>
         <div className="bg-white p-4 md:p-6 flex flex-col justify-between h-24 md:h-32 relative overflow-hidden group hover:bg-gray-50 transition-colors">
           <div className={`absolute top-0 right-0 w-1.5 md:w-2 h-full ${enAttente > 0 ? 'bg-[#059669]' : 'bg-gray-100'}`}></div>
           <h3 className="text-[8px] md:text-[9px] uppercase font-black tracking-[0.3em] text-gray-400">En Souffrance</h3>
           <p className={`text-3xl md:text-5xl font-black tracking-tighter ${enAttente > 0 ? 'text-[#059669]' : 'text-gray-900'}`}>{enAttente}</p>
         </div>
         <div className="bg-white p-4 md:p-6 flex flex-col justify-between h-24 md:h-32 hover:bg-gray-50 transition-colors">
           <h3 className="text-[8px] md:text-[9px] uppercase font-black tracking-[0.3em] text-gray-400">Pr. Actifs</h3>
           <p className="text-3xl md:text-5xl font-black tracking-tighter">{boursesActives}</p>
         </div>
         <div className="bg-[#0B3D91] text-white p-4 md:p-6 flex flex-col justify-between h-24 md:h-32 truncate">
           <h3 className="text-[8px] md:text-[9px] uppercase font-black tracking-[0.3em] text-white/50">Capitaux ($)</h3>
           <p className="text-3xl md:text-5xl font-mono font-black tracking-tighter text-[#8DE5A5] truncate">{revenueDossiers + revenueAccompagnement}</p>
         </div>
      </div>

      {/* Main Split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-10">
         {/* Chart Section */}
         <div className="lg:col-span-2 border border-gray-200 p-4 md:p-6 flex flex-col h-[300px] md:h-[400px] bg-white shadow-sm md:shadow-none">
            <h3 className="text-[10px] uppercase font-black tracking-[0.3em] text-[#0B3D91] border-b border-gray-100 pb-4 mb-6">Acquisitions (7 Jours)</h3>
            <div className="flex-1 w-full h-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: '#9CA3AF', fontWeight: 'bold' }} dy={10} />
                  <YAxis allowDecimals={false} axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: '#9CA3AF', fontFamily: 'monospace' }} />
                  <Tooltip 
                    cursor={{ fill: '#F3F4F6' }}
                    contentStyle={{ borderRadius: 0, border: '1px solid #E5E7EB', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontSize: '10px', fontWeight: 'bold', textTransform: 'uppercase' }} 
                  />
                  <Bar dataKey="Dossiers" fill="#0B3D91" radius={[0, 0, 0, 0]} maxBarSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </div>
         </div>

         {/* Urgent Tasks Section */}
         <div className="border border-gray-200 flex flex-col h-[400px]">
            <div className="p-4 border-b border-gray-200 bg-[#F8F9FA] flex justify-between items-center shrink-0">
               <h3 className="text-[10px] uppercase font-black tracking-[0.3em] text-[#059669]">Action Requise</h3>
               <span className="text-[10px] font-mono font-bold text-gray-500">{enAttente} EN ATTENTE</span>
            </div>
            <div className="flex-1 overflow-y-auto">
               {urgentApplications.length === 0 ? (
                 <div className="p-8 text-center text-[10px] font-bold uppercase tracking-widest text-gray-400">Aucune urgence.</div>
               ) : (
                 urgentApplications.map(app => (
                   <button 
                     key={app.id}
                     onClick={() => navigate(`/admin/candidatures/${app.id}`)}
                     className="w-full text-left p-4 border-b border-gray-50 hover:bg-[#F8F9FA] transition-colors group flex justify-between items-center focus:outline-none"
                   >
                      <div>
                        <p className="text-xs font-black uppercase tracking-wide text-[#0B3D91] group-hover:text-[#059669] transition-colors">{app.nom}</p>
                        <p className="text-[10px] font-mono text-gray-400 mt-1">{app.receiptNumber}</p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-gray-300 group-hover:translate-x-1 group-hover:text-[#059669] transition-all" />
                   </button>
                 ))
               )}
            </div>
            <button onClick={() => navigate('/admin/candidatures')} className="p-4 text-[10px] font-black uppercase tracking-[0.2em] text-[#0B3D91] bg-[#F8F9FA] hover:bg-gray-200 hover:text-[#059669] transition-colors text-center w-full border-t border-gray-200 focus:outline-none shrink-0">
               Voir tout le registre
            </button>
         </div>
      </div>
    </div>
  );
}
