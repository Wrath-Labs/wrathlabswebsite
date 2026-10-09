"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, Sparkles } from "lucide-react";
import { content } from "@/content";
import { ParticleField } from "../fx/ParticleField";
import { AmbientOrbs } from "../fx/Atmosphere";
import { Button } from "../ui/Button";
import { TextReveal } from "../ui/Reveal";
import { Counter } from "../ui/Counter";
import { FactoryScene } from "../fx/FactoryScene";

const { hero, telemetry, factory } = content.home;

const fadeUp = {
  hidden: { opacity: 0, y: 22, filter: "blur(6px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)" },
};

export function Hero() {
  const reduce = useReducedMotion();
  // With the factory picture the hero is split: text left, picture right.
  const split = factory.show;

  return (
    <section className="relative flex min-h-[92svh] flex-col justify-center overflow-hidden pb-20 pt-36 md:pt-40">
      {/* backdrop stack */}
      <div className="absolute inset-0 -z-10">
        <div className="bg-grid absolute inset-0 opacity-[0.55] [mask-image:radial-gradient(120%_90%_at_50%_10%,black,transparent_75%)]" />
        <AmbientOrbs />
        <div className="absolute inset-0 opacity-70">
          <ParticleField />
        </div>
        {/* vignette + floor fade */}
        <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_-10%,transparent_35%,rgba(3,3,5,0.75)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-void to-transparent" />
      </div>

      <div className="shell relative">
        <div
          className={
            split
              ? "grid items-center gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-8"
              : undefined
          }
        >
          <motion.div
            initial="hidden"
            animate="show"
            transition={{ staggerChildren: 0.09, delayChildren: 0.15 }}
            className={
              split
                ? "flex flex-col items-start text-left"
                : "flex flex-col items-center text-center"
            }
          >
            {/* announcement */}
            {hero.badge.show && (
              <motion.div
                variants={fadeUp}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link
                  href={hero.badge.href}
                  className="group inline-flex items-center gap-2.5 rounded-full border border-white/[0.09] bg-white/[0.03] py-1.5 pl-2 pr-4 text-[13px] text-white/65 backdrop-blur-md transition-colors duration-300 hover:border-ember-500/35 hover:text-white"
                >
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-ember-500 to-flare-500 px-2.5 py-1 text-[11px] font-medium uppercase tracking-wider text-white">
                    <Sparkles className="size-3" strokeWidth={2} />
                    {hero.badge.tag}
                  </span>
                  {hero.badge.text}
                  <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                </Link>
              </motion.div>
            )}

            {/* headline */}
            <h1
              className={`mt-8 max-w-5xl font-display font-semibold leading-[0.95] tracking-[-0.045em] text-white ${
                split
                  ? "text-[12vw] sm:text-6xl lg:text-[3.6rem] xl:text-[4.4rem]"
                  : "text-[13vw] sm:text-6xl md:text-7xl lg:text-[5.5rem]"
              }`}
            >
              <span className="block">
                <TextReveal text={hero.headline.lineOne} delay={0.3} />
              </span>
              <span className="mt-1 block">
                <TextReveal
                  text={hero.headline.lineTwo}
                  delay={0.62}
                  wordClassName="text-shimmer"
                />
              </span>
            </h1>

            <motion.p
              variants={fadeUp}
              transition={{
                duration: 0.8,
                delay: 0.95,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="mt-7 max-w-xl text-[15px] leading-relaxed text-white/55 md:text-lg"
            >
              {hero.description}
            </motion.p>

            <motion.div
              variants={fadeUp}
              transition={{
                duration: 0.8,
                delay: 1.05,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={`mt-10 flex flex-col gap-3 sm:flex-row ${split ? "items-start" : "items-center"}`}
            >
              <Button
                href={hero.primaryButton.href}
                size="lg"
                withArrow
                magnetic
              >
                {hero.primaryButton.label}
              </Button>
              <Button
                href={hero.secondaryButton.href}
                size="lg"
                variant="secondary"
              >
                {hero.secondaryButton.label}
              </Button>
            </motion.div>

            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.8, delay: 1.15 }}
              className="mt-6 font-mono text-[11px] uppercase tracking-[0.18em] text-white/30"
            >
              {hero.footnote}
            </motion.p>
          </motion.div>

          {/* the product factory: sits to the right of the text */}
          {factory.show && (
            <motion.div
              initial={{ opacity: 0, x: 40, filter: "blur(10px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full 2xl:-mr-10 2xl:w-[calc(100%+2.5rem)]"
            >
              <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] shadow-[0_30px_80px_-30px_rgba(255,45,85,0.35)]">
                <FactoryScene
                  ariaLabel={factory.ariaLabel}
                  viewBox="0 50 900 370"
                />
              </div>
            </motion.div>
          )}
        </div>

        {/* live telemetry panel */}
        {!factory.show && telemetry.show && (
          <motion.div
            initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1, delay: 1.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative mx-auto mt-20 w-full max-w-4xl"
          >
            <div className="glass relative overflow-hidden rounded-2xl">
              {/* window chrome */}
              <div className="flex items-center gap-3 border-b border-white/[0.07] px-5 py-3">
                <div className="flex gap-1.5">
                  <span className="size-2.5 rounded-full bg-ember-500/70" />
                  <span className="size-2.5 rounded-full bg-flare-400/60" />
                  <span className="size-2.5 rounded-full bg-white/15" />
                </div>
                <span className="font-mono text-[11px] text-white/35">
                  {telemetry.address}
                </span>
                <span className="ml-auto inline-flex items-center gap-1.5 font-mono text-[11px] text-emerald-400/80">
                  <span className="relative flex size-1.5">
                    <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex size-1.5 rounded-full bg-emerald-400" />
                  </span>
                  {telemetry.liveLabel}
                </span>
              </div>

              <div className="grid divide-white/[0.07] sm:grid-cols-3 sm:divide-x">
                {telemetry.metrics.map((metric) => (
                  <Metric key={metric.label} {...metric} />
                ))}
              </div>

              {/* scanline */}
              {!reduce && (
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-ember-500/[0.07] to-transparent"
                  style={{ animation: "scan 7s linear infinite" }}
                />
              )}
            </div>

            {/* reflection */}
            <div
              aria-hidden
              className="mx-auto h-24 w-[85%] rounded-b-full bg-ember-500/[0.06] blur-2xl"
            />
          </motion.div>
        )}
      </div>
    </section>
  );
}

function Metric({
  label,
  value,
  suffix = "",
  trend,
}: {
  label: string;
  value: number;
  suffix?: string;
  trend: number[];
}) {
  const max = Math.max(...trend);
  const points = trend
    .map((v, i) => `${(i / (trend.length - 1)) * 100},${44 - (v / max) * 34}`)
    .join(" ");
  const gradientId = `sp-${label.replace(/\W/g, "")}`;

  return (
    <div className="flex flex-col gap-3 p-5">
      <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-white/35">
        {label}
      </span>
      <span className="font-display text-3xl font-semibold tracking-tight text-white">
        <Counter value={value} suffix={suffix} />
      </span>
      <svg
        viewBox="0 0 100 48"
        preserveAspectRatio="none"
        className="h-10 w-full"
        aria-hidden
      >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ff2d55" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#ff2d55" stopOpacity="0" />
          </linearGradient>
        </defs>
        <motion.polygon
          points={`${points} 100,48 0,48`}
          fill={`url(#${gradientId})`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 2.1 }}
        />
        <motion.polyline
          points={points}
          fill="none"
          stroke="#ff5c79"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
          pathLength={1}
          strokeDasharray={1}
          initial={{ strokeDashoffset: 1 }}
          animate={{ strokeDashoffset: 0 }}
          transition={{ duration: 1.4, delay: 1.6, ease: "easeOut" }}
        />
      </svg>
    </div>
  );
}
