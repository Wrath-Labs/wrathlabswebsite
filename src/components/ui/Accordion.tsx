"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export function Accordion({
  items,
  className,
}: {
  items: readonly { q: string; a: string }[];
  className?: string;
}) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className={cn("divide-y divide-white/[0.07]", className)}>
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.q} className="group">
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-start justify-between gap-6 py-6 text-left"
            >
              <span
                className={cn(
                  "font-display text-lg tracking-tight transition-colors duration-300 md:text-xl",
                  isOpen ? "text-white" : "text-white/75 group-hover:text-white",
                )}
              >
                {item.q}
              </span>
              <span
                className={cn(
                  "mt-0.5 grid size-8 shrink-0 place-items-center rounded-full border transition-all duration-400",
                  isOpen
                    ? "rotate-45 border-ember-500/50 bg-ember-500/15 text-ember-400"
                    : "border-white/10 text-white/50 group-hover:border-white/25 group-hover:text-white",
                )}
              >
                <Plus className="size-4" strokeWidth={2} />
              </span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{
                    height: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
                    opacity: { duration: 0.28 },
                  }}
                  className="overflow-hidden"
                >
                  <p className="max-w-3xl pb-7 pr-14 text-[15px] leading-relaxed text-white/55">
                    {item.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
