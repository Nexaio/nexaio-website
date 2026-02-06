import Image from "next/image";
import Link from "next/link";

export default function Home() {
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

      {/* HERO */}
      <section
        className="relative"
        style={{
          backgroundImage: "url(/hero-bg.svg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="bg-nexaio-navy/65">
          <div className="mx-auto max-w-7xl px-6 pt-24 pb-44">
            <h1 className="max-w-3xl text-5xl font-semibold leading-tight text-white">
              Operational automation built to scale, not break.
            </h1>

            <p className="mt-6 max-w-2xl text-lg text-white/75">
              Nexaio designs and owns automation systems that keep operations
              clean, reliable, and scalable as businesses grow.
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <a
                href="https://calendar.app.google/kNiFGpgUmyJUtZat5"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-lg bg-white px-6 py-3 text-sm font-medium text-nexaio-navy"
              >
                Book a Systems Review
              </a>

              <Link
                href="/services"
                className="inline-flex items-center justify-center rounded-lg border border-white/25 px-6 py-3 text-sm font-medium text-white/85 hover:text-white"
              >
                See System Examples
              </Link>
            </div>
          </div>
        </div>

        {/* Hero bubble overlaps BOTH sections */}
        <div className="pointer-events-none absolute inset-x-0 -bottom-10 z-30">
          <div className="mx-auto max-w-7xl px-6">
            <div className="pointer-events-auto rounded-2xl border border-white/10 bg-white/10 backdrop-blur-md">
              <div className="grid gap-6 px-6 py-4 text-sm sm:grid-cols-3">
                <div>
                  <div className="text-sm font-semibold text-white">
                    Cleaner intake
                  </div>
                  <div className="mt-1 text-white/70">
                    Less manual routing, fewer dropped handoffs.
                  </div>
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">
                    Faster response
                  </div>
                  <div className="mt-1 text-white/70">
                    Consistent first-touch without founder rewrites.
                  </div>
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">
                    Ongoing ownership
                  </div>
                  <div className="mt-1 text-white/70">
                    Monitoring + maintenance so systems don’t rot.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT WE BUILD */}
      <section
        style={{
          backgroundImage: "url(/hero-bg-light.svg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="bg-nexaio-navy/85">
          <div className="mx-auto max-w-7xl px-6 pt-28 pb-20">
            <h2 className="text-2xl font-semibold">
              End-to-end automation systems, not disconnected workflows.
            </h2>

            <p className="mt-4 max-w-2xl text-nexaio-offwhite/70">
              We build systems that move information cleanly from first contact
              to final outcome, with guardrails that prevent breakdowns as
              volume increases.
            </p>

            <div className="mt-10 grid gap-3 text-sm md:grid-cols-7">
              {[
                "Lead Intake",
                "Data Enrichment",
                "Business Logic",
                "Execution",
                "System of Record",
                "Monitoring",
                "Reporting",
              ].map((step) => (
                <div
                  key={step}
                  className="rounded-lg border border-white/10 bg-white/0 px-3 py-2 text-center text-nexaio-offwhite/75"
                >
                  {step}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT (texture) */}
      <section
        className="relative"
        style={{
          backgroundImage: "url(/hero-bg.svg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Single bubble overlaps both sections */}
        <div className="pointer-events-none absolute inset-x-0 -top-10 z-30">
          <div className="mx-auto max-w-7xl px-6">
            <div className="pointer-events-auto rounded-2xl border border-white/10 bg-white/10 backdrop-blur-md">
              <div className="grid gap-6 px-6 py-4 text-sm md:grid-cols-3">
                <div>
                  <div className="text-sm font-semibold text-white">
                    Guardrails
                  </div>
                  <div className="mt-1 text-white/70">
                    Clear rules + fallbacks when edge cases hit.
                  </div>
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">
                    Monitoring
                  </div>
                  <div className="mt-1 text-white/70">
                    Failures surface early, not weeks later.
                  </div>
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">
                    Source of truth
                  </div>
                  <div className="mt-1 text-white/70">
                    Clean records that reporting can trust.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-nexaio-navy/92">
          {/* EXTRA SPACER HERE: this is what you marked with the red X */}
          <div className="mx-auto max-w-7xl px-6 pt-40 pb-16">
            {/* WHY NEXAIO */}
            <div className="border-b border-white/10 pb-14">
              <h2 className="text-2xl font-semibold">Built for reliability.</h2>

              <div className="mt-8 grid gap-10 md:grid-cols-12">
                <div className="md:col-span-6">
                  <p className="text-lg text-nexaio-offwhite/85">
                    We design automation as operational infrastructure. Clear
                    logic, guardrails, and monitoring come standard—so systems
                    keep working as complexity increases.
                  </p>

                  <p className="mt-4 text-sm text-nexaio-offwhite/70">
                    This is not “set it and forget it.” It’s ownership, testing,
                    and ongoing refinement so your team isn’t stuck babysitting
                    workflows.
                  </p>
                </div>

                <div className="hidden md:col-span-1 md:block">
                  <div className="h-full w-px bg-white/10" />
                </div>

                <div className="md:col-span-5">
                  <ul className="space-y-4 text-sm text-nexaio-offwhite/75">
                    <li>
                      <span className="font-medium text-nexaio-offwhite/90">
                        Designed for scale:
                      </span>{" "}
                      systems don’t break when volume grows.
                    </li>
                    <li>
                      <span className="font-medium text-nexaio-offwhite/90">
                        Operational ownership:
                      </span>{" "}
                      we stay accountable after launch.
                    </li>
                    <li>
                      <span className="font-medium text-nexaio-offwhite/90">
                        Clear system logic:
                      </span>{" "}
                      defined rules, fallbacks, and failure handling.
                    </li>
                    <li>
                      <span className="font-medium text-nexaio-offwhite/90">
                        Business-first:
                      </span>{" "}
                      built around operations, not tools or trends.
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* PROOF */}
            <div className="border-b border-white/10 py-14">
              <h2 className="text-2xl font-semibold">
                Trusted across teams with real operational complexity.
              </h2>

              <div className="mt-4 text-xs text-nexaio-offwhite/55">.</div>

              <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-8">
                <p className="text-base text-nexaio-offwhite/85">
                  “We had leads coming from three places and everyone handled
                  them differently. Nexaio helped us standardize intake, remove
                  the manual back-and-forth, and make follow-up consistent. The
                  biggest win is that nothing gets lost when the week gets
                  busy.”
                </p>
                <p className="mt-4 text-sm font-medium text-nexaio-offwhite">
                  Operations Manager, Tie Company ModernTie
                </p>
              </div>

              <div className="mt-6 grid gap-6 md:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                  <p className="text-sm text-nexaio-offwhite/80">
                    “Before, we were copy-pasting the same info into multiple
                    tools and it always drifted out of sync. Now the system is
                    predictable—if something needs attention, it’s visible, and
                    the team knows exactly what to do next.”
                  </p>
                  <p className="mt-4 text-sm font-medium text-nexaio-offwhite">
                    Ops Lead, Travel Agency Getaway Today
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                  <p className="text-sm text-nexaio-offwhite/80">
                    “We didn’t need ‘more tools’—we needed a cleaner workflow.
                    Nexaio helped us tighten up handoffs and automate the parts
                    that were wasting time. The result is smoother delivery and
                    fewer internal pings every day.”
                  </p>
                  <p className="mt-4 text-sm font-medium text-nexaio-offwhite">
                    Owner, SEO Company SilverfoxSEO
                  </p>
                </div>
              </div>
            </div>

            {/* HOW WE WORK */}
            <div className="border-b border-white/10 py-14">
              <h2 className="text-2xl font-semibold">
                A structured approach, from audit to ownership.
              </h2>

              <div className="mt-10 divide-y divide-white/10 rounded-2xl border border-white/10 bg-white/5">
                {[
                  {
                    n: "01",
                    title: "Audit",
                    body: "Map current processes, data flow, and failure points.",
                  },
                  {
                    n: "02",
                    title: "System Design",
                    body: "Define rules, ownership, and edge-case handling.",
                  },
                  {
                    n: "03",
                    title: "Build & Validation",
                    body: "Implement and test against real scenarios.",
                  },
                  {
                    n: "04",
                    title: "Ownership",
                    body: "Maintain and evolve systems as the business changes.",
                  },
                ].map((s) => (
                  <div
                    key={s.n}
                    className="grid gap-2 px-6 py-6 md:grid-cols-12"
                  >
                    <div className="md:col-span-2">
                      <div className="text-sm font-semibold text-nexaio-offwhite/70">
                        {s.n}
                      </div>
                    </div>
                    <div className="md:col-span-10">
                      <div className="font-medium">{s.title}</div>
                      <div className="mt-1 text-sm text-nexaio-offwhite/70">
                        {s.body}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* RETAINER + CTA */}
            <div className="pt-14">
              <h2 className="text-2xl font-semibold">
                Automation only works if it’s maintained.
              </h2>

              <p className="mt-4 max-w-2xl text-nexaio-offwhite/70">
                Business rules change, teams evolve, and edge cases appear over
                time. Ongoing ownership keeps systems accurate and reliable.
              </p>

              <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-8">
                <h3 className="max-w-3xl text-3xl font-semibold">
                  Build systems you don’t have to babysit.
                </h3>

                <p className="mt-4 max-w-2xl text-nexaio-offwhite/70">
                  If automation is critical to your operations, it deserves the
                  same level of care as any core infrastructure.
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <a
                    href="https://calendar.app.google/kNiFGpgUmyJUtZat5"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-lg bg-nexaio-offwhite px-6 py-3 text-sm font-medium text-nexaio-navy"
                  >
                    Book a Systems Review
                  </a>

                  <Link
                    href="/services"
                    className="inline-flex items-center justify-center rounded-lg border border-white/20 px-6 py-3 text-sm font-medium text-nexaio-offwhite/80 hover:text-nexaio-offwhite"
                  >
                    See System Examples
                  </Link>
                </div>
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
