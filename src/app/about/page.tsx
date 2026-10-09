import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
// import { DualNature } from "@/components/sections/DualNature";
import { Manifesto, Team, Timeline, Values } from "@/components/sections/About";
// import { Stats } from "@/components/sections/Stats";
// import { TechMarquee } from "@/components/sections/TechMarquee";
// import { Socials } from "@/components/sections/Socials";
// import { CTA } from "@/components/sections/CTA";
import { Button } from "@/components/ui/Button";
import { content } from "@/content";

const { hero, buttons, seo } = content.about.page;

export const metadata: Metadata = seo;

export default function AboutPage() {
  return (
    <>
      <PageHero {...hero}>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Button href={buttons.primary.href} size="lg" withArrow magnetic>
            {buttons.primary.label}
          </Button>
          <Button href={buttons.secondary.href} size="lg" variant="secondary">
            {buttons.secondary.label}
          </Button>
        </div>
      </PageHero>

      {/* <Stats /> */}
      <Manifesto />
      {/* <DualNature /> */}
      <Values />
      <Timeline />
      <Team />
      {/* <TechMarquee /> */}
      {/* <Socials /> */}
      {/* <CTA {...closing} /> */}
    </>
  );
}
