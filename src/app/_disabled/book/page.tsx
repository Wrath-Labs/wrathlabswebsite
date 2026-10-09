import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { BookMeet } from "@/components/sections/BookMeet";
import { Testimonials } from "@/components/sections/Testimonials";
import { FAQ } from "@/components/sections/FAQ";
import { content } from "@/content";

const { hero, expectations, seo } = content.booking.page;

export const metadata: Metadata = seo;

export default function BookPage() {
  return (
    <>
      <PageHero {...hero}>
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
