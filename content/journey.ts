/**
 * "Watch one enquiry" (V2.2 packet §2): one sample enquiry carried by the
 * Nexaio Core through six stations. Every station is something the approved
 * capability material marks as supported now: acknowledge, route to an owner,
 * follow up, stop on a reply, hand off with the history, report.
 *
 * It is a sample, labelled as one, never a live customer or account. Each
 * station is a small abstract chip, not a product screen.
 * Keep this file free of imports.
 */

export type CoreState = "idle" | "listening" | "working" | "handoff";

export const journey = {
  id: "journey",
  eyebrow: "Watch one enquiry",
  title: "Watch one enquiry.",
  sampleTag: "Sample enquiry",
  sample: "Hail damage · website form · 07:12",
  stations: [
    {
      id: "acknowledged",
      step: "Acknowledged",
      chip: "Acknowledged in your wording",
      line: "A reply goes out in the wording you approved.",
      core: "listening" as CoreState,
    },
    {
      id: "owner",
      step: "Owner assigned",
      chip: "Owner: Dana",
      line: "Your routing rules give it one owner.",
      core: "working" as CoreState,
    },
    {
      id: "follow-up",
      step: "Follow-up",
      chip: "Follow-up sent · day 3",
      line: "No reply yet, so your follow-up goes out.",
      core: "working" as CoreState,
    },
    {
      id: "reply",
      step: "Customer replied",
      chip: "Follow-up stopped",
      line: "The customer answers. The sequence stops.",
      core: "listening" as CoreState,
    },
    {
      id: "handoff",
      step: "Handed off",
      chip: "Handed to Dana with the history",
      line: "Pricing needs a person, so Dana gets the thread.",
      core: "handoff" as CoreState,
    },
    {
      id: "report",
      step: "Reported",
      chip: "In this month's report",
      line: "It shows up in the monthly report, verified.",
      core: "idle" as CoreState,
    },
  ],
};
