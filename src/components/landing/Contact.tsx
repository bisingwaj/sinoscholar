import SectionWrapper from "./SectionWrapper";
import { Mail, Phone } from "lucide-react";

const Contact = () => (
  <div className="md:hidden">
    <SectionWrapper id="contact">
      <p className="text-sm font-semibold tracking-widest uppercase text-accent mb-2">Contact</p>
      <h2 className="text-2xl font-bold mb-8">Nous contacter</h2>
      <div className="space-y-4">
        <a href="https://wa.me/243995892888" className="flex items-center gap-3 text-foreground hover:text-primary transition-colors">
          <Phone className="w-5 h-5 text-primary" />
          <span>+243 995 892 888</span>
        </a>
        <a href="mailto:drc@sinoscholar.org" className="flex items-center gap-3 text-foreground hover:text-primary transition-colors">
          <Mail className="w-5 h-5 text-primary" />
          <span>drc@sinoscholar.org</span>
        </a>
      </div>
    </SectionWrapper>
  </div>
);

export default Contact;
