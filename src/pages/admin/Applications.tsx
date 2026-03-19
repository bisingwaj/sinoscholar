import { useAdmin } from "../../context/AdminContext";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { useNavigate } from "react-router-dom";

export default function Applications() {
  const { applications } = useAdmin();
  const navigate = useNavigate();

  return (
    <div className="p-6 md:p-16 bg-[#F8F9FA] md:bg-white min-h-full">
      <div className="mb-8 md:mb-16">
         <h1 className="text-4xl md:text-[64px] font-black uppercase tracking-tighter text-[#0B3D91] mb-2 leading-none">CANDIDATURES.</h1>
         <p className="text-[10px] md:text-sm font-bold uppercase tracking-widest text-gray-500">Registre des Postulants</p>
      </div>

      <div className="w-full bg-white md:p-8 shadow-sm md:border md:border-gray-200">
        {applications.length === 0 ? (
          <p className="text-gray-500 font-bold uppercase tracking-widest text-xs py-8 text-center">Aucune candidature reçue.</p>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[800px]">
                <thead>
                  <tr className="border-b-4 border-[#0B3D91]">
                    <th className="py-6 px-4 text-[10px] font-black uppercase tracking-[0.2em] text-[#0B3D91]">N° Quittance</th>
                    <th className="py-6 px-4 text-[10px] font-black uppercase tracking-[0.2em] text-[#0B3D91]">Date</th>
                    <th className="py-6 px-4 text-[10px] font-black uppercase tracking-[0.2em] text-[#0B3D91]">Candidat</th>
                    <th className="py-6 px-4 text-[10px] font-black uppercase tracking-[0.2em] text-[#0B3D91]">Objectif</th>
                    <th className="py-6 px-4 text-[10px] font-black uppercase tracking-[0.2em] text-[#0B3D91]">Statut</th>
                  </tr>
                </thead>
                <tbody>
                  {applications.map(a => {
                    const isNew = a.status === 'Nouveau';
                    return (
                      <tr 
                        key={a.id} 
                        onClick={() => navigate(`/admin/candidatures/${a.id}`)}
                        className="border-b border-gray-100 hover:bg-[#F8F9FA] transition-colors cursor-pointer group"
                      >
                        <td className="py-6 px-4 font-mono text-xs font-bold text-gray-400 group-hover:text-[#059669] transition-colors">{a.receiptNumber}</td>
                        <td className="py-6 px-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest">{format(new Date(a.date), 'dd MMM yyyy', { locale: fr })}</td>
                        <td className="py-6 px-4">
                          <p className="font-black text-[#0B3D91] uppercase tracking-tight text-lg">{a.nom}</p>
                          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1">{a.sexe}, {a.age} ans</p>
                        </td>
                        <td className="py-6 px-4">
                          <p className="font-bold text-sm text-[#0B3D91] uppercase tracking-wide">{a.objectif}</p>
                          <p className="text-xs text-gray-500 capitalize">{a.domaineEtude}</p>
                        </td>
                        <td className="py-6 px-4">
                          <span className={`text-[10px] font-black uppercase tracking-[0.2em] px-4 py-2 ${isNew ? 'bg-[#059669] text-white' : a.status === 'Validé' ? 'bg-[#5BB774] text-white shadow-md' : 'bg-gray-100 text-gray-600'}`}>
                            {a.status}
                          </span>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden flex flex-col border-t border-gray-200">
              {applications.map(a => {
                const isNew = a.status === 'Nouveau';
                return (
                  <div key={a.id} onClick={() => navigate(`/admin/candidatures/${a.id}`)} className="p-5 border-b border-gray-200 bg-white flex flex-col gap-4 active:bg-gray-50 transition-colors">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-black text-[#0B3D91] uppercase tracking-tight text-lg leading-none mb-1">{a.nom}</p>
                        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{a.sexe}, {a.age} ans</p>
                      </div>
                      <span className={`text-[8px] font-black uppercase tracking-[0.2em] px-2 py-1 ${isNew ? 'bg-[#059669] text-white' : a.status === 'Validé' ? 'bg-[#5BB774] text-white' : 'bg-gray-100 text-gray-600'}`}>
                        {a.status}
                      </span>
                    </div>
                    <div className="flex justify-between items-end pt-3 border-t border-gray-100">
                      <div>
                        <p className="font-mono text-[10px] font-bold text-[#059669]">{a.receiptNumber}</p>
                        <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">{format(new Date(a.date), 'dd MMM yyyy', { locale: fr })}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-[10px] text-[#0B3D91] uppercase tracking-wide">{a.objectif}</p>
                        <p className="text-[9px] text-gray-500 capitalize truncate w-32">{a.domaineEtude}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
