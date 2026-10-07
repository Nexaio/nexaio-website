// Mechanical checks for the rules in content/README.md: claims and naming, the
// V2.2 capability truth tags, the explainer video gate, the unverified phone
// number, sample-data labelling, live/planned industries and routes, the brand
// mark and canonical logo files, no forms or AI concierge, copy budgets,
// redirects, canonicals and the sitemap.
//
// Run: node --import ./scripts/register-ts.mjs scripts/check-content.mjs
// Needs Node 22.18+ or 23.6+ (built-in TypeScript type stripping), no packages.

import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const rel = (p) => relative(root, p).split(sep).join("/");
const read = (p) => readFileSync(join(root, p), "utf8");

const siteModule = await import("../content/site.ts");
const { site, contact, pages, nav, industries, industryCatalog, footerNav, brand } = siteModule;
const demoModule = await import("../content/demo.ts");
const { demoVideo, demoChapters } = demoModule;
const mediaModule = await import("../content/media.ts");
const { mediaSlots, explainerVideo, explainerReady } = mediaModule;
const homeModule = await import("../content/home.ts");
const journeyModule = await import("../content/journey.ts");
const pageModules = {
  home: [homeModule, journeyModule],
  product: [await import("../content/product.ts")],
  demo: [demoModule],
  company: [await import("../content/company.ts")],
  contact: [await import("../content/contact.ts")],
  roofing: [await import("../content/roofing.ts")],
};
const { demoCta, bookCta } = await import("../lib/cta.ts");
const { homeJsonLd, demoVideoJsonLd, pageMetadata, breadcrumbJsonLd } = await import("../lib/seo.ts");

const failures = [];
let passes = 0;
function check(ok, label, detail = "") {
  if (ok) {
    passes += 1;
    console.log(`PASS  ${label}`);
  } else {
    failures.push(label);
    console.log(`FAIL  ${label}${detail ? `\n      ${detail}` : ""}`);
  }
}

function walk(dir, exts) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) return walk(p, exts);
    return exts.some((e) => p.endsWith(e)) ? [p] : [];
  });
}

/** Source text with comments removed, so rule reminders in comments don't count as copy. */
function stripComments(text) {
  return text.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\{\/\*[\s\S]*?\*\/\}/g, "").replace(/(^|[^:])\/\/.*$/gm, "$1");
}

// Public copy: content, pages and components. The privacy policy is separately
// approved legal text and is checked only for the phone rules below.
const publicFiles = [
  ...walk(join(root, "content"), [".ts"]),
  ...walk(join(root, "components"), [".tsx"]),
  ...walk(join(root, "app"), [".tsx", ".ts"]),
  join(root, "lib", "cta.ts"),
  join(root, "lib", "seo.ts"),
].filter((p) => !/app[\\/]privacy[\\/]/.test(p));

const sources = new Map(publicFiles.map((p) => [p, stripComments(readFileSync(p, "utf8"))]));
const hitsFor = (pattern) => [...sources].filter(([, text]) => pattern.test(text)).map(([p]) => rel(p));

