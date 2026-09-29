# nexaio.co content

Public copy, sample data, media state and contact destinations live in this
folder, not in page JSX. Pages and components read from here, so one change
updates every place a fact appears. Files here must stay free of imports:
`scripts/check-content.mjs` loads them directly with Node.

| File | What it holds |
| --- | --- |
| `site.ts` | Name, domain, category line, default description, email, phone (and whether its routing is verified), booking link, industries, navigation, footer links, sitemap pages |
| `home.ts` | Homepage copy: hero, the layer, the three product beats, what changes, industries, getting started, closing |
| `product.ts` | `/product`: what stays yours and what Nexaio adds, capabilities, control, what connects, how it works, questions |
| `roofing.ts` | `/industries/roofing`: hero, the three roofing moments, the CRM section, questions |
| `demo.ts` | `/demo`: the video slot (`demoVideo`), the five chapters and questions |
| `company.ts` | `/company`: why Nexaio exists, principles, mission, the facts |
| `contact.ts` | `/contact`: booking copy and the call agenda |
| `samples.ts` | Invented sample data shown inside the recreated product views |
| `media.ts` | The cinematic media slots and their approval records |

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
- Industries: list only industries Nexaio actually serves, each with a real
  page at `app/industries/<slug>/page.tsx`. No placeholder verticals.
- No agency or growth-marketing jargon (funnels, lead gen, done-for-you) and no
  technical jargon aimed at buyers (APIs, webhooks, model names).

## Product views and sample data

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

## Publishing the demo video

`/demo` shows a labelled slot ("Not published yet") until `demoVideo` in
`demo.ts` is set. Setting it switches the site over in one step: a native
player with captions and a transcript appears on `/demo`, the demo button
changes from "See the demo" to "Watch the demo", and VideoObject structured
data is emitted.

1. Record on a Test workspace with sample data only. Say and show "Nexaio" and
   "nexaio.co" in the video.
2. Put the files in `public/media/`: the MP4 (or WebM), a 16:9 thumbnail at
   least 1280×720, and English captions as WebVTT. Self-hosted files work with
   the current Content-Security-Policy; a YouTube or Vimeo embed would need a
   reviewed CSP change instead.
3. Fill in every field of `demoVideo`, including the transcript, the ISO 8601
   duration and upload date, and the approval block (who approved it, when,
   the review-by date, and the permissions note).
4. Run `pnpm check:content` and a production build before release.

## Checks

`pnpm check:content` (or `node --import ./scripts/register-ts.mjs
scripts/check-content.mjs`) enforces the mechanical parts of these rules:
banned claims and naming, the demo-video and media gates, the phone gate,
sample-data labelling, industries and routes, redirects, canonicals, titles,
breadcrumbs and the sitemap. It needs no dependencies.

## Changing positioning or claims

New claims, prices, integrations or proof points need founder approval and a
matching entry in the Brain's offer or capability material first. Then change
the copy here and note the source in the pull request.
