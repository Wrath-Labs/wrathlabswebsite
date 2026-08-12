"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Infinite horizontal scroller. Children are duplicated once and the track
 * translates -50%, so the loop is seamless.
 */
export function Marquee({
  children,
  reverse = false,
  speed = 40,
  className,
  fade = true,
  pauseOnHover = true,
}: {
  children: ReactNode;
  reverse?: boolean;
  /** seconds for one full cycle */
  speed?: number;
  className?: string;
  fade?: boolean;
  pauseOnHover?: boolean;
}) {
  return (
    <div
      className={cn("group relative overflow-hidden", className)}
      style={
        fade
          ? {
              maskImage:
                "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
              WebkitMaskImage:
                "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
            }
          : undefined
      }
    >
      <div
        className={cn(
          "flex w-max",
          reverse ? "animate-marquee-reverse" : "animate-marquee",
          pauseOnHover && "group-hover:[animation-play-state:paused]",
        )}
        style={{ animationDuration: `${speed}s` }}
      >
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
