# nexaio.co

The public Nexaio website: Next.js (App Router) with a small typed content
layer, deployed on Vercel.

## Commands

```bash
pnpm install
pnpm dev             # local development
pnpm build           # production build
pnpm lint
pnpm check:content   # claims, demo-video gate, phone gate, canonicals, sitemap (no dependencies)
```

## Where things live

- `content/` — all public copy, contact destinations, navigation and the demo
  video slot. Start with `content/README.md`; it lists the rules published copy
  must follow and the facts that are deliberately held back.
- `lib/cta.ts` — the two primary calls to action (see/watch the demo, book a
  walkthrough).
- `lib/seo.ts` — per-page metadata (canonical, Open Graph, Twitter), whether a
  build is indexable, and structured data.
- `app/robots.ts`, `app/sitemap.ts`, `app/opengraph-image.tsx` — crawl rules,
  sitemap and the generated share image.
- `components/ProductViews.tsx` — the labelled sample-data product
  illustrations.
- `app/globals.css` — the visual system (tokens, layout, components).

## Indexing

Only the Vercel Production deployment is indexable. Preview deployments
(`VERCEL_ENV=preview`) render `noindex` and a disallow-all `robots.txt`.

## Releases

Pushing to `main` deploys to Production on Vercel. Changes go through review
first; publishing is a separate, explicitly authorised step.
