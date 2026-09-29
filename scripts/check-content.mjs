// Mechanical checks for the rules in content/README.md: claims and naming, the
// demo video gate, the unverified phone number, sample-data labelling,
// industries and routes, redirects, canonicals and the sitemap.
//
// Run: node --import ./scripts/register-ts.mjs scripts/check-content.mjs
// Needs Node 22.18+ or 23.6+ (built-in TypeScript type stripping), no packages.

import { spawnSync } from "node:child_process";
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const rel = (p) => relative(root, p).split(sep).join("/");
const read = (p) => readFileSync(join(root, p), "utf8");

const { site, contact, pages, nav, industries } = await import("../content/site.ts");
const { demoVideo } = await import("../content/demo.ts");
const { mediaSlots } = await import("../content/media.ts");
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
];
for (const [pattern, label] of banned) {
  const hits = hitsFor(pattern);
  check(hits.length === 0, `no ${label} in public copy`, hits.join(", "));
}

// 2. Demo video gate.
const players = [...sources].filter(([, t]) => /<video\b/.test(t)).map(([p]) => rel(p));
check(
  players.every((p) => p === "app/demo/page.tsx" || p === "components/MediaSlot.tsx"),
  "<video> appears only on /demo and in the media slot",
  players.join(", "),
);
check(
  /demoVideo \? \(\s*<video/.test(sources.get(join(root, "app", "demo", "page.tsx")) ?? ""),
  "the /demo player renders only when demoVideo is set",
);
check(
  /asset\?\.kind === "video" \? \(\s*<video[\s\S]*?muted[\s\S]*?aria-hidden="true"/.test(
    sources.get(join(root, "components", "MediaSlot.tsx")) ?? "",
  ),
  "media-slot video renders only for an approved asset, muted and decorative",
);
const playControls = hitsFor(/aria-label="Play|>\s*Play\s*<|play-button|name="play"/i);
check(playControls.length === 0, "no play buttons or fake players anywhere", playControls.join(", "));
if (demoVideo === null) {
  check(demoCta.label === "See the demo", 'demo CTA says "See the demo" while no video is published');
  check(demoVideoJsonLd(demoVideo) === null, "no VideoObject while no video is published");
  const watch = [...sources]
    .filter(([p, text]) => /Watch the demo/.test(text) && !p.endsWith(join("lib", "cta.ts")))
    .map(([p]) => rel(p));
  check(watch.length === 0, '"Watch the demo" is not hard-coded anywhere', watch.join(", "));
} else {
  const v = demoVideo;
  const missing = Object.entries(v).filter(([, value]) => value === "" || value == null).map(([k]) => k);
  check(missing.length === 0, "demo video: every field is filled in", missing.join(", "));
  for (const key of ["src", "poster", "captionsSrc"]) {
    const ok = v[key].startsWith("/media/") && existsSync(join(root, "public", v[key]));
    check(ok, `demo video: ${key} is a file under public/media/`, v[key]);
  }
  check(/^PT(\d+H)?(\d+M)?(\d+S)?$/.test(v.duration) && v.duration !== "PT", "demo video: ISO 8601 duration", v.duration);
  check(!Number.isNaN(Date.parse(v.uploadDate)), "demo video: valid upload date", v.uploadDate);
  check(v.transcript.length > 0 && v.transcript.every(Boolean), "demo video: transcript present");
  check(Object.values(v.approval).every((x) => typeof x === "string" && x.trim()), "demo video: approval recorded");
  check(demoCta.label === "Watch the demo", 'demo CTA says "Watch the demo" once the video is published');
  const ld = demoVideoJsonLd(v);
  check(
    ld && ["name", "description", "thumbnailUrl", "uploadDate", "contentUrl", "duration"].every((k) => ld[k]),
    "VideoObject has name, description, thumbnail, upload date, content URL and duration",
  );
}
check(bookCta.label === "Book a walkthrough" && bookCta.href === "/contact", "booking CTA goes to /contact");

// 2b. Cinematic media slots: an asset needs a complete approval record.
for (const [key, slot] of Object.entries(mediaSlots)) {
  if (slot.asset === null) {
    check(["dusk", "storm", "daylight"].includes(slot.fallback), `media slot ${key}: coded fallback while no asset is approved`);
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

// 6c. Industries: every listed industry has a real page and every industry page is listed.
const industryPages = walk(join(root, "app", "industries"), ["page.tsx"]).map(routeOf);
check(industries.length > 0, "at least one industry is listed");
check(
  industries.every((i) => i.href === `/industries/${i.slug}` && industryPages.includes(i.href)),
  "every listed industry has a page at /industries/<slug>",
  industries.map((i) => i.href).join(", "),
);
check(
  industryPages.every((r) => industries.some((i) => i.href === r)),
  "every industry page is listed in content/site.ts (no unlisted verticals)",
  industryPages.join(", "),
);
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
check(stripComments(read("components/Compositions.tsx")).includes('children = "Product view · sample data"'), 'the visible tag reads "Product view · sample data"');
for (const file of pageFiles) {
  const text = readFileSync(file, "utf8");
  if (/<ProductWindow|<HeroComposition/.test(text)) {
    check(/<ViewTag|<HeroComposition/.test(text), `${rel(file)} labels its product views as sample data`);
  }
}
const samples = read("content/samples.ts");
check(!/@|https?:\/\/|\+?\d[\d\s().-]{8,}\d/.test(stripComments(samples)), "sample data holds no emails, links or phone numbers");

// 8. Homepage stays short: at most seven sections including the closing band.
const home = read("app/page.tsx");
const homeSections = (home.match(/<section\b/g) ?? []).length + (home.match(/<Closing\b/g) ?? []).length;
check(homeSections <= 7, `homepage has at most seven sections (${homeSections})`);

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
