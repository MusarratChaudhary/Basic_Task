"use client";

import { useState } from "react";
import PricingCard from "./PricingCard";

const plans = [
  {
    tier: "Starter",
    price: { monthly: "$99", yearly: "$79" },
    description: "Ideal for startups exploring next-gen capabilities.",
    features: [
      "2 AI Agents",
      "Cloud Infrastructure Basics",
      "Standard Analytics",
      "8/5 Email Support",
      "API Access (Limited)",
    ],
  },
  {
    tier: "Professional",
    price: { monthly: "$299", yearly: "$239" },
    description: "Designed for growing enterprises scaling operations.",
    features: [
      "10 AI Agents",
      "Advanced Cloud Orchestration",
      "Predictive Analytics",
      "24/7 Priority Support",
      "Full API Access",
      "Custom Integrations",
    ],
    isPopular: true,
  },
  {
    tier: "Enterprise",
    price: { monthly: "Custom", yearly: "Custom" },
    description: "Bespoke solutions for global-scale organizations.",
    features: [
      "Unlimited AI Agents",
      "Dedicated Infrastructure",
      "Advanced Cyber Resilience",
      "Dedicated Account Manager",
      "On-premise Options",
      "SLA Guarantees",
    ],
  },
];

interface PricingProps {
  onContactClick: () => void;
}

const Pricing = ({ onContactClick }: PricingProps) => {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");

  return (
    <section id="pricing" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400 mb-4 reveal">Pricing Plans</h2>
          <p className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-8 reveal">Scalable solutions for every stage.</p>
          
          {/* Billing Toggle */}
          <div className="flex items-center justify-center space-x-4 reveal">
            <span className={`text-sm font-bold transition-colors ${billingCycle === 'monthly' ? 'text-slate-900 dark:text-white' : 'text-slate-500'}`}>Monthly</span>
            <button 
              onClick={() => setBillingCycle(prev => prev === 'monthly' ? 'yearly' : 'monthly')}
              className="relative w-14 h-7 rounded-full bg-slate-200 dark:bg-white/10 p-1 transition-all hover:bg-slate-300 dark:hover:bg-white/20 active:scale-90 transform-gpu"
              aria-label="Toggle billing cycle"
            >
              <div 
                className={`w-5 h-5 rounded-full bg-indigo-600 shadow-lg transition-transform duration-300 transform ${billingCycle === 'yearly' ? 'translate-x-7' : 'translate-x-0'}`}
              />
            </button>
            <div className="flex items-center space-x-2">
              <span className={`text-sm font-bold transition-colors ${billingCycle === 'yearly' ? 'text-slate-900 dark:text-white' : 'text-slate-500'}`}>Yearly</span>
              <span className="px-2 py-0.5 rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-[10px] font-bold uppercase tracking-wider">Save 20%</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {plans.map((plan, index) => (
            <PricingCard
              key={plan.tier}
              tier={plan.tier}
              price={billingCycle === 'monthly' ? plan.price.monthly : plan.price.yearly}
              billingCycle={billingCycle}
              description={plan.description}
              features={plan.features}
              isPopular={plan.isPopular}
              onContactClick={onContactClick}
              delay={index * 100}
            />
          ))}
        </div>
      </div>
      
      {/* Background decoration */}
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-indigo-600/10 rounded-full blur-[80px] pointer-events-none" />
    </section>
  );
};

export default Pricing;
