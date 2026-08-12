"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, Info } from "lucide-react";
import { agencyPricing, productPricing, type PricingTier } from "@/lib/data";
import { Section, SectionHeading } from "../ui/SectionHeading";
import { Button } from "../ui/Button";
import { Reveal } from "../ui/Reveal";
import { cn } from "@/lib/utils";

const tabs = [
  {
    key: "agency",
    label: "Agency engagements",
    tiers: agencyPricing,
    note: "All engagements include a named product lead, your own Slack channel, and full IP transfer. Prices exclude VAT.",
  },
  {
    key: "products",
    label: "Lab products",
    tiers: productPricing,
    note: "Pricing shown for Prism. Sentinel, Forge, and Nexus follow the same tiers with volume measured per product.",
  },
] as const;

function TierCard({ tier, index }: { tier: PricingTier; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.55,
        delay: index * 0.07,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={cn(
        "group relative flex flex-col rounded-2xl border p-7 transition-colors duration-500",
        tier.featured
          ? "border-ember-500/30 bg-gradient-to-b from-ember-600/[0.11] via-void to-void"
          : "border-white/[0.07] bg-white/[0.015] hover:border-white/[0.14]",
      )}
    >
      {tier.featured && (
        <>
          <div className="pointer-events-none absolute -inset-px -z-10 rounded-2xl bg-gradient-to-b from-ember-500/25 to-transparent blur-md" />
          <span className="absolute -top-3 left-7 rounded-full bg-gradient-to-r from-ember-500 to-flare-500 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-white shadow-[0_4px_20px_-4px_rgba(255,45,85,0.7)]">
            Most popular
          </span>
        </>
      )}

      <h3 className="font-display text-lg font-semibold tracking-tight text-white">
        {tier.name}
      </h3>

      <div className="mt-4 flex items-baseline gap-1.5">
        <span className="font-display text-4xl font-semibold tracking-tight text-white">
          {tier.price}
        </span>
        <span className="font-mono text-[11px] text-white/35">{tier.unit}</span>
      </div>

      <p className="mt-4 min-h-[3.5rem] text-sm leading-relaxed text-white/50">
        {tier.blurb}
      </p>

      <ul className="mt-6 flex flex-1 flex-col gap-3 border-t border-white/[0.07] pt-6">
        {tier.features.map((f) => (
          <li key={f} className="flex items-start gap-2.5 text-[13px] text-white/65">
            <span
              className={cn(
                "mt-px grid size-4 shrink-0 place-items-center rounded-full",
                tier.featured
                  ? "bg-ember-500/20 text-ember-400"
                  : "bg-white/[0.06] text-white/50",
              )}
            >
              <Check className="size-2.5" strokeWidth={3} />
            </span>
            {f}
          </li>
        ))}
      </ul>

      <Button
        href={tier.cta.href}
        variant={tier.featured ? "primary" : "secondary"}
        className="mt-8 w-full"
        withArrow
      >
        {tier.cta.label}
      </Button>
    </motion.div>
  );
}

export function Pricing({ showHeading = true }: { showHeading?: boolean }) {
  const [active, setActive] = useState<"agency" | "products">("agency");
  const current = tabs.find((t) => t.key === active)!;

  return (
    <Section id="pricing" className="relative">
      <div className="shell">
        {showHeading && (
          <SectionHeading
            align="center"
            eyebrow="Pricing"
            title={
              <>
                Priced in public.{" "}
                <span className="text-white/40">No discovery call required.</span>
              </>
            }
            description="Two ways to work with us: hire the studio, or buy the software the studio built."
            className="mx-auto items-center"
          />
        )}

        {/* segmented control */}
        <Reveal delay={0.15} className="mt-10 flex justify-center">
          <div className="inline-flex rounded-full border border-white/[0.08] bg-white/[0.02] p-1 backdrop-blur-md">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActive(tab.key)}
                className={cn(
                  "relative rounded-full px-5 py-2.5 text-[13px] font-medium transition-colors duration-300",
                  active === tab.key
                    ? "text-white"
                    : "text-white/50 hover:text-white/80",
                )}
              >
                {active === tab.key && (
                  <motion.span
                    layoutId="pricing-tab"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-ember-500 to-flare-500"
                    transition={{ type: "spring", stiffness: 340, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{tab.label}</span>
              </button>
            ))}
          </div>
        </Reveal>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className={cn(
              "mt-12 grid gap-5",
              current.tiers.length === 4
                ? "md:grid-cols-2 xl:grid-cols-4"
                : "md:grid-cols-2 lg:grid-cols-3",
            )}
          >
            {current.tiers.map((tier, i) => (
              <TierCard key={tier.name} tier={tier} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>

        <p className="mx-auto mt-10 flex max-w-xl items-start justify-center gap-2.5 text-center text-[13px] leading-relaxed text-white/35">
          <Info className="mt-0.5 size-4 shrink-0" strokeWidth={1.5} />
          {current.note}
        </p>
      </div>
    </Section>
  );
}
