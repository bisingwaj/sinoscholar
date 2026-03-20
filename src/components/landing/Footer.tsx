import logoHorizontal from "@/assets/logo-horizontal.svg";
import logoFooter from "@/assets/logo-footer.svg";
import { Mail, Phone, MapPin } from "lucide-react";

const Footer = () => (
  <>
    {/* =========================================
        MOBILE VERSION (Strictly Original)
        ========================================= */}
    <footer className="md:hidden bg-[#0B3D91] text-white pt-32 pb-16 px-8 flex flex-col border-t-8 border-white">
      <div className="w-full flex flex-col">
        <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#5BB774] mb-8">
          ASSISTANCE & SUPPORT
        </p>
        <h2 className="text-[40px] md:text-[52px] lg:text-[64px] font-black uppercase tracking-tighter leading-[0.9] mb-16 break-normal">
          NOUS<br/><span className="text-white/60">CONTACTER.</span>
        </h2>
        
        <div className="flex flex-col border-t border-white/20">
          <div className="py-8 border-b border-white/20 flex flex-col gap-4">
            <span className="text-[10px] uppercase font-bold text-[#5BB774] tracking-[0.2em]">BUREAU DE KINSHASA</span>
            <p className="text-[15px] sm:text-base font-medium leading-relaxed opacity-90">
              5ème niveau, Immeuble Ex-Sozacom,<br/>
              Boulevard du 30 Juin, Kinshasa-Gombe,<br/>
              République Démocratique du Congo.
            </p>
          </div>
          <div className="py-8 border-b border-white/20 flex flex-col gap-4">
            <span className="text-[10px] uppercase font-bold text-[#5BB774] tracking-[0.2em]">CONTACTS DIRECTS</span>
            <p className="text-[24px] font-light tracking-wider">+243 995 892 888</p>
            <p className="text-[16px] font-medium opacity-80">drc@sinoscholar.org</p>
          </div>
        </div>
        
        <div className="mt-16 w-full border-t border-white/30 pt-10 flex flex-col">
          <div className="flex items-start justify-between mb-16">
             <img src={logoFooter} alt="PCARC Logo" className="h-10 opacity-100" />
             <div className="text-[10px] font-black tracking-[0.3em] uppercase text-white/60 mt-1">
               © {new Date().getFullYear()}
             </div>
          </div>
          
          <div className="flex flex-col">
             <div className="flex justify-between items-end border-b border-white/10 pb-5 mb-5">
               <span className="text-[9px] font-bold tracking-[0.3em] uppercase text-white/40 w-1/3">DOMAINE</span>
               <span className="text-[11px] font-black tracking-widest uppercase text-white/90 text-right w-2/3 leading-relaxed">COOPÉRATION ACADÉMIQUE<br/>SINO-CONGOLAISE</span>
             </div>
             
             <div className="flex justify-between items-end border-b border-white/10 pb-5 mb-5">
               <span className="text-[9px] font-bold tracking-[0.3em] uppercase text-white/40 w-1/3">PROPRIÉTÉ</span>
               <span className="text-[11px] font-black tracking-widest uppercase text-white/90 text-right w-2/3 leading-relaxed">TOUS DROITS<br/>RÉSERVÉS</span>
             </div>
          </div>
        </div>
      </div>
    </footer>

    {/* =========================================
        DESKTOP VERSION (Premium Academic)
        ========================================= */}
    <footer id="contact-desktop" className="hidden md:block bg-[#0B3D91] border-t-8 border-[#059669] pt-20 pb-8 text-white w-full relative">
      <div className="max-w-[1400px] mx-auto px-12 relative z-10">
        <div className="grid grid-cols-12 gap-16 mb-20">
          
          {/* Brand Column */}
          <div className="col-span-12 lg:col-span-5 pr-8">
            <img src={logoFooter} alt="PCARC Logo" className="h-16 object-contain mb-6" />
            <p className="text-sm text-white/60 leading-relaxed font-medium max-w-md">
              Programme de Coopération Académique RDC-Chine. L'excellence académique au service des talents congolais, garantissant l'intégration sécurisée au sein des universités chinoises de rang mondial.
            </p>
          </div>
          
          {/* Contact Column */}
          <div className="col-span-12 lg:col-span-4">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] mb-8 text-white/40">Bureau de Coordination</h4>
            <ul className="space-y-6 text-sm text-white/80">
              <li className="flex items-start gap-4 group">
                <MapPin className="w-5 h-5 shrink-0 mt-0.5 text-[#5BB774] group-hover:text-white transition-colors" />
                <span className="font-medium leading-relaxed">
                  5ème niveau, Immeuble Ex-Sozacom,<br/>
                  Boulevard du 30 Juin, Kinshasa-Gombe,<br/>
                  République Démocratique du Congo.
                </span>
              </li>
              <li className="flex items-center gap-4 group">
                <Phone className="w-5 h-5 shrink-0 text-[#5BB774] group-hover:text-white transition-colors" />
                <span className="font-bold tracking-wider">+243 995 892 888</span>
              </li>
              <li className="flex items-center gap-4 group">
                <Mail className="w-5 h-5 shrink-0 text-[#5BB774] group-hover:text-white transition-colors" />
                <span className="font-medium tracking-wide">drc@sinoscholar.org</span>
              </li>
            </ul>
          </div>
          
          {/* Links Column */}
          <div className="col-span-12 lg:col-span-3 lg:justify-self-end">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] mb-8 text-white/40">Raccourcis</h4>
            <ul className="space-y-4 text-sm text-white/80 font-medium">
              <li><a href="#programme-desktop" className="hover:text-white hover:text-shadow transition-all flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-[#059669]"></div> La Mission</a></li>
              <li><a href="#processus-desktop" className="hover:text-white hover:text-shadow transition-all flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-[#059669]"></div> Le Protocole</a></li>
              <li><a href="#eligibilite-desktop" className="hover:text-white hover:text-shadow transition-all flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-[#059669]"></div> Les Conditions</a></li>
              <li className="pt-6">
                <a href="#hero" onClick={() => window.scrollTo(0,0)} className="inline-block border border-white/20 px-6 py-3 font-bold text-white hover:bg-white hover:text-[#0B3D91] transition-all uppercase text-[10px] tracking-[0.2em] rounded-sm">
                  Démarrer une candidature
                </a>
              </li>
            </ul>
          </div>

        </div>
        
        <div className="border-t border-white/20 pt-8 grid grid-cols-12 gap-16 text-[10px] text-white/60 font-black uppercase tracking-[0.2em] items-start">
          <div className="col-span-12 lg:col-span-5 pr-8">
            <p>© {new Date().getFullYear()} COOPÉRATION ACADÉMIQUE SINO-CONGOLAISE.</p>
          </div>
          <div className="col-span-12 lg:col-span-4">
            <p className="opacity-50">TOUS DROITS RÉSERVÉS.</p>
          </div>
          <div className="col-span-12 lg:col-span-3 flex flex-col lg:flex-row lg:justify-end gap-4 lg:gap-8 opacity-50">
            <a href="#" className="hover:text-white hover:opacity-100 transition-all">LÉGAL</a>
            <a href="#" className="hover:text-white hover:opacity-100 transition-all">CONFIDENTIALITÉ</a>
          </div>
        </div>
      </div>
    </footer>
  </>
);

export default Footer;
