import { Check, Info, Minus } from "lucide-react";
import { content } from "@/content";
import { Section, SectionHeading } from "../ui/SectionHeading";
import { Accordion } from "../ui/Accordion";
import { SpotlightCard } from "../ui/SpotlightCard";
import { Reveal } from "../ui/Reveal";
import { Button } from "../ui/Button";
import { Icon } from "../ui/Icon";
import { cn } from "@/lib/utils";

const { comparePlans, choosePlan, addOns, payments, faq, callPolicy } =
  content.pricing;

export function ComparePlans() {
  const { plans, groups } = comparePlans;
  return (
    <Section id="compare" className="border-t border-white/[0.06]">
      <div className="shell">
        <SectionHeading {...comparePlans.heading} />

        <Reveal delay={0.1} className="mt-14">
          <div className="overflow-x-auto rounded-2xl border border-white/[0.07] bg-white/[0.015]">
            <table className="w-full min-w-[640px] border-collapse text-left">
              <thead>
                <tr className="border-b border-white/[0.07]">
                  <th className="w-[34%] p-5" />
                  {plans.map((plan) => (
                    <th
                      key={plan.name}
                      className={cn(
                        "p-5 align-bottom",
                        plan.featured && "bg-ember-500/[0.06]",
                      )}
                    >
                      <span className="block font-display text-base font-semibold text-white">
                        {plan.name}
                      </span>
                      <span className="mt-1 block font-mono text-[11px] font-normal text-white/40">
                        {plan.price} {plan.unit}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              {groups.map((group) => (
                <tbody key={group.title}>
                  <tr>
                    <th
                      colSpan={plans.length + 1}
                      className="bg-white/[0.02] px-5 py-3 font-mono text-[10.5px] font-normal uppercase tracking-[0.18em] text-ember-400"
                    >
                      {group.title}
                    </th>
                  </tr>
                  {group.rows.map((row) => (
                    <tr
                      key={row.label}
                      className="border-t border-white/[0.05]"
                    >
                      <th className="p-5 text-[13px] font-normal text-white/60">
                        {row.label}
                      </th>
                      {row.values.map((value, i) => (
                        <td
                          key={plans[i].name}
                          className={cn(
                            "p-5 text-[13px] text-white/75",
                            plans[i].featured && "bg-ember-500/[0.06]",
                          )}
                        >
                          {value === true ? (
                            <Check
                              className="size-4 text-emerald-400"
                              strokeWidth={2.5}
                              aria-label="Included"
                            />
                          ) : value === false ? (
                            <Minus
                              className="size-4 text-white/20"
                              aria-label="Not included"
                            />
                          ) : (
                            value
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              ))}
            </table>
          </div>
        </Reveal>

        <Reveal delay={0.15} className="mt-8 flex justify-center">
          <Button href={comparePlans.cta.href} variant="secondary" withArrow>
            {comparePlans.cta.label}
          </Button>
        </Reveal>
      </div>
    </Section>
  );
}

export function ChoosePlan() {
  return (
    <Section id="choose-plan" className="border-t border-white/[0.06]">
      <div className="shell">
        <SectionHeading {...choosePlan.heading} />

        <div
          className={cn(
            "mt-14 grid gap-5",
            choosePlan.items.length === 4
              ? "md:grid-cols-2 xl:grid-cols-4"
              : "md:grid-cols-3",
          )}
        >
          {choosePlan.items.map((item, i) => (
            <Reveal key={item.plan} delay={i * 0.08} className="h-full">
              <SpotlightCard
                className="h-full"
                spotlightColor={i % 2 === 0 ? "255,45,85" : "255,107,44"}
              >
                <div className="flex h-full flex-col p-7">
                  <span className="grid size-11 place-items-center rounded-xl border border-white/[0.08] bg-gradient-to-br from-white/[0.06] to-transparent text-ember-400">
                    <Icon name={item.icon} className="size-5" />
                  </span>
                  <p className="mt-6 flex-1 font-display text-lg font-medium leading-snug text-white">
                    “{item.situation}”
                  </p>
                  <div className="mt-6 border-t border-white/[0.07] pt-5">
                    <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-white/35">
                      Best fit
                    </span>
                    <h3 className="mt-1.5 font-display text-xl font-semibold text-gradient-ember">
                      {item.plan}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/50">
                      {item.reason}
                    </p>
                  </div>
                </div>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>

        <Reveal
          delay={0.2}
          className="mt-10 flex flex-col items-center gap-4 text-center"
        >
          <p className="text-sm text-white/50">{choosePlan.unsure.text}</p>
          <Button href={choosePlan.unsure.button.href} withArrow>
            {choosePlan.unsure.button.label}
          </Button>
        </Reveal>
      </div>
    </Section>
  );
}

export function AddOns() {
  const { adjustments } = addOns;
  return (
    <Section id="add-ons" className="border-t border-white/[0.06]">
      <div className="shell">
        <SectionHeading {...addOns.heading} />

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {addOns.items.map((item, i) => (
            <Reveal key={item.name} delay={(i % 3) * 0.08} className="h-full">
              <div className="flex h-full flex-col rounded-2xl border border-white/[0.07] bg-white/[0.015] p-6 transition-colors duration-500 hover:border-white/[0.14]">
                <div className="flex items-start justify-between gap-3">
                  <span className="grid size-10 place-items-center rounded-xl border border-white/[0.08] text-ember-400">
                    <Icon name={item.icon} className="size-[18px]" />
                  </span>
                  <span className="rounded-full bg-white/[0.05] px-3 py-1 font-mono text-[10.5px] uppercase tracking-[0.12em] text-white/60">
                    Charged {item.chargedBy}
                  </span>
                </div>
                <h3 className="mt-5 font-display text-base font-semibold text-white">
                  {item.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/55">
                  {item.meaning}
                </p>
                <p className="mt-3 text-[12.5px] leading-relaxed text-white/35">
                  <span className="text-white/50">For example: </span>
                  {item.examples}
                </p>
                <dl className="mt-auto grid grid-cols-2 gap-3 border-t border-white/[0.07] pt-5">
                  <div>
                    <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/30">
                      India
                    </dt>
                    <dd className="mt-1 text-[13px] font-medium text-white">
                      {item.priceIndia}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/30">
                      Global
                    </dt>
                    <dd className="mt-1 text-[13px] font-medium text-white">
                      {item.priceGlobal}
                    </dd>
                  </div>
                </dl>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <p className="mx-auto mt-8 flex max-w-2xl items-start justify-center gap-2.5 text-center text-[13px] leading-relaxed text-white/40">
            <Info className="mt-0.5 size-4 shrink-0" strokeWidth={1.5} />
            {addOns.note}
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-5">
          <div className="rounded-2xl border border-ember-500/20 bg-gradient-to-b from-ember-600/[0.07] to-transparent p-7">
            <h3 className="font-mono text-[11px] uppercase tracking-[0.18em] text-ember-400">
              {adjustments.title}
            </h3>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {adjustments.items.map((item) => (
                <div key={item.label}>
                  <h4 className="font-display text-[15px] font-semibold text-white">
                    {item.label}
                  </h4>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-white/50">
                    {item.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

export function PaymentOptions() {
  const { methods } = payments;
  return (
    <Section id="payment-options" className="border-t border-white/[0.06]">
      <div className="shell">
        <SectionHeading {...payments.heading} />

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {payments.items.map((item, i) => (
            <Reveal key={item.name} delay={i * 0.08} className="h-full">
              <div className="relative flex h-full flex-col rounded-2xl border border-white/[0.07] bg-white/[0.015] p-7">
                {item.badge && (
                  <span className="absolute right-6 top-6 rounded-full bg-gradient-to-r from-ember-500 to-flare-500 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-white">
                    {item.badge}
                  </span>
                )}
                <span className="grid size-11 place-items-center rounded-xl border border-white/[0.08] text-ember-400">
                  <Icon name={item.icon} className="size-5" />
                </span>
                <h3 className="mt-6 font-display text-xl font-semibold text-white">
                  {item.name}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-white/50">
                  {item.detail}
                </p>
                <ul className="mt-6 flex flex-col gap-3 border-t border-white/[0.07] pt-6">
                  {item.terms.map((term) => (
                    <li
                      key={term}
                      className="flex items-start gap-2.5 text-[13px] text-white/65"
                    >
                      <span className="mt-px grid size-4 shrink-0 place-items-center rounded-full bg-white/[0.06] text-white/50">
                        <Check className="size-2.5" strokeWidth={3} />
                      </span>
                      {term}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal
          delay={0.1}
          className="mt-8 flex flex-col items-center gap-4 text-center"
        >
          {methods.items.length > 0 && (
            <div className="flex flex-wrap items-center justify-center gap-2.5">
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/35">
                {methods.title}
              </span>
              {methods.items.map((m) => (
                <span
                  key={m}
                  className="rounded-full border border-white/[0.08] bg-white/[0.02] px-4 py-1.5 text-[13px] text-white/60"
                >
                  {m}
                </span>
              ))}
            </div>
          )}
          <p className="max-w-xl text-[13px] leading-relaxed text-white/35">
            {payments.note}
          </p>
        </Reveal>
      </div>
    </Section>
  );
}

export function PricingFAQ() {
  const { sideCard } = faq;
  return (
    <Section id="pricing-faq" className="border-t border-white/[0.06]">
      <div className="shell">
        <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeading
              {...faq.heading}
              titleClassName="md:text-[2.75rem]"
            />
            <Reveal delay={0.2}>
              <div className="mt-8 rounded-2xl border border-white/[0.07] bg-white/[0.02] p-6">
                <Icon name={sideCard.icon} className="size-5 text-ember-400" />
                <h3 className="mt-4 font-display text-lg font-medium text-white">
                  {sideCard.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/50">
                  {sideCard.description}
                </p>
                <Button
                  href={sideCard.button.href}
                  variant="secondary"
                  size="sm"
                  className="mt-5"
                  withArrow
                >
                  {sideCard.button.label}
                </Button>
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <Accordion items={faq.items} />
          </Reveal>
        </div>
      </div>
    </Section>
  );
}

export function CallPolicy() {
  const { heading, steps, extra } = callPolicy;
  return (
    <Section id="how-calls-work" className="border-t border-white/[0.06]">
      <div className="shell">
        <SectionHeading {...heading} />

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <Reveal key={step.label} delay={i * 0.08} className="h-full">
              <div className="flex h-full flex-col rounded-2xl border border-white/[0.07] bg-white/[0.015] p-6">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/35">
                    {step.label}
                  </span>
                  <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-emerald-400">
                    {step.tag}
                  </span>
                </div>
                <h3 className="mt-5 font-display text-lg font-semibold text-white">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/50">
                  {step.detail}
                </p>
              </div>
            </Reveal>
          ))}

          <Reveal delay={0.24} className="h-full">
            <div className="flex h-full flex-col rounded-2xl border border-ember-500/25 bg-gradient-to-b from-ember-600/[0.1] to-transparent p-6">
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ember-400">
                {extra.label}
              </span>
              <h3 className="mt-5 font-display text-2xl font-semibold text-white">
                {extra.price}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white/55">
                {extra.detail}
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
