import { personalIdentityWords as defaultWords } from "@/lib/data";
import Reveal from "./Reveal";

export default function IdentityWords({
  personalIdentityWords = defaultWords,
}: {
  personalIdentityWords?: string[];
} = {}) {
  return (
    <section className="py-24 md:py-32 px-6 md:px-10 border-t border-line">
      <div className="mx-auto max-w-5xl">
        {personalIdentityWords.map((word, i) => (
          <Reveal key={word} delay={i * 90}>
            <div className="flex items-center gap-6 py-2 md:py-3">
              <span className="font-mono text-xs text-paper-dim w-10">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="font-display text-4xl md:text-6xl lg:text-7xl uppercase text-paper hover:text-signal transition-colors">
                {word}
              </h3>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
