"use client";

import Link from "next/link";

interface FooterProps {
  onContactClick: () => void;
}

const Footer = ({ onContactClick }: FooterProps) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-50 dark:bg-slate-950 pt-24 pb-12 border-t border-slate-200 dark:border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          {/* Brand Column */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center space-x-2 group active:scale-95 transform-gpu transition-transform">
              <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 via-cyan-400 to-violet-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/20">
                <span className="text-white font-bold text-lg">N</span>
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">Nexlify</span>
            </Link>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
              Nexlify is a cutting-edge technology company specializing in AI, Cloud Solutions, and Digital Transformation. We build the intelligence for tomorrow.
            </p>
            <div className="flex space-x-4">
              {[
                { name: 'Twitter', icon: <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" /> },
                { name: 'LinkedIn', icon: <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" /> },
                { name: 'GitHub', icon: <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" /> }
              ].map((social) => (
                <a 
                  key={social.name} 
                  href="#" 
                  className="w-10 h-10 rounded-full bg-slate-200 dark:bg-white/5 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-white hover:bg-slate-300 dark:hover:bg-white/10 active:scale-90 transform-gpu transition-all duration-300"
                  aria-label={social.name}
                >
                  <span className="sr-only">{social.name}</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    {social.icon}
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div>
            <h4 className="text-slate-900 dark:text-white font-bold mb-6 uppercase tracking-widest text-xs">Solutions</h4>
            <ul className="space-y-4">
              {['AI & Intelligence', 'Cloud Infrastructure', 'Digital Evolution', 'Security Architecture'].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-cyan-400 transition-all active:scale-95 transform-gpu inline-block text-sm">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-slate-900 dark:text-white font-bold mb-6 uppercase tracking-widest text-xs">Company</h4>
            <ul className="space-y-4">
              {['About Us', 'Success Stories', 'Expert Team', 'Careers'].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-cyan-400 transition-all active:scale-95 transform-gpu inline-block text-sm">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="space-y-6">
            <h4 className="text-slate-900 dark:text-white font-bold mb-6 uppercase tracking-widest text-xs">Stay Ahead</h4>
            <p className="text-slate-600 dark:text-slate-400 text-sm">Join our newsletter to receive the latest insights on tech evolution.</p>
            <form 
              className="relative"
              onSubmit={(e) => {
                e.preventDefault();
                onContactClick();
              }}
            >
              <input 
                type="email" 
                placeholder="email@example.com" 
                className="w-full bg-slate-200 dark:bg-white/5 border border-slate-300 dark:border-white/10 rounded-full px-6 py-3 text-sm text-slate-900 dark:text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
              />
              <button 
                type="submit" 
                className="absolute right-1.5 top-1.5 bottom-1.5 px-4 bg-indigo-600 hover:bg-indigo-500 active:scale-90 transform-gpu text-white rounded-full text-xs font-bold transition-all"
              >
                Join
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-200 dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col space-y-2">
            <p className="text-slate-500 text-xs">
              © {currentYear} Nexlify Inc. Next-Gen Intelligence. All Rights Reserved.
            </p>
            <p className="text-slate-400 dark:text-slate-500 text-[10px] italic max-w-md">
              Disclaimer: This is not a real company website. It was created solely for an internship task and portfolio demonstration purposes.
            </p>
          </div>
          <div className="flex space-x-8">
            <Link href="#" className="text-slate-500 hover:text-slate-900 dark:hover:text-white transition-all active:scale-95 transform-gpu text-xs">Privacy Policy</Link>
            <Link href="#" className="text-slate-500 hover:text-slate-900 dark:hover:text-white transition-all active:scale-95 transform-gpu text-xs">Terms of Service</Link>
            <Link href="#" className="text-slate-500 hover:text-slate-900 dark:hover:text-white transition-all active:scale-95 transform-gpu text-xs">Cookie Settings</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
