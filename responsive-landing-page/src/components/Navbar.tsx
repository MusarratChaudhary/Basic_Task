"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "@/context/ThemeContext";

interface NavbarProps {
  onContactClick: () => void;
}

const Navbar = ({ onContactClick }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, toggle } = useTheme();

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Services", href: "#services" },
    { name: "About", href: "#about" },
    { name: "Pricing", href: "#pricing" },
    { name: "Testimonials", href: "#testimonials" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? "py-3 glass border-b border-slate-200/50 dark:border-white/5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)]" 
          : "py-6 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2 group active:scale-95 transform-gpu transition-transform">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 via-cyan-400 to-violet-600 rounded-xl flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-500 shadow-lg shadow-indigo-500/20">
            <span className="text-white font-bold text-xl">N</span>
          </div>
          <span className={`text-2xl font-bold tracking-tight transition-colors duration-300 ${
            isScrolled ? 'text-slate-900 dark:text-white' : 'text-cyan-600'
          }`}>
            Nexlify<span className="text-cyan-400">.</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-10">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`text-sm font-semibold transition-all duration-300 relative group active:scale-95 transform-gpu ${
                isScrolled 
                  ? 'text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-white' 
                  : 'text-slate-600 hover:text-blue-300'
              }`}
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-500 to-cyan-500 transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
          
          {/* Theme Toggle */}
          <button
            onClick={toggle}
            className={`p-2 rounded-xl transition-all duration-300 hover:bg-slate-100 dark:hover:bg-white/10 active:scale-90 transform-gpu ${
              isScrolled ? 'text-slate-600 dark:text-slate-300' : 'text-slate-400'
            }`}
            aria-label="Toggle theme"
          >
            {mounted && theme === "dark" ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.364l-.707-.707M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            ) : mounted ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            ) : (
              <div className="w-5 h-5" />
            )}
          </button>

          <button 
            onClick={onContactClick}
            className="btn-primary text-sm"
          >
            Get Started
          </button>
        </div>

        {/* Mobile Menu Button & Theme Toggle */}
        <div className="flex items-center space-x-4 md:hidden">
          <button
            onClick={toggle}
            className={`p-2 transition-all active:scale-90 transform-gpu ${isScrolled ? 'text-slate-900 dark:text-white' : 'text-white'}`}
            aria-label="Toggle theme"
          >
            {mounted && theme === "dark" ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.364l-.707-.707M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            ) : mounted ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            ) : (
              <div className="w-5 h-5" />
            )}
          </button>

          <button
            className={`p-2 transition-all active:scale-90 transform-gpu ${isScrolled ? 'text-slate-900 dark:text-white' : 'text-white'}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <span
                className={`h-0.5 w-full bg-current transition-all duration-300 ${
                  mobileMenuOpen ? "rotate-45 translate-y-2" : ""
                }`}
              />
              <span
                className={`h-0.5 w-full bg-current transition-all duration-300 ${
                  mobileMenuOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`h-0.5 w-full bg-current transition-all duration-300 ${
                  mobileMenuOpen ? "-rotate-45 -translate-y-2.5" : ""
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-500 ${
          mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-xl" />
        <div className="relative h-full flex flex-col items-center justify-center space-y-8 p-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-2xl font-bold text-white hover:text-cyan-400 transition-all active:scale-95 transform-gpu"
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <button 
            onClick={() => {
              onContactClick();
              setMobileMenuOpen(false);
            }}
            className="btn-primary w-full max-w-xs text-lg"
          >
            Get Started
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
