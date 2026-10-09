"use client";

import { motion, useReducedMotion } from "motion/react";

/** A tick that draws itself the first time it scrolls into view. */
export function AnimatedCheck({
  className,
  delay = 0,
  label,
}: {
  className?: string;
  delay?: number;
  label?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      <motion.path
        d="M4 12.5l5 5L20 6.5"
        initial={reduce ? false : { pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5, delay, ease: "easeOut" }}
      />
    </svg>
  );
}
