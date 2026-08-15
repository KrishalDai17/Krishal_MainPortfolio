import { philosophyWords as defaultWords, philosophyStatement as defaultStatement } from "@/lib/data";
import Reveal from "./Reveal";

export default function Philosophy({
  philosophyWords = defaultWords,
  philosophyStatement = defaultStatement,
}: {
  philosophyWords?: string[];
  philosophyStatement?: string;
} = {}) {
  return (
    <section className="py-28 md:py-40 px-6 md:px-10 border-t border-line bg-ink-soft">
      <div className="mx-auto max-w-5xl text-center">
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
          {philosophyWords.map((word, i) => (
            <Reveal key={word} delay={i * 100}>
              <span className="font-display text-4xl md:text-6xl lg:text-7xl uppercase text-paper">
                {word}
              </span>
            </Reveal>
          ))}
        </div>
        <Reveal delay={500}>
          <p className="mt-10 max-w-2xl mx-auto text-paper-dim leading-relaxed text-base md:text-lg">
            {philosophyStatement}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
