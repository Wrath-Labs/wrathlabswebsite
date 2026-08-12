"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { process } from "@/lib/data";
import { Section, SectionHeading } from "../ui/SectionHeading";
import { Reveal } from "../ui/Reveal";

export function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 65%", "end 60%"],
  });
  const height = useSpring(
    useTransform(scrollYProgress, [0, 1], ["0%", "100%"]),
    { stiffness: 90, damping: 26 },
  );

  return (
    <Section id="process" className="relative overflow-hidden">
      <div className="shell">
        <SectionHeading
          eyebrow="How it goes"
          title={
            <>
              Five stages.{" "}
              <span className="text-white/40">No black boxes.</span>
            </>
          }
          description="You see working software in week three and every Friday after that. Nothing about our process requires you to take our word for it."
        />

        <div ref={ref} className="relative mt-16 pl-10 md:pl-0">
          {/* rail */}
          <div className="absolute bottom-0 left-3 top-0 w-px bg-white/[0.08] md:left-1/2 md:-translate-x-px">
            <motion.div
              style={{ height }}
              className="w-px bg-gradient-to-b from-ember-500 via-flare-500 to-ember-500/0"
            />
          </div>

          <div className="flex flex-col gap-12 md:gap-4">
            {process.map((stage, i) => (
              <div
                key={stage.step}
                className="relative md:grid md:grid-cols-2 md:gap-16"
              >
                {/* node */}
                <span className="absolute -left-10 top-1.5 grid size-6 place-items-center md:left-1/2 md:-translate-x-1/2">
                  <span className="absolute size-6 rounded-full bg-ember-500/15" />
                  <span className="size-2 rounded-full bg-ember-500 shadow-[0_0_12px_2px_rgba(255,45,85,0.5)]" />
                </span>

                <Reveal
                  direction={i % 2 === 0 ? "right" : "left"}
                  delay={0.05}
                  className={
                    i % 2 === 0
                      ? "md:pr-16 md:text-right"
                      : "md:col-start-2 md:pl-16"
                  }
                >
                  <div className="pb-4 md:py-10">
                    <div
                      className={`flex items-center gap-3 ${
                        i % 2 === 0 ? "md:justify-end" : ""
                      }`}
                    >
                      <span className="font-mono text-xs text-ember-500">
                        {stage.step}
                      </span>
                      <span className="rounded-full border border-white/[0.08] px-2.5 py-0.5 font-mono text-[10.5px] uppercase tracking-[0.14em] text-white/35">
                        {stage.duration}
                      </span>
                    </div>
                    <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight text-white md:text-3xl">
                      {stage.title}
                    </h3>
                    <p className="mt-3 max-w-md text-sm leading-relaxed text-white/50 md:inline-block">
                      {stage.blurb}
                    </p>
                  </div>
                </Reveal>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
