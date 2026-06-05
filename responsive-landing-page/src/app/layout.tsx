import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { ThemeProvider } from "@/context/ThemeContext";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nexlify | Next-Gen Intelligence. Built for Tomorrow.",
  description: "Nexlify is a cutting-edge technology company specializing in Artificial Intelligence, Cloud Solutions, Digital Transformation, and Custom Software Development.",
  keywords: ["AI", "Cloud Solutions", "Digital Transformation", "Custom Software", "Nexlify"],
};

// Theme detection script to prevent flash of unstyled content
const themeScript = `
(function() {
  try {
    var theme = localStorage.getItem('theme');
    var supportDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (!theme && supportDark) theme = 'dark';
    if (!theme) theme = 'dark'; // Default to dark for premium aesthetic
    
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  } catch (e) {}
})();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={geistSans.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-screen antialiased bg-background text-foreground transition-colors duration-500 grain-overlay">
        <div className="bg-mesh" aria-hidden="true" />
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
