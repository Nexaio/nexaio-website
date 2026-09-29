# nexaio.co

The public Nexaio website: Next.js (App Router) with a small typed content
layer, deployed on Vercel.

## Commands

```bash
pnpm install
pnpm dev             # local development
pnpm build           # production build (includes type checking)
pnpm lint
pnpm check:content   # claims, naming, demo-video gate, phone gate, labelling, routes, redirects, sitemap (no dependencies)
```

## Pages

| Route | What it is |
| --- | --- |
| `/` | Homepage: the claim, the product, what changes, industries, the demo and getting started |
| `/product` | The operating layer: capabilities, control, what connects, how it works (`#how-it-works`), questions |
| `/demo` | Five chapters following one enquiry, with a slot for the future narrated video |
| `/industries/roofing` | Nexaio for roofing companies, the first industry |
| `/company` | Why Nexaio exists, how we operate, the facts |
| `/contact` | Book a walkthrough (hands off to the existing Google Calendar booking page) |
| `/privacy` | Privacy Policy |

`/services`, `/process` and `/story` permanently redirect to `/product`,
`/product#how-it-works` and `/company`. `/industries` temporarily redirects to
`/industries/roofing` until there is more than one industry (`next.config.ts`).

## Where things live

- `content/` — all public copy, sample data, media slots, contact destinations,
  navigation and the demo video slot. Start with `content/README.md`; it lists
  the rules published copy must follow and the facts that are deliberately
  held back.
- `components/ProductViews.tsx` — recreations of the Nexaio product interface,
  filled with the sample data in `content/samples.ts`.
- `components/Compositions.tsx`, `components/MotionBeats.tsx`,
  `components/MediaSlot.tsx` — the hero composition, the layer diagram, the
  scroll-linked product beats and the cinematic media slots.
- `components/Motion.tsx` — the motion controller (reveal on scroll, loops that
  pause off-screen, nothing under `prefers-reduced-motion`).
- `lib/cta.ts` — the two primary calls to action (book a walkthrough; see, or
  once a video is published watch, the demo).
- `lib/seo.ts` — per-page metadata (canonical, Open Graph, Twitter), whether a
  build is indexable, and structured data (Organization, WebSite,
  BreadcrumbList, and VideoObject only once a real video exists).
- `app/robots.ts`, `app/sitemap.ts`, `app/opengraph-image.tsx` — crawl rules,
  sitemap and the generated share image.
- `app/globals.css` — the visual system (tokens, layout, product-view styles,
  motion).

## Indexing

Only the Vercel Production deployment is indexable. Preview deployments
(`VERCEL_ENV=preview`) render `noindex` and a disallow-all `robots.txt`.

## Releases

Pushing to `main` deploys to Production on Vercel. Changes go through review
first; publishing is a separate, explicitly authorised step.
