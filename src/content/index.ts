/**
 * Every word, link, price and image path on this site comes from the JSON files
 * in `/content`. Nothing user-facing should be typed into a component again —
 * see `content/README.md` for the map of which file holds what.
 *
 * Usage is always the same shape:
 *
 *   import { content } from "@/content";
 *   const { section, items } = content.services;
 *
 * The whole tree is resolved once here at module load (build time, since this
 * site is statically exported) so components read plain strings with no loader
 * ceremony and no async.
 */
import about from "../../content/about.json";
import booking from "../../content/booking.json";
import brand from "../../content/brand.json";
import caseStudies from "../../content/case-studies.json";
import contact from "../../content/contact.json";
import faq from "../../content/faq.json";
import home from "../../content/home.json";
import legal from "../../content/legal.json";
import navigation from "../../content/navigation.json";
import notFound from "../../content/not-found.json";
import pricing from "../../content/pricing.json";
import process from "../../content/process.json";
import products from "../../content/products.json";
import sections from "../../content/sections.json";
import seo from "../../content/seo.json";
import services from "../../content/services.json";
import shared from "../../content/shared.json";
import stats from "../../content/stats.json";
import testimonials from "../../content/testimonials.json";
import { resolveContent } from "./resolve";

export const content = resolveContent({
  about,
  booking,
  brand,
  caseStudies,
  contact,
  faq,
  home,
  legal,
  navigation,
  notFound,
  pricing,
  process,
  products,
  sections,
  seo,
  services,
  shared,
  stats,
  testimonials,
});

/** A `{ label, href }` pair — the shape every button and menu entry uses. */
export type ContentLink = { label: string; href: string };

/** The two-tone heading every section band shares. */
export type ContentHeading = {
  eyebrow?: string;
  title: string;
  titleMuted?: string;
  description?: string;
};

export type CaseStudy = (typeof content.caseStudies.items)[number];
export type Product = (typeof content.products.items)[number];
export type Service = (typeof content.services.items)[number];
export type PricingTier = (typeof content.pricing.tabs)[number]["tiers"][number];
export type Testimonial = (typeof content.testimonials.items)[number];
export type Social = (typeof content.brand.socials)[number];
