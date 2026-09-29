// Mechanical checks for the rules in content/README.md: claims, the demo video
// gate, the unverified phone number, canonicals and the sitemap.
//
// Run: node --import ./scripts/register-ts.mjs scripts/check-content.mjs
// Needs Node 22.18+ or 23.6+ (built-in TypeScript type stripping), no packages.

import { spawnSync } from "node:child_process";
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const rel = (p) => relative(root, p).split(sep).join("/");

const { site, contact, pages, nav } = await import("../content/site.ts");
const { demoVideo } = await import("../content/demo.ts");
const { demoCta, bookCta } = await import("../lib/cta.ts");
const { homeJsonLd, demoVideoJsonLd, pageMetadata } = await import("../lib/seo.ts");

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
  return text.replace(/\/\*[\s\S]*?\*\//g, "").replace(/(^|[^:])\/\/.*$/gm, "$1");
}

// Public copy: content, pages and components. The privacy policy (legal text)
// and the story narrative are older, separately approved copy.
const publicFiles = [
  ...walk(join(root, "content"), [".ts"]),
  ...walk(join(root, "components"), [".tsx"]),
  ...walk(join(root, "app"), [".tsx", ".ts"]),
].filter((p) => !/app[\\/](privacy|story)[\\/]/.test(p));

const sources = new Map(publicFiles.map((p) => [p, stripComments(readFileSync(p, "utf8"))]));

// 1. Claims and jargon that must not appear in public copy.
const banned = [
  [/24\s*\/\s*7|around the clock|round-the-clock/i, "round-the-clock coverage"],
  [/\binstant(ly)?\s+(response|reply|replies|answer)/i, "instant-response promise"],
  [/\bguarantee(d|s)?\b/i, "guarantee language"],
  [/\bROI\b/, "ROI claims"],
  [/\bn8n\b|\bwebhooks?\b|\bAPIs?\b|\bZapier\b/, "integration jargon"],
  [/revolutioni[sz]e|AI-powered|\bsupercharge/i, "generic hype"],
  [/free trial|start (your|a) trial|\bstart now\b|sign up free/i, "trial or self-serve language"],
  [/testimonial|case stud(y|ies)|\b\d(\.\d)?\s*stars?\b|five-star/i, "unapproved social proof"],
  [/\b\d+(\.\d+)?\s*%\s*(more|increase|higher|faster|fewer)/i, "performance statistics"],
];
for (const [pattern, label] of banned) {
  const hits = [...sources].filter(([, text]) => pattern.test(text)).map(([p]) => rel(p));
  check(hits.length === 0, `no ${label} in public copy`, hits.join(", "));
}

