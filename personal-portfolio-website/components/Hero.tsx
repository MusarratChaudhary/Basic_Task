"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { siteData } from "@/lib/data";

const taglines = [
  "I build fast, scalable web applications — from pixel-perfect UIs to robust backend systems.",
  "Turning complex problems into clean, maintainable code — one commit at a time.",
  "Full stack from DB schema to deployment — React, Node.js, PostgreSQL & beyond.",
  "Crafting responsive interfaces and solid APIs that scale with your product.",
];

export default function Hero() {
  const [taglineIndex, setTaglineIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const interval = setInterval(() => {
      setVisible(false);
      timer = setTimeout(() => {
        setTaglineIndex((i) => (i + 1) % taglines.length);
        setVisible(true);
      }, 400);
    }, 3800);
    return () => { clearInterval(interval); clearTimeout(timer); };
  }, []);

  return (
    <section className="hero-section">
      {/* Animated background grid */}
      <div aria-hidden className="hero-grid" />

      <div className="hero-inner">
        {/* Left: text content */}
        <div className="hero-text">
          <p className="hero-tag">Hi, I&apos;m</p>

          <h1 className="hero-name">{siteData.name}</h1>

          <h2 className="hero-title">
            <TypewriterText text={siteData.title} />
          </h2>

          <p
            className="hero-tagline"
            style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(10px)" }}
          >
            {taglines[taglineIndex]}
          </p>

          <div className="hero-cta">
            <a href="#projects" className="btn-primary">
              View My Work <ArrowRight size={16} />
            </a>
            <a href="#contact" className="btn-outline">Get In Touch</a>
            <div className="btn-resume-group">
              <a href="/images/My_Resume.jpg" target="_blank" rel="noopener noreferrer" className="btn-resume-view">
                <FileIcon size={15} /> Resume
              </a>
              <a href="/images/My_Resume.jpg" download="Musarrat_Chaudhary_Resume.jpg" className="btn-resume-dl" title="Download resume" aria-label="Download resume">
                <DownloadIcon size={14} />
              </a>
            </div>
          </div>

          {/* Tagline dots indicator */}
          <div className="tagline-dots">
            {taglines.map((_, i) => (
              <button
                key={i}
                className={`tagline-dot${i === taglineIndex ? " active" : ""}`}
                onClick={() => { setTaglineIndex(i); setVisible(true); }}
                aria-label={`Tagline ${i + 1}`}
              />
            ))}
          </div>

          <div className="scroll-indicator">
            <div className="scroll-line" />
            <span>SCROLL</span>
          </div>
        </div>

        {/* Right: profile picture with animated rings */}
        <div className="hero-profile-wrap">
          {/* Outer slow-rotating dashed ring */}
          <div className="orbit-ring orbit-ring-outer" aria-hidden />
          {/* Middle counter-rotating ring */}
          <div className="orbit-ring orbit-ring-mid" aria-hidden />
          {/* Orbiting dot 1 */}
          <div className="orbit-dot orbit-dot-1" aria-hidden>
            <div className="orbit-dot-inner" />
          </div>
          {/* Orbiting dot 2 */}
          <div className="orbit-dot orbit-dot-2" aria-hidden>
            <div className="orbit-dot-inner orbit-dot-inner-2" />
          </div>
          {/* Inner glow ring */}
          <div className="profile-ring">
            <div className="profile-img-wrap">
              <Image
                src="/images/M_Chaudhry.png"
                alt={siteData.name}
                fill
                style={{ objectFit: "cover", objectPosition: "center top" }}
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TypewriterText({ text }: { text: string }) {
  return (
    <span className="typewriter-wrap">
      <span>{text}</span>
      <span className="typewriter-cursor" aria-hidden>|</span>
    </span>
  );
}

function ArrowRight({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}

function FileIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
      <polyline points="14 2 14 8 20 8" />
    </svg>
  );
}

function DownloadIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}
