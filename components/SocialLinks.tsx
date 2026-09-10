import {
  Github,
  Instagram,
  Facebook,
  Linkedin,
  Twitter,
  Youtube,
  Globe,
  Mail,
  Phone,
  MessageSquare,
  ArrowUpRight,
} from "lucide-react";
import { socialCards as defaultSocialCards } from "@/lib/data";
import Reveal from "./Reveal";

export function WhatsAppIcon({ size = 20, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M17.472 14.382c-.301-.15-1.78-.878-2.056-.979-.275-.1-.476-.15-.676.15-.2.301-.776.979-.952 1.18-.175.2-.351.225-.652.075-.3-.15-1.27-.468-2.42-1.493-.895-.798-1.5-1.784-1.675-2.085-.175-.3-.019-.463.13-.612.136-.135.301-.351.451-.527.15-.175.2-.3.301-.5.1-.2.05-.375-.025-.526-.075-.15-.676-1.63-.926-2.233-.244-.588-.493-.508-.676-.517-.175-.008-.376-.01-.576-.01-.2 0-.526.075-.802.375-.275.3-1.052 1.028-1.052 2.508 0 1.48 1.077 2.909 1.228 3.109.15.2 2.119 3.235 5.132 4.538.717.31 1.277.495 1.713.633.72.228 1.375.196 1.893.119.578-.087 1.78-.727 2.03-1.429.251-.702.251-1.304.176-1.429-.076-.125-.276-.2-.577-.35z" />
      <path d="M12.004 2c-5.523 0-10 4.477-10 10 0 1.767.458 3.427 1.258 4.873L2 22l5.253-1.227A9.957 9.957 0 0012.004 22c5.523 0 10-4.477 10-10s-4.477-10-10-10zm0 18.2c-1.57 0-3.048-.432-4.322-1.183l-.31-.183-3.197.747.76-3.118-.2-.319A8.17 8.17 0 013.804 12c0-4.522 3.678-8.2 8.2-8.2 4.522 0 8.2 3.678 8.2 8.2 0 4.522-3.678 8.2-8.2 8.2z" />
    </svg>
  );
}

function renderSocialIcon(key: string, className: string) {
  const k = key.toLowerCase();
  if (k.includes("whatsapp")) return <WhatsAppIcon size={20} className={className} />;
  if (k.includes("github")) return <Github size={20} className={className} />;
  if (k.includes("linkedin")) return <Linkedin size={20} className={className} />;
  if (k.includes("instagram")) return <Instagram size={20} className={className} />;
  if (k.includes("facebook")) return <Facebook size={20} className={className} />;
  if (k.includes("twitter") || k === "x") return <Twitter size={20} className={className} />;
  if (k.includes("youtube")) return <Youtube size={20} className={className} />;
  if (k.includes("mail") || k.includes("email")) return <Mail size={20} className={className} />;
  if (k.includes("phone") || k.includes("call")) return <Phone size={20} className={className} />;
  if (k.includes("chat") || k.includes("message")) return <MessageSquare size={20} className={className} />;
  return <Globe size={20} className={className} />;
}

type SocialCard = { key: string; label: string; tagline: string; handle: string; url: string; cta: string };

export default function SocialLinks({
  socialCards = defaultSocialCards,
}: {
  socialCards?: SocialCard[];
} = {}) {
  return (
    <section className="py-28 md:py-36 px-6 md:px-10 border-t border-line">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <span className="font-mono text-[11px] tracking-widest2 text-signal">06 — CONNECT</span>
          <h2 className="mt-4 font-display text-display-lg uppercase text-paper">Find me online.</h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-px bg-line border border-line rounded-sm overflow-hidden">
          {socialCards.map((card, i) => {
            const isPlaceholder = card.url.startsWith("[");
            return (
              <Reveal key={card.key} delay={i * 60} direction="up">
                <a
                  href={isPlaceholder ? undefined : card.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="OPEN"
                  className={`glass-panel p-7 h-full min-h-[190px] flex flex-col justify-between group transition-all duration-300 hover:bg-paper/[0.04] hover:-translate-y-1 hover:shadow-[0_12px_28px_-6px_rgba(79,124,255,0.22)] ${
                    isPlaceholder ? "pointer-events-none opacity-60" : ""
                  }`}
                >
                  <div className="text-signal transition-transform duration-300 group-hover:scale-125 group-hover:rotate-6">
                    {renderSocialIcon(card.key, card.key === "whatsapp" ? "text-lime group-hover:text-emerald-400 transition-colors" : "")}
                  </div>
                  <div>
                    <h3 className="font-display text-lg uppercase text-paper transition-colors group-hover:text-signal">{card.label}</h3>
                    <p className="mt-1 text-sm text-paper-dim">{card.tagline}</p>
                    {card.handle && (
                      <p className="mt-2 font-mono text-xs text-paper-dim/80">{card.handle}</p>
                    )}
                  </div>
                  <span className="mt-4 inline-flex items-center gap-1.5 font-mono text-[10px] tracking-widest2 text-signal transition-transform duration-200 group-hover:translate-x-1">
                    {isPlaceholder ? card.url : card.cta} <ArrowUpRight size={12} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </a>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