// 2. Demo video gate.
if (demoVideo === null) {
  check(demoCta.label === "See the demo", 'demo CTA says "See the demo" while no video is published');
  check(demoVideoJsonLd(demoVideo) === null, "no VideoObject while no video is published");
  const watch = [...sources]
    .filter(([p, text]) => /Watch the demo/.test(text) && !p.endsWith(join("lib", "cta.ts")))
    .map(([p]) => rel(p));
  check(watch.length === 0, '"Watch the demo" is not hard-coded anywhere', watch.join(", "));
  const players = [...sources].filter(([p, t]) => /<video\b/.test(t) && !p.endsWith("DemoMedia.tsx"));
  check(players.length === 0, "no <video> player outside the gated DemoMedia component");
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

// 3. The phone number is not promoted while its routing is unverified.
if (!contact.phone.routingVerified) {
  const org = homeJsonLd()["@graph"].find((n) => n["@type"] === "Organization");
  check(!("telephone" in org), "Organization structured data has no phone number");
  const promoted = ["components/Header.tsx", "components/MobileCtaBar.tsx"].filter((p) =>
    /tel:/.test(readFileSync(join(root, p), "utf8")),
  );
  check(promoted.length === 0, "no call button in the header or mobile action bar", promoted.join(", "));
  check(nav.every((l) => !l.href.startsWith("tel:")), "no phone link in the main navigation");
  check(contact.responseExpectation === null || typeof contact.responseExpectation === "string", "response expectation is explicit");
}

// 4. Structured data holds only verified identity facts.
const org = homeJsonLd()["@graph"].find((n) => n["@type"] === "Organization");
const forbiddenKeys = ["sameAs", "address", "aggregateRating", "review", "alternateName", "foundingDate"];
check(forbiddenKeys.every((k) => !(k in org)), "Organization has no social profiles, address, ratings or alternate names");
check(org.url === "https://nexaio.co" && org.name === "Nexaio", "Organization name and URL are Nexaio / https://nexaio.co");
check(existsSync(join(root, "app", "icon.png")), "Organization logo file exists (app/icon.png)");

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

// 6. Every page declares its own canonical, and the sitemap matches the routes.
const pageFiles = walk(join(root, "app"), ["page.tsx"]);
for (const file of pageFiles) {
  const route = "/" + rel(dirname(file)).replace(/^app\/?/, "");
  const text = readFileSync(file, "utf8");
  const path = text.match(/pageMetadata\(\{[\s\S]*?path:\s*"([^"]+)"/)?.[1];
  check(path === (route === "/" ? "/" : route.replace(/\/$/, "")), `${rel(file)} sets canonical ${route}`, `found ${path}`);
  const title = text.match(/pageMetadata\(\{[\s\S]*?title:\s*(?:"([^"]+)"|`([^`]+)`)/);
  const description = text.match(/description:\s*\n?\s*"([^"]+)"/)?.[1];
  if (description) {
    check(description.length <= 170, `${rel(file)} description is at most 170 characters (${description.length})`);
  }
  check(Boolean(title), `${rel(file)} has a page title`);
}
for (const p of pages) {
  const file = p.path === "/" ? join(root, "app", "page.tsx") : join(root, "app", p.path.slice(1), "page.tsx");
  check(existsSync(file), `sitemap page ${p.path} exists`);
  check(!Number.isNaN(Date.parse(p.updated)), `sitemap page ${p.path} has a valid date`);
}
const routed = pageFiles.map((f) => "/" + rel(dirname(f)).replace(/^app\/?/, ""));
const unlisted = routed.filter((r) => !pages.some((p) => p.path === (r === "/" ? "/" : r)));
check(unlisted.length === 0, "every page is listed in the sitemap", unlisted.join(", "));

// 6b. Page metadata always carries the share image (nested openGraph objects replace the root one).
const sample = pageMetadata({ title: "t", description: "d", path: "/x" });
check(sample.openGraph?.images?.[0]?.url === "/opengraph-image", "page metadata includes the Open Graph share image");
check(sample.twitter?.images?.[0]?.url === "/twitter-image", "page metadata includes the Twitter share image");
check(sample.alternates?.canonical === "/x" && sample.openGraph?.url === "/x", "canonical and og:url come from the same path");

// 7. Sample-data labelling on product illustrations (visible tag and screen-reader label).
const frame = stripComments(readFileSync(join(root, "components", "ProductViews.tsx"), "utf8"));
check(frame.includes('className="pf-tag">Illustration · sample data<'), 'product views show a visible "Illustration · sample data" tag');
check(frame.includes("aria-label={`Illustration with sample data: "), "product views tell screen readers they are illustrations with sample data");

// 8. Only production builds are indexable (VERCEL_ENV unset = local production build).
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
const probe = spawnSync(
  process.execPath,
  ["--disable-warning=MODULE_TYPELESS_PACKAGE_JSON", "--import", "./scripts/register-ts.mjs", "--input-type=module", "-e", 'const m = await import("./lib/seo.ts"); console.log(String(m.isIndexable));'],
  { cwd: root, env: { ...process.env, VERCEL_ENV: "preview" }, encoding: "utf8" },
);
check(probe.stdout.trim() === "false", "VERCEL_ENV=preview builds are not indexable", probe.stderr.trim().split("\n").pop());
const prodProbe = spawnSync(
  process.execPath,
  ["--disable-warning=MODULE_TYPELESS_PACKAGE_JSON", "--import", "./scripts/register-ts.mjs", "--input-type=module", "-e", 'const m = await import("./lib/seo.ts"); console.log(String(m.isIndexable));'],
  { cwd: root, env: { ...process.env, VERCEL_ENV: "production" }, encoding: "utf8" },
);
check(prodProbe.stdout.trim() === "true", "VERCEL_ENV=production builds are indexable");

console.log(`\n${passes} passed, ${failures.length} failed`);
if (failures.length > 0) process.exit(1);
