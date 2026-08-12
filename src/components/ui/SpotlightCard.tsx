"use client";

import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Card with a cursor-tracked radial highlight plus a gradient border that
 * lights up under the pointer. Position is written straight to CSS custom
 * properties to keep it off the React render path.
 */
export function SpotlightCard({
  children,
  className,
  spotlightColor = "255,45,85",
  tilt = false,
}: {
  children: ReactNode;
  className?: string;
  /** rgb triplet as a string, e.g. "34,211,238" */
  spotlightColor?: string;
  tilt?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    el.style.setProperty("--mx", `${x}px`);
    el.style.setProperty("--my", `${y}px`);

    if (tilt) {
      const rx = ((y - rect.height / 2) / rect.height) * -6;
      const ry = ((x - rect.width / 2) / rect.width) * 6;
      el.style.setProperty("--rx", `${rx}deg`);
      el.style.setProperty("--ry", `${ry}deg`);
    }
  }

  function handleLeave() {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
    el.style.setProperty("--spot", "0");
  }

  function handleEnter() {
    ref.current?.style.setProperty("--spot", "1");
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.02]",
        "transition-[border-color,transform] duration-500 ease-out hover:border-white/[0.14]",
        tilt && "[transform:perspective(1200px)_rotateX(var(--rx,0))_rotateY(var(--ry,0))]",
        className,
      )}
      style={
        {
          "--spot": 0,
          "--spotlight": spotlightColor,
        } as React.CSSProperties
      }
    >
      {/* cursor glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[var(--spot)] transition-opacity duration-500"
        style={{
          background:
            "radial-gradient(420px circle at var(--mx) var(--my), rgba(var(--spotlight),0.10), transparent 62%)",
        }}
      />
      {/* top hairline that brightens on hover */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-100"
      />
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}
