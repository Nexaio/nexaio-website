/**
 * The /demo page (V2.2 packet §3): one coherent story in five chapters.
 * Each chapter is a short title, one sentence, the "what the AI did" chips
 * and at most one cropped, labelled product fragment. Copy budget: at most
 * 520 words in <main>.
 *
 * Video: the only video on the site is the explainer in content/media.ts
 * (`explainerVideo`). It renders at the top of /demo only once a real,
 * approved asset exists; until then nothing stands in for it: no slot, no
 * "coming soon", no empty box. `demoVideo` below is the older demo-video
 * record that lib/cta.ts reads for the demo button label; it stays null.
 *
 * The chapters are illustrations with sample data, never product screens, a
 * live account, a demo account or real footage.
 * Keep this file free of imports.
 */

export type DemoVideo = {
  /** Shown above the player and used as the VideoObject name. Include "Nexaio". */
  title: string;
  /** One or two sentences; used on the page and as the VideoObject description. */
  description: string;
  /** Self-hosted file under public/media/, e.g. "/media/nexaio-walkthrough.mp4". */
  src: string;
  mimeType: "video/mp4" | "video/webm";
  /** Thumbnail under public/media/ (16:9, at least 1280×720). */
  poster: string;
  /** English captions (WebVTT) under public/media/. */
  captionsSrc: string;
  /** ISO 8601 duration, e.g. "PT3M20S". */
  duration: string;
  /** Date the video was first published on nexaio.co, e.g. "2026-10-15". */
  uploadDate: string;
  /** Full transcript, one paragraph per entry. */
  transcript: string[];
  approval: {
    approvedBy: string;
    approvedOn: string;
    /** Date by which the video must be re-checked against the product. */
    reviewBy: string;
    /** Confirms every screen uses sample data and anyone shown has consented. */
    permissions: string;
  };
};

export const demoVideo: DemoVideo | null = null;

export const demoHero = {
  eyebrow: "Demo",
  title: "One enquiry,",
  titleDim: "start to finish.",
  lede: "Follow one sample enquiry from the website form to the monthly report: what the AI did at each step, and the one moment a person was needed.",
};

type CoreState = "idle" | "listening" | "working" | "handoff";

/**
 * Five chapters of one sample enquiry. Each is an illustration of what the
 * AI did, never a product screen: the product's interface is not final and is
 * not shown anywhere on the site (V2.3).
 */
export const demoChapters: {
  id: string;
  title: string;
  line: string;
  aiDid: string[];
  core: CoreState;
}[] = [
  {
    id: "new-enquiry",
    title: "A new enquiry arrives",
    line: "A homeowner reports hail damage on the website form at 07:12.",
    aiDid: ["Recorded it once", "Acknowledged it in your wording", "Made Dana the owner"],
    core: "listening",
  },
  {
    id: "who-owns-what",
    title: "Everyone sees who owns what",
    line: "Your team sees what the agents are handling and what needs a person.",
    aiDid: ["Showed the owner", "Flagged what needs a person", "Marked each action verified or not"],
    core: "working",
  },
  {
    id: "estimate-goes-quiet",
    title: "An estimate goes quiet",
    line: "The estimate went out last week and the homeowner hasn't replied.",
    aiDid: ["Followed up in your wording", "Stopped when they replied"],
    core: "working",
  },
  {
    id: "needs-a-person",
    title: "The homeowner needs a person",
    line: "They ask how the insurance side would work. That's a conversation for your team.",
    aiDid: ["Handed it to Dana", "Attached the whole history", "Held the follow-up"],
    core: "handoff",
  },
  {
    id: "monthly-report",
    title: "What the owner sees each month",
    line: "The report shows what got done, what was verified and what it doesn't measure.",
    aiDid: ["Counted the work done", "Labelled unconfirmed work", "Made no revenue claims"],
    core: "idle",
  },
];

export const demoFaq = [
  {
    q: "Is this a live account?",
    a: "No. This page illustrates how the AI agents handle one sample enquiry. It isn't a live account or the product's interface, and no customer or prospect information is shown.",
  },
  {
    q: "Why does the example follow a roofing company?",
    a: "Roofing is Nexaio's first industry, so the walkthrough follows a sample roofing company. The AI agents themselves aren't specific to roofing.",
  },
  {
    q: "Can I try Nexaio myself?",
    a: "There's no self-serve trial. Book a walkthrough and we'll show you the product and talk through how it would fit your setup.",
  },
  {
    q: "Will my setup look exactly like this?",
    a: "Not exactly. Which systems connect, which rules run and what your team sees are agreed during scoping, based on your tools and how your team works.",
  },
];

export const demoClosing = {
  title: "See it on your own workflow.",
  body: "A walkthrough is the fastest way to see how the agents would fit your systems and your team.",
};
