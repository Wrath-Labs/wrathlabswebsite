"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { Menu, X } from "lucide-react";
import { navLinks, socials } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Logo } from "./Logo";
import { Button } from "../ui/Button";
import { BrandIcon } from "../ui/BrandIcon";

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 24));

  // Lock the page while the mobile sheet is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        className="fixed inset-x-0 top-0 z-50"
      >
        <div
          className={cn(
            "transition-all duration-500 ease-out",
            scrolled
              ? "border-b border-white/[0.07] bg-void/80 backdrop-blur-xl"
              : "border-b border-transparent bg-transparent",
          )}
        >
          <nav className="shell flex h-18 items-center justify-between gap-8">
            <Logo />

            {/* Desktop links */}
            <ul className="hidden items-center gap-1 lg:flex">
              {navLinks.map((link) => {
                const active =
                  pathname === link.href || pathname.startsWith(`${link.href}/`);
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={cn(
                        "relative rounded-full px-4 py-2 text-sm transition-colors duration-300",
                        active
                          ? "text-white"
                          : "text-white/55 hover:text-white",
                      )}
                    >
                      {active && (
                        <motion.span
                          layoutId="nav-pill"
                          className="absolute inset-0 -z-10 rounded-full border border-white/10 bg-white/[0.05]"
                          transition={{
                            type: "spring",
                            stiffness: 380,
                            damping: 32,
                          }}
                        />
                      )}
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="flex items-center gap-3">
              <span className="hidden shrink-0 items-center gap-2 whitespace-nowrap rounded-full border border-white/[0.07] bg-white/[0.02] px-3 py-1.5 font-mono text-[11px] text-white/50 xl:inline-flex">
                <span className="relative flex size-1.5">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex size-1.5 rounded-full bg-emerald-400" />
                </span>
                2 slots · Q3
              </span>

              <Button
                href="/book"
                size="sm"
                className="hidden sm:inline-flex"
                withArrow
                magnetic
              >
                Book a call
              </Button>

              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-label={open ? "Close menu" : "Open menu"}
                aria-expanded={open}
                className="grid size-10 place-items-center rounded-full border border-white/10 text-white/80 transition-colors hover:border-white/25 hover:text-white lg:hidden"
              >
                {open ? (
                  <X className="size-4.5" />
                ) : (
                  <Menu className="size-4.5" />
                )}
              </button>
            </div>
          </nav>
        </div>
      </motion.header>

      {/* Mobile sheet */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-void/96 backdrop-blur-2xl lg:hidden"
          >
            <div className="bg-grid absolute inset-0 opacity-40" />
            <div className="shell relative flex h-full flex-col justify-between pb-12 pt-28">
              <ul className="flex flex-col gap-1">
                {navLinks.map((link, i) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: -24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: 0.08 + i * 0.06,
                      duration: 0.5,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="flex items-baseline gap-4 border-b border-white/[0.06] py-5 font-display text-3xl font-medium tracking-tight text-white/85 transition-colors hover:text-ember-400"
                    >
                      <span className="font-mono text-xs text-ember-500/70">
                        0{i + 1}
                      </span>
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="flex flex-col gap-6"
              >
                <Button
                  href="/book"
                  size="lg"
                  withArrow
                  className="w-full"
                  onClick={() => setOpen(false)}
                >
                  Book a meeting
                </Button>
                <div className="flex items-center gap-3">
                  {socials.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      aria-label={s.label}
                      className="grid size-10 place-items-center rounded-full border border-white/10 text-white/60 transition-colors hover:border-ember-500/40 hover:text-ember-400"
                    >
                      <BrandIcon brand={s.brand} className="size-4" />
                    </a>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
