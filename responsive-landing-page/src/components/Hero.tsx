"use client";

import { useEffect, useState } from "react";

interface HeroProps {
  onContactClick: () => void;
}

const Hero = ({ onContactClick }: HeroProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-32 pb-20 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-indigo-600/20 rounded-full blur-[120px] animate-pulse-soft" />
        <div className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-[150px] animate-pulse-soft" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.05)_0%,transparent_70%)]" />
        
        {/* Floating Shapes */}
        <div className="absolute top-[15%] right-[15%] w-12 h-12 border border-cyan-500/30 rounded-lg animate-float opacity-40 hidden md:block" />
        <div className="absolute bottom-[20%] left-[10%] w-16 h-16 border border-indigo-500/20 rounded-full animate-float opacity-30 hidden md:block" style={{ animationDelay: '2s' }} />
        <div className="absolute top-[60%] right-[10%] w-8 h-8 border border-violet-500/40 rotate-45 animate-float opacity-40 hidden md:block" style={{ animationDelay: '4s' }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 text-center">
        {/* Badge */}
        <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full glass border-white/10 mb-8 transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
          </span>
          <span className="text-xs font-semibold uppercase tracking-widest text-cyan-400">Revolutionizing the Future</span>
        </div>

        {/* Headline */}
        <h1 className={`text-5xl md:text-8xl font-black tracking-tight mb-8 leading-[1.1] transition-all duration-1000 delay-200 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} text-slate-900 dark:text-white`}>
          Next-Gen Intelligence.<br />
          <span className="text-gradient">Built for Tomorrow.</span>
        </h1>

        {/* Subheadline */}
        <p className={`max-w-2xl mx-auto text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-12 leading-relaxed transition-all duration-1000 delay-400 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          Nexlify empowers visionary enterprises with cutting-edge AI, robust cloud infrastructure, and seamless digital transformation solutions.
        </p>

        {/* CTAs */}
        <div className={`flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 transition-all duration-1000 delay-600 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <button 
            onClick={onContactClick}
            className="btn-primary group w-full sm:w-auto text-white"
          >
            Get a Free Demo
            <svg className="inline-block ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
          <button 
            onClick={onContactClick}
            className="btn-secondary group w-full sm:w-auto flex items-center justify-center text-slate-900 dark:text-white"
          >
            <span className="w-8 h-8 rounded-full bg-slate-200 dark:bg-white/10 flex items-center justify-center mr-3 group-hover:bg-slate-300 dark:group-hover:bg-white/20 transition-colors">
              <svg className="w-3 h-3 text-indigo-600 dark:text-white fill-current" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
            Watch 1:42 Video
          </button>
        </div>

        {/* Trust Bar */}
        <div className={`mt-24 pt-12 border-t border-slate-200 dark:border-white/5 transition-all duration-1000 delay-800 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500 mb-10">Trusted by global industry leaders</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60 dark:opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
            {['Quantum', 'NeuralSync', 'Aether', 'CloudFlow', 'Vertex'].map((brand) => (
              <span key={brand} className="text-xl md:text-2xl font-bold tracking-tighter text-slate-900 dark:text-white/60">
                {brand}<span className="text-indigo-500">.</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
