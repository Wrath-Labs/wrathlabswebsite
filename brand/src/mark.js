/* Inlines the Wrath Labs mark (same geometry as src/components/layout/Logo.tsx)
   into every [data-mark] element. data-strength sets the border opacity. */
document.querySelectorAll("[data-mark]").forEach((el, i) => {
  const id = `wlm${i}`;
  const border = el.dataset.strength || "0.45";
  el.innerHTML = `<svg viewBox="0 0 32 32" fill="none" width="100%" height="100%"><defs><linearGradient id="${id}" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse"><stop offset="0%" stop-color="#ff2d55"/><stop offset="100%" stop-color="#ff6b2c"/></linearGradient></defs><rect x="0.75" y="0.75" width="30.5" height="30.5" rx="9" stroke="url(#${id})" stroke-opacity="${border}" stroke-width="1.5"/><path d="M6.5 9.5 11.2 22.5 16 14.2 20.8 22.5 25.5 9.5" stroke="url(#${id})" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/><circle cx="16" cy="9.5" r="1.5" fill="#ff6b2c"/></svg>`;
});
