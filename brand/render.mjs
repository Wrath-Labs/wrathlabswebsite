/**
 * Renders everything in brand/src to PNG/PDF.
 *
 *   node <browser-automation skill>/browser.mjs "file://$PWD/src/og.html" --script ./render.mjs
 *
 * (Any Playwright `page` works; the skill is just the runner we used.)
 * Optional personal cards: NAME="Full Name" ROLE="Founder" in the environment.
 */
import { fileURLToPath } from "node:url";
import path from "node:path";

const here = path.dirname(fileURLToPath(import.meta.url));
const src = (f, q = "") => `file://${here}/src/${f}${q}`;
const pub = (f) => path.join(here, "..", "public", "brand", f);
const card = (f) => path.join(here, "business-cards", f);

export default async function run(page) {
  const shot = async (url, w, h, out, selector) => {
    await page.setViewportSize({ width: w, height: h });
    await page.goto(url);
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(500);
    await page.screenshot({ path: out, clip: { x: 0, y: 0, width: w, height: h } });
  };

  // web assets (replace the old tagline versions)
  await shot(src("og.html"), 1200, 630, pub("og-1200x630.png"));
  await shot(src("banner-x.html"), 1500, 500, pub("banner-x-1500x500.png"));
  await shot(src("banner-linkedin.html"), 1128, 191, pub("banner-linkedin-1128x191.png"));

  // business cards: 300 dpi PNG (with bleed) + print-ready PDF per side/theme
  const who = process.env.NAME
    ? `&name=${encodeURIComponent(process.env.NAME)}${process.env.ROLE ? `&role=${encodeURIComponent(process.env.ROLE)}` : ""}`
    : "";
  const tag = process.env.NAME ? "-personal" : "";
  for (const theme of ["dark", "light"]) {
    for (const side of ["front", "back"]) {
      const q = `?side=${side}&theme=${theme}${side === "back" ? who : ""}`;
      const base = `card-${theme}-${side}${side === "back" ? tag : ""}`;
      await shot(src("card.html", q + "&png=1"), 1134, 661, card(`${base}.png`));
      await page.goto(src("card.html", q));
      await page.evaluate(() => document.fonts.ready);
      await page.waitForTimeout(400);
      await page.pdf({ path: card(`${base}.pdf`), width: "96mm", height: "56mm", printBackground: true, pageRanges: "1" });
    }
  }
  return "done";
}
