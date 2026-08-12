import Link from "next/link";
import { navLinks } from "@/lib/data";
import { Button } from "@/components/ui/Button";
import { ParticleField } from "@/components/fx/ParticleField";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[88svh] items-center overflow-hidden py-32">
      <div className="absolute inset-0 -z-10">
        <div className="bg-grid absolute inset-0 opacity-40 [mask-image:radial-gradient(100%_80%_at_50%_40%,black,transparent_70%)]" />
        <div className="absolute inset-0 opacity-60">
          <ParticleField maxNodes={70} />
        </div>
        <div className="absolute left-1/2 top-1/2 size-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-ember-600/[0.1] blur-[140px]" />
      </div>

      <div className="shell relative flex flex-col items-center text-center">
        <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-ember-400">
          Error 404
        </span>

        <h1 className="mt-6 font-display text-[22vw] font-bold leading-none tracking-tighter text-transparent [-webkit-text-stroke:1.5px_rgba(255,255,255,0.14)] sm:text-[12rem]">
          404
        </h1>

        <h2 className="mt-4 max-w-lg font-display text-2xl font-semibold tracking-tight text-white md:text-3xl">
          This page didn&apos;t make it past code review.
        </h2>
        <p className="mt-4 max-w-md text-[15px] leading-relaxed text-white/50">
          The URL you followed doesn&apos;t exist — or it did, and we shipped
          something better in its place.
        </p>

        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <Button href="/" size="lg" withArrow magnetic>
            Back to home
          </Button>
          <Button href="/contact" size="lg" variant="secondary">
            Report a broken link
          </Button>
        </div>

        <nav className="mt-14 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-mono text-[11px] uppercase tracking-[0.16em] text-white/35 transition-colors hover:text-ember-400"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </section>
  );
}
