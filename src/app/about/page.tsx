import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { DualNature } from "@/components/sections/DualNature";
import { Manifesto, Timeline, Values } from "@/components/sections/About";
import { Stats } from "@/components/sections/Stats";
import { TechMarquee } from "@/components/sections/TechMarquee";
import { Socials } from "@/components/sections/Socials";
import { CTA } from "@/components/sections/CTA";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "About",
  description:
    "Wrath Labs is a product studio and engineering lab founded in 2019 — five products of our own, and senior squads embedded with client teams across 19 countries.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="A studio that has to live with its own code."
        description="Founded in 2019 by two engineers who were tired of shipping software they'd never maintain. Today we run five products of our own and build with teams across 19 countries."
        breadcrumb={[{ label: "About", href: "/about" }]}
      >
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Button href="/book" size="lg" withArrow magnetic>
            Meet the team
          </Button>
          <Button href="/case-studies" size="lg" variant="secondary">
            See the work
          </Button>
        </div>
      </PageHero>

      <Stats />
      <Manifesto />
      <DualNature />
      <Values />
      <Timeline />
      <TechMarquee />
      <Socials />
      <CTA
        eyebrow="Work with us"
        title="We're picky about projects, not about people."
        description="If you're building something that has to hold up under real load, we'd like to hear about it."
      />
    </>
  );
}
