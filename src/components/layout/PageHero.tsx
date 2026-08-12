import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { ReactNode } from "react";
import { AmbientOrbs } from "../fx/Atmosphere";
import { Eyebrow } from "../ui/SectionHeading";
import { Reveal, TextReveal } from "../ui/Reveal";

export function PageHero({
  eyebrow,
  title,
  description,
  breadcrumb,
  children,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  breadcrumb?: { label: string; href: string }[];
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden pb-16 pt-36 md:pb-24 md:pt-44">
      <div className="absolute inset-0 -z-10">
        <div className="bg-grid absolute inset-0 opacity-40 [mask-image:radial-gradient(110%_80%_at_50%_0%,black,transparent_70%)]" />
        <AmbientOrbs variant="soft" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-void to-transparent" />
      </div>

      <div className="shell relative">
        {breadcrumb && (
          <Reveal duration={0.5}>
            <nav
              aria-label="Breadcrumb"
              className="mb-7 flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-white/30"
            >
              <Link href="/" className="transition-colors hover:text-white/70">
                Home
              </Link>
              {breadcrumb.map((crumb, i) => (
                <span key={crumb.href} className="flex items-center gap-1.5">
                  <ChevronRight className="size-3" />
                  {i === breadcrumb.length - 1 ? (
                    <span className="text-ember-400">{crumb.label}</span>
                  ) : (
                    <Link
                      href={crumb.href}
                      className="transition-colors hover:text-white/70"
                    >
                      {crumb.label}
                    </Link>
                  )}
                </span>
              ))}
            </nav>
          </Reveal>
        )}

        <Reveal duration={0.6}>
          <Eyebrow>{eyebrow}</Eyebrow>
        </Reveal>

        <h1 className="mt-6 max-w-4xl font-display text-4xl font-semibold leading-[1.04] tracking-[-0.04em] text-white sm:text-5xl md:text-6xl lg:text-[4.25rem]">
          <TextReveal text={title} delay={0.15} />
        </h1>

        {description && (
          <Reveal delay={0.35}>
            <p className="mt-7 max-w-2xl text-base leading-relaxed text-white/50 md:text-lg">
              {description}
            </p>
          </Reveal>
        )}

        {children && <Reveal delay={0.45}>{children}</Reveal>}
      </div>
    </section>
  );
}
