import { AlertTriangle } from "lucide-react";
import { Reveal } from "../ui/Reveal";

export function LegalBody({
  sections,
}: {
  sections: { heading: string; body: string[] }[];
}) {
  return (
    <section className="pb-24 md:pb-32">
      <div className="shell">
        <div className="grid gap-14 lg:grid-cols-[0.3fr_0.7fr] lg:gap-20">
          {/* contents */}
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <p className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-white/30">
              Contents
            </p>
            <nav className="mt-4 flex flex-col gap-2.5">
              {sections.map((section, i) => (
                <a
                  key={section.heading}
                  href={`#s${i}`}
                  className="text-sm text-white/50 transition-colors hover:text-ember-400"
                >
                  {section.heading}
                </a>
              ))}
            </nav>

            <div className="mt-8 flex gap-3 rounded-xl border border-flare-400/20 bg-flare-400/[0.06] p-4">
              <AlertTriangle
                className="mt-0.5 size-4 shrink-0 text-flare-400"
                strokeWidth={1.5}
              />
              <p className="text-[12px] leading-relaxed text-white/50">
                Template copy. Have a solicitor review this before you rely on
                it commercially.
              </p>
            </div>
          </aside>

          <div className="flex flex-col gap-12">
            {sections.map((section, i) => (
              <Reveal key={section.heading} delay={0.04 * i}>
                <div id={`s${i}`} className="scroll-mt-28">
                  <h2 className="font-display text-2xl font-semibold tracking-tight text-white">
                    {section.heading}
                  </h2>
                  <div className="mt-4 flex flex-col gap-4">
                    {section.body.map((para, j) => (
                      <p
                        key={j}
                        className="text-[15px] leading-relaxed text-white/55"
                      >
                        {para}
                      </p>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
