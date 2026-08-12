import { Hero } from "@/components/sections/Hero";
import { TechMarquee } from "@/components/sections/TechMarquee";
import { DualNature } from "@/components/sections/DualNature";
import { Stats } from "@/components/sections/Stats";
import { Services } from "@/components/sections/Services";
import { Products } from "@/components/sections/Products";
import { Process } from "@/components/sections/Process";
import { CaseStudiesSection } from "@/components/sections/CaseStudies";
import { Testimonials } from "@/components/sections/Testimonials";
import { Pricing } from "@/components/sections/Pricing";
import { FAQ } from "@/components/sections/FAQ";
import { BookMeet } from "@/components/sections/BookMeet";
import { Contact } from "@/components/sections/Contact";
import { Socials } from "@/components/sections/Socials";
import { CTA } from "@/components/sections/CTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TechMarquee />
      <DualNature />
      <Stats />
      <Services />
      <Products />
      <Process />
      <CaseStudiesSection limit={2} />
      <Testimonials />
      <Pricing />
      <FAQ />
      <BookMeet />
      <Contact />
      <Socials />
      <CTA />
    </>
  );
}
