/**
 * "Watch one enquiry" (V2.3 repair): one sample enquiry, handled by the AI
 * from the website form to the monthly report, as six plain steps. Every
 * step is something the approved capability material marks as supported
 * now: acknowledge, route to an owner, follow up, stop on a reply, hand off
 * with the history, report.
 *
 * It is a sample, labelled as one, never a live customer or account. The
 * steps promise nothing (no times, no visits, no channels).
 * Keep this file free of imports.
 */

export type CoreState = "idle" | "listening" | "working" | "handoff";
export type Actor = "ai" | "person";

export const journey = {
  id: "journey",
  eyebrow: "One enquiry",
  title: "Watch one enquiry.",
  sampleTag: "Sample enquiry",
  sample: "Hail damage · website form · 07:12",
  aiTag: "AI",
  byPerson: "Dana",
  stations: [
    { id: "acknowledged", time: "07:12", step: "Acknowledged", who: "ai" as Actor, line: "Sent in your approved wording.", core: "listening" as CoreState },
    { id: "owner", time: "07:12", step: "Owner set", who: "ai" as Actor, line: "Your rules give it to Dana.", core: "working" as CoreState },
    { id: "follow-up", time: "Day 3", step: "Follow-up sent", who: "ai" as Actor, line: "No reply, so the follow-up goes out.", core: "working" as CoreState },
    { id: "reply", time: "Day 3", step: "Reply noticed · stopped", who: "ai" as Actor, line: "The customer answers. The chase stops.", core: "listening" as CoreState },
    { id: "handoff", time: "Day 3", step: "Handed to Dana", who: "person" as Actor, line: "Insurance needs a person. Dana gets the whole thread.", core: "handoff" as CoreState },
    { id: "report", time: "Month end", step: "Recorded", who: "ai" as Actor, line: "In this month's report, verified.", core: "idle" as CoreState },
  ],
};
