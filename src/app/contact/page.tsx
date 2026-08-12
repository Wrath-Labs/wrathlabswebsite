import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Contact } from "@/components/sections/Contact";
import { FAQ } from "@/components/sections/FAQ";
import { Socials } from "@/components/sections/Socials";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Wrath Labs. One form, straight to the founders — replies within one business day.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Straight to the founders."
        description="No gatekeeping, no qualification call before the qualification call. Write once and you'll hear back from someone who can actually answer."
        breadcrumb={[{ label: "Contact", href: "/contact" }]}
      />

      <Contact />
      <Socials />
      <FAQ />
    </>
  );
}
