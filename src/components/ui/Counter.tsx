"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";

/**
 * Counts from 0 to `value` the first time it scrolls into view.
 * Uses rAF with an ease-out curve rather than a spring so the final
 * number lands exactly on target.
 */
export function Counter({
  value,
  suffix = "",
  prefix = "",
  duration = 1800,
  className,
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduce = useReducedMotion();
  const [animated, setAnimated] = useState(0);
  // With reduced motion we skip the tween entirely and derive the final value.
  const display = reduce ? value : animated;

  useEffect(() => {
    if (!inView || reduce) return;

    let raf = 0;
    let start: number | null = null;

    const tick = (now: number) => {
      if (start === null) start = now;
      const progress = Math.min((now - start) / duration, 1);
      // easeOutExpo
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setAnimated(value * eased);
      if (progress < 1) raf = requestAnimationFrame(tick);
      else setAnimated(value);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, duration, reduce]);

  // Match the precision of the target so 99.98 doesn't render as 100.0
  const decimals = (String(value).split(".")[1] ?? "").length;
  const rounded =
    decimals === 0
      ? Math.round(display).toLocaleString()
      : display.toLocaleString(undefined, {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        });

  return (
    <span ref={ref} className={className}>
      {prefix}
      {rounded}
      {suffix}
    </span>
  );
}
