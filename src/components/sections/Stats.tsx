import { stats } from "@/lib/data";
import { Counter } from "../ui/Counter";
import { Reveal } from "../ui/Reveal";

export function Stats() {
  return (
    <section className="relative py-20">
      <div className="shell">
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.05] md:grid-cols-4">
          {stats.map((stat, i) => (
            <Reveal
              key={stat.label}
              delay={i * 0.08}
              className="group relative bg-void px-6 py-9 text-center transition-colors duration-500 hover:bg-ink-900"
            >
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-ember-500/60 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="font-display text-4xl font-semibold tracking-tight text-white md:text-5xl">
                <Counter value={stat.value} suffix={stat.suffix} />
              </div>
              <p className="mt-2.5 font-mono text-[11px] uppercase tracking-[0.16em] text-white/35">
                {stat.label}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
