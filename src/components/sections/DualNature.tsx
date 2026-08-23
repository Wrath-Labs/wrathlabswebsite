import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { content } from "@/content";
import { Section, SectionHeading } from "../ui/SectionHeading";
import { SpotlightCard } from "../ui/SpotlightCard";
import { Reveal } from "../ui/Reveal";
import { Icon } from "../ui/Icon";
import { AmbientOrbs } from "../fx/Atmosphere";

const { heading, panels } = content.sections.whoWeAre;

/** The two colourways a panel can choose from its content file. */
const palette = {
  ember: {
    spotlight: "255,45,85",
    icon: "text-ember-400",
    bullet: "bg-ember-500",
  },
  volt: {
    spotlight: "34,211,238",
    icon: "text-volt-400",
    bullet: "bg-volt-500",
  },
} as const;

type Colour = keyof typeof palette;

export function DualNature() {
  return (
    <Section id="about" className="overflow-hidden">
      <AmbientOrbs variant="soft" />

      <div className="shell relative">
        <SectionHeading {...heading} />

        <div className="mt-14 grid gap-5 lg:grid-cols-2">
          {panels.map((panel, i) => {
            const colours = palette[panel.colour as Colour] ?? palette.ember;

            return (
              <Reveal
                key={panel.id}
                delay={i * 0.12}
                direction={i === 0 ? "left" : "right"}
              >
                <SpotlightCard
                  spotlightColor={colours.spotlight}
                  className="h-full p-8 md:p-10"
                >
                  <div className="flex h-full flex-col">
                    <div className="flex items-start justify-between gap-4">
                      <span
                        className={`grid size-12 place-items-center rounded-xl border border-white/[0.08] bg-white/[0.03] ${colours.icon}`}
                      >
                        <Icon name={panel.icon} className="size-5.5" />
                      </span>
                      <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/30">
                        {panel.kicker}
                      </span>
                    </div>

                    <h3 className="mt-7 font-display text-3xl font-semibold tracking-tight text-white md:text-4xl">
                      {panel.title}
                    </h3>
                    <p className="mt-4 text-[15px] leading-relaxed text-white/55">
                      {panel.blurb}
                    </p>

                    <ul className="mt-7 flex flex-col gap-3 border-t border-white/[0.07] pt-7">
                      {panel.points.map((point) => (
                        <li
                          key={point}
                          className="flex items-start gap-3 text-sm text-white/60"
                        >
                          <span
                            className={`mt-1.5 size-1.5 shrink-0 rounded-full ${colours.bullet}`}
                          />
                          {point}
                        </li>
                      ))}
                    </ul>

                    <Link
                      href={panel.link.href}
                      className="group/link mt-9 inline-flex items-center gap-2 text-sm font-medium text-white transition-colors hover:text-ember-400"
                    >
                      {panel.link.label}
                      <ArrowUpRight className="size-4 transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                    </Link>
                  </div>
                </SpotlightCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
