import { ArrowUpRight } from "lucide-react";
import { socials } from "@/lib/data";
import { Section, SectionHeading } from "../ui/SectionHeading";
import { BrandIcon } from "../ui/BrandIcon";
import { Reveal } from "../ui/Reveal";

const meta: Record<string, string> = {
  X: "Build notes and the occasional strong opinion",
  GitHub: "Open source, SDKs, and our public infra modules",
  LinkedIn: "Hiring, case studies, and company updates",
  Discord: "Product support and the lab community",
  YouTube: "Architecture walkthroughs and product demos",
  Instagram: "Studio life and design process",
};

export function Socials() {
  return (
    <Section id="socials" className="border-t border-white/[0.06]">
      <div className="shell">
        <SectionHeading
          eyebrow="Follow along"
          title={
            <>
              We build{" "}
              <span className="text-white/40">in the open.</span>
            </>
          }
          description="Most of what we learn gets written down or recorded. Pick whichever channel you actually read."
        />

        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.05] sm:grid-cols-2 lg:grid-cols-3">
          {socials.map((s, i) => (
            <Reveal key={s.label} delay={(i % 3) * 0.06}>
              <a
                href={s.href}
                target="_blank"
                rel="noreferrer noopener"
                className="group relative flex h-full items-start gap-4 bg-void p-6 transition-colors duration-500 hover:bg-ink-900"
              >
                <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-white/[0.08] bg-white/[0.02] text-white/60 transition-all duration-500 group-hover:border-ember-500/40 group-hover:bg-ember-500/10 group-hover:text-ember-400">
                  <BrandIcon brand={s.brand} className="size-4.5" />
                </span>

                <span className="flex-1">
                  <span className="flex items-center gap-2">
                    <span className="font-display text-base font-medium text-white">
                      {s.label}
                    </span>
                    <span className="font-mono text-[10.5px] text-white/30">
                      {s.handle}
                    </span>
                  </span>
                  <span className="mt-1.5 block text-[13px] leading-relaxed text-white/45">
                    {meta[s.label]}
                  </span>
                </span>

                <ArrowUpRight className="size-4 text-white/20 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ember-400" />
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
