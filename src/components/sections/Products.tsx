import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { content, type Product } from "@/content";
import { Section, SectionHeading } from "../ui/SectionHeading";
import { SpotlightCard } from "../ui/SpotlightCard";
import { Reveal } from "../ui/Reveal";
import { Icon } from "../ui/Icon";
import { Button } from "../ui/Button";
import { cn } from "@/lib/utils";

const { section, showcase, items } = content.products;

/** Badge colours for the `status` values allowed in content/products.json. */
const statusStyles: Record<string, string> = {
  Live: "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
  Beta: "border-ember-500/30 bg-ember-500/10 text-ember-400",
  Alpha: "border-flare-400/30 bg-flare-400/10 text-flare-400",
  Research: "border-volt-500/30 bg-volt-500/10 text-volt-400",
  "In development": "border-flare-400/30 bg-flare-400/10 text-flare-400",
};

export function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[10.5px] uppercase tracking-[0.14em]",
        statusStyles[status] ?? statusStyles.Research,
      )}
    >
      <span className="size-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
}

/** Abstract product visual — no screenshots, so we draw a plausible surface. */
function ProductVisual({ product }: { product: Product }) {
  return (
    <div className="glass relative flex aspect-[4/3] flex-col overflow-hidden rounded-2xl">
      <div className="bg-dots absolute inset-0 opacity-[0.35]" />
      <div className="absolute -right-16 -top-16 size-56 rounded-full bg-ember-600/15 blur-[70px]" />

      {/* chrome */}
      <div className="relative flex shrink-0 items-center gap-2 border-b border-white/[0.07] px-4 py-2.5">
        <div className="flex gap-1.5">
          <span className="size-2 rounded-full bg-white/15" />
          <span className="size-2 rounded-full bg-white/15" />
          <span className="size-2 rounded-full bg-white/15" />
        </div>
        <span className="ml-1 font-mono text-[10.5px] text-white/30">
          {showcase.domainTemplate.replace(
            "{name}",
            product.name.toLowerCase(),
          )}
        </span>
      </div>

      <div className="relative flex min-h-0 flex-1 flex-col gap-4 p-5">
        <div className="flex items-center gap-3">
          <span className="grid size-9 place-items-center rounded-lg border border-ember-500/25 bg-ember-500/10 text-ember-400">
            <Icon name={product.icon} className="size-4.5" />
          </span>
          <div className="flex flex-col gap-1.5">
            <span className="h-2 w-24 rounded-full bg-white/15" />
            <span className="h-2 w-16 rounded-full bg-white/[0.07]" />
          </div>
          <span className="ml-auto font-display text-2xl font-semibold text-white/85">
            {product.metric.value}
          </span>
        </div>

        {/* bars */}
        <div className="flex min-h-20 flex-1 items-end gap-1.5">
          {[38, 62, 45, 78, 55, 88, 70, 96, 60, 82, 48, 92].map((h, i) => (
            <span
              key={i}
              className="flex-1 rounded-t-sm bg-gradient-to-t from-ember-600/20 to-ember-500/60"
              style={{ height: `${h}%` }}
            />
          ))}
        </div>

        {/* rows */}
        <div className="flex flex-col gap-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="flex items-center gap-3 rounded-lg border border-white/[0.05] bg-white/[0.015] px-3 py-2"
            >
              <span className="size-1.5 rounded-full bg-ember-500/60" />
              <span
                className="h-1.5 rounded-full bg-white/[0.09]"
                style={{ width: `${58 - i * 12}%` }}
              />
              <span className="ml-auto h-1.5 w-8 rounded-full bg-white/[0.06]" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/** Compact card for the home grid. */
function ProductCard({ product, index }: { product: Product; index: number }) {
  const body = (
    <>
      <div className="flex items-start justify-between gap-3">
        <span className="grid size-11 place-items-center rounded-xl border border-white/[0.08] bg-gradient-to-br from-white/[0.06] to-transparent text-ember-400 transition-transform duration-500 group-hover:scale-105">
          <Icon name={product.icon} className="size-5" />
        </span>
        {product.status && <StatusBadge status={product.status} />}
      </div>

      <div className="mt-6 flex items-baseline gap-2.5">
        <h3 className="font-display text-xl font-semibold tracking-tight text-white">
          {product.name}
        </h3>
        <span className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-white/30">
          {product.category}
        </span>
      </div>

      <p className="mt-3 flex-1 text-sm leading-relaxed text-white/50">
        {product.tagline}
      </p>

      {product.href && (
        <div className="mt-6 flex justify-end border-t border-white/[0.07] pt-5">
          <ArrowUpRight className="size-4 text-white/25 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-ember-400" />
        </div>
      )}
    </>
  );

  return (
    <Reveal delay={(index % 3) * 0.08} className="h-full">
      <SpotlightCard className="h-full">
        {product.href ? (
          <Link href={product.href} className="flex h-full flex-col p-7">
            {body}
          </Link>
        ) : (
          <div className="flex h-full flex-col p-7">{body}</div>
        )}
      </SpotlightCard>
    </Reveal>
  );
}

export function Products() {
  const { pitchCard } = section;

  return (
    <Section id="products" className="relative">
      <div className="shell">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <SectionHeading {...section.heading} />
          <Reveal delay={0.2}>
            <Button href={section.button.href} variant="secondary" withArrow>
              {section.button.label}
            </Button>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {items.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}

          {/* Pitch tile fills the sixth slot */}
          {pitchCard.show && (
            <Reveal delay={0.16} className="h-full">
              <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-ember-500/20 bg-gradient-to-br from-ember-600/[0.12] via-void to-void p-7">
                <div className="absolute -right-12 -top-12 size-40 rounded-full bg-ember-500/20 blur-[60px]" />
                <div className="relative">
                  <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ember-400">
                    {pitchCard.eyebrow}
                  </span>
                  <h3 className="mt-5 font-display text-2xl font-semibold leading-snug tracking-tight text-white">
                    {pitchCard.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/55">
                    {pitchCard.description}
                  </p>
                </div>
                <Button
                  href={pitchCard.button.href}
                  size="sm"
                  className="relative mt-8 self-start"
                  withArrow
                >
                  {pitchCard.button.label}
                </Button>
              </div>
            </Reveal>
          )}
        </div>
      </div>
    </Section>
  );
}

/** Full alternating detail rows for the /products page. */
export function ProductShowcase() {
  return (
    <div className="flex flex-col">
      {items.map((product, i) => (
        <section
          key={product.id}
          id={product.id}
          className="relative scroll-mt-24 border-t border-white/[0.06] py-20 md:py-28"
        >
          <div className="shell">
            <div
              className={cn(
                "grid items-center gap-12 lg:grid-cols-2 lg:gap-16",
                i % 2 === 1 && "lg:[&>*:first-child]:order-2",
              )}
            >
              <Reveal direction={i % 2 === 0 ? "right" : "left"}>
                <div className="flex flex-col items-start">
                  <div className="flex items-center gap-3">
                    <span className="grid size-12 place-items-center rounded-xl border border-white/[0.08] bg-white/[0.03] text-ember-400">
                      <Icon name={product.icon} className="size-5.5" />
                    </span>
                    <StatusBadge status={product.status} />
                    <span className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-white/30">
                      {product.category}
                    </span>
                  </div>

                  <h2 className="mt-7 font-display text-4xl font-semibold tracking-tight text-white md:text-5xl">
                    {product.name}
                  </h2>
                  <p className="mt-4 max-w-lg font-display text-xl leading-snug text-white/70">
                    {product.tagline}
                  </p>
                  <p className="mt-5 max-w-lg text-[15px] leading-relaxed text-white/50">
                    {product.description}
                  </p>

                  <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                    {product.features.map((f) => (
                      <li
                        key={f}
                        className="flex items-start gap-2.5 text-sm text-white/60"
                      >
                        <Check
                          className="mt-0.5 size-4 shrink-0 text-ember-500"
                          strokeWidth={2.5}
                        />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-9 flex flex-wrap items-center gap-4">
                    <Button href={product.cta.href} withArrow magnetic>
                      {product.cta.label}
                    </Button>
                    <Button
                      href={showcase.secondaryButton.href}
                      variant="ghost"
                    >
                      {showcase.secondaryButton.label}
                    </Button>
                  </div>
                </div>
              </Reveal>

              <Reveal direction={i % 2 === 0 ? "left" : "right"} delay={0.1}>
                <ProductVisual product={product} />
              </Reveal>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}
