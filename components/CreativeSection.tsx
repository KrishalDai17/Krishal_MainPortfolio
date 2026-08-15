import { Camera, Film } from "lucide-react";
import Reveal from "./Reveal";

export default function CreativeSection() {
  return (
    <section id="creative" className="section-glow glow-magenta-violet relative py-28 md:py-36 border-t border-line overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="relative min-h-[320px] md:min-h-[420px] bg-ink-soft flex items-center justify-center border-b md:border-b-0 md:border-r border-line">
          <Camera size={28} className="text-paper-dim/40" />
          <a
            href="#photography"
            className="absolute bottom-6 left-6 font-mono text-[10px] tracking-widest2 text-paper border border-line px-4 py-2 hover:border-pink transition-colors"
          >
            PHOTOGRAPHY
          </a>
        </div>
        <div className="relative min-h-[320px] md:min-h-[420px] bg-ink-raised flex items-center justify-center">
          <Film size={28} className="text-paper-dim/40" />
          <a
            href="#videography"
            className="absolute bottom-6 right-6 font-mono text-[10px] tracking-widest2 text-paper border border-line px-4 py-2 hover:border-violet transition-colors"
          >
            VIDEOGRAPHY
          </a>
        </div>
      </div>

      <Reveal>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none px-6">
          <h2 className="font-serif italic text-3xl md:text-5xl text-paper text-center leading-tight [text-shadow:0_2px_30px_rgb(var(--color-ink)/0.9)]">
            Capture the moment.
            <br />
            Tell the story.
          </h2>
        </div>
      </Reveal>
    </section>
  );
}
