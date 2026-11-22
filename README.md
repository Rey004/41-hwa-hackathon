# Pawpath

**Every pawstep learns something.** Premium e-commerce site for a single all-in-one interactive dog-training mat.

Live: https://41-hwa-hackathon.vercel.app

---

## Tech stack

| Package | Version |
| --- | --- |
| next | 16.4.6 (App Router, Turbopack) |
| react / react-dom | 19.3.1 |
| typescript | 7.0.2 |
| tailwindcss | 4.3.5 |
| framer-motion | 14.14.0 |
| lucide-react | 1.77.0 |
| react-hook-form | 7.92.0 |
| zod | 4.6.7 |
| @hookform/resolvers | 5.x |

Fonts: **Manrope** (headings) and **Inter** (body), loaded via `next/font/google`.

---

## Folder structure

```
pawpath/
├── public/
│   └── images/
│       └── products/              # Local product imagery (swap these for real renders)
│           ├── hero.svg           # Hero / product overview
│           ├── lifestyle.svg      # Lifestyle photography
│           ├── zone-target.svg    # Target zone
│           ├── zone-place.svg     # Place zone
│           ├── zone-wot.svg       # Wot zone
│           ├── zone-pathway.svg   # Pathway zone
│           └── zone-reward.svg    # Reward zone
│
├── src/
│   ├── app/                       # App Router — file-system routing
│   │   ├── layout.tsx             # Root layout: fonts, metadata, Organization JSON-LD
│   │   ├── page.tsx               # Home page — "/" 
│   │   ├── globals.css            # Tailwind v4 @theme tokens, brand palette, keyframes
│   │   ├── favicon.ico
│   │   ├── robots.ts              # robots.txt generator
│   │   ├── sitemap.ts             # sitemap.xml generator
│   │   │
│   │   ├── product/
│   │   │   └── pawpath/
│   │   │       ├── page.tsx       # Product page — "/product/pawpath"
│   │   │       └── layout.tsx     # Route metadata + Product JSON-LD
│   │   │
│   │   ├── checkout/
│   │   │   ├── page.tsx           # Checkout — "/checkout" (client, RHF + Zod)
│   │   │   └── layout.tsx         # Route metadata (noindex)
│   │   │
│   │   ├── order-confirmation/
│   │   │   ├── page.tsx           # Confirmation — "/order-confirmation"
│   │   │   └── copy-reference.tsx # Client: copy-to-clipboard order reference
│   │   │
│   │   └── api/
│   │       └── orders/
│   │           └── route.ts       # POST endpoint — creates an order, returns a unique ref
│   │
│   ├── components/                # Shared React components
│   │   ├── header.tsx             # Sticky nav + cart badge + mobile menu
│   │   ├── footer.tsx             # Editorial forest-green footer
│   │   ├── cart-drawer.tsx        # Slide-out cart drawer (localStorage-backed)
│   │   ├── polished-image.tsx     # Reusable image with graceful placeholder fallback
│   │   ├── zone-showcase.tsx      # Interactive zone selector (product + home)
│   │   ├── zone-diagram.tsx       # Radial five-zone diagram
│   │   └── ui/                    # Design-system primitives
│   │       ├── button.tsx         # Button (variants, sizes, asChild, loading)
│   │       └── card.tsx           # Card, CardHeader, CardTitle, CardContent, CardDescription
│   │
│   └── lib/                       # Data, logic and utilities
│       ├── products.ts            # ⭐ Central product config: pricing, zones, specs, FAQs
│       ├── cart.ts                # Cart store (localStorage + useSyncExternalStore)
│       ├── validations.ts         # Zod checkout schema
│       └── utils.ts               # cn() class-name helper (clsx + tailwind-merge)
│
├── next.config.ts                 # Next.js config (cacheComponents, Turbopack CSS)
├── eslint.config.mjs              # ESLint flat config
├── tsconfig.json                  # TypeScript config (path alias @/* -> src/*)
├── package.json                   # Scripts and dependencies
└── README.md
```

---

## Routes

| Route | Description |
| --- | --- |
| `/` | Hero, brand story, interactive showcase, zone diagram, packaging, learning categories, 4-step method, life stages, specs, FAQs, CTA |
| `/product/pawpath` | Interactive gallery, sticky purchase panel, quantity, zone exploration, benefits, training instructions, materials, specs, FAQs |
| `/checkout` | Validated shipping form, simulated test payment, order summary |
| `/order-confirmation` | Order reference, shipping timeline, guarantee |
| `POST /api/orders` | Creates an order, returns a unique `PAWPATH-*` reference |

---

## Brand palette

Defined as Tailwind v4 theme tokens in `src/app/globals.css`:

| Token | Value | Use |
| --- | --- | --- |
| `forest-green` | `#14532d` | Headings, primary buttons, dark sections |
| `organic-green` | `#22c55e` | Accents, highlights, active states |
| `ivory` | `#fefdf8` | Warm page background |
| `pale-mint` | `#f0fdfa` | Soft panels, secondary surfaces |
| `coral` | `#fb7185` | Sparing accent, price savings |

---

## Getting started

```bash
npm install
npm run dev        # dev server on http://localhost:3000
npm run build      # production build
npm run start      # serve the production build
npm run lint       # ESLint
```

Deploy:

```bash
vercel --prod
```

---

## Commerce notes

- **Cart** — a small external store in `src/lib/cart.ts` persisted to `localStorage` and read through `useSyncExternalStore`, so the cart survives reloads and stays in sync across the header badge, drawer and checkout.
- **Checkout** — React Hook Form with a Zod resolver (`src/lib/validations.ts`). Field-level errors render inline; the submit button has a loading state and the form surfaces a retryable error banner.
- **Payment** — clearly marked **test mode**. No card data is collected, stored or sent; the form posts customer details, line items and totals to `/api/orders`, which simulates payment processing and returns a unique order reference.
- **Orders** — `POST /api/orders` validates the payload, returns `400` for invalid data and `500` on failure. Order references look like `PAWPATH-MWRYZI6OKG09`.

---

## Swapping in real imagery

1. Drop the real renders into `src/public/images/products/` keeping the filenames (`hero`, `lifestyle`, `zone-target`, `zone-place`, `zone-wot`, `zone-pathway`, `zone-reward`) — or update the paths in `src/lib/products.ts`.
2. Everything renders through `src/components/polished-image.tsx`, so each slot swaps in automatically.
3. While an image is missing it falls back to a colour-block placeholder labelled "Image coming soon" rather than breaking the layout.
