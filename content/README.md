# nexaio.co content

Public copy, contact destinations and media state live in this folder, not in
page JSX. Pages and components read from here, so one change updates every
place a fact appears.

| File | What it holds |
| --- | --- |
| `site.ts` | Name, domain, category line, default description, email, phone (and whether its routing is verified), booking link, navigation, sitemap pages |
| `home.ts` | Homepage sections, FAQ and the shared "works with what you have" lists |
| `demo.ts` | The demo video slot (`demoVideo`), demo steps and demo questions |
| `process.ts` | "How it works" stages, what we need from the customer, after go-live |
| `contact.ts` | Booking page copy and call agenda |

`lib/cta.ts` turns this into the two calls to action; `lib/seo.ts` turns it into
page metadata and structured data.

## Rules for anything published here

Copy must stay inside the current approved Nexaio offer and capability
material in the Brain (offer and pricing guide, delivery capability FAQ,
product architecture, competitive audit guardrails). In practice:

- No revenue, ROI, job, lead-volume or conversion promises, and no
  implementation dates. Operational improvement may be described; financial
  results may not.
- No testimonials, case studies, customer logos, ratings or statistics until
  real, authorised ones exist.
- Nothing that implies a customer login, a self-serve trial, phone answering,
  an AI receptionist or round-the-clock coverage.
- Roadmap or unreleased Product work is not described as available.
- Integrations are "confirmed during scoping" unless the capability FAQ lists
  them as supported without conditions.
- Product views are HTML illustrations labelled "Illustration · sample data".
  Never put a real customer's or prospect's data on the site.
- No technical jargon aimed at buyers (APIs, webhooks, workflow engines, model
  names).

`pnpm check:content` (or `node --import ./scripts/register-ts.mjs
scripts/check-content.mjs`) enforces the mechanical parts of these rules. It
needs no dependencies.

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

The demo page shows a labelled "in production" panel until `demoVideo` in
`demo.ts` is set. Setting it switches the site over in one step: a native
player with captions appears on `/demo`, the transcript is published, the
demo button changes from "See the demo" to "Watch the demo", and VideoObject
structured data is emitted.

1. Record on the demonstration workspace with sample data only. Say and show
   "Nexaio" and "nexaio.co" in the video.
2. Put the files in `public/media/`: the MP4 (or WebM), a 16:9 thumbnail at
   least 1280×720, and English captions as WebVTT. Self-hosted files work with
   the current Content-Security-Policy; a YouTube or Vimeo embed would need a
   reviewed CSP change instead.
3. Fill in every field of `demoVideo`, including the transcript, the ISO 8601
   duration and upload date, and the approval block (who approved it, when,
   the review-by date, and the permissions note).
4. Run `pnpm check:content` and a production build before release.

## Changing positioning or claims

New claims, prices, integrations or proof points need founder approval and a
matching entry in the Brain's offer or capability material first. Then change
the copy here and note the source in the pull request.
