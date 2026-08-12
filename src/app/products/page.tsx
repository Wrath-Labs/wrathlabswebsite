import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { ProductShowcase } from "@/components/sections/Products";
import { Pricing } from "@/components/sections/Pricing";
import { Socials } from "@/components/sections/Socials";
import { CTA } from "@/components/sections/CTA";
import { Button } from "@/components/ui/Button";
import { products } from "@/lib/data";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Sentinel, Forge, Nexus, Prism, and Cipher — five products built, run, and maintained by the Wrath Labs engineering lab.",
};

export default function ProductsPage() {
  return (
    <>
      <PageHero
        eyebrow="The lab"
        title="Five products. All of them ours."
        description="We fund these ourselves, run them in production, and answer the pager when they misbehave. Everything we learn doing that ends up in the client work."
        breadcrumb={[{ label: "Products", href: "/products" }]}
      >
        <div className="mt-10 flex flex-wrap items-center gap-2.5">
          {products.map((p) => (
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
          <Button href="/book" size="lg" withArrow magnetic>
            Book a walkthrough
          </Button>
        </div>
      </PageHero>

      <ProductShowcase />
      <Pricing />
      <Socials />
      <CTA
        eyebrow="Early access"
        title="Two more are still behind the curtain."
        description="We open private betas to a small group first. Tell us what you're running and we'll get you in if it's a fit."
      />
    </>
  );
}
