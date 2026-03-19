import { useState } from "react";
import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import About from "@/components/landing/About";
import WhyChina from "@/components/landing/WhyChina";
import ProgramStructure from "@/components/landing/ProgramStructure";
import Benefits from "@/components/landing/Benefits";
import Eligibility from "@/components/landing/Eligibility";
import CTASection from "@/components/landing/CTASection";
import Trust from "@/components/landing/Trust";
import Contact from "@/components/landing/Contact";
import Footer from "@/components/landing/Footer";
import ApplicationForm from "@/components/landing/ApplicationForm";

const Index = () => {
  const [showForm, setShowForm] = useState(false);

  if (showForm) {
    return <ApplicationForm onClose={() => setShowForm(false)} />;
  }

  return (
    <div className="min-h-screen">
      <Navbar onApply={() => setShowForm(true)} />
      <Hero onApply={() => setShowForm(true)} />
      <About />
      <WhyChina />
      <ProgramStructure />
      <Benefits />
      <Eligibility />
      <CTASection onApply={() => setShowForm(true)} />
      <Trust />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
