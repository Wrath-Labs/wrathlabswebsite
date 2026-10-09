import { ArrowUpRight, Check } from "lucide-react";
import { content } from "@/content";
import { Section, SectionHeading } from "../ui/SectionHeading";
import { SpotlightCard } from "../ui/SpotlightCard";
import { Reveal, RevealChild, RevealGroup } from "../ui/Reveal";
import { Icon } from "../ui/Icon";
import { Button } from "../ui/Button";
import { ServiceArt } from "../ui/ServiceArt";

const { section, items } = content.services;

export function Services({
  detailed = false,
  showHeading = true,
}: {
  /** Renders the full deliverables + stack breakdown (used on /services). */
  detailed?: boolean;
  showHeading?: boolean;
}) {
  return (
    <Section id="services">
      <div className="shell">
        {showHeading && (
          <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
            <SectionHeading {...section.heading} />
            <Reveal delay={0.2}>
              <Button href={section.button.href} variant="secondary" withArrow>
                {section.button.label}
              </Button>
            </Reveal>
          </div>
        )}

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {items.map((service, i) => (
            <Reveal key={service.id} delay={(i % 3) * 0.08} className="h-full">
              <SpotlightCard
                className="h-full"
                spotlightColor={i % 2 === 0 ? "255,45,85" : "255,107,44"}
              >
                <article
                  id={detailed ? service.id : undefined}
                  className="flex h-full flex-col p-7 scroll-mt-28"
                >
                  <ServiceArt id={service.id} />
                  <div className="flex items-center justify-between">
                    <span className="grid size-11 place-items-center rounded-xl border border-white/[0.08] bg-gradient-to-br from-white/[0.06] to-transparent text-ember-400 transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110">
                      <Icon name={service.icon} className="size-5" />
                    </span>
                    <span className="font-mono text-[11px] text-white/20">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <h3 className="mt-6 font-display text-xl font-semibold tracking-tight text-white">
                    {service.title}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-white/50">
                    {service.blurb}
                  </p>

                  {detailed && (
                    <RevealGroup
                      stagger={0.09}
                      className="mt-6 flex flex-col gap-2.5 border-t border-white/[0.07] pt-6"
                    >
                      {service.deliverables.map((d) => (
                        <RevealChild
                          key={d}
                          className="flex items-center gap-2.5 text-[13px] text-white/60"
                        >
                          <Check
                            className="size-3.5 shrink-0 text-ember-500"
                            strokeWidth={2.5}
                          />
                          {d}
                        </RevealChild>
                      ))}
                    </RevealGroup>
                  )}

                  <RevealGroup
                    stagger={0.06}
                    delay={0.2}
                    className="mt-6 flex flex-wrap gap-1.5 border-t border-white/[0.07] pt-5"
                  >
                    {service.stack.map((tech) => (
                      <RevealChild key={tech}>
                        <span className="block rounded-md border border-white/[0.07] bg-white/[0.02] px-2 py-1 font-mono text-[10.5px] uppercase tracking-wider text-white/40 transition-colors duration-300 hover:border-ember-500/40 hover:text-white/80">
                          {tech}
                        </span>
                      </RevealChild>
                    ))}
                  </RevealGroup>

                  {!detailed && (
                    <ArrowUpRight className="mt-5 size-4 text-white/25 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-ember-400" />
                  )}
                </article>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
