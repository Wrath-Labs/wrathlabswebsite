# Editing this website

Every word, link, price and picture on the site is in this folder. You never
need to open the code to change what the site *says*.

Each file is a plain text file ending in `.json`. Open one in any text editor,
change the words between the `"` quote marks, save, and the site updates.

---

## Which file do I open?

| I want to change… | Open this file |
| --- | --- |
| Company name, tagline, email, phone, address, social links | `brand.json` |
| The top menu, the footer menus, page addresses | `navigation.json` |
| Wording used on several pages (main buttons) | `shared.json` |
| The home page headline, the badge, the dashboard panel | `home.json` |
| The Lab/Studio panels, the technology list, the Follow Along heading, the big closing invitation | `sections.json` |
| The four big numbers (74+, 5, 98%, 19) | `stats.json` |
| The six services, and the Services page | `services.json` |
| The five products, and the Products page | `products.json` |
| The five stages of how you work | `process.json` |
| Client stories, and the Case Studies pages | `case-studies.json` |
| Client quotes | `testimonials.json` |
| Prices, plans, and the Pricing page | `pricing.json` |
| Frequently asked questions | `faq.json` |
| Your story, principles, and the manifesto quote (About page) | `about.json` |
| The Contact page and its form | `contact.json` |
| The Book a Meeting page and its calendar | `booking.json` |
| Privacy Policy and Terms of Service | `legal.json` |
| The "page not found" page | `not-found.json` |
| Google settings, browser tab titles, link previews | `seo.json` |

Not sure? Open the file you think it is and search it for a few words you can
see on the site. Every file also starts with a `_note` explaining what it
covers.

---

## The five rules

1. **Only change what is inside quote marks.** `"title": "Change this bit"` —
   edit the right-hand side, leave the left-hand name alone.
2. **Keep every comma, bracket and quote mark where it is.** They are the
   scaffolding. If you delete one, the site will refuse to build and tell you
   which file and line to look at.
3. **A comma goes between items, never after the last one.** This is the single
   most common mistake.
4. **To use a quote mark inside text, write `\"`** — for example
   `"He said \"no\" twice."` Apostrophes like `don't` are fine as they are.
5. **Anything starting with `_` is a note to you, not website text.** `_note`
   lines never appear on the site. Add your own if you like.

---

## Writing something once and using it everywhere

Anywhere you see `{{double curly brackets}}`, the site is pulling a value in
from somewhere else. For example:

```json
"description": "{{brand.name}} is a product studio and engineering lab."
```

That renders as *"Wrath Labs is a product studio and engineering lab."* Change
the name in `brand.json` once and every one of those sentences updates —
across the footer, the About page, the legal documents, the browser tab title
and the link previews.

**How to read one:** `{{brand.email}}` means *the file `brand.json`, the field
`email`*. Follow the names downwards through the file:
`{{brand.tagline.lineOne}}` is the `lineOne` inside `tagline` inside
`brand.json`.

**Counting starts at zero.** `{{products.items.0.name}}` is the *first* product
in `products.json`, `{{products.items.1.name}}` is the second. This is why the
footer's Lab menu renames itself when you rename a product.

The ones worth knowing:

| Write this | Get this |
| --- | --- |
| `{{brand.name}}` | Wrath Labs |
| `{{brand.email}}` | hello@wrathlabs.in |
| `{{brand.phone}}` | the phone number |
| `{{brand.url}}` | the website address |
| `{{brand.address}}` | Remote-first · London · Bengaluru |
| `{{brand.tagline.full}}` | the full two-line tagline |
| `{{navigation.paths.book}}` | the address of the booking page |
| `{{stats.items.2.value}}` | the client-retention number |

**You can always opt out.** If you'd rather a sentence just said something
fixed, delete the `{{...}}` and type the words in directly. Nothing breaks.

---

## Special words in curly brackets

A few single-brace placeholders get filled in by the site as it runs. Keep them
spelled exactly as they are, or the wording will come out wrong:

| Placeholder | Where | Becomes |
| --- | --- | --- |
| `{year}` | `navigation.json` copyright | the current year |
| `{firstName}` | `contact.json` success message | the visitor's first name |
| `{meeting}` `{duration}` `{date}` `{time}` `{timezone}` | `booking.json` success message | what the visitor picked |
| `{name}` | `products.json` `domainTemplate` | the product name, lower case |
| `%s` | `seo.json` `titleTemplate` | the page's own title |

---

## Switches, icons and colours

**Switches.** Some blocks have `"show": true`. Change it to `false` to hide
that block completely — the availability pill in the top bar, the home page
dashboard panel, the "Next up" tile, the legal disclaimer box, the footer
status line. Write `true` or `false` with no quote marks.

**Icons.** Where a field is called `icon`, use one of these exact names:

```
Activity   Award      Beaker      Boxes        BrainCircuit
CalendarDays          ChartNoAxesCombined      Clock
Cloud      Database   FileText    Globe        Hammer
LockKeyhole           Mail        MapPin       MessagesSquare
Network    Palette    Phone       Radar        Rocket
ShieldCheck           Sparkles    Target       Terminal
Users      Video      Zap
```

An unrecognised name falls back to a sparkle rather than breaking the page. To
add a new icon to this list, someone needs to add one line to
`src/components/ui/Icon.tsx`.

**Social icons.** In `brand.json`, each social channel's `icon` must be one of:
`x`, `github`, `linkedin`, `discord`, `youtube`, `instagram`, `globe`.

**Colours.** Only a few fields take a colour, and each lists its options in its
own `_note`:

- `sections.json` → Lab/Studio panels: `ember` (red) or `volt` (blue)
- `case-studies.json` → cover art: `ember`, `flare`, `volt` or `duotone`
- `products.json` → `status`: `Live` (green), `Beta` (red), `Alpha` (orange),
  `Research` (blue)

---

## Things that are addresses, not text

Two kinds of field change a page's web address, so changing them breaks any
link anyone has already shared:

- `id` — in `services.json` and `products.json`
- `slug` — in `case-studies.json`

They should stay lower case with dashes instead of spaces (`ai-engineering`,
not `AI Engineering`). The visible name is always a separate field next to it,
so you can rename a service freely without touching its `id`.

---

## Adding and removing things

Lists are wrapped in square brackets `[ ... ]`, and each item sits inside curly
brackets `{ ... }`. To add a service, product, question, plan, client story or
social channel, copy an existing item from `{` to `}`, paste it after the last
one with a comma in between, and edit it.

Give a new item **every** field the others have, even if you leave it empty —
a missing field can stop the site building.

To remove something, delete it from its opening `{` to its closing `}`,
including the comma that separated it from its neighbour. Everything that
mentioned it — the footer menu, the contact form dropdown, the grids — updates
on its own.

---

## Seeing your changes

```bash
npm run dev
```

Then open http://localhost:3000. Save a file and the page refreshes on its own.

`npm run build` produces the version that goes live.

**If something is wrong**, the build stops and prints the file, the field and
what to fix — for example:

```
Content error in content/home.json.hero.description:
{{brand.nmae}} doesn't exist. "brand" is a file, so check the part
after it — open content/brand.json and follow the names down.
```

Nothing is broken at that point; fix the file, save, and it carries on. The
live site is untouched until a build succeeds.
