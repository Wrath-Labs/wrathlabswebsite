"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";

/**
 * Shows a price string such as "₹20,000 - ₹35,000" and rolls every number in
 * it up from zero. Remount it (give it a new `key`) to replay, e.g. when the
 * region tab changes. Number grouping (1,00,000 vs 100,000) is preserved.
 */
export function PriceTicker({
  value,
  className,
  duration = 800,
}: {
  value: string;
  className?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();
  const [progress, setProgress] = useState(0);
  const t = reduce ? 1 : progress;

  useEffect(() => {
    if (!inView || reduce) return;
    let raf = 0;
    let start: number | null = null;
    const tick = (now: number) => {
      if (start === null) start = now;
      const p = Math.min((now - start) / duration, 1);
      setProgress(p === 1 ? 1 : 1 - Math.pow(2, -10 * p));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduce, duration]);

  const indianGrouping = /\d,\d{2},\d{3}/.test(value);
  const text = value.replace(/\d[\d,]*/g, (match) => {
    const n = Number(match.replace(/,/g, ""));
    return Math.round(n * t).toLocaleString(indianGrouping ? "en-IN" : "en-US");
  });

  return (
    <span ref={ref} className={className} aria-label={value}>
      <span aria-hidden>{text}</span>
    </span>
  );
}
