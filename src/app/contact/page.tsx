import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { CallPolicy } from "@/components/sections/PricingDetails";
import { Contact } from "@/components/sections/Contact";
// import { FAQ } from "@/components/sections/FAQ";
// import { Socials } from "@/components/sections/Socials";
import { content } from "@/content";

const { hero, seo } = content.contact.page;

export const metadata: Metadata = seo;

export default function ContactPage() {
  return (
    <>
      <PageHero {...hero} />

      <CallPolicy />
      <Contact />
      {/* <Socials /> */}
      {/* <FAQ /> */}
    </>
  );
}
