# Brand assets

Generated from `src/components/layout/Logo.tsx` — same vector geometry, same
colours, so these match the logo on the live site exactly. Regenerate rather
than hand-edit if the component changes.

| File | Use |
|---|---|
| `mark-{16,32,64,180,192,256,512,1024}.png` | Mark alone, transparent. Favicons, app icons, anywhere with its own background. |
| `icon-void-{180,192,512,1024}.png` | Mark on the near-black brand background, inset 19% so a circular crop won't clip it. **Use these for social avatars** (X, LinkedIn, GitHub, Discord). |
| `icon-white-512.png` | Same, on white — for light-background contexts and print. |
| `lockup-tight-{dark,light}.png` | Mark + wordmark, transparent, cropped to the artwork. The drop-in choice for decks and docs. `dark` = white text (for dark backgrounds), `light` = black text. |
| `lockup-transparent-{dark,light}-2400x700.png` | Same lockup with generous clear space, fixed canvas. |
| `lockup-{void,white}-2400x700.png` | Lockup on a solid brand background, no transparency. Use where transparent PNGs render badly (some email clients, Office). |
| `og-1200x630.png` | Open Graph / Twitter card. Link previews on every platform. |
| `banner-x-1500x500.png` | X / Twitter profile header. |
| `banner-linkedin-1128x191.png` | LinkedIn company page cover. |

## Notes

- The `-dark` / `-light` suffix describes **the background it goes on**, not the
  artwork colour.
- The mark's rounded border sits at 45% opacity, matching the site. On white
  that reads as pale pink and it thins out below ~32px — prefer `icon-white-512`
  or a solid background for small light-background placements.
- These ship inside `public/`, so they're also live at
  `https://wrath-labs.github.io/wrathlabswebsite/brand/<file>`.
