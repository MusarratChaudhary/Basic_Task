"use client";

import { useEffect, useState, useRef } from "react";

const Counter = ({ end, duration = 2000, suffix = "" }: { end: number, duration?: number, suffix?: string }) => {
  const [count, setCount] = useState(0);
  const countRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.5 }
    );

    if (countRef.current) observer.observe(countRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let start = 0;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [isVisible, end, duration]);

  return <span ref={countRef}>{count}{suffix}</span>;
};

const Stats = () => {
  const stats = [
    { label: "Global Clients", value: 500, suffix: "+" },
    { label: "Projects Delivered", value: 1200, suffix: "+" },
    { label: "Expert Engineers", value: 250, suffix: "+" },
    { label: "System Uptime", value: 99.9, suffix: "%" },
  ];

  return (
    <section className="py-24 relative bg-slate-100/50 dark:bg-slate-900/30">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, index) => (
            <div 
              key={stat.label} 
              className="group text-center p-8 rounded-3xl glass hover:-translate-y-2 active:scale-95 transform-gpu transition-all duration-500 reveal" 
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-2 tracking-tighter group-hover:text-indigo-600 dark:group-hover:text-cyan-400 transition-colors">
                <Counter end={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
