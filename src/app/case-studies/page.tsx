import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { CaseStudyCard } from "@/components/sections/CaseStudies";
import { Testimonials } from "@/components/sections/Testimonials";
import { Stats } from "@/components/sections/Stats";
import { CTA } from "@/components/sections/CTA";
import { caseStudies } from "@/lib/data";

export const metadata: Metadata = {
  title: "Case Studies",
  description:
    "Payments infrastructure, clinical AI, realtime logistics, and commerce replatforms — with the production numbers to go with them.",
};

export default function CaseStudiesPage() {
  return (
    <>
      <PageHero
        eyebrow="Selected work"
        title="Four builds, and what they actually moved."
        description="Every figure below came out of production instrumentation after launch. Where a number looks too good, the case study explains how it was measured."
        breadcrumb={[{ label: "Case Studies", href: "/case-studies" }]}
      />

      <section className="pb-8">
        <div className="shell">
          <div className="grid gap-5 lg:grid-cols-2">
            {caseStudies.map((study, i) => (
              <CaseStudyCard key={study.slug} study={study} index={i} />
            ))}
          </div>
        </div>
      </section>

      <Stats />
      <Testimonials />
      <CTA
        eyebrow="Your turn"
        title="Want a case study with your name on it?"
        description="Tell us what you're building. If we can move a number that matters to you, we'll say how — and if we can't, we'll say that too."
      />
    </>
  );
}
