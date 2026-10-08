/**
 * "Watch one enquiry" (V2.3): one sample enquiry, handled by the AI from the
 * website form to the monthly report, with the thread beside the timeline so
 * it is obvious who did what. Every station is something the approved
 * capability material marks as supported now: acknowledge, route to an
 * owner, follow up, stop on a reply, hand off with the history, report.
 *
 * It is a sample, labelled as one, never a live customer or account. The
 * messages are invented, use the approved-wording idea, and promise nothing
 * (no times, no visits, no channels). Keep this file free of imports.
 */

export type CoreState = "idle" | "listening" | "working" | "handoff";
export type Actor = "ai" | "person";
export type Sender = "ai" | "customer";

export const journey = {
  id: "journey",
  eyebrow: "The journey",
  title: "Watch one enquiry.",
  sampleTag: "Sample enquiry",
  sample: "Hail damage · website form · 07:12",
  byAi: "Nexaio AI",
  aiTag: "AI",
  byPerson: "Dana",
  customer: "Customer",
  stations: [
    {
      id: "acknowledged",
      time: "07:12",
      step: "Acknowledged",
      who: "ai" as Actor,
      line: "Sent in your approved wording.",
      core: "listening" as CoreState,
      msg: { from: "ai" as Sender, text: "Thanks, we have your hail damage enquiry. Dana has it and will be in touch." },
    },
    {
      id: "owner",
      time: "07:12",
      step: "Owner set",
      who: "ai" as Actor,
      line: "Your rules give it to Dana.",
      core: "working" as CoreState,
      msg: null,
    },
    {
      id: "follow-up",
      time: "Day 3",
      step: "Follow-up sent",
      who: "ai" as Actor,
      line: "No reply, so the follow-up goes out.",
      core: "working" as CoreState,
      msg: { from: "ai" as Sender, text: "Following up on your hail damage enquiry. Happy to answer any questions." },
    },
    {
      id: "reply",
      time: "Day 3",
      step: "Reply noticed · stopped",
      who: "ai" as Actor,
      line: "The customer answers. The sequence stops.",
      core: "listening" as CoreState,
      msg: { from: "customer" as Sender, text: "Thanks. Before we decide, how does the insurance side work?" },
    },
    {
      id: "handoff",
      time: "Day 3",
      step: "Handed to Dana",
      who: "person" as Actor,
      line: "Insurance needs a person. Dana gets the whole thread.",
      core: "handoff" as CoreState,
      msg: null,
    },
    {
      id: "report",
      time: "Month end",
      step: "Recorded",
      who: "ai" as Actor,
      line: "In this month's report, verified.",
      core: "idle" as CoreState,
      msg: null,
    },
  ],
};
