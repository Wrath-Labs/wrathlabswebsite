import { content } from "@/content";

/**
 * The site is a static export (GitHub Pages), so there is no endpoint to POST
 * to. Enquiries and bookings hand off to the visitor's mail client instead,
 * prefilled and addressed to us — the address comes from content/brand.json.
 */
export function openMailDraft(
  subject: string,
  fields: Record<string, string | undefined | null>,
) {
  const body = Object.entries(fields)
    .filter(([, value]) => value && value.trim())
    .map(([label, value]) => `${label}: ${value!.trim()}`)
    .join("\n");

  window.location.href = `mailto:${content.brand.email}?subject=${encodeURIComponent(
    subject,
  )}&body=${encodeURIComponent(body)}`;
}
