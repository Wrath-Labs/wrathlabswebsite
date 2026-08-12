import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { LegalBody } from "@/components/layout/LegalBody";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "The terms covering use of the Wrath Labs website and lab products.",
};

const sections = [
  {
    heading: "Using this site",
    body: [
      "You're welcome to read, quote, and link to anything on this site. Please don't scrape it at a volume that affects other visitors, and don't republish whole pages as your own.",
    ],
  },
  {
    heading: "Engagement terms",
    body: [
      "Nothing on this site constitutes a binding offer. Client engagements are governed by a separate master services agreement and statement of work signed by both parties.",
      "Prices shown are indicative, exclude VAT and applicable taxes, and may change. The price in your signed statement of work is the one that applies.",
    ],
  },
  {
    heading: "Intellectual property",
    body: [
      "Work product created for a client under a statement of work transfers to that client on payment, as set out in the agreement.",
      "The Wrath Labs name, logo, and the source code of our own products remain ours. Product use is governed by the licence accompanying each product.",
    ],
  },
  {
    heading: "Product availability",
    body: [
      "Products marked Beta, Alpha, or Research are provided as-is and may change or be withdrawn. Uptime commitments apply only to plans that state them explicitly.",
    ],
  },
  {
    heading: "Liability",
    body: [
      "To the extent permitted by law, we're not liable for indirect or consequential loss arising from use of this site. Liability under a client engagement is capped as set out in the relevant agreement.",
    ],
  },
  {
    heading: "Governing law",
    body: [
      "These terms are governed by the laws of England and Wales, and the courts of England and Wales have exclusive jurisdiction over any dispute.",
    ],
  },
];

export default function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Terms of Service"
        description="Short, readable, and not a substitute for the contract we'd actually sign. Last updated August 2026."
        breadcrumb={[{ label: "Terms", href: "/legal/terms" }]}
      />
      <LegalBody sections={sections} />
    </>
  );
}