// 1. Claims, naming and jargon that must not appear in public copy.
const banned = [
  [/24\s*\/\s*7|around the clock|round-the-clock/i, "round-the-clock coverage"],
  [/\binstant(ly)?\s+(response|reply|replies|answer)/i, "instant-response promise"],
  [/\bguarantee(d|s)?\b/i, "guarantee language"],
  [/\bROI\b/, "ROI claims"],
  [/\b(increase|boost|grow|double|triple)\w*\s+(your\s+)?(revenue|sales|profit|bookings)\b/i, "revenue or sales promises"],
  [/\bn8n\b|\bwebhooks?\b|\bAPIs?\b|\bZapier\b|\bLLMs?\b|\bGPT\b/, "integration or model jargon"],
  [/revolutioni[sz]e|AI-powered|\bsupercharge|cutting[- ]edge|game[- ]chang/i, "generic hype"],
  [/free trial|start (your|a) trial|\bstart now\b|sign up free|\bsign up\b/i, "trial or self-serve language"],
  [/testimonial|case stud(y|ies)|\b\d(\.\d)?\s*stars?\b|five-star/i, "unapproved social proof"],
  [/\b\d+(\.\d+)?\s*%\s*(more|increase|higher|faster|fewer|less)/i, "performance statistics"],
  [/NXAIO/i, 'the internal name "NXAIO" (the public name is Nexaio)'],
  [/demonstration workspace|demo (account|workspace)|live demo|real footage/i, "wording that presents recreated views as a live or demo account"],
  [
    /trusted by|used by (hundreds|thousands|leading)|loved by|\b\d[\d,]*\+?\s+(customers|clients|companies|teams|businesses|roofers)\b|leading (companies|brands)|industry[- ]leading|world[- ]class|award[- ]winning|enterprise[- ]grade/i,
    "fabricated scale, adoption or proof",
  ],
  [/\bsince (19|20)\d\d\b|\b\d+\+?\s+years (of experience|in business|in the industry)\b/i, "years in market"],
  [/\b(Boston|Jonas)\b|\bfounder(s)?\b|\b\d{2}[- ]year[- ]old\b/i, "founder names, identity or ages"],
  [/\bagency\b|done[- ]for[- ]you|lead[- ]gen\b|\bfunnels?\b|on autopilot|growth hack|scale your (business|revenue)|\b10x\b/i, "agency jargon"],
  [/never miss (a|another) (call|lead)|missed[- ]call text[- ]?back|AI receptionist|virtual receptionist|answers? every call|picks? up every call/i, "phone-answering claims"],
  [/src=["']https?:/i, "hotlinked media"],
  [/coming soon|not published yet|being prepared|available soon/i, "placeholder wording (nothing stands in for missing media)"],
  [/\bchat ?bot|chat bubble|\bconcierge\b|live chat|(ask|talk to|chat with) (our|the) AI\b/i, "an AI concierge, chat bubble or mock conversation"],
  [
    /\b(ServiceTitan|JobNimbus|AccuLynx|HubSpot|Salesforce|Jobber|Housecall ?Pro|GoHighLevel|HighLevel|Zoho|Pipedrive|Roofr|Podium)\b/i,
    "named CRM integrations (require G3 attestation)",
  ],
];
for (const [pattern, label] of banned) {
  const hits = hitsFor(pattern);
  check(hits.length === 0, `no ${label} in public copy`, hits.join(", "));
}

// 1b. Capability truth tags (V2.2 packet §1). Until the G3 capability
//     attestation, copy may not say Nexaio schedules or books appointments,
//     answers calls or texts customers. A plain denial ("doesn't answer
//     calls") or a visitor's question ("Does Nexaio answer our phones?") is
//     allowed. Sample data (content/samples.ts) is checked where it renders
//     (HTTP check), not here.
const g3Tags = [
  [/\bschedul\w*/gi, "scheduling"],
  [/\bappointments?\b/gi, "appointments"],
  [/\bbook(s|ed|ing)?\s+(an?\s+|the\s+|your\s+)?(appointments?|inspections?|jobs?|visits?|estimates?|calls?)\b/gi, "booking appointments"],
  [/\banswer(s|ed|ing)?\s+(the\s+|your\s+|our\s+|every\s+|incoming\s+|inbound\s+)?(phone\s+)?(calls?|phones?)\b/gi, "answering calls"],
  [/\btext(s|ed|ing)?\s+(the\s+|your\s+|my\s+|our\s+)?(customers?|homeowners?|leads?|clients?|prospects?)\b/gi, "texting customers"],
  [/\bSMS\b|\btext messag\w*/gi, "SMS or text messaging"],
];
const negated = (text, at) => /(n't|\bnot|\bnever|\bno)\s+(\w+\s+){0,2}$/i.test(text.slice(Math.max(0, at - 32), at));
const asQuestion = (text, from) => (text.slice(from).match(/[.?!"]/) ?? [""])[0] === "?";
function claimHits(pattern, entries) {
  const out = [];
  for (const [p, text] of entries) {
    for (const m of text.matchAll(pattern)) {
      if (!negated(text, m.index) && !asQuestion(text, m.index)) out.push(`${rel(p)}: "${m[0]}"`);
    }
  }
  return out;
}
const truthSources = [...sources].filter(([p]) => !p.endsWith(join("content", "samples.ts")));
for (const [pattern, label] of g3Tags) {
  const hits = claimHits(pattern, truthSources);
  check(hits.length === 0, `truth tag: no "${label}" claim before G3`, hits.join(", "));
}
// Mutation probes: the truth-tag rule must catch a claim and spare a denial.
check(claimHits(g3Tags[3][0], [["probe", "Nexaio answers your calls."]]).length === 1, "truth-tag probe: a call-answering claim is caught");
check(claimHits(g3Tags[0][0], [["probe", "It schedules inspections for you."]]).length === 1, "truth-tag probe: a scheduling claim is caught");
check(claimHits(g3Tags[4][0], [["probe", "We text your customers."]]).length === 1, "truth-tag probe: a texting claim is caught");
check(claimHits(g3Tags[3][0], [["probe", "Nexaio doesn't answer phone calls."]]).length === 0, "truth-tag probe: a plain denial is allowed");

// 2. Video gate. The explainer (content/media.ts) is the only video; it renders
//    only for a complete, approved record, and nothing stands in for it.
const players = [...sources].filter(([, t]) => /<video\b/.test(t)).map(([p]) => rel(p));
check(
  players.every((p) => p === "components/ExplainerVideo.tsx" || p === "components/MediaSlot.tsx"),
  "<video> appears only in the explainer and the media slot",
  players.join(", "),
);
const explainerSrc = sources.get(join(root, "components", "ExplainerVideo.tsx")) ?? "";
check(
  /const v = explainerVideo;\s*if \(!explainerReady\(v\)\) return null;/.test(explainerSrc),
  "the explainer renders nothing unless explainerReady() passes",
);
check(
  /asset\?\.kind === "video" \? \(\s*<video[\s\S]*?muted[\s\S]*?aria-hidden="true"/.test(
    sources.get(join(root, "components", "MediaSlot.tsx")) ?? "",
  ),
  "media-slot video renders only for an approved asset, muted and decorative",
);
const playControls = hitsFor(/aria-label="Play|>\s*Play\s*<|play-button|name="play"/i);
check(playControls.length === 0, "no play buttons or fake players anywhere", playControls.join(", "));
check(explainerReady(null) === false, "explainer gate: null renders nothing");
const fullExplainer = {
  title: "Nexaio in 60 seconds",
  description: "How Nexaio's AI agents carry one enquiry.",
  src: "/media/explainer.mp4",
  webmSrc: "/media/explainer.webm",
  poster: "/media/explainer.jpg",
  captionsSrc: "/media/explainer.vtt",
  duration: "PT60S",
  uploadDate: "2026-10-20",
  transcript: ["Every home-service business runs on enquiries."],
  generated: false,
  approval: { approvedBy: "x", approvedOn: "2026-10-20", reviewBy: "2027-01-20", rights: "x", captions: "x" },
};
check(explainerReady(fullExplainer) === true, "explainer gate probe: a complete record passes");
for (const key of ["title", "src", "webmSrc", "poster", "captionsSrc", "duration", "uploadDate"]) {
  check(explainerReady({ ...fullExplainer, [key]: "" }) === false, `explainer gate probe: missing ${key} renders nothing`);
}
for (const key of ["approvedBy", "approvedOn", "reviewBy", "rights", "captions"]) {
  check(
    explainerReady({ ...fullExplainer, approval: { ...fullExplainer.approval, [key]: " " } }) === false,
    `explainer gate probe: missing approval.${key} renders nothing`,
  );
}
check(explainerReady({ ...fullExplainer, transcript: [] }) === false, "explainer gate probe: missing transcript renders nothing");
check(explainerReady({ ...fullExplainer, src: "https://example.com/v.mp4" }) === false, "explainer gate probe: files must be under /media/");
if (explainerReady(explainerVideo)) {
  for (const key of ["src", "webmSrc", "poster", "captionsSrc"]) {
    check(existsSync(join(root, "public", explainerVideo[key])), `explainer: ${key} exists under public/media/`, explainerVideo[key]);
  }
} else {
  check(explainerVideo === null, "explainer: no partial record is published (null until complete)");
}
check(demoVideo === null, "demoVideo stays null: the explainer is the only video");
if (demoVideo === null) {
  check(demoCta.label === "See the demo", 'demo CTA says "See the demo" while no video is published');
  check(demoVideoJsonLd(demoVideo) === null, "no demo VideoObject while no video is published");
  const watch = [...sources]
    .filter(([p, text]) => /Watch the demo/.test(text) && !p.endsWith(join("lib", "cta.ts")))
    .map(([p]) => rel(p));
  check(watch.length === 0, '"Watch the demo" is not hard-coded anywhere', watch.join(", "));
}
check(bookCta.label === "Book a walkthrough" && bookCta.href === "/contact", "booking CTA goes to /contact");

// 2b. Cinematic media slots: an asset needs a complete approval record.
for (const [key, slot] of Object.entries(mediaSlots)) {
  if (slot.asset === null) {
    check(["warm", "cool", "daylight"].includes(slot.fallback), `media slot ${key}: lit-surface fallback while no asset is approved`);
    continue;
  }
  const a = slot.asset;
  check(a.src.startsWith("/media/") && existsSync(join(root, "public", a.src)), `media slot ${key}: file under public/media/`, a.src);
  check(typeof a.generated === "boolean", `media slot ${key}: generated flag recorded`);
  check(Object.values(a.approval).every((x) => typeof x === "string" && x.trim()), `media slot ${key}: approval recorded`);
}

// 3. The phone number is not promoted while its routing is unverified.
if (!contact.phone.routingVerified) {
  const org = homeJsonLd()["@graph"].find((n) => n["@type"] === "Organization");
  check(!("telephone" in org), "Organization structured data has no phone number");
  const allowed = ["components/Footer.tsx", "app/contact/page.tsx", "app/privacy/page.tsx"];
  const telLinks = [
    ...walk(join(root, "components"), [".tsx"]),
    ...walk(join(root, "app"), [".tsx", ".ts"]),
  ]
    .filter((p) => /tel:/.test(readFileSync(p, "utf8")))
    .map(rel);
  check(
    telLinks.every((p) => allowed.includes(p)),
    "phone links only where already published (footer, contact, privacy)",
    telLinks.filter((p) => !allowed.includes(p)).join(", "),
  );
  check(nav.every((l) => !l.href.startsWith("tel:")), "no phone link in the main navigation");
  check(contact.responseExpectation === null || typeof contact.responseExpectation === "string", "response expectation is explicit");
}

// 4. Structured data holds only verified identity facts.
const org = homeJsonLd()["@graph"].find((n) => n["@type"] === "Organization");
const forbiddenKeys = ["sameAs", "address", "aggregateRating", "review", "alternateName", "foundingDate", "founder", "numberOfEmployees"];
check(forbiddenKeys.every((k) => !(k in org)), "Organization has no social profiles, address, ratings, founders or headcount");
check(org.url === "https://nexaio.co" && org.name === "Nexaio", "Organization name and URL are Nexaio / https://nexaio.co");
check(existsSync(join(root, "app", "icon.png")), "Organization logo file exists (app/icon.png)");
const crumbs = breadcrumbJsonLd([{ name: "Roofing", path: "/industries/roofing" }]);
check(
  crumbs.itemListElement[0].item === "https://nexaio.co" &&
    crumbs.itemListElement.at(-1).item === "https://nexaio.co/industries/roofing",
  "breadcrumbs start at the homepage and use absolute URLs",
);

// 5. Destinations.
let booking;
try {
  booking = new URL(contact.booking.url);
} catch {
  booking = null;
}
check(booking?.protocol === "https:" && booking.hostname === "calendar.app.google", "booking link is the existing Google Calendar schedule");
check(site.url === "https://nexaio.co", "canonical host is https://nexaio.co");
check(site.description.length <= 160, `default description is at most 160 characters (${site.description.length})`);

// 6. Every page declares its own canonical and title, the sitemap matches the
//    routes, and breadcrumb trails point at real pages.
const pageFiles = walk(join(root, "app"), ["page.tsx"]);
const routeOf = (file) => {
  const r = "/" + rel(dirname(file)).replace(/^app\/?/, "");
  return r === "/" ? "/" : r.replace(/\/$/, "");
};
const titles = new Map();
const descriptions = new Map();
for (const file of pageFiles) {
  const route = routeOf(file);
  const text = readFileSync(file, "utf8");
  const path = text.match(/pageMetadata\(\{[\s\S]*?path:\s*"([^"]+)"/)?.[1];
  check(path === route, `${rel(file)} sets canonical ${route}`, `found ${path}`);
  const title = text.match(/pageMetadata\(\{[\s\S]*?title:\s*"([^"]+)"/)?.[1];
  const description = text.match(/pageMetadata\(\{[\s\S]*?description:\s*\n?\s*"([^"]+)"/)?.[1];
  check(Boolean(title), `${rel(file)} has a page title`);
  check(Boolean(description) && description.length >= 70 && description.length <= 170, `${rel(file)} description is 70–170 characters (${description?.length})`);
  if (title) titles.set(title, [...(titles.get(title) ?? []), route]);
  if (description) descriptions.set(description, [...(descriptions.get(description) ?? []), route]);
  for (const m of text.matchAll(/breadcrumbJsonLd\(\[[\s\S]*?path:\s*"([^"]+)"[\s\S]*?\]\)/g)) {
    check(m[1] === route, `${rel(file)} breadcrumb ends at its own page`, `found ${m[1]}`);
  }
  if (route !== "/" && !/not-found|error/.test(file)) {
    check(/breadcrumbJsonLd\(/.test(text) || route === "/privacy", `${rel(file)} has breadcrumb structured data`);
  }
}
check([...titles.values()].every((r) => r.length === 1), "page titles are unique", JSON.stringify([...titles].filter(([, r]) => r.length > 1)));
check([...descriptions.values()].every((r) => r.length === 1), "page descriptions are unique");
for (const p of pages) {
  const file = p.path === "/" ? join(root, "app", "page.tsx") : join(root, "app", p.path.slice(1), "page.tsx");
  check(existsSync(file), `sitemap page ${p.path} exists`);
  check(!Number.isNaN(Date.parse(p.updated)), `sitemap page ${p.path} has a valid date`);
}
const routed = pageFiles.map(routeOf);
const unlisted = routed.filter((r) => !pages.some((p) => p.path === r));
check(unlisted.length === 0, "every page is listed in the sitemap", unlisted.join(", "));

// 6b. Page metadata always carries the share image (nested openGraph objects replace the root one).
const sample = pageMetadata({ title: "t", description: "d", path: "/x" });
check(sample.openGraph?.images?.[0]?.url === "/opengraph-image", "page metadata includes the Open Graph share image");
check(sample.twitter?.images?.[0]?.url === "/twitter-image", "page metadata includes the Twitter share image");
check(sample.alternates?.canonical === "/x" && sample.openGraph?.url === "/x", "canonical and og:url come from the same path");

// 6c. Industries, typed live | planned (V2.2 packet §3). Only live industries
//     get pages, navigation, footer links, sitemap URLs or "supported" copy.
const industryPages = walk(join(root, "app", "industries"), ["page.tsx"]).map(routeOf);
function industryViolations(catalog, live, sitemapPaths, routes, linkHrefs, publicText) {
  const v = [];
  for (const i of catalog) {
    if (!["live", "planned"].includes(i.status)) v.push(`${i.slug}: status must be live or planned`);
    if (i.href !== `/industries/${i.slug}`) v.push(`${i.slug}: href must be /industries/${i.slug}`);
  }
  const liveSlugs = catalog.filter((i) => i.status === "live").map((i) => i.slug);
  if (live.map((i) => i.slug).join() !== liveSlugs.join()) v.push("the public list is not exactly the live entries");
  for (const i of catalog.filter((x) => x.status === "live")) {
    if (!routes.includes(i.href)) v.push(`${i.slug}: live but has no page`);
    if (!sitemapPaths.includes(i.href)) v.push(`${i.slug}: live but not in the sitemap`);
  }
  for (const i of catalog.filter((x) => x.status === "planned")) {
    if (routes.includes(i.href)) v.push(`${i.slug}: planned but has a page`);
    if (sitemapPaths.includes(i.href)) v.push(`${i.slug}: planned but in the sitemap`);
    if (linkHrefs.includes(i.href)) v.push(`${i.slug}: planned but linked from navigation`);
    if (publicText.some((t) => t.includes(i.href) || new RegExp(`\\b${i.label}\\b`).test(t))) v.push(`${i.slug}: planned but named in public copy`);
  }
  for (const r of routes) {
    if (!catalog.some((i) => i.href === r && i.status === "live")) v.push(`${r}: industry page without a live entry`);
  }
  return v;
}
const linkHrefs = [...nav.map((n) => n.href), ...footerNav.flatMap((g) => g.links.map((l) => l.href))];
const publicCopy = [...sources].filter(([p]) => !p.endsWith(join("content", "site.ts"))).map(([, t]) => t);
const violations = industryViolations(industryCatalog, industries, pages.map((p) => p.path), industryPages, linkHrefs, publicCopy);
check(violations.length === 0, "industries: only live entries render, link, or enter the sitemap", violations.join("; "));
check(industries.length > 0 && industries.some((i) => i.slug === "roofing"), "Roofing is live");
// Mutation probes: a planned entry that renders, links or enters the sitemap must fail.
const plannedProbe = { slug: "probe-trade", href: "/industries/probe-trade", label: "Probetrade", status: "planned", summary: "" };
const probeCatalog = [...industryCatalog, plannedProbe];
check(industryViolations(probeCatalog, industries, pages.map((p) => p.path), industryPages, linkHrefs, publicCopy).length === 0, "industries probe: a silent planned entry is allowed");
check(industryViolations(probeCatalog, industries, [...pages.map((p) => p.path), plannedProbe.href], industryPages, linkHrefs, publicCopy).length > 0, "industries probe: a planned entry in the sitemap fails");
check(industryViolations(probeCatalog, industries, pages.map((p) => p.path), [...industryPages, plannedProbe.href], linkHrefs, publicCopy).length > 0, "industries probe: a planned entry with a page fails");
check(industryViolations(probeCatalog, industries, pages.map((p) => p.path), industryPages, [...linkHrefs, plannedProbe.href], publicCopy).length > 0, "industries probe: a planned entry in navigation fails");
check(industryViolations(probeCatalog, industries, pages.map((p) => p.path), industryPages, linkHrefs, [...publicCopy, "We serve Probetrade companies."]).length > 0, "industries probe: a planned trade named in copy fails");
check(industryViolations(probeCatalog, probeCatalog, pages.map((p) => p.path), industryPages, linkHrefs, publicCopy).length > 0, "industries probe: publishing the whole catalog fails");
const catalogUsers = [...sources].filter(([p, t]) => /industryCatalog/.test(t) && !p.endsWith(join("content", "site.ts"))).map(([p]) => rel(p));
check(catalogUsers.length === 0, "public code reads the live list, never the catalog", catalogUsers.join(", "));
check(!existsSync(join(root, "app", "industries", "page.tsx")), "no thin /industries index page");
check(nav.map((n) => n.label).join(" · ") === "Product · Industries · Demo · Company", "navigation is Product · Industries · Demo · Company");

// 6d. Redirects for retired and index paths.
const nextConfig = read("next.config.ts");
const redirects = [...nextConfig.matchAll(/\{\s*source:\s*"([^"]+)",\s*destination:\s*"([^"]+)",\s*permanent:\s*(true|false)\s*\}/g)].map(
  (m) => ({ source: m[1], destination: m[2], permanent: m[3] === "true" }),
);
const expected = [
  ["/services", "/product", true],
  ["/process", "/product#how-it-works", true],
  ["/story", "/company", true],
  ["/industries", "/industries/roofing", false],
];
for (const [source, destination, permanent] of expected) {
  const r = redirects.find((x) => x.source === source);
  check(r?.destination === destination && r.permanent === permanent, `redirect ${source} → ${destination} (${permanent ? "permanent" : "temporary"})`);
}
for (const r of redirects) {
  const [path, hash] = r.destination.split("#");
  check(routed.includes(path), `redirect target ${path} is a real page`);
  if (hash) {
    const file = path === "/" ? join(root, "app", "page.tsx") : join(root, "app", path.slice(1), "page.tsx");
    check(existsSync(file) && readFileSync(file, "utf8").includes(`id="${hash}"`), `redirect anchor #${hash} exists on ${path}`);
  }
  check(!routed.includes(r.source), `redirect source ${r.source} has no page of its own`);
}

// 7. Sample-data labelling on recreated product views.
const views = stripComments(read("components/ProductViews.tsx"));
check(views.includes("aria-label={`Recreated Nexaio product view with sample data: ${description}`}"), "product views tell screen readers they are recreations with sample data");
check(views.includes('<span className="pw-test">Test</span>'), 'product views carry the product\'s "Test" workspace marker');
const compositions = stripComments(read("components/Compositions.tsx"));
check(compositions.includes('children = "Product view · sample data"'), 'the visible tag reads "Product view · sample data"');
check(compositions.includes("<ViewTag>Product detail · sample data</ViewTag>"), 'product fragments read "Product detail · sample data"');
for (const file of pageFiles) {
  const text = readFileSync(file, "utf8");
  if (/<ProductWindow/.test(text)) {
    check(/<ViewTag|<ProductDetail/.test(text), `${rel(file)} labels its product views as sample data`);
  }
}
const windowsIn = (file) => (read(file).match(/<ProductWindow\b/g) ?? []).length;
check(windowsIn("app/page.tsx") === 0, "no product window on the homepage (V2.2)");
check(windowsIn("app/product/page.tsx") <= 2, `at most two product fragments on /product (${windowsIn("app/product/page.tsx")})`);
check(
  demoChapters.length === 5 && windowsIn("app/demo/page.tsx") <= demoChapters.length,
  "/demo: five chapters, at most one fragment each",
);
check(windowsIn("app/industries/roofing/page.tsx") === 0, "no product window on /industries/roofing (V2.2)");
const samples = read("content/samples.ts");
check(!/@|https?:\/\/|\+?\d[\d\s().-]{8,}\d/.test(stripComments(samples)), "sample data holds no emails, links or phone numbers");

// 8. Homepage (V2.2 acceptance 1, 2, 4): the category, the claim, the Core;
//    "Watch one enquiry" replaces "What changes"; at most seven sections.
const home = read("app/page.tsx");
const homeSections = (home.match(/<section\b/g) ?? []).length + (home.match(/<Closing\b/g) ?? []).length;
check(homeSections <= 7, `homepage has at most seven sections (${homeSections})`);
const { hero } = homeModule;
const { journey } = journeyModule;
check(/\bAI\b/.test(hero.eyebrow) && /\bagents\b/i.test(hero.eyebrow) && /home-service/i.test(hero.eyebrow), "hero category says AI agents for home-service businesses");
check(hero.title === "Your CRM keeps the record." && hero.titleStrong === "Our AI does the work.", "hero headline is the approved V2.2 line");
check(hero.micro === "Not another CRM.", 'hero micro-line reads "Not another CRM."');
check(/<AiCore\b[^>]*size="hero"/.test(home) && /<SystemsStage\b/.test(home) && /<SignalJourney\b/.test(home), "homepage carries the Core, the stage and the journey");
check(journey.title === "Watch one enquiry." && journey.sampleTag === "Sample enquiry", '"Watch one enquiry" is labelled as a sample');
check(hitsFor(/What changes|work between your systems gets an owner/i).length === 0, '"What changes" is gone', hitsFor(/What changes|work between your systems gets an owner/i).join(", "));
check(hero.secondaryCta.href === `#${journey.id}` && home.includes("id={journey.id}"), '"Watch how it works" goes to the journey');
check(site.category === "AI agents for home-service businesses", "category line is AI agents for home-service businesses");

// 8b. Brand mark (V2.2 packet §4): refined by default, one value to revert,
//     canonical logo files byte-identical.
check(["refined", "current"].includes(brand.markVariant), `brand.markVariant is refined or current (${brand.markVariant})`);
const brandSrc = stripComments(read("components/BrandMark.tsx"));
check(/brand\.markVariant === "current"/.test(brandSrc) && brandSrc.includes('src="/nexaio-logo-light.png"'), "BrandMark reverts to the canonical PNG with one value");
for (const f of ["components/Header.tsx", "components/Footer.tsx"]) {
  const t = stripComments(read(f));
  check(/<BrandMark\b/.test(t) && !/nexaio-logo-light\.png/.test(t), `${f} uses the BrandMark lockup`);
}
const canonicalAssets = {
  "public/nexaio-logo-light.png": "d3cead8736b7d563a5dfdd3310e14fc70346a509bd836474fd155fc81fbe8253",
  "public/nexaio-logo-navy.png": "45f8b70032e172264085cb4b4b311fadbac704e8b0c310e36646da6f3f4a676d",
  "public/nexaio logo clean.png": "b577f3d23ab6e0c121d884b427b7470e8b5c371a66a350c225879492c10951b0",
  "app/icon.png": "ad199c5a65e9a9eb02e5dde1e0a3728a3f5545f570f3c8bf286d7bf352f92845",
  "app/apple-icon.png": "e9cc244cf3df74520258eecc77a43d1c69f179f5311fbce1b63cfb656fa933fc",
  "app/favicon.ico": "f59f567de6b839ad3655bd0cd371cb95b7d28f3fb443562f6e4f6ba8e6f5bb0a",
};
for (const [file, sha] of Object.entries(canonicalAssets)) {
  const actual = existsSync(join(root, file)) ? createHash("sha256").update(readFileSync(join(root, file))).digest("hex") : "missing";
  check(actual === sha, `canonical asset byte-identical: ${file}`, actual);
}

// 8c. No form, no data capture, no AI concierge or model integration (V2.2-A).
const formHits = hitsFor(/<(form|input|textarea|select)\b|type="submit"/i);
check(formHits.length === 0, "no form inputs anywhere (the form is V2.2-B)", formHits.join(", "));
const contactPage = stripComments(read("app/contact/page.tsx"));
check(/href=\{bookingPage\.href\}/.test(contactPage) && /Pick a time/.test(read("content/contact.ts")), '/contact: "Pick a time" opens the existing booking page');
const codeFiles = [...walk(join(root, "app"), [".ts", ".tsx"]), ...walk(join(root, "components"), [".tsx"]), ...walk(join(root, "lib"), [".ts"])];
const apiDirs = existsSync(join(root, "app", "api"));
check(!apiDirs, "no API routes (no receiver, no model endpoint)");
const secretHits = codeFiles.filter((p) => /anthropic|openai|api[_-]?key|sk-ant-|"use server"/i.test(stripComments(readFileSync(p, "utf8")))).map(rel);
check(secretHits.length === 0, "no model integration, API keys or server actions", secretHits.join(", "));
const envHits = codeFiles
  .filter((p) => /process\.env\.(?!VERCEL_ENV\b)/.test(stripComments(readFileSync(p, "utf8"))))
  .map(rel);
check(envHits.length === 0, "no environment variables beyond VERCEL_ENV", envHits.join(", "));
const fetchHits = codeFiles.filter((p) => /\bfetch\(|XMLHttpRequest|sendBeacon/.test(stripComments(readFileSync(p, "utf8")))).map(rel);
check(fetchHits.length === 0, "no client or server data calls", fetchHits.join(", "));

// 8d. Copy budgets (V2.2 acceptance 6), measured on each page's content
//     module. The HTTP check measures the rendered <main> as well.
const skipKeys = new Set(["a", "id", "href", "slug", "view", "tone", "core", "fragment", "status", "mimeType", "src", "poster", "captionsSrc", "duration", "uploadDate"]);
function words(value, key = "") {
  if (skipKeys.has(key) || value == null) return 0;
  if (typeof value === "string") return value.split(/\s+/).filter((w) => /[A-Za-z0-9]/.test(w)).length;
  if (Array.isArray(value)) return value.reduce((n, v) => n + words(v), 0);
  if (typeof value === "object") return Object.entries(value).reduce((n, [k, v]) => n + words(v, k), 0);
  return 0;
}
const budgets = { home: 380, product: 450, demo: 520, company: 140, contact: 160, roofing: 420 };
for (const [page, mods] of Object.entries(pageModules)) {
  const n = mods.reduce((sum, m) => sum + Object.entries(m).reduce((t, [k, v]) => t + (typeof v === "function" ? 0 : words(v, k)), 0), 0);
  check(n <= budgets[page], `copy budget ${page}: ${n} ≤ ${budgets[page]} words (content)`);
}

// 9. Only production builds are indexable (VERCEL_ENV unset = local production build).
const indexableWith = (env) => {
  const r = spawnSync(
    process.execPath,
    ["--disable-warning=MODULE_TYPELESS_PACKAGE_JSON", "--import", "./scripts/register-ts.mjs", "--input-type=module", "-e", 'const m = await import("./lib/seo.ts"); console.log(String(m.isIndexable));'],
    { cwd: root, env, encoding: "utf8" },
  );
  return r.stdout.trim();
};
const baseEnv = { ...process.env };
delete baseEnv.VERCEL_ENV;
check(indexableWith(baseEnv) === "true", "a local production build (no VERCEL_ENV) is indexable");
check(indexableWith({ ...baseEnv, VERCEL_ENV: "preview" }) === "false", "VERCEL_ENV=preview builds are not indexable");
check(indexableWith({ ...baseEnv, VERCEL_ENV: "production" }) === "true", "VERCEL_ENV=production builds are indexable");

console.log(`\n${passes} passed, ${failures.length} failed`);
if (failures.length > 0) process.exit(1);
