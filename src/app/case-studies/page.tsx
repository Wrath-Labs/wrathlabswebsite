import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { CaseStudyCard } from "@/components/sections/CaseStudies";
import { Testimonials } from "@/components/sections/Testimonials";
import { Stats } from "@/components/sections/Stats";
import { CTA } from "@/components/sections/CTA";
import { content } from "@/content";

const { hero, closing, seo } = content.caseStudies.page;
const { items } = content.caseStudies;

export const metadata: Metadata = seo;

export default function CaseStudiesPage() {
  return (
    <>
      <PageHero {...hero} />

      <section className="pb-8">
        <div className="shell">
          <div className="grid gap-5 lg:grid-cols-2">
            {items.map((study, i) => (
              <CaseStudyCard key={study.slug} study={study} index={i} />
            ))}
          </div>
        </div>
      </section>

      <Stats />
      <Testimonials />
      <CTA {...closing} />
    </>
  );
}
