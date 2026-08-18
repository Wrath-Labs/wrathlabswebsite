import type { NextConfig } from "next";

/**
 * GitHub Pages serves this repo from https://wrath-labs.github.io/wrathlabswebsite/,
 * so links and assets need the repo name in front of them. The deploy workflow
 * sets NEXT_PUBLIC_BASE_PATH; `next dev` leaves it empty and serves from `/`.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  // Static HTML/CSS/JS only — Pages has no Node.js runtime.
  output: "export",
  basePath,
  assetPrefix: basePath || undefined,
  // Emits `services/index.html` instead of `services.html`, which Pages
  // resolves without any rewrite rules.
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
