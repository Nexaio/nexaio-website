/**
 * The /demo page: the future video slot, the chapters and questions.
 *
 * The narrated walkthrough video does not exist yet. While `demoVideo` is
 * null the site:
 *   - shows a labelled slot on /demo, never a player or play button;
 *   - labels the demo call to action "See the demo" rather than "Watch the demo";
 *   - emits no VideoObject structured data.
 *
 * Until then the chapters carry the demo: each one is a recreated product view
 * with sample data and a plain explanation. Never describe these screens as a
 * live account, a demo account or real footage.
 *
 * To publish the real video, follow content/README.md ("Publishing the demo
 * video"): put the files in public/media/, fill in every field below, and
 * record who approved it. Keep this file free of imports.
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
  title: "See how Nexaio works,",
  titleDim: "one enquiry at a time.",
  lede: "Follow a single enquiry from the moment it arrives to the monthly report. Every screen is recreated from the Nexaio product and filled with sample data.",
};

export const videoSlot = {
  tag: "Video walkthrough",
  title: "A narrated walkthrough is being prepared.",
  body: "When it's published, it will play here. Until then, the five chapters below walk through the same product.",
};

export type DemoChapterView = "intake" | "dashboard" | "messages" | "handoff" | "report";

export const demoChapters: {
  id: string;
  title: string;
  summary: string;
  points: string[];
  view: DemoChapterView;
}[] = [
  {
    id: "new-enquiry",
    title: "A new enquiry arrives",
    summary:
      "A homeowner fills in the website form about hail damage. Nexaio records it once, checks it against existing leads, sends the acknowledgement you approved and assigns an owner by your rules.",
    points: [
      "One record, whichever source it came from",
      "An unclear match waits for a person",
      "The acknowledgement uses your approved wording",
    ],
    view: "intake",
  },
  {
    id: "who-owns-what",
    title: "Everyone can see who owns what",
    summary:
      "The dashboard shows what Nexaio is doing on its own, what needs your team, what is due today and what changed, with every action marked verified or unconfirmed.",
    points: [
      "Work only a person can do is called out",
      "Late work is easy to spot",
      "Nothing is marked done unless it was confirmed",
    ],
    view: "dashboard",
  },
  {
    id: "estimate-goes-quiet",
    title: "An estimate goes quiet",
    summary:
      "An estimate went out last week and the homeowner hasn't replied. Nexaio follows up on your schedule and wording, and stops when they reply.",
    points: [
      "Timing and wording are yours",
      "A reply stops the sequence",
      "The owner sees where things stand",
    ],
    view: "messages",
  },
  {
    id: "needs-a-person",
    title: "The homeowner needs a person",
    summary:
      "The homeowner asks how the insurance side would work. That's a conversation for your team, so Nexaio hands it to the right person with the history attached.",
    points: [
      "Sensitive topics go to people, not automation",
      "Context travels with the handoff",
      "Your team decides what happens next",
    ],
    view: "handoff",
  },
  {
    id: "monthly-report",
    title: "What the owner sees each month",
    summary:
      "The report shows what Nexaio did, what it could confirm, and what it deliberately does not measure, so every number in it can be checked.",
    points: [
      "Counts of work done, not estimates",
      "Unconfirmed work is labelled",
      "No revenue claims",
    ],
    view: "report",
  },
];

export const demoFaq = [
  {
    q: "Is this a live account?",
    a: "No. Every screen on this page is a recreation of the Nexaio product interface, filled with sample data. It isn't a live account, and no customer or prospect information is shown.",
  },
  {
    q: "Why does the example follow a roofing company?",
    a: "Roofing is Nexaio's first industry, so the walkthrough follows a sample roofing company. The operating layer itself isn't specific to roofing.",
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
  body: "A walkthrough is the fastest way to see how Nexaio would fit your systems and your team.",
};
