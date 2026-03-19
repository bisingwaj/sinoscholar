import { Outlet, Link, useLocation, Navigate } from "react-router-dom";
import { LayoutDashboard, Users, FileStack, LogOut } from "lucide-react";
import { useAdmin } from "../../context/AdminContext";
import AdminSkeleton from "../../components/admin/AdminSkeleton";

const AdminLayout = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const { isAuth, logout, isLoading } = useAdmin();

  if (!isAuth) return <Navigate to="/admin/login" replace />;


  const links = [
    { name: "Vue d'ensemble", href: "/admin", icon: LayoutDashboard },
    { name: "Candidatures", href: "/admin/candidatures", icon: Users },
    { name: "Bourses", href: "/admin/bourses", icon: FileStack },
  ];

  return (
    <div className="flex bg-[#F8F9FA] font-sans flex-col md:flex-row h-screen overflow-hidden">
      
      {/* ── Mobile Header ── */}
      <header className="md:hidden bg-white px-6 py-4 flex justify-between items-center border-b border-gray-200 shrink-0 z-40 relative">
        <div>
           <p className="text-[8px] font-bold uppercase tracking-[0.2em] text-[#8DE5A5] mb-0.5">Coordination</p>
           <h1 className="text-xl font-black uppercase tracking-tighter leading-none text-[#0B3D91]">ADMIN PCARC.</h1>
        </div>
        <button onClick={() => logout()} className="text-gray-400 hover:text-[#059669] transition-colors focus:outline-none">
          <LogOut className="w-5 h-5" />
        </button>
      </header>

      {/* ── Desktop Brutalist Sidebar ── */}
      <aside className="hidden md:flex w-72 bg-[#0B3D91] text-white flex-col pt-12 pb-8 border-r-8 border-[#059669] shrink-0">
         <div className="px-10 mb-16">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8DE5A5] mb-2">Coordination</p>
            <h1 className="text-3xl font-black uppercase tracking-tighter leading-[0.9]">ADMIN<br/>PCARC.</h1>
         </div>

         <nav className="flex-1 flex flex-col gap-2 px-6">
            {links.map((l) => {
              const active = currentPath === l.href;
              const Icon = l.icon;
              return (
                <Link 
                  key={l.name} 
                  to={l.href}
                  className={`flex items-center justify-between px-4 py-4 uppercase font-black tracking-widest text-[11px] transition-all rounded-sm ${active ? 'bg-white text-[#0B3D91]' : 'text-white/60 hover:bg-white/10 hover:text-white'}`}
                >
                  {l.name}
                  {active && <span className="w-1.5 h-1.5 rounded-full bg-[#059669]"></span>}
                </Link>
              );
            })}
         </nav>

         <div className="px-10 mt-auto">
            <button onClick={() => logout()} className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-white/40 hover:text-white transition-colors focus:outline-none">
               <LogOut className="w-4 h-4" /> Quitter
            </button>
         </div>
      </aside>

      {/* ── Main Content Area ── */}
      <main className="flex-1 overflow-y-auto mb-[72px] md:mb-0 relative z-10 bg-[#F8F9FA]">
         {isLoading ? <AdminSkeleton /> : <Outlet />}
      </main>

      {/* ── Mobile Bottom Navigation ── */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-[72px] bg-[#0B3D91] text-white flex border-t-4 border-[#059669] z-50">
         {links.map((l) => {
           const active = currentPath === l.href;
           const Icon = l.icon;
           return (
             <Link 
               key={l.name} 
               to={l.href}
               className={`flex-1 flex flex-col items-center justify-center py-2 gap-1.5 transition-colors ${active ? 'bg-white text-[#0B3D91] -mt-1 pt-3 border-t-2 border-[#059669]' : 'text-white/60 hover:text-white'}`}
             >
                <Icon className={`w-5 h-5 ${active ? 'fill-[#0B3D91]/10' : ''}`} />
                <span className="text-[8px] font-black uppercase tracking-widest">{l.name}</span>
             </Link>
           );
         })}
      </nav>
    </div>
  );
};

export default AdminLayout;
