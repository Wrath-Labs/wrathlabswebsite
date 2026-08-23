import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { ProductShowcase } from "@/components/sections/Products";
import { Pricing } from "@/components/sections/Pricing";
import { Socials } from "@/components/sections/Socials";
import { CTA } from "@/components/sections/CTA";
import { Button } from "@/components/ui/Button";
import { content } from "@/content";

const { hero, button, closing, seo } = content.products.page;
const { items } = content.products;

export const metadata: Metadata = seo;

export default function ProductsPage() {
  return (
    <>
      <PageHero {...hero}>
        <div className="mt-10 flex flex-wrap items-center gap-2.5">
          {items.map((p) => (
            <a
              key={p.id}
              href={`#${p.id}`}
              className="rounded-full border border-white/[0.08] bg-white/[0.02] px-4 py-2 text-[13px] text-white/60 transition-all duration-300 hover:-translate-y-0.5 hover:border-ember-500/40 hover:text-white"
            >
              {p.name}
            </a>
          ))}
        </div>
        <div className="mt-8">
          <Button href={button.href} size="lg" withArrow magnetic>
            {button.label}
          </Button>
        </div>
      </PageHero>

      <ProductShowcase />
      <Pricing />
      <Socials />
      <CTA {...closing} />
    </>
  );
}
