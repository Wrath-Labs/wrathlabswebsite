import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowUpRight, Quote } from "lucide-react";
import { caseStudies } from "@/lib/data";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { CTA } from "@/components/sections/CTA";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const study = caseStudies.find((s) => s.slug === slug);
  if (!study) return { title: "Case study not found" };

  return {
    title: `${study.client} — ${study.title}`,
    description: study.summary,
    openGraph: {
      title: `${study.client} — ${study.title}`,
      description: study.summary,
    },
  };
}

export default async function CaseStudyPage({ params }: Params) {
  const { slug } = await params;
  const study = caseStudies.find((s) => s.slug === slug);
  if (!study) notFound();

  const index = caseStudies.findIndex((s) => s.slug === slug);
  const next = caseStudies[(index + 1) % caseStudies.length];

  return (
    <>
      <PageHero
        eyebrow={`${study.industry} · ${study.year}`}
        title={study.title}
        description={study.summary}
        breadcrumb={[
          { label: "Case Studies", href: "/case-studies" },
          { label: study.client, href: `/case-studies/${study.slug}` },
        ]}
      >
        <div className="mt-10 flex flex-wrap gap-2">
          {study.services.map((service) => (
            <span
              key={service}
              className="rounded-full border border-white/[0.08] bg-white/[0.02] px-3.5 py-1.5 font-mono text-[10.5px] uppercase tracking-[0.14em] text-white/50"
            >
              {service}
            </span>
          ))}
        </div>
      </PageHero>

      {/* results strip */}
      <section className="pb-4">
        <div className="shell">
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.05] md:grid-cols-4">
            {study.results.map((result, i) => (
              <Reveal
                key={result.label}
                delay={i * 0.07}
                className="bg-void px-6 py-8 text-center"
              >
                <div className="font-display text-3xl font-semibold tracking-tight text-gradient-ember md:text-4xl">
                  {result.value}
                </div>
                <div className="mt-2 font-mono text-[10.5px] uppercase tracking-[0.14em] text-white/35">
                  {result.label}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* body */}
      <section className="py-20 md:py-28">
        <div className="shell">
          <div className="grid gap-14 lg:grid-cols-[0.34fr_0.66fr] lg:gap-20">
            {/* meta rail */}
            <aside className="lg:sticky lg:top-28 lg:self-start">
              <dl className="flex flex-col divide-y divide-white/[0.07] border-y border-white/[0.07]">
                {[
                  { k: "Client", v: study.client },
                  { k: "Industry", v: study.industry },
                  { k: "Engagement", v: study.duration },
                  { k: "Year", v: study.year },
                ].map((row) => (
                  <div
                    key={row.k}
                    className="flex items-center justify-between gap-4 py-3.5"
                  >
                    <dt className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-white/30">
                      {row.k}
                    </dt>
                    <dd className="text-sm text-white/75">{row.v}</dd>
                  </div>
                ))}
              </dl>

              <Link
                href="/book"
                className="group mt-8 flex items-center justify-between gap-4 rounded-2xl border border-ember-500/20 bg-gradient-to-br from-ember-600/[0.12] to-transparent p-5 transition-colors duration-300 hover:border-ember-500/40"
              >
                <span>
                  <span className="block text-sm font-medium text-white">
                    Similar problem?
                  </span>
                  <span className="mt-1 block text-[13px] text-white/50">
                    Book 30 minutes with an engineer.
                  </span>
                </span>
                <ArrowUpRight className="size-4 shrink-0 text-ember-400 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </aside>

            <div className="flex flex-col gap-16">
              <Reveal>
                <div>
                  <Eyebrow>The challenge</Eyebrow>
                  <p className="mt-6 text-lg leading-relaxed text-white/65 md:text-xl">
                    {study.challenge}
                  </p>
                </div>
              </Reveal>

              <Reveal>
                <div>
                  <Eyebrow>What we did</Eyebrow>
                  <ol className="mt-7 flex flex-col gap-7">
                    {study.approach.map((item, i) => (
                      <li key={i} className="flex gap-5">
                        <span className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-full border border-ember-500/25 bg-ember-500/10 font-mono text-xs text-ember-400">
                          {i + 1}
                        </span>
                        <p className="text-[15px] leading-relaxed text-white/55 md:text-base">
                          {item}
                        </p>
                      </li>
                    ))}
                  </ol>
                </div>
              </Reveal>

              <Reveal>
                <div>
                  <Eyebrow>The outcome</Eyebrow>
                  <p className="mt-6 text-lg leading-relaxed text-white/65 md:text-xl">
                    {study.outcome}
                  </p>
                </div>
              </Reveal>

              <Reveal>
                <figure className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-b from-white/[0.045] to-transparent p-8 md:p-10">
                  <div className="pointer-events-none absolute -right-16 -top-16 size-52 rounded-full bg-ember-600/[0.12] blur-[70px]" />
                  <Quote className="size-7 text-ember-500/60" strokeWidth={1.5} />
                  <blockquote className="relative mt-5 font-display text-xl font-medium leading-snug tracking-tight text-white/90 md:text-2xl">
                    &ldquo;{study.quote.text}&rdquo;
                  </blockquote>
                  <figcaption className="mt-6 font-mono text-[11px] uppercase tracking-[0.14em] text-white/40">
                    {study.quote.author} · {study.quote.role}
                  </figcaption>
                </figure>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* next case study */}
      <section className="border-t border-white/[0.06] py-16">
        <div className="shell">
          <Link
            href={`/case-studies/${next.slug}`}
            className="group flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <span className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-white/30">
                Next case study
              </span>
              <h2 className="mt-2.5 max-w-2xl font-display text-2xl font-semibold tracking-tight text-white transition-colors group-hover:text-ember-400 md:text-3xl">
                {next.title}
              </h2>
            </div>
            <span className="grid size-12 shrink-0 place-items-center rounded-full border border-white/[0.1] text-white/60 transition-all duration-300 group-hover:border-ember-500/40 group-hover:bg-ember-500/10 group-hover:text-ember-400">
              <ArrowRight className="size-5" />
            </span>
          </Link>
        </div>
      </section>

      <CTA />
    </>
  );
}
