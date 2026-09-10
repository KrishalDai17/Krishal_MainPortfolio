"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle2, Loader2, AlertCircle } from "lucide-react";
import { profile as defaultProfile } from "@/lib/data";
import Reveal from "./Reveal";

export default function Contact({
  profile = defaultProfile,
}: {
  profile?: typeof defaultProfile;
} = {}) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data.error || "Failed to send message.");
      }

      setSubmitted(true);
      setForm({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch (err: any) {
      setErrorMessage(err.message || "An unexpected error occurred. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="section-glow glow-cyan-pink py-28 md:py-36 px-6 md:px-10 border-t border-line"
    >
      <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-14 items-start">
        {/* Left: Contact Info */}
        <Reveal className="lg:col-span-5">
          <span className="font-mono text-[11px] tracking-widest2 text-signal">
            07 — CONTACT
          </span>
          <h2 className="mt-4 font-display text-display-lg uppercase text-paper">
            Let&apos;s build something.
          </h2>
          <p className="mt-6 text-paper-dim leading-relaxed max-w-md text-base">
            Have an engineering role, QA contract, software project, collaborative idea, or creative photography assignment? Send an inquiry directly below.
          </p>

          <div className="mt-10 space-y-4 font-mono text-sm text-paper-dim">
            <div className="flex items-center gap-3">
              <MapPin size={16} className="text-signal" />
              <span>{profile.location}</span>
            </div>
            <a
              href={`tel:+977${profile.phone}`}
              className="flex items-center gap-3 hover:text-signal transition-colors"
            >
              <Phone size={16} className="text-signal" />
              <span>+977 {profile.phone}</span>
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="flex items-center gap-3 hover:text-signal transition-colors"
            >
              <Mail size={16} className="text-signal" />
              <span>{profile.email}</span>
            </a>
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-2 border border-line bg-paper/5 px-6 py-3 font-mono text-[11px] tracking-widest2 text-paper hover:border-signal transition-colors"
            >
              EMAIL ME
            </a>
            <a
              href={`tel:+977${profile.phone}`}
              className="inline-flex items-center gap-2 border border-line bg-paper/5 px-6 py-3 font-mono text-[11px] tracking-widest2 text-paper hover:border-signal transition-colors"
            >
              CALL ME
            </a>
          </div>
        </Reveal>

        {/* Right: Contact Form */}
        <Reveal delay={100} className="lg:col-span-7">
          <div className="glass-panel p-8 md:p-10 border border-line">
            {submitted ? (
              <div className="py-12 text-center space-y-4 animate-fade-up">
                <div className="h-12 w-12 rounded-full bg-lime/20 border border-lime text-lime mx-auto flex items-center justify-center">
                  <CheckCircle2 size={24} />
                </div>
                <h3 className="font-display text-2xl uppercase text-paper">
                  Message Sent Successfully
                </h3>
                <p className="text-sm text-paper-dim max-w-md mx-auto leading-relaxed">
                  Thank you for reaching out! Your inquiry has been logged directly into my system, and I will get back to you shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-6 py-2.5 border border-line font-mono text-xs text-paper hover:border-signal transition-colors"
                >
                  SEND ANOTHER MESSAGE
                </button>
              </div>
            ) : (
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name */}
                  <label className="block">
                    <span className="font-mono text-[10px] tracking-widest2 text-paper-dim">
                      FULL NAME *
                    </span>
                    <input
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="mt-2 w-full bg-ink/40 border border-line p-3 text-paper focus:border-signal outline-none transition-colors font-mono text-sm"
                      placeholder="Krishal Shrestha"
                    />
                  </label>

                  {/* Email */}
                  <label className="block">
                    <span className="font-mono text-[10px] tracking-widest2 text-paper-dim">
                      EMAIL ADDRESS *
                    </span>
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="mt-2 w-full bg-ink/40 border border-line p-3 text-paper focus:border-signal outline-none transition-colors font-mono text-sm"
                      placeholder="you@domain.com"
                    />
                  </label>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Phone */}
                  <label className="block">
                    <span className="font-mono text-[10px] tracking-widest2 text-paper-dim">
                      PHONE NUMBER (OPTIONAL)
                    </span>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="mt-2 w-full bg-ink/40 border border-line p-3 text-paper focus:border-signal outline-none transition-colors font-mono text-sm"
                      placeholder="+977 98XXXXXXXX"
                    />
                  </label>

                  {/* Subject */}
                  <label className="block">
                    <span className="font-mono text-[10px] tracking-widest2 text-paper-dim">
                      SUBJECT
                    </span>
                    <input
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      className="mt-2 w-full bg-ink/40 border border-line p-3 text-paper focus:border-signal outline-none transition-colors font-mono text-sm"
                      placeholder="Project / Role Inquiry"
                    />
                  </label>
                </div>

                {/* Message */}
                <label className="block">
                  <span className="font-mono text-[10px] tracking-widest2 text-paper-dim">
                    MESSAGE *
                  </span>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="mt-2 w-full bg-ink/40 border border-line p-3 text-paper focus:border-signal outline-none transition-colors resize-none font-mono text-sm"
                    placeholder="Describe your project, timeline, or open role..."
                  />
                </label>

                {errorMessage && (
                  <div className="p-3 bg-red-500/10 border border-red-500/40 text-red-400 text-xs flex items-center gap-2">
                    <AlertCircle size={14} />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="group inline-flex items-center gap-2 bg-signal disabled:opacity-50 text-white px-8 py-3.5 font-mono text-[11px] tracking-widest2 hover:bg-signal/80 transition-all shadow-md shadow-signal/20"
                >
                  {submitting ? (
                    <>
                      <Loader2 size={14} className="animate-spin" />
                      SENDING INQUIRY...
                    </>
                  ) : (
                    <>
                      TRANSMIT INQUIRY
                      <Send
                        size={14}
                        className="transition-transform group-hover:translate-x-0.5"
                      />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
