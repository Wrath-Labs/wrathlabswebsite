import type { Metadata } from "next";
import { Check, X } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { Pricing } from "@/components/sections/Pricing";
import { FAQ } from "@/components/sections/FAQ";
import { Testimonials } from "@/components/sections/Testimonials";
import { CTA } from "@/components/sections/CTA";
import { Section, SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Transparent pricing for agency engagements and lab products. Sprints from $12k, retainers from $24k/month, product plans from free.",
};

const included = [
  "Senior engineers only — no junior bench",
  "Your repository, your infrastructure",
  "Full IP transfer from the first commit",
  "Friday demos and written weekly recaps",
  "Architecture decision records",
  "Recorded handover walkthroughs",
];

const excluded = [
  "Minimum 12-month lock-ins",
  "Change-request surcharges",
  "Charging for the scoping call",
  "Account managers between you and the team",
];

export default function PricingPage() {
  return (
    <>
      <PageHero
        eyebrow="Pricing"
        title="What it costs, before you ask."
        description="We publish our rates because chasing a quote wastes everyone's week. Sprints are fixed-price, retainers are monthly, and products are self-serve."
        breadcrumb={[{ label: "Pricing", href: "/pricing" }]}
      />

      <Pricing showHeading={false} />

      <Section className="border-t border-white/[0.06]">
        <div className="shell">
          <SectionHeading
            eyebrow="The fine print"
            title={
              <>
                Always included.{" "}
                <span className="text-white/40">Never charged extra.</span>
              </>
            }
          />

          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            <Reveal>
              <div className="h-full rounded-2xl border border-white/[0.07] bg-white/[0.015] p-7">
                <h3 className="font-mono text-[11px] uppercase tracking-[0.18em] text-emerald-400">
                  In every engagement
                </h3>
                <ul className="mt-6 flex flex-col gap-3.5">
                  {included.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-sm text-white/65"
                    >
                      <span className="mt-px grid size-4.5 shrink-0 place-items-center rounded-full bg-emerald-500/15 text-emerald-400">
                        <Check className="size-2.5" strokeWidth={3} />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="h-full rounded-2xl border border-white/[0.07] bg-white/[0.015] p-7">
                <h3 className="font-mono text-[11px] uppercase tracking-[0.18em] text-ember-400">
                  Things we don&apos;t do
                </h3>
                <ul className="mt-6 flex flex-col gap-3.5">
                  {excluded.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-sm text-white/65"
                    >
                      <span className="mt-px grid size-4.5 shrink-0 place-items-center rounded-full bg-ember-500/15 text-ember-400">
                        <X className="size-2.5" strokeWidth={3} />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      <Testimonials />
      <FAQ />
      <CTA
        eyebrow="Still deciding"
        title="Cheapest way to evaluate us: talk to us."
        description="A scoping call costs nothing and you'll leave with an architecture opinion whether or not you hire us."
      />
    </>
  );
}
