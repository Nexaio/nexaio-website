/**
 * The /demo page: walkthrough video slot, chapters and questions.
 *
 * The narrated walkthrough video does not exist yet. While `demoVideo` is
 * null the site:
 *   - shows a labelled placeholder on /demo, never a player or play button;
 *   - labels the demo call to action "See the demo" rather than "Watch the demo";
 *   - emits no VideoObject structured data.
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

export type DemoChapterVisual =
  | "capture"
  | "escalation"
  | "estimate"
  | "handoff"
  | "summary";

export const demoChapters: {
  id: string;
  title: string;
  summary: string;
  points: string[];
  visual: DemoChapterVisual;
}[] = [
  {
    id: "new-inquiry",
    title: "A new inquiry comes in",
    summary:
      "A homeowner fills in the website form about hail damage. Nexaio records it once, with its source and time, sends the acknowledgement you approved and assigns it by your routing rules.",
    points: [
      "One record, whichever source it came from",
      "Acknowledgement uses wording you approved",
      "Assigned to the right person automatically",
    ],
    visual: "capture",
  },
  {
    id: "nobody-picks-it-up",
    title: "Nobody picks it up",
    summary:
      "The crew lead is on a roof and the office is on another call. When nobody claims the inquiry within the time you set, Nexaio escalates it to the backup you chose instead of letting it sit.",
    points: [
      "You set the escalation timing",
      "You choose who the backup is",
      "Every handoff is recorded",
    ],
    visual: "escalation",
  },
  {
    id: "estimate-goes-quiet",
    title: "An estimate goes quiet",
    summary:
      "An estimate went out nine days ago and the homeowner hasn’t replied. Nexaio follows up on the schedule you set and puts it back in front of the salesperson who owns it, so it never sits without a next step.",
    points: [
      "Follow-up timing and wording are yours",
      "Replies stop the sequence and go to your team",
      "Stalled estimates go back to their owner",
    ],
    visual: "estimate",
  },
  {
    id: "needs-a-person",
    title: "The customer needs a person",
    summary:
      "The homeowner replies asking about financing. That’s a conversation for your team, so Nexaio hands it to the sales manager with the whole history attached.",
    points: [
      "Sensitive topics route to people, not automation",
      "Context travels with the handoff",
      "Your team decides what happens next",
    ],
    visual: "handoff",
  },
  {
    id: "owner-view",
    title: "What the owner sees",
    summary:
      "Reporting gives the owner a plain view of the week: what came in, what was handled, what’s waiting on customers and what needs a decision.",
    points: [
      "No digging through three systems",
      "Waiting and overdue work is easy to spot",
      "Decisions that need you are called out",
    ],
    visual: "summary",
  },
];

export const demoFaq = [
  {
    q: "Is this a real customer’s account?",
    a: "No. Every screen on this page, and in the walkthrough, uses a demonstration workspace with sample data. We never show customer or prospect information.",
  },
  {
    q: "Can I try Nexaio myself?",
    a: "There’s no self-serve trial. Book a walkthrough and we’ll show you the product live and talk through how it would fit your setup.",
  },
  {
    q: "Will my setup look exactly like this?",
    a: "Not exactly. Which systems connect, which rules run and what you see are agreed during scoping, based on your tools and how your team works.",
  },
];
