import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Operational automation across your entire stack — CRM and pipeline automation, integrations and workflows, and AI-assisted operations.",
};

const BOOK = "https://calendar.app.google/kNiFGpgUmyJUtZat5";

const services = [
  {
    title: "CRM & Pipeline Automation",
    body: "Keep pipelines clean and predictable across the team.",
    bullets: [
      "Stage movement rules + validation",
      "Auto task creation + reminders",
      "Owner assignment + routing",
      "Audit trail + exceptions handling",
    ],
  },
  {
    title: "Integrations & Workflows",
    body: "Connect tools with real logic — not brittle one-offs.",
    bullets: [
      "Webhooks + API integrations",
      "Multi-step workflows (n8n)",
      "Data transforms + normalization",
      "Retries, fallbacks, and alerts",
    ],
  },
  {
    title: "AI-Assisted Operations",
    body: "Use AI where it helps — classification, drafting, routing — with guardrails.",
    bullets: [
      "Lead / reply classification",
      "Summaries + structured extraction",
      "Draft generation with templates",
      "Human-in-the-loop approvals",
    ],
  },
];

const tooling = [
  {
    title: "GoHighLevel Builds",
    body: "Pipelines, triggers, automations, conversation routing, calendars, and reporting structures.",
    chips: ["Pipelines + stages", "Triggers + workflows", "Inbound routing", "Calendar flows"],
  },
  {
    title: "n8n Systems",
    body: "Multi-step logic, webhooks, APIs, branching, retries, and data shaping across apps.",
    chips: ["Webhooks", "APIs", "Branching logic", "Retries + alerts"],
  },
  {
    title: "Integrations Layer",
    body: "Email, spreadsheets, CRMs, forms, Stripe, Slack, Notion, Airtable — whatever the workflow requires.",
    chips: ["Data sync", "Normalization", "Source of truth", "Monitoring"],
  },
];

export default function ServicesPage() {
  return (
    <>
      <section className="phero">
        <div className="phero-bg">
          <div className="glow glow-1" />
          <div className="glow glow-2" />
          <div className="grid-lines" />
        </div>
        <div className="wrap">
          <p className="eyebrow">Services</p>
          <h1>Automation across your entire stack.</h1>
          <p className="lede">
            We build operational automation that connects tools, moves data
            cleanly, and keeps workflows reliable. Not &ldquo;random zaps&rdquo;
            — real systems with guardrails, monitoring, and ownership.
          </p>
          <div className="hero-cta">
            <a className="btn btn-primary" href={BOOK} target="_blank" rel="noopener noreferrer">
              <span>Book a Systems Review <i className="arr">→</i></span>
            </a>
            <Link className="btn btn-ghost" href="/process">
              <span>See our process</span>
            </Link>
          </div>
          <div className="note">
            Tool-agnostic. Outcome-driven. Built to survive edge cases and
            change over time.
          </div>
        </div>
      </section>

      <section className="block">
        <div className="wrap">
          <div className="sec-head center reveal">
            <p className="eyebrow">What we do</p>
            <h2>Systems that remove pressure from your team.</h2>
            <p>
              We standardize workflows, eliminate manual steps, and make data
              flow cleanly between tools — so your ops don&apos;t depend on one
              person remembering what to do next.
            </p>
          </div>
          <div className="cards">
            {services.map((s) => (
              <div className="card glow-card reveal" key={s.title}>
                <h4>{s.title}</h4>
                <p>{s.body}</p>
                <ul className="clist">
                  {s.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="block">
        <div className="wrap">
          <div className="sec-head center reveal">
            <p className="eyebrow">Tooling</p>
            <h2>GoHighLevel, n8n, and the rest of your stack.</h2>
            <p>
              We work inside your existing tooling, and we&apos;re comfortable
              when things aren&apos;t &ldquo;plug and play.&rdquo; The goal is a
              system that behaves predictably — even as you scale.
            </p>
          </div>
          <div className="cards">
            {tooling.map((t) => (
              <div className="card glow-card reveal" key={t.title}>
                <h4>{t.title}</h4>
                <p>{t.body}</p>
                <div className="chips">
                  {t.chips.map((c) => (
                    <span className="chip" key={c}>{c}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="block">
        <div className="wrap">
          <div className="cta-wrap reveal">
            <div className="glow-c" />
            <h2>Tell us the bottleneck — we&apos;ll map the system.</h2>
            <p>
              We&apos;ll review what you have, identify failure points, and
              propose a clean plan to make the workflow reliable.
            </p>
            <div className="hero-cta">
              <a className="btn btn-primary" href={BOOK} target="_blank" rel="noopener noreferrer">
                <span>Book a Systems Review <i className="arr">→</i></span>
              </a>
              <Link className="btn btn-ghost" href="/process">
                <span>View the process</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
