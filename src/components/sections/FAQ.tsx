import { content } from "@/content";
import { Section, SectionHeading } from "../ui/SectionHeading";
import { Accordion } from "../ui/Accordion";
import { Reveal } from "../ui/Reveal";
import { Button } from "../ui/Button";
import { Icon } from "../ui/Icon";

const { section, items } = content.faq;
const { sideCard } = section;

export function FAQ() {
  return (
    <Section id="faq">
      <div className="shell">
        <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeading
              {...section.heading}
              titleClassName="md:text-[2.75rem]"
            />

            <Reveal delay={0.2}>
              <div className="mt-8 rounded-2xl border border-white/[0.07] bg-white/[0.02] p-6">
                <Icon name={sideCard.icon} className="size-5 text-ember-400" />
                <h3 className="mt-4 font-display text-lg font-medium text-white">
                  {sideCard.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/50">
                  {sideCard.description}
                </p>
                <Button
                  href={sideCard.button.href}
                  variant="secondary"
                  size="sm"
                  className="mt-5"
                  withArrow
                >
                  {sideCard.button.label}
                </Button>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <Accordion items={items} />
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
