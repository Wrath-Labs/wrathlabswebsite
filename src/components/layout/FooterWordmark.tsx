"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";

/** Outlined wordmark that fills with the brand gradient as it scrolls in. */
export function FooterWordmark({ text }: { text: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 95%", "end 70%"],
  });
  const clip = useTransform(
    scrollYProgress,
    [0, 1],
    ["inset(0 100% 0 0)", "inset(0 0% 0 0)"],
  );
  const heading =
    "font-display text-[15vw] font-bold uppercase leading-[0.82] tracking-[-0.05em] md:text-[13vw]";

  return (
    <div
      ref={ref}
      className="pointer-events-none relative select-none pt-20 md:pt-28"
    >
      <h2
        className={`${heading} text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.09)]`}
      >
        {text}
      </h2>
      {!reduce && (
        <motion.h2
          aria-hidden
          style={{ clipPath: clip }}
          className={`${heading} text-gradient-ember absolute inset-x-0 top-20 opacity-35 md:top-28`}
        >
          {text}
        </motion.h2>
      )}
    </div>
  );
}
