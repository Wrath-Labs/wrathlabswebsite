import Link from "next/link";
import { ArrowUpRight, Beaker, Users } from "lucide-react";
import { Section, SectionHeading } from "../ui/SectionHeading";
import { SpotlightCard } from "../ui/SpotlightCard";
import { Reveal } from "../ui/Reveal";
import { AmbientOrbs } from "../fx/Atmosphere";

const panels = [
  {
    key: "lab",
    kicker: "40% of our time",
    title: "The Lab",
    icon: Beaker,
    blurb:
      "Five products of our own in the market. We fund them, run them, and get paged when they break — which is exactly why our engineering opinions are worth something.",
    points: [
      "Observability, dev tools, AI infrastructure",
      "Real users, real uptime commitments",
      "Everything we learn goes back into client work",
    ],
    href: "/products",
    cta: "Explore the products",
    accent: "255,45,85",
    ring: "group-hover:border-ember-500/30",
    tint: "text-ember-400",
  },
  {
    key: "studio",
    kicker: "60% of our time",
    title: "The Studio",
    icon: Users,
    blurb:
      "Senior squads embedded with your team. We take the same standards we hold our own products to and point them at your roadmap.",
    points: [
      "Zero-to-one builds and rescue missions",
      "Two-week sprints, demo every Friday",
      "Your repo, your infra, your IP from commit one",
    ],
    href: "/services",
    cta: "See how we work",
    accent: "34,211,238",
    ring: "group-hover:border-volt-500/30",
    tint: "text-volt-400",
  },
];

export function DualNature() {
  return (
    <Section id="about" className="overflow-hidden">
      <AmbientOrbs variant="soft" />

      <div className="shell relative">
        <SectionHeading
          eyebrow="Who we are"
          title={
            <>
              A lab and an agency,{" "}
              <span className="text-white/40">on purpose.</span>
            </>
          }
          description="Most studios only ship other people's software. We do both, and the two halves make each other sharper — our products keep us honest about maintenance, and client work keeps us honest about deadlines."
        />

        <div className="mt-14 grid gap-5 lg:grid-cols-2">
          {panels.map((panel, i) => (
            <Reveal key={panel.key} delay={i * 0.12} direction={i === 0 ? "left" : "right"}>
              <SpotlightCard
                spotlightColor={panel.accent}
                className="h-full p-8 md:p-10"
              >
                <div className="flex h-full flex-col">
                  <div className="flex items-start justify-between gap-4">
                    <span
                      className={`grid size-12 place-items-center rounded-xl border border-white/[0.08] bg-white/[0.03] ${panel.tint}`}
                    >
                      <panel.icon className="size-5.5" strokeWidth={1.5} />
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
                          className={`mt-1.5 size-1.5 shrink-0 rounded-full ${
                            panel.key === "lab" ? "bg-ember-500" : "bg-volt-500"
                          }`}
                        />
                        {point}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={panel.href}
                    className="group/link mt-9 inline-flex items-center gap-2 text-sm font-medium text-white transition-colors hover:text-ember-400"
                  >
                    {panel.cta}
                    <ArrowUpRight className="size-4 transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                  </Link>
                </div>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
