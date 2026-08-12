import Link from "next/link";
import { ArrowUpRight, Mail, MapPin } from "lucide-react";
import { footerNav, site, socials } from "@/lib/data";
import { Logo } from "./Logo";
import { BrandIcon } from "../ui/BrandIcon";
import { Reveal } from "../ui/Reveal";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/[0.07] bg-ink-950">
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-30" />
      <div className="pointer-events-none absolute -bottom-48 left-1/2 size-[700px] -translate-x-1/2 rounded-full bg-ember-600/[0.08] blur-[150px]" />

      <div className="shell relative">
        {/* Oversized wordmark */}
        <div className="pointer-events-none select-none pt-20 md:pt-28">
          <h2 className="font-display text-[15vw] font-bold leading-[0.82] tracking-[-0.05em] text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.09)] md:text-[13vw]">
            WRATH LABS
          </h2>
        </div>

        <div className="grid gap-14 py-16 lg:grid-cols-[1.4fr_2.4fr]">
          <div className="flex flex-col gap-6">
            <Logo />
            <p className="max-w-xs text-sm leading-relaxed text-white/45">
              {site.description}
            </p>

            <div className="flex flex-col gap-2.5 text-sm">
              <a
                href={`mailto:${site.email}`}
                className="group inline-flex items-center gap-2.5 text-white/60 transition-colors hover:text-white"
              >
                <Mail className="size-4 text-ember-500" strokeWidth={1.5} />
                {site.email}
                <ArrowUpRight className="size-3.5 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
              </a>
              <span className="inline-flex items-center gap-2.5 text-white/45">
                <MapPin className="size-4 text-ember-500" strokeWidth={1.5} />
                {site.address}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2 pt-1">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={s.label}
                  title={`${s.label} · ${s.handle}`}
                  className="group grid size-9 place-items-center rounded-full border border-white/[0.08] text-white/50 transition-all duration-300 hover:-translate-y-0.5 hover:border-ember-500/40 hover:bg-ember-500/10 hover:text-ember-400"
                >
                  <BrandIcon brand={s.brand} className="size-3.5" />
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-4">
            {footerNav.map((col, i) => (
              <Reveal key={col.title} delay={i * 0.05}>
                <div className="flex flex-col gap-4">
                  <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/35">
                    {col.title}
                  </h3>
                  <ul className="flex flex-col gap-2.5">
                    {col.links.map((link) => (
                      <li key={link.label}>
                        <Link
                          href={link.href}
                          className="group inline-flex items-center gap-1 text-sm text-white/55 transition-colors hover:text-white"
                        >
                          <span className="relative">
                            {link.label}
                            <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-ember-500 transition-all duration-300 group-hover:w-full" />
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="flex flex-col-reverse items-start justify-between gap-4 border-t border-white/[0.07] py-7 text-xs text-white/35 sm:flex-row sm:items-center">
          <p>
            © {new Date().getFullYear()} {site.name} Ltd. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <span className="inline-flex items-center gap-2 font-mono">
              <span className="size-1.5 rounded-full bg-emerald-400" />
              All systems operational
            </span>
            <Link href="/legal/privacy" className="transition-colors hover:text-white/70">
              Privacy
            </Link>
            <Link href="/legal/terms" className="transition-colors hover:text-white/70">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
