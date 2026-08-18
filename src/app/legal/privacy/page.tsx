import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { LegalBody } from "@/components/layout/LegalBody";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Wrath Labs collects, uses, and stores personal data.",
};

const sections = [
  {
    heading: "What we collect",
    body: [
      "When you submit the contact or booking form we collect your name, email address, company name, and whatever you write in the message field. That's it — we don't ask for anything we don't need to reply to you.",
      "We collect aggregate, cookieless analytics about page visits (page path, referrer, country, device class). This data is not tied to an individual and never leaves our own infrastructure.",
    ],
  },
  {
    heading: "Why we collect it",
    body: [
      "To reply to your enquiry, schedule a meeting you requested, and keep a record of the conversation for as long as it's commercially relevant.",
      "To understand which pages are useful so we can improve them. Nothing more.",
    ],
  },
  {
    heading: "What we don't do",
    body: [
      "We don't sell, rent, or share your data with third parties for marketing. We don't add you to a mailing list or an automated sequence because you filled in a form.",
      "We don't use third-party advertising trackers, and we don't set cookies for advertising purposes.",
    ],
  },
  {
    heading: "How long we keep it",
    body: [
      "Enquiry data is retained for 24 months from the last contact, then deleted. Contractual records are kept for the period required by UK company and tax law.",
    ],
  },
  {
    heading: "Your rights",
    body: [
      "You can ask us for a copy of the data we hold about you, ask us to correct it, or ask us to delete it. Email hello@wrathlabs.in and we'll action the request within 30 days.",
      "If you're in the UK or EEA you also have the right to complain to your local data protection authority.",
    ],
  },
  {
    heading: "Sub-processors",
    body: [
      "We use a small number of third-party services to run this site and our business: cloud hosting, transactional email, and a video conferencing provider for scheduled calls. Each is contractually bound to process data only on our instructions.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        description="Plain English, no dark patterns. Last updated August 2026."
        breadcrumb={[{ label: "Privacy", href: "/legal/privacy" }]}
      />
      <LegalBody sections={sections} />
    </>
  );
}
