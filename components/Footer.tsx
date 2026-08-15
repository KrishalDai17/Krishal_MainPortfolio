import { Github, Linkedin, Instagram, Facebook } from "lucide-react";
import { profile as defaultProfile } from "@/lib/data";

export default function Footer({
  profile = defaultProfile,
  footerNote,
}: {
  profile?: typeof defaultProfile;
  footerNote?: string;
} = {}) {
  return (
    <footer className="border-t border-line px-6 md:px-10 py-14">
      <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-10">
        <div>
          <span className="font-display text-xl uppercase text-paper">{profile.name}</span>
          <p className="mt-2 font-mono text-[11px] tracking-widest2 text-signal">
            {profile.tagline[0]} {profile.tagline[1]}
          </p>
        </div>

        <div className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-[11px] tracking-widest2 text-paper-dim md:justify-center content-center">
          <span>COMPUTER ENGINEERING</span>
          <span>SOFTWARE DEVELOPMENT</span>
          <span>QA</span>
          <span>DATA</span>
          <span>PHOTOGRAPHY</span>
          <span>VIDEOGRAPHY</span>
        </div>

        <div className="flex flex-col items-start md:items-end gap-4">
          <span className="font-mono text-xs text-paper-dim">{profile.location}</span>
          <div className="flex items-center gap-5">
            <a href={profile.links.github} target="_blank" rel="noopener noreferrer" className="text-paper-dim hover:text-signal transition-colors" aria-label="GitHub">
              <Github size={16} />
            </a>
            <a href={profile.links.linkedin || "#"} target="_blank" rel="noopener noreferrer" className="text-paper-dim hover:text-signal transition-colors" aria-label="LinkedIn">
              <Linkedin size={16} />
            </a>
            <a href={profile.links.instagram} target="_blank" rel="noopener noreferrer" className="text-paper-dim hover:text-signal transition-colors" aria-label="Instagram">
              <Instagram size={16} />
            </a>
            <a href={profile.links.facebook} target="_blank" rel="noopener noreferrer" className="text-paper-dim hover:text-signal transition-colors" aria-label="Facebook">
              <Facebook size={16} />
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl mt-10 pt-6 border-t border-line font-mono text-[10px] tracking-widest2 text-paper-dim/60">
        {footerNote || `© 2026 ${profile.name}`}
      </div>
    </footer>
  );
}
