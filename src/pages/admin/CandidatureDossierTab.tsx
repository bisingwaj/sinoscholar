import { useParams } from "react-router-dom";
import { useAdmin } from "../../context/AdminContext";

const DataGroup = ({ label, value }: { label: string, value: React.ReactNode }) => (
  <div className="mb-5 border-b border-gray-100 pb-3">
    <span className="block text-[9px] uppercase font-black tracking-widest text-[#0B3D91]/40 mb-1">{label}</span>
    <span className="block text-base font-bold text-[#0B3D91] leading-snug">{value || "—"}</span>
  </div>
);

export default function CandidatureDossierTab() {
  const { id } = useParams<{ id: string }>();
  const { applications } = useAdmin();
  const app = applications.find(a => a.id === id);
  if (!app) return null;

  return (
    <div className="p-6 md:p-10 grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 pb-24 md:pb-12">
      {/* Left: Biographical data */}
      <div>
        <h2 className="text-3xl font-black uppercase tracking-tighter text-[#0B3D91] leading-none mb-8 border-b-2 border-[#0B3D91] pb-4">
          DONNÉES<br/>ADMINISTRATIVES_
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10">
          <DataGroup label="Identité" value={`${app.sexe === 'Homme' ? 'M.' : 'Mme'} ${app.nom}, ${app.age} ans`} />
          <DataGroup label="Contact WhatsApp" value={`+243 ${app.whatsapp}`} />
          <DataGroup label="Courriel" value={app.email} />
          <DataGroup label="Résidence" value={`${app.ville}, ${app.province}`} />
          <DataGroup label="Niveau d'études" value={app.niveauEtude} />
          <DataGroup label="Filière" value={app.domaineEtude} />
          <DataGroup label="Objectif" value={app.objectif} />
          <DataGroup label="Passeport" value={app.passeport} />
          <DataGroup label="Vaccination" value={app.carteVaccination} />
          <DataGroup label="Dossier" value={app.dejaCandidate} />
        </div>
      </div>

      {/* Right: Project note */}
      <div>
        <h2 className="text-3xl font-black uppercase tracking-tighter text-[#0B3D91] leading-none mb-8 border-b-2 border-[#0B3D91] pb-4">
          NOTE<br/>D'INTENTION_
        </h2>
        <p className="text-sm md:text-base text-gray-700 leading-relaxed font-serif bg-[#F8F9FA] p-6 md:p-8 border-l-4 border-[#0B3D91] shadow-inner">
          {app.projet}
        </p>

        {/* Scholarship attachment */}
        <div className="mt-8 p-6 bg-gray-50 border border-gray-200">
          <p className="text-[9px] uppercase font-black tracking-widest text-gray-400 mb-3">Bourse rattachée</p>
          {app.bourseId ? (
            <p className="text-base font-black uppercase tracking-tighter text-[#0B3D91]">{app.bourseId}</p>
          ) : (
            <p className="text-xs font-bold text-[#059669] uppercase tracking-widest">Non rattachée — Aller dans l'onglet 02.</p>
          )}
        </div>
      </div>
    </div>
  );
}
