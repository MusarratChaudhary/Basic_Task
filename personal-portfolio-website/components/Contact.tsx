"use client";
import { useState } from "react";
import { siteData } from "@/lib/data";
import { SectionLabel } from "./About";

type FormState = { name: string; email: string; message: string };
type Status = "idle" | "sending" | "sent";

export default function Contact() {
  const [form, setForm] = useState<FormState>({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Partial<FormState>>({});

  const touch = (field: keyof FormState, value: string) => {
    setForm((f) => ({ ...f, [field]: value }));
    if (fieldErrors[field]) setFieldErrors((fe) => ({ ...fe, [field]: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Inline field-level errors
    const errs: Partial<FormState> = {};
    if (!form.name.trim()) errs.name = "Required";
    if (!form.email.trim()) errs.email = "Required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = "Invalid email";
    if (!form.message.trim()) errs.message = "Required";
    else if (form.message.trim().length < 10) errs.message = "At least 10 characters";

    if (Object.keys(errs).length) { setFieldErrors(errs); return; }

    setStatus("sending");
    // Simulate network delay
    await new Promise((r) => setTimeout(r, 1000));
    setStatus("sent");
  };

  const reset = () => {
    setForm({ name: "", email: "", message: "" });
    setStatus("idle");
    setError(null);
    setFieldErrors({});
  };

  return (
    <section id="contact" style={{ padding: "7rem 1.5rem", background: "var(--surface)" }}>
      <div style={{ maxWidth: 700, margin: "0 auto" }}>
        <SectionLabel>Contact</SectionLabel>

        <h2 style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 700, letterSpacing: "-0.02em", color: "var(--text-primary)", marginBottom: "0.75rem" }}>
          Let&apos;s work together
        </h2>
        <p style={{ color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: "2.5rem" }}>
          I&apos;m actively looking for internship opportunities. Whether you have a question, a project idea, or just want to say hi — my inbox is open.
        </p>

        {status === "sent" ? (
          <div style={{ background: "rgba(124,106,247,0.1)", border: "1px solid rgba(124,106,247,0.3)", borderRadius: 12, padding: "2rem", textAlign: "center", color: "var(--accent-light)" }}>
            <CheckIcon />
            <p style={{ marginTop: "0.75rem", fontWeight: 600, fontSize: "1.1rem" }}>Message received!</p>
            <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", marginTop: "0.25rem" }}>
              Thanks for reaching out. I&apos;ll get back to you within 24 hours.
            </p>
            <button onClick={reset} className="btn-submit" style={{ marginTop: "1.5rem", fontSize: "0.85rem", padding: "0.6rem 1.5rem" }}>
              Send another message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }} className="form-grid">
              <Field label="Name" type="text" value={form.name} onChange={(v) => touch("name", v)} placeholder="Your name" error={fieldErrors.name} />
              <Field label="Email" type="email" value={form.email} onChange={(v) => touch("email", v)} placeholder="your@email.com" error={fieldErrors.email} />
            </div>
            <Field label="Message" type="textarea" value={form.message} onChange={(v) => touch("message", v)} placeholder="Tell me about your project or opportunity..." error={fieldErrors.message} />

            {error && (
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#f87171", fontSize: "0.85rem", background: "rgba(248,113,113,0.08)", border: "1px solid rgba(248,113,113,0.2)", borderRadius: 8, padding: "0.6rem 0.9rem" }}>
                <AlertIcon size={15} /> {error}
              </div>
            )}

            <button type="submit" disabled={status === "sending"} className="btn-submit">
              {status === "sending" ? (
                <span style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
                  <SpinnerIcon /> Sending...
                </span>
              ) : "Send Message"}
            </button>
          </form>
        )}

        {/* Social links */}
        <div style={{ display: "flex", gap: "1.5rem", marginTop: "3rem", paddingTop: "2rem", borderTop: "1px solid var(--border)", flexWrap: "wrap" }}>
          <a href={`mailto:${siteData.email}`} style={socialStyle} className="social-link">
            <MailIcon size={16} /> {siteData.email}
          </a>
          <a href={siteData.github} target="_blank" rel="noopener noreferrer" style={socialStyle} className="social-link">
            <GithubIcon size={16} /> GitHub
          </a>
          <a href={siteData.linkedin} target="_blank" rel="noopener noreferrer" style={socialStyle} className="social-link">
            <LinkedinIcon size={16} /> LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
}

function Field({
  label, type, value, onChange, placeholder, error,
}: {
  label: string; type: string; value: string;
  onChange: (v: string) => void; placeholder: string; error?: string;
}) {
  const base: React.CSSProperties = {
    width: "100%",
    background: "var(--background)",
    border: `1px solid ${error ? "rgba(248,113,113,0.6)" : "var(--border)"}`,
    borderRadius: 10,
    padding: "0.75rem 1rem",
    color: "var(--text-primary)",
    fontSize: "0.9rem",
    outline: "none",
    transition: "border-color 0.2s",
    fontFamily: "inherit",
    resize: "vertical",
  };
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
      <label style={{ fontSize: "0.8rem", color: "var(--text-secondary)", fontWeight: 500 }}>{label}</label>
      {type === "textarea" ? (
        <textarea value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} rows={5} style={base}
          onFocus={(e) => (e.target.style.borderColor = "var(--accent)")}
          onBlur={(e) => (e.target.style.borderColor = error ? "rgba(248,113,113,0.6)" : "var(--border)")} />
      ) : (
        <input type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} style={base}
          onFocus={(e) => (e.target.style.borderColor = "var(--accent)")}
          onBlur={(e) => (e.target.style.borderColor = error ? "rgba(248,113,113,0.6)" : "var(--border)")} />
      )}
      {error && <span style={{ fontSize: "0.75rem", color: "#f87171" }}>{error}</span>}
    </div>
  );
}

const socialStyle: React.CSSProperties = {
  display: "inline-flex", alignItems: "center", gap: "0.4rem",
  fontSize: "0.85rem", color: "var(--text-secondary)", textDecoration: "none", transition: "color 0.2s",
};

function CheckIcon() {
  return (
    <svg width={44} height={44} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} style={{ margin: "0 auto", display: "block" }}>
      <circle cx="12" cy="12" r="10" />
      <polyline points="9 12 11 14 15 10" />
    </svg>
  );
}

function AlertIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} style={{ flexShrink: 0 }}>
      <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  );
}

function SpinnerIcon() {
  return (
    <svg width={15} height={15} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} style={{ animation: "spin 0.7s linear infinite" }}>
      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </svg>
  );
}

function MailIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}

function GithubIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

function LinkedinIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}
