import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal, TextReveal } from "./Reveal";

export function Eyebrow({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.22em] text-ember-400",
        className,
      )}
    >
      <span
        aria-hidden
        className="inline-block h-px w-7 bg-gradient-to-r from-ember-500 to-transparent"
      />
      {children}
    </span>
  );
}

/**
 * The band heading used by every section. Takes plain strings so it can be
 * spread straight from a content file:
 *
 *   <SectionHeading {...content.services.section.heading} />
 *
 * `titleMuted` is the dimmed second half of the sentence — the pattern the
 * whole site uses to land a headline on two tones.
 */
export function SectionHeading({
  eyebrow,
  title,
  titleMuted,
  description,
  align = "left",
  className,
  titleClassName,
  children,
}: {
  eyebrow?: string;
  title: string;
  titleMuted?: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
  titleClassName?: string;
  children?: ReactNode;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-5",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      {eyebrow && (
        <Reveal duration={0.6}>
          <Eyebrow>{eyebrow}</Eyebrow>
        </Reveal>
      )}

      <h2
        className={cn(
          "max-w-3xl text-balance text-3xl font-semibold leading-[1.08] text-white sm:text-4xl md:text-[3.25rem]",
          titleClassName,
        )}
      >
        <TextReveal text={title} inView delay={0.05} stagger={0.04} />
        {titleMuted && (
          <>
            {" "}
            <span className="text-white/40">
              <TextReveal
                text={titleMuted}
                inView
                delay={0.05 + title.split(" ").length * 0.04}
                stagger={0.04}
              />
            </span>
          </>
        )}
      </h2>

      {description && (
        <Reveal delay={0.12}>
          <p
            className={cn(
              "max-w-2xl text-[15px] leading-relaxed text-white/50 md:text-base",
              align === "center" && "mx-auto",
            )}
          >
            {description}
          </p>
        </Reveal>
      )}

      {children}
    </div>
  );
}

export function Section({
  children,
  className,
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section
      id={id}
      className={cn("relative scroll-mt-24 py-24 md:py-32", className)}
    >
      {children}
    </section>
  );
}
