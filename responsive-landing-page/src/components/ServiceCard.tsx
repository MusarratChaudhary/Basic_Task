"use client";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  delay?: number;
  className?: string;
}

const ServiceCard = ({
  title,
  description,
  icon,
  delay = 0,
  className = "",
}: ServiceCardProps) => {
  return (
    <div
      className={`group relative p-8 rounded-3xl glass transition-all duration-500
      hover:-translate-y-4 hover:scale-[1.02] active:scale-95 transform-gpu
      hover:shadow-[0_30px_80px_rgba(99,102,241,0.25)]
      ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {/* Glow Border */}
      <div className="absolute inset-0 rounded-3xl border border-transparent group-hover:border-indigo-500/30 transition-colors duration-500 pointer-events-none" />

      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/0 via-transparent to-violet-600/0 group-hover:from-indigo-500/5 group-hover:to-violet-600/5 rounded-3xl transition-all duration-700 pointer-events-none" />

      {/* Icon */}
      <div className="relative z-10 w-16 h-16 mb-8 rounded-2xl bg-slate-100 dark:bg-slate-900/50 flex items-center justify-center border border-slate-200 dark:border-white/10 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
        <div className="text-indigo-600 dark:text-indigo-400 group-hover:text-cyan-400 transition-all duration-500">
          {icon}
        </div>
      </div>

      {/* Title */}
      <h3 className="relative z-10 text-xl font-bold mb-4 text-slate-900 dark:text-white group-hover:text-indigo-600 transition-colors duration-300">
        {title}
      </h3>

      {/* Description */}
      <p className="relative z-10 text-slate-600 dark:text-slate-400 text-sm leading-relaxed group-hover:text-slate-800 dark:group-hover:text-slate-200 transition-colors duration-300">
        {description}
      </p>

      {/* Arrow */}
      <div className="mt-6 flex items-center text-indigo-600 dark:text-indigo-400 text-xs font-semibold md:opacity-0 max-md:opacity-60 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-500">
        <span>Learn More</span>
      </div>
    </div>
  );
};

export default ServiceCard;