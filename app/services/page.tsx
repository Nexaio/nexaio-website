import Image from "next/image";
import Link from "next/link";

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-nexaio-navy text-nexaio-offwhite">
      {/* White top bar */}
      <header className="border-b border-black/10 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/nexaio logo clean.png"
              alt="Nexaio"
              width={32}
              height={32}
              priority
            />
            <span className="text-sm font-semibold tracking-wide text-nexaio-navy">
              Nexaio
            </span>
          </Link>

          <nav className="hidden gap-8 text-sm text-nexaio-navy/70 md:flex">
            <Link href="/" className="hover:text-nexaio-navy">
              Home
            </Link>
            <Link href="/services" className="hover:text-nexaio-navy">
              Services
            </Link>
            <Link href="/process" className="hover:text-nexaio-navy">
              Process
            </Link>
            <Link href="/story" className="hover:text-nexaio-navy">
              Our Story
            </Link>
            <Link href="/contact" className="hover:text-nexaio-navy">
              Contact
            </Link>
          </nav>
        </div>
      </header>

      {/* HERO (dark) */}
      <section
        className="relative"
        style={{
          backgroundImage: "url(/hero-bg.svg)",
          backgroundSize: "cover",
          backgroundPosition: "center top",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-nexaio-navy/60" />

        <div className="relative mx-auto max-w-7xl px-6 py-16 sm:py-20">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-xs font-semibold tracking-[0.18em] text-nexaio-offwhite/55">
              SERVICES
            </p>

            <h1 className="mt-4 text-4xl font-semibold leading-tight sm:text-6xl">
              Automation across your entire stack.
            </h1>

            <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-nexaio-offwhite/75 sm:text-xl">
              We build operational automation that connects tools, moves data
              cleanly, and keeps workflows reliable. Not “random zaps” — real
              systems with guardrails, monitoring, and ownership.
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-lg bg-nexaio-offwhite px-7 py-3 text-sm font-medium text-nexaio-navy"
              >
                Book a Systems Review
              </Link>
              <Link
                href="/process"
                className="inline-flex items-center justify-center rounded-lg border border-white/20 px-7 py-3 text-sm font-medium text-nexaio-offwhite/80 hover:text-nexaio-offwhite"
              >
                See Our Process
              </Link>
            </div>

            <div className="mx-auto mt-10 max-w-4xl rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-sm text-nexaio-offwhite/70 backdrop-blur-sm">
              Tool-agnostic. Outcome-driven. Built to survive edge cases and
              change over time.
            </div>
          </div>
        </div>
      </section>

      {/* WHAT WE DO (light band) */}
      <section
        className="relative"
        style={{
          backgroundImage: "url(/hero-bg-light.svg)",
          backgroundSize: "cover",
          backgroundPosition: "center top",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-[#AAB0B4]/30" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/25 via-white/10 to-white/0" />

        <div className="relative mx-auto max-w-7xl px-6 py-16 text-nexaio-navy">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold tracking-[0.18em] text-nexaio-navy/65">
              WHAT WE DO
            </p>
            <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
              Systems that remove pressure from your team.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-nexaio-navy/70 sm:text-xl">
              We standardize workflows, eliminate manual steps, and make data
              flow cleanly between tools — so your ops don’t depend on one
              person remembering what to do next.
            </p>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {[
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
                body: "Use AI where it helps (classification, drafting, routing) — with guardrails.",
                bullets: [
                  "Lead/reply classification",
                  "Summaries + structured extraction",
                  "Draft generation with templates",
                  "Human-in-the-loop approvals",
                ],
              },
            ].map((s) => (
              <div
                key={s.title}
                className="rounded-3xl border border-black/10 bg-white/70 p-8 backdrop-blur-sm"
              >
                <h3 className="text-xl font-semibold">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-nexaio-navy/70">
                  {s.body}
                </p>
                <ul className="mt-5 space-y-2 text-sm text-nexaio-navy/70">
                  {s.bullets.map((b) => (
                    <li key={b}>• {b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mx-auto mt-12 max-w-5xl rounded-3xl border border-black/10 bg-white/60 px-8 py-7 backdrop-blur-sm">
            <div className="grid gap-6 lg:grid-cols-3">
              <div>
                <p className="text-sm font-semibold">Reliability</p>
                <p className="mt-2 text-sm leading-relaxed text-nexaio-navy/70">
                  Edge cases, missing data, and failures are designed for — not
                  discovered later.
                </p>
              </div>
              <div>
                <p className="text-sm font-semibold">Maintainability</p>
                <p className="mt-2 text-sm leading-relaxed text-nexaio-navy/70">
                  Clear structure and documentation so your team can operate it.
                </p>
              </div>
              <div>
                <p className="text-sm font-semibold">Ownership</p>
                <p className="mt-2 text-sm leading-relaxed text-nexaio-navy/70">
                  Monitoring + tuning so systems don’t quietly rot over time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TOOLING / STACK (dark band) */}
      <section
        className="relative"
        style={{
          backgroundImage: "url(/hero-bg-process.svg)",
          backgroundSize: "cover",
          backgroundPosition: "center top",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-nexaio-navy/70" />

        <div className="relative mx-auto max-w-7xl px-6 py-16">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-xs font-semibold tracking-[0.18em] text-nexaio-offwhite/55">
              TOOLING
            </p>
            <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
              GoHighLevel, n8n, and the rest of your stack.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-nexaio-offwhite/75 sm:text-xl">
              We work inside your existing tooling, and we’re comfortable when
              things aren’t “plug and play.” The goal is a system that behaves
              predictably — even as you scale.
            </p>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {[
              {
                title: "GoHighLevel Builds",
                body: "Pipelines, triggers, automations, conversation routing, calendars, and reporting structures.",
                chips: [
                  "Pipelines + stages",
                  "Triggers + workflows",
                  "Inbound routing",
                  "Calendar flows",
                ],
              },
              {
                title: "n8n Systems",
                body: "Multi-step logic, webhooks, APIs, branching, retries, and data shaping across apps.",
                chips: [
                  "Webhooks",
                  "APIs",
                  "Branching logic",
                  "Retries + alerts",
                ],
              },
              {
                title: "Integrations Layer",
                body: "Email, spreadsheets, CRMs, forms, Stripe, Slack, Notion, Airtable—whatever the workflow requires.",
                chips: [
                  "Data sync",
                  "Normalization",
                  "Source of truth",
                  "Monitoring",
                ],
              },
            ].map((t) => (
              <div
                key={t.title}
                className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm"
              >
                <h3 className="text-xl font-semibold text-nexaio-offwhite">
                  {t.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-nexaio-offwhite/75">
                  {t.body}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {t.chips.map((c) => (
                    <span
                      key={c}
                      className="rounded-full border border-white/10 bg-black/10 px-3 py-1 text-xs text-nexaio-offwhite/70"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-lg bg-nexaio-offwhite px-7 py-3 text-sm font-medium text-nexaio-navy"
            >
              Book a Systems Review
            </Link>
            <Link
              href="/process"
              className="inline-flex items-center justify-center rounded-lg border border-white/20 px-7 py-3 text-sm font-medium text-nexaio-offwhite/80 hover:text-nexaio-offwhite"
            >
              See How We Build
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER CTA (dark footer band) */}
      <section
        className="relative overflow-hidden"
        style={{
          backgroundImage: "url(/hero-bg-process-footer.svg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-nexaio-navy/60" />

        <div className="relative mx-auto max-w-7xl px-6 py-20">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-xs font-semibold tracking-[0.18em] text-nexaio-offwhite/55">
                NEXT STEP
              </p>
              <h2 className="mt-4 text-4xl font-semibold leading-tight">
                Tell us the bottleneck — we’ll map the system.
              </h2>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-nexaio-offwhite/75">
                We’ll review what you have, identify failure points, and propose
                a clean plan to make the workflow reliable.
              </p>

              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-lg bg-nexaio-offwhite px-7 py-3 text-sm font-medium text-nexaio-navy"
                >
                  Book a Systems Review
                </Link>
                <Link
                  href="/process"
                  className="inline-flex items-center justify-center rounded-lg border border-white/20 px-7 py-3 text-sm font-medium text-nexaio-offwhite/80 hover:text-nexaio-offwhite"
                >
                  View the Process
                </Link>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
              <p className="text-sm font-semibold text-nexaio-offwhite">
                Typical outcomes (without hype):
              </p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2 text-sm text-nexaio-offwhite/75">
                <div className="rounded-2xl border border-white/10 bg-black/10 p-4">
                  Fewer dropped handoffs
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/10 p-4">
                  Cleaner routing + ownership
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/10 p-4">
                  Less manual admin work
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/10 p-4">
                  Better visibility + monitoring
                </div>
              </div>

              <div className="mt-8 rounded-2xl border border-white/10 bg-black/10 p-5 text-sm text-nexaio-offwhite/70">
                No vague “strategy.” Just systems you can run.
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-8 text-sm text-nexaio-offwhite/60">
          <span>© {new Date().getFullYear()} Nexaio</span>
          <Link href="/contact" className="hover:text-nexaio-offwhite">
            Contact
          </Link>
        </div>
      </footer>
    </main>
  );
}
