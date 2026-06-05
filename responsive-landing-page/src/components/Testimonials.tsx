"use client";

import { useState, useEffect } from "react";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "CTO at NexusFlow",
    quote: "Nexlify transformed our infrastructure in weeks. Their AI-driven orchestration reduced our cloud costs by 40% while doubling our processing speed.",
    avatar: "SC",
  },
  {
    name: "Marcus Thorne",
    role: "Director of Innovation, Vertex Group",
    quote: "The level of sophistication in Nexlify's custom engineering is unmatched. They don't just build software; they build competitive advantages.",
    avatar: "MT",
  },
  {
    name: "Elena Rodriguez",
    role: "Head of Digital at GlobalScale",
    quote: "Digital transformation is usually painful, but Nexlify made it seamless. Their team of experts feels like an extension of our own.",
    avatar: "ER",
  },
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="testimonials" className="py-24 relative overflow-hidden bg-slate-50 dark:bg-slate-950">
      <div className="max-w-5xl mx-auto px-6 md:px-12 relative z-10 text-center">
        <h2 className="text-sm font-bold uppercase tracking-widest text-cyan-600 dark:text-cyan-400 mb-4 reveal">Success Stories</h2>
        <p className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-16 reveal">Trusted by Industry Pioneers</p>

        <div className="relative min-h-[400px] flex items-center justify-center">
          {testimonials.map((t, index) => (
            <div
              key={t.name}
              className={`absolute inset-0 transition-all duration-1000 flex flex-col items-center justify-center ${
                index === activeIndex ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"
              }`}
            >
              {/* Avatar Circle */}
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center text-white font-bold text-2xl mb-8 shadow-xl shadow-indigo-500/20">
                {t.avatar}
              </div>
              
              <blockquote className="text-xl md:text-3xl font-medium text-slate-700 dark:text-slate-200 leading-relaxed mb-8 italic">
                &quot;{t.quote}&quot;
              </blockquote>
              
              <div>
                <cite className="not-italic font-bold text-slate-900 dark:text-white text-lg">{t.name}</cite>
                <p className="text-slate-500 text-sm uppercase tracking-widest mt-1">{t.role}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Indicators */}
        <div className="flex justify-center space-x-3 mt-12">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`h-1.5 transition-all duration-500 rounded-full active:scale-90 transform-gpu ${
                index === activeIndex ? "w-8 bg-cyan-600 dark:bg-cyan-400" : "w-2 bg-slate-300 dark:bg-slate-700 hover:bg-slate-400 dark:hover:bg-slate-600"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
