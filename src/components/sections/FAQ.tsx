import { MessagesSquare } from "lucide-react";
import { faqs } from "@/lib/data";
import { Section, SectionHeading } from "../ui/SectionHeading";
import { Accordion } from "../ui/Accordion";
import { Reveal } from "../ui/Reveal";
import { Button } from "../ui/Button";

export function FAQ() {
  return (
    <Section id="faq">
      <div className="shell">
        <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeading
              eyebrow="Questions"
              title={
                <>
                  The things{" "}
                  <span className="text-white/40">everyone asks.</span>
                </>
              }
              titleClassName="md:text-[2.75rem]"
            />

            <Reveal delay={0.2}>
              <div className="mt-8 rounded-2xl border border-white/[0.07] bg-white/[0.02] p-6">
                <MessagesSquare
                  className="size-5 text-ember-400"
                  strokeWidth={1.5}
                />
                <h3 className="mt-4 font-display text-lg font-medium text-white">
                  Something not covered?
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/50">
                  Ask a founder directly. Replies usually land the same day.
                </p>
                <Button
                  href="/contact"
                  variant="secondary"
                  size="sm"
                  className="mt-5"
                  withArrow
                >
                  Ask us anything
                </Button>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <Accordion items={faqs} />
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
