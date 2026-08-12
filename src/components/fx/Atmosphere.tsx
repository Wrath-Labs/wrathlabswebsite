"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";
import { useMediaQuery } from "@/lib/hooks";

/** Film grain over the whole page — kills the flatness of large dark areas. */
export function Grain() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[60] opacity-[0.035] mix-blend-overlay"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)'/%3E%3C/svg%3E")`,
      }}
    />
  );
}

/** Thin ember progress bar pinned to the top of the viewport. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const width = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX: width }}
      className="fixed inset-x-0 top-0 z-[70] h-[2px] origin-left bg-gradient-to-r from-ember-600 via-ember-500 to-flare-500"
    />
  );
}

/** Soft light that trails the cursor. Skipped on touch and reduced-motion. */
export function CursorGlow() {
  const reduce = useReducedMotion();
  const finePointer = useMediaQuery("(hover: hover) and (pointer: fine)");
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const enabled = finePointer && !reduce;

  useEffect(() => {
    if (!enabled) return;

    let raf = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() =>
        setPos({ x: e.clientX, y: e.clientY }),
      );
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed z-[55] size-[520px] rounded-full"
      style={{
        background:
          "radial-gradient(circle, rgba(255,45,85,0.055), rgba(255,107,44,0.02) 45%, transparent 70%)",
      }}
      animate={{ x: pos.x - 260, y: pos.y - 260 }}
      transition={{ type: "spring", stiffness: 110, damping: 24, mass: 0.6 }}
    />
  );
}

/**
 * Slow-drifting gradient orbs. Purely decorative; sits behind content.
 */
export function AmbientOrbs({ variant = "hero" }: { variant?: "hero" | "soft" }) {
  if (variant === "soft") {
    return (
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 top-1/4 size-[520px] rounded-full bg-ember-600/[0.07] blur-[130px]" />
        <div className="absolute -right-32 bottom-0 size-[440px] rounded-full bg-volt-500/[0.05] blur-[120px]" />
      </div>
    );
  }

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="animate-float absolute -left-32 -top-24 size-[560px] rounded-full bg-ember-600/[0.13] blur-[140px]" />
      <div
        className="animate-float absolute -right-40 top-1/3 size-[480px] rounded-full bg-flare-500/[0.09] blur-[130px]"
        style={{ animationDelay: "-2.5s" }}
      />
      <div
        className="animate-float absolute bottom-0 left-1/3 size-[420px] rounded-full bg-volt-500/[0.06] blur-[120px]"
        style={{ animationDelay: "-4.5s" }}
      />
    </div>
  );
}

/** Horizontal hairline divider with a centred glow. */
export function Divider() {
  return (
    <div aria-hidden className="relative h-px w-full">
      <div className="hairline" />
      <div className="absolute left-1/2 top-0 h-px w-40 -translate-x-1/2 bg-ember-500/40 blur-[2px]" />
    </div>
  );
}
