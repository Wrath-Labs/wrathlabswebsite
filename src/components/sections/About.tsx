import { content } from "@/content";
import { Section, SectionHeading } from "../ui/SectionHeading";
import { SpotlightCard } from "../ui/SpotlightCard";
import { Reveal } from "../ui/Reveal";
import { Icon } from "../ui/Icon";

const { manifesto, timeline, values } = content.about;

export function Values() {
  return (
    <Section id="values">
      <div className="shell">
        <SectionHeading {...values.heading} />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {values.items.map((value, i) => (
            <Reveal key={value.title} delay={i * 0.08} className="h-full">
              <SpotlightCard className="h-full">
                <div className="flex h-full flex-col p-7">
                  <span className="grid size-11 place-items-center rounded-xl border border-white/[0.08] bg-gradient-to-br from-white/[0.06] to-transparent text-ember-400">
                    <Icon name={value.icon} className="size-5" />
                  </span>
                  <h3 className="mt-6 font-display text-lg font-semibold tracking-tight text-white">
                    {value.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/50">
                    {value.blurb}
                  </p>
                </div>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}

export function Timeline() {
  return (
    <Section id="story" className="border-t border-white/[0.06]">
      <div className="shell">
        <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeading
              {...timeline.heading}
              titleClassName="md:text-[2.75rem]"
            />
          </div>

          <div className="relative flex flex-col">
            <div className="absolute bottom-8 left-[7px] top-3 w-px bg-gradient-to-b from-ember-500/50 via-white/[0.09] to-transparent" />

            {timeline.items.map((entry, i) => (
              <Reveal key={entry.year} delay={i * 0.08}>
                <div className="relative flex gap-6 pb-11 pl-9">
                  <span className="absolute left-0 top-2 grid size-4 place-items-center">
                    <span className="size-2 rounded-full bg-ember-500 shadow-[0_0_10px_2px_rgba(255,45,85,0.45)]" />
                  </span>
                  <div>
                    <span className="font-mono text-xs uppercase tracking-[0.18em] text-ember-400">
                      {entry.year}
                    </span>
                    <h3 className="mt-2.5 font-display text-xl font-semibold tracking-tight text-white md:text-2xl">
                      {entry.title}
                    </h3>
                    <p className="mt-2.5 max-w-lg text-sm leading-relaxed text-white/50">
                      {entry.blurb}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

export function Manifesto() {
  return (
    <Section className="relative overflow-hidden border-t border-white/[0.06]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 size-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-ember-600/[0.07] blur-[140px]" />
      </div>

      <div className="shell relative max-w-4xl">
        <Reveal>
          <p className="font-display text-2xl font-medium leading-[1.4] tracking-tight text-white/85 md:text-[2rem]">
            {manifesto.text}
            <span className="text-gradient-ember">{manifesto.emphasis}</span>
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-10 flex items-center gap-4">
            <span className="h-px w-12 bg-ember-500/60" />
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/40">
              {manifesto.attribution}
            </span>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
