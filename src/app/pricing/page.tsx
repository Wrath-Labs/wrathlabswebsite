import type { Metadata } from "next";
// import { Check, X } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { Pricing } from "@/components/sections/Pricing";
import {
  AddOns,
  CallPolicy,
  ChoosePlan,
  ComparePlans,
  PaymentOptions,
  PricingFAQ,
} from "@/components/sections/PricingDetails";
// import { Testimonials } from "@/components/sections/Testimonials";
// import { CTA } from "@/components/sections/CTA";
// import { Section, SectionHeading } from "@/components/ui/SectionHeading";
// import { Reveal } from "@/components/ui/Reveal";
import { content } from "@/content";

const { hero, seo } = content.pricing.page;
// const { finePrint } = content.pricing;

export const metadata: Metadata = seo;

export default function PricingPage() {
  return (
    <>
      <PageHero {...hero} />

      <Pricing showHeading={false} />

      {/*
      <Section className="border-t border-white/[0.06]">
        <div className="shell">
          <SectionHeading {...finePrint.heading} />

          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            <Reveal>
              <div className="h-full rounded-2xl border border-white/[0.07] bg-white/[0.015] p-7">
                <h3 className="font-mono text-[11px] uppercase tracking-[0.18em] text-emerald-400">
                  {finePrint.includedTitle}
                </h3>
                <ul className="mt-6 flex flex-col gap-3.5">
                  {finePrint.included.map((item) => (
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
                  {finePrint.excludedTitle}
                </h3>
                <ul className="mt-6 flex flex-col gap-3.5">
                  {finePrint.excluded.map((item) => (
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
      */}

      {/* <Testimonials /> */}
      <CallPolicy />
      <ComparePlans />
      <ChoosePlan />
      <AddOns />
      <PaymentOptions />
      <PricingFAQ />
      {/* <CTA {...closing} /> */}
    </>
  );
}
