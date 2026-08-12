"use client";

import Link from "next/link";
import { useRef, type ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  primary:
    "bg-gradient-to-r from-ember-500 to-flare-500 text-white shadow-[0_8px_32px_-8px_rgba(255,45,85,0.55)] hover:shadow-[0_12px_44px_-8px_rgba(255,45,85,0.75)]",
  secondary:
    "glass text-white/90 hover:border-white/20 hover:bg-white/[0.06] hover:text-white",
  ghost:
    "text-white/65 hover:text-white border border-transparent hover:border-white/10",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-[13px]",
  md: "h-11 px-5 text-sm",
  lg: "h-13 px-7 text-[15px]",
};

type Props = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: Variant;
  size?: Size;
  className?: string;
  withArrow?: boolean;
  magnetic?: boolean;
  type?: "button" | "submit";
  disabled?: boolean;
  external?: boolean;
};

/**
 * Primary CTA. `magnetic` makes the button drift a few pixels toward the
 * cursor; the shine sweep is CSS-only so it stays cheap.
 */
export function Button({
  children,
  href,
  onClick,
  variant = "primary",
  size = "md",
  className,
  withArrow = false,
  magnetic = false,
  type = "button",
  disabled = false,
  external = false,
}: Props) {
  const ref = useRef<HTMLElement>(null);

  function handleMove(e: React.MouseEvent) {
    if (!magnetic || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - (rect.left + rect.width / 2)) * 0.18;
    const y = (e.clientY - (rect.top + rect.height / 2)) * 0.28;
    ref.current.style.transform = `translate(${x}px, ${y}px)`;
  }

  function handleLeave() {
    if (!ref.current) return;
    ref.current.style.transform = "translate(0px, 0px)";
  }

  const classes = cn(
    "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full font-medium tracking-tight",
    "transition-[transform,box-shadow,background-color,border-color,color] duration-300 ease-out",
    "disabled:pointer-events-none disabled:opacity-50",
    variants[variant],
    sizes[size],
    className,
  );

  const inner = (
    <>
      {/* shine sweep */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -translate-x-[130%] bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-[130%]"
      />
      <span className="relative z-10 flex items-center gap-2">
        {children}
        {withArrow && (
          <ArrowRight
            className="size-4 transition-transform duration-300 group-hover:translate-x-1"
            strokeWidth={2}
          />
        )}
      </span>
    </>
  );

  if (href) {
    const anchorProps = external
      ? { target: "_blank", rel: "noreferrer noopener" }
      : {};
    return (
      <Link
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ref={ref as any}
        href={href}
        className={classes}
        onClick={onClick}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        {...anchorProps}
      >
        {inner}
      </Link>
    );
  }

  return (
    <button
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={ref as any}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      {inner}
    </button>
  );
}
