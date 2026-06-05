"use client";

interface PricingCardProps {
  tier: string;
  price: string;
  description: string;
  features: string[];
  billingCycle: "monthly" | "yearly";
  isPopular?: boolean;
  onContactClick: () => void;
  delay?: number;
}

const PricingCard = ({ tier, price, description, features, billingCycle, isPopular, onContactClick, delay = 0 }: PricingCardProps) => {
  return (
    <div 
      className={`group relative p-8 rounded-3xl glass transition-all duration-500 hover:-translate-y-4 active:scale-95 transform-gpu flex flex-col ${
        isPopular 
          ? "border-indigo-500/50 shadow-[0_20px_50px_rgba(79,70,229,0.2)] dark:shadow-[0_20px_50px_rgba(99,102,241,0.3)] scale-105 z-10" 
          : "border-slate-200 dark:border-white/5 hover:border-indigo-500/30 hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)] dark:hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
      } bg-white dark:bg-transparent`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {isPopular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-5 py-1.5 bg-gradient-to-r from-indigo-600 to-violet-600 rounded-full text-[10px] font-bold uppercase tracking-widest text-white shadow-lg group-hover:scale-110 transition-transform duration-500">
          Most Popular
        </div>
      )}

      {/* Hover Background Accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/0 to-indigo-500/0 group-hover:from-indigo-500/[0.02] group-hover:to-transparent rounded-3xl transition-all duration-700 pointer-events-none" />

      <div className="mb-8 relative z-10">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-cyan-400 transition-colors">{tier}</h3>
        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{description}</p>
      </div>

      <div className="mb-8 overflow-hidden h-14 relative z-10">
        <div 
          key={price}
          className="animate-fade-in-up flex items-baseline"
        >
          <span className="text-5xl font-black text-slate-900 dark:text-white tracking-tight">{price}</span>
          {price !== "Custom" && (
            <span className="text-slate-500 ml-2 text-sm font-semibold uppercase tracking-wider">
              /{billingCycle === 'monthly' ? 'mo' : 'yr'}
            </span>
          )}
        </div>
      </div>

      <ul className="space-y-4 mb-10 flex-grow relative z-10">
        {features.map((feature) => (
          <li key={feature} className="flex items-start text-sm text-slate-600 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-slate-200 transition-colors">
            <div className="w-5 h-5 rounded-full bg-indigo-500/10 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
              <svg className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            {feature}
          </li>
        ))}
      </ul>

      <button 
        onClick={onContactClick}
        className={`${isPopular ? "btn-primary text-white" : "btn-secondary text-slate-900 dark:text-white hover:border-indigo-500/50"} w-full py-4 relative z-10 font-bold tracking-wide`}
      >
        {tier === "Enterprise" ? "Contact Sales" : "Start Free Trial"}
      </button>
    </div>
  );
};

export default PricingCard;
