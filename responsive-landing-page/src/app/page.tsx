"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Stats from "@/components/Stats";
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
import ContactModal from "@/components/ContactModal";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function Home() {
  // Initialize scroll reveal animations
  useScrollReveal();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-indigo-600 focus:text-white focus:rounded-lg focus:text-sm focus:font-semibold active:scale-95 transform-gpu transition-all"
      >
        Skip to main content
      </a>
      
      <Navbar onContactClick={openModal} />
      
      <main id="main-content">
        <Hero onContactClick={openModal} />
        <Services />
        <Stats />
        <Pricing onContactClick={openModal} />
        <Testimonials />
        
        {/* CTA Section */}
        <section className="py-24 relative overflow-hidden bg-white dark:bg-transparent">
          <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
            <div className="glass p-12 md:p-20 rounded-[3rem] text-center border-indigo-500/20 shadow-2xl shadow-indigo-500/10 reveal">
              <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-8 leading-tight">
                Ready to build the <br /><span className="text-gradient">next generation?</span>
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-12">
                Join hundreds of industry leaders who trust Nexlify to power their most critical digital operations.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                <button 
                  onClick={openModal}
                  className="btn-primary w-full sm:w-auto text-white"
                >
                  Start Your Journey
                </button>
                <button 
                  onClick={openModal}
                  className="btn-secondary w-full sm:w-auto text-slate-900 dark:text-white"
                >
                  Talk to an Expert
                </button>
              </div>
            </div>
          </div>
          
          {/* Decorative background */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.1)_0%,transparent_70%)] pointer-events-none" />
        </section>
      </main>
      
      <Footer onContactClick={openModal} />
      
      <ContactModal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
}
