import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { BookMeet } from "@/components/sections/BookMeet";
import { Testimonials } from "@/components/sections/Testimonials";
import { FAQ } from "@/components/sections/FAQ";

export const metadata: Metadata = {
  title: "Book a Meeting",
  description:
    "Book a 30, 45, or 60-minute call with a Wrath Labs engineer. Calendar invite and agenda within the hour.",
};

const expectations = [
  {
    step: "Before",
    detail:
      "You get a calendar invite with a short agenda and the name of whoever you'll be speaking to.",
  },
  {
    step: "During",
    detail:
      "A senior engineer, not a salesperson. Bring the architecture question you've been arguing about internally.",
  },
  {
    step: "After",
    detail:
      "A written summary within 24 hours: what we heard, what we'd do, and roughly what it would cost.",
  },
];

export default function BookPage() {
  return (
    <>
      <PageHero
        eyebrow="Book a meeting"
        title="Thirty minutes, no deck."
        description="Pick a format and a slot below. If nothing suits, email hello@wrathlabs.in and we'll work around you."
        breadcrumb={[{ label: "Book a Meeting", href: "/book" }]}
      >
        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.05] sm:grid-cols-3">
          {expectations.map((item) => (
            <div key={item.step} className="bg-void p-6">
              <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-ember-400">
                {item.step}
              </span>
              <p className="mt-3 text-[13px] leading-relaxed text-white/55">
                {item.detail}
              </p>
            </div>
          ))}
        </div>
      </PageHero>

      <BookMeet />
      <Testimonials />
      <FAQ />
    </>
  );
}
