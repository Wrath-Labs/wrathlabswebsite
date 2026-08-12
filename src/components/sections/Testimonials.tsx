import { Quote, Star } from "lucide-react";
import { testimonials, type Testimonial } from "@/lib/data";
import { Section, SectionHeading } from "../ui/SectionHeading";
import { Marquee } from "../ui/Marquee";
import { Reveal } from "../ui/Reveal";

function TestimonialCard({ item }: { item: Testimonial }) {
  return (
    <figure className="mx-2.5 flex w-[340px] shrink-0 flex-col justify-between rounded-2xl border border-white/[0.07] bg-white/[0.02] p-6 transition-colors duration-500 hover:border-white/[0.14] hover:bg-white/[0.04] sm:w-[400px]">
      <div>
        <div className="flex gap-0.5" aria-label="5 out of 5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className="size-3.5 fill-ember-500 text-ember-500"
              strokeWidth={0}
            />
          ))}
        </div>
        <blockquote className="mt-5 text-[15px] leading-relaxed text-white/70">
          &ldquo;{item.quote}&rdquo;
        </blockquote>
      </div>

      <figcaption className="mt-7 flex items-center gap-3 border-t border-white/[0.07] pt-5">
        <span className="grid size-10 shrink-0 place-items-center rounded-full border border-ember-500/25 bg-gradient-to-br from-ember-600/25 to-flare-500/10 font-mono text-xs font-medium text-ember-200">
          {item.initials}
        </span>
        <div className="min-w-0">
          <div className="truncate text-sm font-medium text-white">
            {item.author}
          </div>
          <div className="truncate font-mono text-[10.5px] uppercase tracking-[0.12em] text-white/35">
            {item.role} · {item.company}
          </div>
        </div>
      </figcaption>
    </figure>
  );
}

export function Testimonials() {
  const rows = [testimonials.slice(0, 3), testimonials.slice(3)];
  const featured = testimonials[0];

  return (
    <Section id="testimonials" className="overflow-hidden">
      <div className="shell">
        <SectionHeading
          align="center"
          eyebrow="Client words"
          title={
            <>
              They kept us{" "}
              <span className="text-white/40">after the first project.</span>
            </>
          }
          description="98% of the teams we've worked with came back for a second engagement. Here's why, in their words."
          className="mx-auto items-center"
        />
      </div>

      {/* featured quote */}
      <div className="shell mt-14">
        <Reveal>
          <figure className="relative mx-auto max-w-3xl overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-b from-white/[0.045] to-transparent p-8 text-center md:p-12">
            <div className="pointer-events-none absolute -left-16 -top-16 size-56 rounded-full bg-ember-600/[0.1] blur-[70px]" />
            <Quote
              className="mx-auto size-8 text-ember-500/60"
              strokeWidth={1.5}
            />
            <blockquote className="relative mt-6 font-display text-xl font-medium leading-snug tracking-tight text-white/90 md:text-[1.75rem]">
              &ldquo;{featured.quote}&rdquo;
            </blockquote>
            <figcaption className="mt-7 flex items-center justify-center gap-3">
              <span className="grid size-10 place-items-center rounded-full border border-ember-500/25 bg-gradient-to-br from-ember-600/25 to-flare-500/10 font-mono text-xs text-ember-200">
                {featured.initials}
              </span>
              <span className="text-left">
                <span className="block text-sm font-medium text-white">
                  {featured.author}
                </span>
                <span className="block font-mono text-[10.5px] uppercase tracking-[0.12em] text-white/35">
                  {featured.role} · {featured.company}
                </span>
              </span>
            </figcaption>
          </figure>
        </Reveal>
      </div>

      {/* scrolling wall */}
      <div className="mt-12 flex flex-col gap-5">
        {rows.map((row, i) => (
          <Marquee key={i} reverse={i === 1} speed={i === 1 ? 58 : 50}>
            {row.map((item) => (
              <TestimonialCard key={item.author} item={item} />
            ))}
          </Marquee>
        ))}
      </div>
    </Section>
  );
}
