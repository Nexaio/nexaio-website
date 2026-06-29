import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Process",
  description:
    "How Nexaio builds: audit and architecture, build, launch and test, optimize and own. Clear steps, clean handoffs, systems you can rely on.",
};

const BOOK = "https://calendar.app.google/kNiFGpgUmyJUtZat5";

const steps = [
  {
    step: "01",
    title: "Audit & Architecture",
    body: "We map the outcome, the workflow, the data, and the edge cases. Then we design the system so it's reliable — not impressive.",
    bullets: [
      "Define ICP + qualification rules (if outbound)",
      "Map current workflow + bottlenecks",
      "Design the system and handoff points",
      "Confirm tooling + access",
    ],
  },
  {
    step: "02",
    title: "Build",
    body: "We implement the system with clean structure, clear ownership, and predictable behavior.",
    bullets: [
      "Sequences / routing / automations",
      "CRM + pipeline structure (if needed)",
      "Templates, variables, and safeguards",
      "Internal documentation as we build",
    ],
  },
  {
    step: "03",
    title: "Launch & Test",
    body: "We test against real conditions: bad data, weird replies, missing fields, calendar conflicts, and failure states.",
    bullets: [
      "Edge-case testing + fixes",
      "QA on deliverability / tracking",
      "Dry runs end-to-end",
      "Launch with controlled ramp",
    ],
  },
  {
    step: "04",
    title: "Optimize & Own",
    body: "We monitor results, tune targeting and messaging, and keep the system healthy as volume changes.",
    bullets: [
      "Weekly performance review",
      "Iterate messaging + targeting",
      "Maintain inbox + system health",
      "Ongoing improvements + upgrades",
    ],
  },
];

export default function ProcessPage() {
  return (
    <>
      <section className="phero">
        <div className="phero-bg">
          <div className="glow glow-1" />
          <div className="glow glow-2" />
          <div className="grid-lines" />
        </div>
        <div className="wrap">
          <p className="eyebrow">Process</p>
          <h1>Clear steps. Clean handoffs. Systems you can rely on.</h1>
          <p className="lede">
            Most automation fails because it&apos;s built like a demo: no edge
            cases, no ownership, no monitoring. We build like it matters — so the
            system holds up when life gets busy.
          </p>
          <div className="hero-cta">
            <a className="btn btn-primary" href={BOOK} target="_blank" rel="noopener noreferrer">
              <span>Book a Systems Review <i className="arr">→</i></span>
            </a>
            <Link className="btn btn-ghost" href="/services">
              <span>See services</span>
            </Link>
          </div>
          <div className="note">
            We build systems like infrastructure: designed on purpose, tested,
            monitored, and owned.
          </div>
        </div>
      </section>

      <section className="block">
        <div className="wrap">
          <div className="sec-head center reveal">
            <p className="eyebrow">The build process</p>
            <h2>Four phases. No chaos.</h2>
            <p>You always know what&apos;s happening, what&apos;s next, and what success looks like.</p>
          </div>
          <div className="cards two-col">
            {steps.map((s) => (
              <div className="card glow-card reveal" key={s.step}>
                <p className="eyebrow">Step {s.step}</p>
                <h4 style={{ fontSize: 21, marginTop: 12 }}>{s.title}</h4>
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
          <div className="cta-wrap reveal">
            <div className="glow-c" />
            <h2>Book a Systems Review.</h2>
            <p>
              We&apos;ll map what you have, identify the bottleneck, and give you
              a concrete plan for what to build to make pipeline consistent.
            </p>
            <div className="hero-cta">
              <a className="btn btn-primary" href={BOOK} target="_blank" rel="noopener noreferrer">
                <span>Book a Systems Review <i className="arr">→</i></span>
              </a>
              <Link className="btn btn-ghost" href="/services">
                <span>View services</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
