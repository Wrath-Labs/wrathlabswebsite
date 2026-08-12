import { techStack } from "@/lib/data";
import { Marquee } from "../ui/Marquee";

export function TechMarquee() {
  const half = Math.ceil(techStack.length / 2);
  const rows = [techStack.slice(0, half), techStack.slice(half)];

  return (
    <section className="relative border-y border-white/[0.06] bg-ink-950/60 py-12">
      <div className="shell mb-8 flex items-center justify-center">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/30">
          The stack we reach for by default
        </p>
      </div>

      <div className="flex flex-col gap-4">
        {rows.map((row, i) => (
          <Marquee key={i} reverse={i % 2 === 1} speed={i % 2 === 1 ? 46 : 38}>
            {row.map((tech) => (
              <span
                key={tech}
                className="group mx-3 inline-flex items-center gap-3 whitespace-nowrap px-4 py-2 font-display text-xl font-medium tracking-tight text-white/25 transition-colors duration-300 hover:text-white md:text-2xl"
              >
                {tech}
                <span className="size-1 rounded-full bg-ember-500/40 transition-colors duration-300 group-hover:bg-ember-500" />
              </span>
            ))}
          </Marquee>
        ))}
      </div>
    </section>
  );
}
