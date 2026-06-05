"use client";

import { useState, useEffect } from "react";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactModal = ({ isOpen, onClose }: ContactModalProps) => {
  const [formState, setFormState] = useState<"idle" | "submitting" | "success">("idle");

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("submitting");
    // Simulate API call
    setTimeout(() => {
      setFormState("success");
      setTimeout(() => {
        onClose();
        setFormState("idle");
      }, 2000);
    }, 1500);
  };

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 transition-all duration-500 ${
        isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
    >
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-950/60 backdrop-blur-md" 
        onClick={onClose}
      />
      
      {/* Modal Container */}
      <div
        className={`relative w-full max-w-xl glass rounded-[2.5rem] p-8 md:p-12 border-white/10 shadow-2xl transition-all duration-500 transform ${
          isOpen ? "scale-100 translate-y-0" : "scale-95 translate-y-8"
        } bg-white dark:bg-slate-900/80`}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-white/10 active:scale-90 transform-gpu transition-all text-slate-500 dark:text-slate-400"
          aria-label="Close modal"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {formState === "success" ? (
          <div className="text-center py-12 animate-fade-in">
            <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6 text-green-500">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Message Sent!</h3>
            <p className="text-slate-600 dark:text-slate-400">Our experts will reach out to you shortly.</p>
          </div>
        ) : (
          <>
            <div className="mb-8">
              <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-2">Build the Future.</h2>
              <p className="text-slate-600 dark:text-slate-400">Tell us about your vision and let&apos;s engineer it together.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Full Name</label>
                  <input
                    required
                    type="text"
                    id="name"
                    placeholder="John Doe"
                    className="w-full px-6 py-3.5 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 dark:focus:border-cyan-500 transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Email Address</label>
                  <input
                    required
                    type="email"
                    id="email"
                    placeholder="john@company.com"
                    className="w-full px-6 py-3.5 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 dark:focus:border-cyan-500 transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="company" className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Company / Organization</label>
                <input
                  type="text"
                  id="company"
                  placeholder="Future Tech Inc."
                  className="w-full px-6 py-3.5 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 dark:focus:border-cyan-500 transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Your Vision</label>
                <textarea
                  required
                  id="message"
                  rows={4}
                  placeholder="How can we help you scale your digital operations?"
                  className="w-full px-6 py-3.5 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 dark:focus:border-cyan-500 transition-colors resize-none"
                />
              </div>

              <button
                disabled={formState === "submitting"}
                type="submit"
                className="w-full btn-primary text-white py-4 text-lg mt-4 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {formState === "submitting" ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Engineering...
                  </span>
                ) : "Send Message"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default ContactModal;
