
import React from 'react';
import { LanguageProvider } from '../contexts/LanguageContext';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import WhySection from '../components/WhySection';
import ServicesSection from '../components/ServicesSection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';
import Particles from '../components/Particles';

const Index = () => {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-cosmic-gradient relative overflow-x-hidden">
        <Particles />
        <Header />
        <main>
          <HeroSection />
          <WhySection />
          <ServicesSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
};

export default Index;
