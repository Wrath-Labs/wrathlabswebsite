import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Services } from "@/components/sections/Services";
// import { Process } from "@/components/sections/Process";
// import { Stats } from "@/components/sections/Stats";
// import { Testimonials } from "@/components/sections/Testimonials";
// import { FAQ } from "@/components/sections/FAQ";
// import { CTA } from "@/components/sections/CTA";
import { TechMarquee } from "@/components/sections/TechMarquee";
import { Button } from "@/components/ui/Button";
import { content } from "@/content";

const { hero, buttons, seo } = content.services.page;

export const metadata: Metadata = seo;

export default function ServicesPage() {
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

      <Services detailed showHeading={false} />
      <TechMarquee />
      {/* <Process /> */}
      {/* <Stats /> */}
      {/* <Testimonials /> */}
      {/* <FAQ /> */}
      {/* <CTA {...closing} /> */}
    </>
  );
}
