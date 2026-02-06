import Image from "next/image";
import Link from "next/link";

export default function ProcessPage() {
  return (
    <main className="min-h-screen bg-nexaio-navy text-nexaio-offwhite">
      {/* White top bar */}
      <header className="border-b border-black/10 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          {/* CHANGED: logo + text now link home */}
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
          backgroundImage: "url(/hero-bg-process.svg)",
          backgroundSize: "cover",
          backgroundPosition: "center top",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-nexaio-navy/60" />

        <div className="relative mx-auto max-w-7xl px-6 py-16 sm:py-20">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-xs font-semibold tracking-[0.18em] text-nexaio-offwhite/55">
              PROCESS
            </p>

            <h1 className="mt-4 text-4xl font-semibold leading-tight sm:text-6xl">
              Clear steps. Clean handoffs. Systems you can actually rely on.
            </h1>

            <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-nexaio-offwhite/75 sm:text-xl">
              Most automation fails because it’s built like a demo: no edge
              cases, no ownership, no monitoring. We build like it matters—so
              the system holds up when life gets busy.
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-lg bg-nexaio-offwhite px-7 py-3 text-sm font-medium text-nexaio-navy"
              >
                Book a Systems Review
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center rounded-lg border border-white/20 px-7 py-3 text-sm font-medium text-nexaio-offwhite/80 hover:text-nexaio-offwhite"
              >
                See Services
              </Link>
            </div>

            <div className="mx-auto mt-10 max-w-3xl rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-sm text-nexaio-offwhite/70 backdrop-blur-sm">
              We build systems like infrastructure: designed on purpose, tested,
              monitored, and owned.
            </div>
          </div>
        </div>
      </section>

      {/* SOFT GREY BAND (modern contrast without "too much white") */}
      <section
        className="relative"
        style={{
          backgroundImage: "url(/hero-bg-light.svg)",
          backgroundSize: "cover",
          backgroundPosition: "center top",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Grey wash + subtle depth */}
        <div className="absolute inset-0 bg-[#AAB0B4]/30" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-white/10 to-white/0" />

        <div className="relative mx-auto max-w-7xl px-6 py-16 text-nexaio-navy">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold tracking-[0.18em] text-nexaio-navy/65">
              THE BUILD PROCESS
            </p>
            <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
              Four phases. No chaos.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-nexaio-navy/70 sm:text-xl">
              You always know what’s happening, what’s next, and what success
              looks like.
            </p>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {[
              {
                step: "01",
                title: "Audit & Architecture",
                body: "We map the outcome, the workflow, the data, and the edge cases. Then we design the system so it’s reliable—not impressive.",
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
            ].map((item) => (
              <div
                key={item.step}
                className="rounded-3xl border border-black/10 bg-white/70 p-8 backdrop-blur-sm"
              >
                <p className="text-xs font-semibold tracking-[0.18em] text-nexaio-navy/60">
                  STEP {item.step}
                </p>

                <h3 className="mt-3 text-2xl font-semibold">{item.title}</h3>
                <p className="mt-4 text-base leading-relaxed text-nexaio-navy/70">
                  {item.body}
                </p>

                <ul className="mt-6 space-y-2 text-sm text-nexaio-navy/70">
                  {item.bullets.map((b) => (
                    <li key={b}>• {b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Reassurance strip (grey band, not white) */}
          <div className="mx-auto mt-12 max-w-5xl rounded-3xl border border-black/10 bg-white/60 px-8 py-7 backdrop-blur-sm">
            <div className="grid gap-6 lg:grid-cols-3">
              <div>
                <p className="text-sm font-semibold">Built for reality</p>
                <p className="mt-2 text-sm leading-relaxed text-nexaio-navy/70">
                  Edge cases, messy data, weird replies, and failure states are
                  part of the design.
                </p>
              </div>
              <div>
                <p className="text-sm font-semibold">Owned, not abandoned</p>
                <p className="mt-2 text-sm leading-relaxed text-nexaio-navy/70">
                  Systems need monitoring and tuning. We don’t ship and vanish.
                </p>
              </div>
              <div>
                <p className="text-sm font-semibold">Clean handoffs</p>
                <p className="mt-2 text-sm leading-relaxed text-nexaio-navy/70">
                  Clear rules, documentation, and predictable operations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DARK BOTTOM BAND (graphic) */}
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
                Book a Systems Review.
              </h2>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-nexaio-offwhite/75">
                We’ll map what you have, identify the bottleneck, and give you a
                concrete plan for what to build to make pipeline consistent.
              </p>

              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-lg bg-nexaio-offwhite px-7 py-3 text-sm font-medium text-nexaio-navy"
                >
                  Book a Systems Review
                </Link>
                <Link
                  href="/services"
                  className="inline-flex items-center justify-center rounded-lg border border-white/20 px-7 py-3 text-sm font-medium text-nexaio-offwhite/80 hover:text-nexaio-offwhite"
                >
                  View Services
                </Link>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
              <p className="text-sm font-semibold text-nexaio-offwhite">
                You’ll leave with:
              </p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2 text-sm text-nexaio-offwhite/75">
                <div className="rounded-2xl border border-white/10 bg-black/10 p-4">
                  Clear targeting + rules
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/10 p-4">
                  Messaging angles that fit
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/10 p-4">
                  A build plan + timeline
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/10 p-4">
                  Next best step (honest)
                </div>
              </div>

              <div className="mt-8 rounded-2xl border border-white/10 bg-black/10 p-5 text-sm text-nexaio-offwhite/70">
                No long meetings. No vague “strategy.” Just a plan you can
                execute.
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
