"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type Node = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  hot: boolean;
};

/**
 * Drifting node lattice on canvas. Nodes connect to nearby neighbours and
 * lean toward the cursor. Density scales with viewport area, and the whole
 * thing renders a single static frame under prefers-reduced-motion.
 */
export function ParticleField({
  className,
  density = 0.00009,
  maxNodes = 110,
  linkDistance = 150,
}: {
  className?: string;
  density?: number;
  maxNodes?: number;
  linkDistance?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const pointer = { x: -9999, y: -9999, active: false };
    let nodes: Node[] = [];
    let width = 0;
    let height = 0;
    let raf = 0;
    let running = true;

    function seed() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas!.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas!.width = Math.floor(width * dpr);
      canvas!.height = Math.floor(height * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.min(maxNodes, Math.floor(width * height * density));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        r: Math.random() * 1.4 + 0.6,
        hot: Math.random() > 0.82,
      }));
    }

    function draw() {
      ctx!.clearRect(0, 0, width, height);

      // links first so nodes sit on top
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist > linkDistance) continue;

          const strength = 1 - dist / linkDistance;
          ctx!.strokeStyle =
            a.hot || b.hot
              ? `rgba(255, 45, 85, ${strength * 0.24})`
              : `rgba(255, 255, 255, ${strength * 0.1})`;
          ctx!.lineWidth = 0.6;
          ctx!.beginPath();
          ctx!.moveTo(a.x, a.y);
          ctx!.lineTo(b.x, b.y);
          ctx!.stroke();
        }
      }

      for (const n of nodes) {
        // cursor link — a short leash toward the pointer
        if (pointer.active) {
          const dx = n.x - pointer.x;
          const dy = n.y - pointer.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 190) {
            const strength = 1 - dist / 190;
            ctx!.strokeStyle = `rgba(255, 107, 44, ${strength * 0.35})`;
            ctx!.lineWidth = 0.7;
            ctx!.beginPath();
            ctx!.moveTo(n.x, n.y);
            ctx!.lineTo(pointer.x, pointer.y);
            ctx!.stroke();
            n.vx -= (dx / dist) * strength * 0.014;
            n.vy -= (dy / dist) * strength * 0.014;
          }
        }

        ctx!.beginPath();
        ctx!.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx!.fillStyle = n.hot
          ? "rgba(255, 92, 121, 0.85)"
          : "rgba(255, 255, 255, 0.4)";
        ctx!.fill();

        if (n.hot) {
          ctx!.beginPath();
          ctx!.arc(n.x, n.y, n.r * 4.5, 0, Math.PI * 2);
          ctx!.fillStyle = "rgba(255, 45, 85, 0.07)";
          ctx!.fill();
        }
      }
    }

    function step() {
      if (!running) return;

      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;

        // wrap instead of bounce so the field never looks like it's in a box
        if (n.x < -20) n.x = width + 20;
        if (n.x > width + 20) n.x = -20;
        if (n.y < -20) n.y = height + 20;
        if (n.y > height + 20) n.y = -20;

        // damp the cursor impulse back toward drift speed
        n.vx = Math.max(-0.5, Math.min(0.5, n.vx * 0.995));
        n.vy = Math.max(-0.5, Math.min(0.5, n.vy * 0.995));
      }

      draw();
      raf = requestAnimationFrame(step);
    }

    function onMove(e: PointerEvent) {
      const rect = canvas!.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      pointer.active =
        pointer.x > -100 &&
        pointer.y > -100 &&
        pointer.x < width + 100 &&
        pointer.y < height + 100;
    }

    function onLeave() {
      pointer.active = false;
    }

    const observer = new ResizeObserver(() => {
      seed();
      if (reduce) draw();
    });
    observer.observe(canvas);

    seed();

    if (reduce) {
      draw();
    } else {
      raf = requestAnimationFrame(step);
      window.addEventListener("pointermove", onMove, { passive: true });
      window.addEventListener("pointerleave", onLeave);
    }

    // pause when scrolled away — no reason to burn frames off-screen
    const visibility = new IntersectionObserver(
      ([entry]) => {
        if (reduce) return;
        if (entry.isIntersecting && !running) {
          running = true;
          raf = requestAnimationFrame(step);
        } else if (!entry.isIntersecting && running) {
          running = false;
          cancelAnimationFrame(raf);
        }
      },
      { threshold: 0 },
    );
    visibility.observe(canvas);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      observer.disconnect();
      visibility.disconnect();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
    };
  }, [density, maxNodes, linkDistance]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={cn("size-full", className)}
    />
  );
}
