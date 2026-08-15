"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { profile as defaultProfile } from "@/lib/data";
import Reveal from "./Reveal";

export default function Contact({
  profile = defaultProfile,
}: {
  profile?: typeof defaultProfile;
} = {}) {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const mailtoHref = `mailto:${profile.email}?subject=${encodeURIComponent(
    form.subject || `Message from ${form.name || "your website"}`
  )}&body=${encodeURIComponent(
    `${form.message}\n\n— ${form.name}${form.email ? ` (${form.email})` : ""}`
  )}`;

  return (
    <section id="contact" className="section-glow glow-cyan-pink py-28 md:py-36 px-6 md:px-10 border-t border-line">
      <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-14">
        <Reveal className="lg:col-span-5">
          <span className="font-mono text-[11px] tracking-widest2 text-signal">12 — CONTACT</span>
          <h2 className="mt-4 font-display text-display-lg uppercase text-paper">
            Let&apos;s build something.
          </h2>
          <p className="mt-6 text-paper-dim leading-relaxed max-w-md">
            Have a project, opportunity, collaboration, photography job, videography project, or
            creative idea? Let&apos;s talk.
          </p>

          <div className="mt-10 space-y-4 font-mono text-sm text-paper-dim">
            <div className="flex items-center gap-3">
              <MapPin size={16} className="text-signal" /> {profile.location}
            </div>
            <a href={`tel:+977${profile.phone}`} className="flex items-center gap-3 hover:text-signal transition-colors">
              <Phone size={16} className="text-signal" /> {profile.phone}
            </a>
            <a href={`mailto:${profile.email}`} className="flex items-center gap-3 hover:text-signal transition-colors">
              <Mail size={16} className="text-signal" /> {profile.email}
            </a>
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-2 border border-line px-6 py-3 font-mono text-[11px] tracking-widest2 text-paper hover:border-signal transition-colors"
            >
              EMAIL ME
            </a>
            <a
              href={`tel:+977${profile.phone}`}
              className="inline-flex items-center gap-2 border border-line px-6 py-3 font-mono text-[11px] tracking-widest2 text-paper hover:border-signal transition-colors"
            >
              CALL ME
            </a>
          </div>
        </Reveal>

        <Reveal delay={100} className="lg:col-span-7">
          <form
            className="space-y-5"
            onSubmit={(e) => {
              e.preventDefault();
              window.location.href = mailtoHref;
            }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <label className="block">
                <span className="font-mono text-[10px] tracking-widest2 text-paper-dim">NAME</span>
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="mt-2 w-full bg-transparent border-b border-line py-3 text-paper focus:border-signal outline-none transition-colors"
                  placeholder="Your name"
                />
              </label>
              <label className="block">
                <span className="font-mono text-[10px] tracking-widest2 text-paper-dim">EMAIL</span>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="mt-2 w-full bg-transparent border-b border-line py-3 text-paper focus:border-signal outline-none transition-colors"
                  placeholder="you@email.com"
                />
              </label>
            </div>
            <label className="block">
              <span className="font-mono text-[10px] tracking-widest2 text-paper-dim">SUBJECT</span>
              <input
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                className="mt-2 w-full bg-transparent border-b border-line py-3 text-paper focus:border-signal outline-none transition-colors"
                placeholder="What's this about?"
              />
            </label>
            <label className="block">
              <span className="font-mono text-[10px] tracking-widest2 text-paper-dim">MESSAGE</span>
              <textarea
                required
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="mt-2 w-full bg-transparent border-b border-line py-3 text-paper focus:border-signal outline-none transition-colors resize-none"
                placeholder="Tell me about your project..."
              />
            </label>
            <button
              type="submit"
              className="group inline-flex items-center gap-2 bg-signal text-paper px-8 py-3.5 font-mono text-[11px] tracking-widest2 hover:bg-signal-soft transition-colors"
            >
              SEND MESSAGE
              <Send size={14} className="transition-transform group-hover:translate-x-0.5" />
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
