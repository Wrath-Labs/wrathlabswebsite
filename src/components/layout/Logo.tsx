import Link from "next/link";
import { cn } from "@/lib/utils";

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={cn("size-8", className)}
      fill="none"
      aria-hidden
    >
      <defs>
        <linearGradient id="wl-mark" x1="0" y1="0" x2="32" y2="32">
          <stop offset="0%" stopColor="#ff2d55" />
          <stop offset="100%" stopColor="#ff6b2c" />
        </linearGradient>
      </defs>
      <rect
        x="0.75"
        y="0.75"
        width="30.5"
        height="30.5"
        rx="9"
        stroke="url(#wl-mark)"
        strokeOpacity="0.45"
        strokeWidth="1.5"
      />
      <path
        d="M6.5 9.5 11.2 22.5 16 14.2 20.8 22.5 25.5 9.5"
        stroke="url(#wl-mark)"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="16" cy="9.5" r="1.5" fill="#ff6b2c" />
    </svg>
  );
}

export function Logo({
  className,
  href = "/",
}: {
  className?: string;
  href?: string;
}) {
  return (
    <Link
      href={href}
      className={cn("group flex items-center gap-2.5", className)}
      aria-label="Wrath Labs — home"
    >
      <span className="relative">
        <LogoMark className="size-8 transition-transform duration-500 group-hover:rotate-[8deg]" />
        <span
          aria-hidden
          className="absolute inset-0 rounded-[9px] bg-ember-500/25 opacity-0 blur-lg transition-opacity duration-500 group-hover:opacity-100"
        />
      </span>
      <span className="font-display text-[17px] font-semibold leading-none tracking-tight text-white">
        Wrath
        <span className="ml-1 font-normal text-white/45 transition-colors duration-300 group-hover:text-ember-400">
          Labs
        </span>
      </span>
    </Link>
  );
}
