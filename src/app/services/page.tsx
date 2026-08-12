import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Services } from "@/components/sections/Services";
import { Process } from "@/components/sections/Process";
import { Stats } from "@/components/sections/Stats";
import { Testimonials } from "@/components/sections/Testimonials";
import { FAQ } from "@/components/sections/FAQ";
import { CTA } from "@/components/sections/CTA";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Product engineering, AI engineering, cloud and DevOps, design systems, data platforms, and security engineering — delivered by senior squads in two-week sprints.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Senior squads, embedded in your roadmap."
        description="We staff a cross-functional team from six disciplines and work in your repo, on your infra, at your cadence. No junior bench, no handoff to a delivery manager you've never met."
        breadcrumb={[{ label: "Services", href: "/services" }]}
      >
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Button href="/book" size="lg" withArrow magnetic>
            Book a scoping call
          </Button>
          <Button href="/pricing" size="lg" variant="secondary">
            See pricing
          </Button>
        </div>
      </PageHero>

      <Services detailed showHeading={false} />
      <Process />
      <Stats />
      <Testimonials />
      <FAQ />
      <CTA
        eyebrow="Get started"
        title="Let's scope the first sprint."
        description="Bring the problem, the constraints, and the deadline. We'll come back with an architecture, a plan, and a fixed price."
      />
    </>
  );
}
