# nexaio.co content

Public copy, sample data, media state and contact destinations live in this
folder, not in page JSX. Pages and components read from here, so one change
updates every place a fact appears. Files here must stay free of imports:
`scripts/check-content.mjs` loads them directly with Node.

| File | What it holds |
| --- | --- |
| `site.ts` | Name, domain, category line, default description, brand mark variant, email, phone (and whether its routing is verified), booking link, industries (live / planned), navigation, footer links, sitemap pages |
| `home.ts` | Homepage copy: hero, the Systems → AI → Team stage, built for home services, closing and getting started |
| `journey.ts` | "Watch one enquiry": the sample enquiry and its six stations |
| `product.ts` | `/product`: the CRM / AI split, the five agent jobs, control, what connects, how it works, questions |
| `roofing.ts` | `/industries/roofing`: hero, the three roofing vignettes, the CRM section, questions |
| `demo.ts` | `/demo`: the five chapters ("what the AI did") and questions; `demoVideo` stays null |
| `company.ts` | `/company`: principles, mission, the facts |
| `contact.ts` | `/contact`: the three-step journey (no form) |
| `samples.ts` | Invented sample data shown inside the recreated product views |
| `media.ts` | The cinematic media slots, the explainer video record and their approval records |

`lib/cta.ts` turns this into the two calls to action; `lib/seo.ts` turns it into
page metadata and structured data.

## Rules for anything published here

Copy must stay inside the current approved Nexaio offer and capability
material in the Brain (offer and pricing guide, delivery capability FAQ,
product architecture, competitive audit guardrails) and the approved website
design direction. In practice:

- The public name is "Nexaio". Never "NXAIO" or "NXAIO OS".
- No revenue, ROI, job, lead-volume or conversion promises, and no
  implementation dates. Operational improvement may be described; financial
  results may not.
- No testimonials, case studies, customer logos, ratings or statistics until
  real, authorised ones exist. No company size, headcount, customer count,
  years in market, founder names, ages or biographies.
- Nothing that implies a customer login, a self-serve trial, phone answering,
  an AI receptionist or round-the-clock coverage.
- Roadmap or unreleased Product work is not described as available.
- Integrations are "confirmed during scoping" unless the capability FAQ lists
  them as supported without conditions. No named CRM integrations.
- Capability truth tags (V2.2): until the G3 capability attestation, copy may
  not say Nexaio schedules or books appointments, answers calls, texts
  customers, or integrates with a named CRM. A plain denial ("doesn't answer
  calls") is fine. Supported now: respond and acknowledge, capture and route,
  follow up (stops on reply), hand off with context, show what needs the team,
  the monthly report, CRM stage mapping.
- Industries are typed `live | planned` in `site.ts`. Only `live` entries get
  a page at `app/industries/<slug>/page.tsx`, a menu item, a footer link, a
  sitemap URL or "supported" wording; a `planned` trade is never named in
  public copy. Going live is one status flip plus one page, after the go-live
  decision. No placeholder verticals.
- No form, data capture, chat bubble, AI concierge or model integration on the
  site until their own V2.2-B blocks ship.
- Copy budgets (words in `<main>`): Home 380, Product 450, Demo 520, Company
  140, Contact 160, Roofing 420.
- No agency or growth-marketing jargon (funnels, lead gen, done-for-you) and no
  technical jargon aimed at buyers (APIs, webhooks, model names).

## Product views and sample data

V2.2 keeps product views off the homepage. On `/product` they appear at most
twice and on `/demo` at most once per chapter, always small, cropped and
labelled "Product detail · sample data" (`ProductDetail` in
`components/Compositions.tsx`).

Product views (`components/ProductViews.tsx`) are recreations of the real
Nexaio product interface: the rail, the workspace bar with the product's own
"Test" marker, and the real panel names and labels. They are filled with
invented data from `samples.ts` and are never a live account, a demo account
or real footage, and copy must not describe them that way.

- Every view tells screen readers it is a "Recreated Nexaio product view with
  sample data", and every page that shows one also shows the visible tag
  "Product view · sample data".
- When the product's labels change, update the recreation to match; do not
  invent panels or features the product does not have.
- Never put a real customer's or prospect's data in `samples.ts`: no real
  names, emails, phone numbers or addresses.

## Cinematic media slots

`media.ts` lists the slots on the roofing, company and home pages. Until an
asset is approved each slot draws a coded composition (dusk, storm or
daylight), which is plainly a graphic and never a player. To drop in footage
or a still: put the file in `public/media/`, set `asset`, and fill in the
approval record. Generated footage may be used only as mood (never a product
screen, a customer, a testimonial, readable branding or an implied real job or
place) and must be flagged `generated: true`. Slot videos are muted, looping
and decorative.

## Contact facts that are deliberately held back

- `contact.phone.routingVerified` is `false`. The number stays where it was
  already published (footer, contact and privacy pages) but is not promoted in
  the header, the mobile action bar or structured data. Flip it only when the
  Outbound inbound-ownership preflight has proven who answers, the hours,
  voicemail and missed-call handling.
- `contact.responseExpectation` is `null`. The old "within 24 hours on
  weekdays" line comes back only when a named responder and backup exist.
- `contact.booking.pageTitle` explains that the Google booking page still says
  "Systems Review Call". Set it to `null` once the schedule is renamed.

## Publishing the explainer video

The explainer (`explainerVideo` in `media.ts`) is the only video on the site.
While it is `null`, or its record is incomplete, nothing renders in its place:
no slot, no placeholder, no notice. A complete record shows it under the
homepage hero and at the top of `/demo` (components/ExplainerVideo.tsx), with
the browser's own controls, captions on by default, the transcript and
VideoObject structured data.

1. Produce it to the storyboard in the V2.2 packet (§5): the Core and signal
   path, sample data only, no stock people, customers, logos or results, and
   no scheduling or booking claims before G3.
2. Put the files in `public/media/`: the MP4 and WebM (1920×1080), a 16:9
   poster, and English captions as WebVTT. Self-hosted files work with the
   current Content-Security-Policy.
3. Fill in every field, including the transcript, the ISO 8601 duration, the
   upload date, `generated`, and the approval block (who approved it, when,
   the review-by date, the rights and licences, who checked the captions).
4. Run `pnpm check:content` and a production build before release.

`demoVideo` in `demo.ts` is the older record that drives the demo button
label; it stays `null`.

## Brand mark

`brand.markVariant` in `site.ts` switches the header and footer lockup
between `"refined"` (the vector N with the Core in its gap,
`components/BrandMark.tsx`) and `"current"` (the canonical PNG). The PNGs,
favicon, app icons and share image never change; the guard pins their bytes.

## Checks

`pnpm check:content` (or `node --import ./scripts/register-ts.mjs
scripts/check-content.mjs`) enforces the mechanical parts of these rules:
banned claims and naming, the capability truth tags, the explainer and media
gates, the phone gate, sample-data labelling, live/planned industries and
routes, the brand mark and canonical logo bytes, no forms or concierge, copy
budgets, redirects, canonicals, titles, breadcrumbs and the sitemap. It needs
no dependencies.

## Changing positioning or claims

New claims, prices, integrations or proof points need founder approval and a
matching entry in the Brain's offer or capability material first. Then change
the copy here and note the source in the pull request.
