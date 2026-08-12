import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { caseStudies, type CaseStudy } from "@/lib/data";
import { Section, SectionHeading } from "../ui/SectionHeading";
import { Reveal } from "../ui/Reveal";
import { Button } from "../ui/Button";
import { cn } from "@/lib/utils";

/** Generated cover art — a mesh wash, grid, and the client's initials. */
function CaseCover({ study }: { study: CaseStudy }) {
  const initials = study.client
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2);

  return (
    <div className="relative aspect-[16/9] overflow-hidden rounded-xl border border-white/[0.07] bg-ink-900">
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-br opacity-25 transition-opacity duration-700 group-hover:opacity-40",
          study.accent,
        )}
      />
      <div className="bg-grid absolute inset-0 opacity-40 [background-size:40px_40px]" />
      <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_120%,rgba(3,3,5,0.9),transparent)]" />

      {/* concentric rings */}
      <div className="absolute -right-20 -top-24 size-72 rounded-full border border-white/[0.06]" />
      <div className="absolute -right-10 -top-14 size-48 rounded-full border border-white/[0.05]" />

      <div className="relative flex h-full flex-col justify-between p-6">
        <div className="flex items-start justify-between">
          <span className="font-display text-5xl font-bold tracking-tighter text-white/85 transition-transform duration-700 group-hover:scale-105">
            {initials}
          </span>
          <span className="rounded-full border border-white/[0.1] bg-void/40 px-3 py-1 font-mono text-[10.5px] uppercase tracking-[0.14em] text-white/60 backdrop-blur-sm">
            {study.industry}
          </span>
        </div>

        <div className="flex items-end justify-between gap-4">
          <span className="font-display text-lg font-medium text-white">
            {study.client}
          </span>
          <span className="font-mono text-[10.5px] text-white/40">
            {study.year} · {study.duration}
          </span>
        </div>
      </div>
    </div>
  );
}

export function CaseStudyCard({
  study,
  index = 0,
}: {
  study: CaseStudy;
  index?: number;
}) {
  return (
    <Reveal delay={(index % 2) * 0.1} className="h-full">
      <Link
        href={`/case-studies/${study.slug}`}
        className="group flex h-full flex-col rounded-2xl border border-white/[0.07] bg-white/[0.015] p-4 transition-all duration-500 hover:border-white/[0.14] hover:bg-white/[0.03]"
      >
        <CaseCover study={study} />

        <div className="flex flex-1 flex-col p-4">
          <h3 className="font-display text-xl font-semibold leading-snug tracking-tight text-white md:text-2xl">
            {study.title}
          </h3>
          <p className="mt-3 flex-1 text-sm leading-relaxed text-white/50">
            {study.summary}
          </p>

          <div className="mt-6 grid grid-cols-2 gap-4 border-t border-white/[0.07] pt-5 sm:grid-cols-4">
            {study.results.map((r) => (
              <div key={r.label}>
                <div className="font-display text-xl font-semibold tracking-tight text-white">
                  {r.value}
                </div>
                <div className="mt-0.5 font-mono text-[10px] uppercase leading-tight tracking-[0.12em] text-white/30">
                  {r.label}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex items-center gap-2 text-sm font-medium text-white/70 transition-colors group-hover:text-ember-400">
            Read the case study
            <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        </div>
      </Link>
    </Reveal>
  );
}

export function CaseStudiesSection({ limit = 2 }: { limit?: number }) {
  return (
    <Section id="case-studies">
      <div className="shell">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="Selected work"
            title={
              <>
                Shipped, measured,{" "}
                <span className="text-white/40">still running.</span>
              </>
            }
            description="Every number here came from production instrumentation, not a pitch deck."
          />
          <Reveal delay={0.2}>
            <Button href="/case-studies" variant="secondary" withArrow>
              All case studies
            </Button>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-5 lg:grid-cols-2">
          {caseStudies.slice(0, limit).map((study, i) => (
            <CaseStudyCard key={study.slug} study={study} index={i} />
          ))}
        </div>
      </div>
    </Section>
  );
}
