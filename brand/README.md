# Brand source and print files

`src/` holds the HTML that the social images and business cards are drawn from,
so they can be regenerated rather than hand-edited. `render.mjs` writes:

| Output | Where | Notes |
|---|---|---|
| `og-1200x630.png`, `banner-x-1500x500.png`, `banner-linkedin-1128x191.png` | `public/brand/` | Live on the site and used for link previews. |
| `card-{dark,light}-{front,back}.pdf` | `business-cards/` | **Send these to the printer.** 96 x 56 mm = 90 x 50 mm trim plus 3 mm bleed, fonts and QR code embedded. |
| `card-{dark,light}-{front,back}.png` | `business-cards/` | 300 dpi previews of the same artwork (with bleed). |

Keep text 5 mm inside the trim line, which the template already does. If the
printer asks for crop marks, they add them from the bleed size.

## Change the wording or the contact details

Edit `src/og.html`, `src/banner-*.html` or `src/card.html` (the contact rows are
in `card.html`), then render again:

```
node <path to>/browser.mjs "file://$PWD/src/og.html" --script ./render.mjs
```

Personal cards (name and job title on the back): run the same command with
`NAME="Full Name" ROLE="Founder"` in front. The files come out as
`card-*-back-personal.*`.

The QR code is `src/qr-wrathlabs-in.svg`, pointing at https://wrathlabs.in.
