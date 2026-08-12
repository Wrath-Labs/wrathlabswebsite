import { Button } from "../ui/Button";
import { Reveal } from "../ui/Reveal";
import { ParticleField } from "../fx/ParticleField";

export function CTA({
  eyebrow = "Next step",
  title = "Got something worth building?",
  description = "Two slots left this quarter. Book a 30-minute call with an engineer — no deck, no discovery theatre, just a straight answer on whether we can help.",
}: {
  eyebrow?: string;
  title?: string;
  description?: string;
}) {
  return (
    <section className="relative overflow-hidden border-t border-white/[0.06] py-28 md:py-36">
      <div className="absolute inset-0 -z-10">
        <div className="bg-grid absolute inset-0 opacity-40 [mask-image:radial-gradient(100%_80%_at_50%_50%,black,transparent_70%)]" />
        <div className="absolute inset-0 opacity-50">
          <ParticleField maxNodes={60} linkDistance={130} />
        </div>
        <div className="absolute left-1/2 top-1/2 size-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-ember-600/[0.11] blur-[140px]" />
      </div>

      <div className="shell relative flex flex-col items-center text-center">
        <Reveal>
          <span className="inline-flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.22em] text-ember-400">
            <span className="inline-block h-px w-7 bg-gradient-to-r from-transparent to-ember-500" />
            {eyebrow}
            <span className="inline-block h-px w-7 bg-gradient-to-l from-transparent to-ember-500" />
          </span>
        </Reveal>

        <Reveal delay={0.08}>
          <h2 className="mt-7 max-w-3xl font-display text-4xl font-semibold leading-[1.05] tracking-[-0.04em] text-white sm:text-5xl md:text-6xl">
            {title}
          </h2>
        </Reveal>

        <Reveal delay={0.16}>
          <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-white/50 md:text-base">
            {description}
          </p>
        </Reveal>

        <Reveal delay={0.24}>
          <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row">
            <Button href="/book" size="lg" withArrow magnetic>
              Book a meeting
            </Button>
            <Button href="/contact" size="lg" variant="secondary">
              Send a message
            </Button>
          </div>
        </Reveal>

        <Reveal delay={0.3}>
          <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.18em] text-white/25">
            hello@wrathlabs.com · Replies within one business day
          </p>
        </Reveal>
      </div>
    </section>
  );
}
