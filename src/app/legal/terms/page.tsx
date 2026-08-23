import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { LegalBody } from "@/components/layout/LegalBody";
import { content } from "@/content";

const { hero, sections, seo } = content.legal.terms;

export const metadata: Metadata = seo;

export default function TermsPage() {
  return (
    <>
      <PageHero {...hero} />
      <LegalBody sections={sections} />
    </>
  );
}
