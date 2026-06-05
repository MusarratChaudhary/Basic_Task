"use client";

import ServiceCard from "./ServiceCard";

const services = [
  {
    title: "Applied Intelligence",
    description:
      "Tailored AI models designed to automate complex workflows and provide actionable predictive insights for your business.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    title: "Cloud Orchestration",
    description:
      "Scalable, secure, and high-performance cloud infrastructure optimized for modern distributed applications and global reach.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
      </svg>
    ),
  },
  {
    title: "Digital Evolution",
    description:
      "End-to-end digital transformation strategies that modernize your legacy systems and streamline operations.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    ),
  },
  {
    title: "Custom Engineering",
    description:
      "Premium bespoke software development focused on clean architecture, performance, and exceptional user experience.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
  },
  {
    title: "Cyber Resilience",
    description:
      "Advanced security protocols and continuous monitoring to protect your digital assets against evolving global threats.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    title: "Data Insights",
    description:
      "Transform raw data into meaningful business intelligence with advanced analytics tools.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
];

const Services = () => {
  return (
    <section id="services" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">

        <div className="text-center mb-20">
          <h2 className="text-sm font-bold uppercase tracking-widest text-cyan-500 mb-4 reveal">
            Comprehensive Solutions
          </h2>

          <p className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 reveal">
            Empowering your vision with technology.
          </p>

          <div className="w-20 h-1 bg-gradient-to-r from-indigo-500 to-cyan-500 mx-auto rounded-full reveal" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const animation =
              index === 0
                ? "reveal-left"
                : index === 1
                ? "reveal-bottom"
                : index === 2
                ? "reveal-right"
                : "reveal";

            return (
              <ServiceCard
                key={service.title}
                title={service.title}
                description={service.description}
                icon={service.icon}
                delay={index * 100}
                className={animation}
              />
            );
          })}
        </div>
      </div>

      <div className="absolute top-1/2 right-0 w-96 h-96 bg-cyan-600/10 rounded-full blur-[100px]" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-600/5 rounded-full blur-[120px]" />
    </section>
  );
};

export default Services;