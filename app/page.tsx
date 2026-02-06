import Image from "next/image";
import Link from "next/link";

export default function StoryPage() {
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

      {/* HERO PHOTO */}
      <section className="relative">
        <div className="relative h-[520px] w-full">
          <Image
            src="/story-hero.jpeg"
            alt="Nexaio team on site"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          {/* Bottom fade only — no blue tint */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/70" />
        </div>

        {/* Hero card (OVERLAPS PHOTO) */}
        <div className="relative z-10 mx-auto max-w-7xl px-6">
          <div className="-mt-32 rounded-3xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-sm sm:p-10">
            <h1 className="mx-auto max-w-4xl text-4xl font-semibold leading-tight sm:text-5xl">
              Our Story
            </h1>

            <p className="mx-auto mt-5 max-w-3xl text-lg text-nexaio-offwhite/75 sm:text-xl">
              We learned early that hard work has a ceiling. Nexaio exists
              because we wanted a better way to build — with systems that hold
              up when life gets busy.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-lg bg-nexaio-offwhite px-6 py-3 text-sm font-medium text-nexaio-navy"
              >
                Book a Systems Review
              </Link>
              <Link
                href="/process"
                className="inline-flex items-center justify-center rounded-lg border border-white/20 px-6 py-3 text-sm font-medium text-nexaio-offwhite/80 hover:text-nexaio-offwhite"
              >
                See Our Process
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* BODY — PULLS UP UNDER HERO CARD */}
      <section
        className="relative -mt-24"
        style={{
          backgroundImage: "url(/hero-bg-story.svg)",
          backgroundSize: "cover",
          backgroundPosition: "center top",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-nexaio-navy/65" />

        <div className="relative mx-auto max-w-7xl px-6 pt-32 pb-16">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-semibold sm:text-4xl">
              Where it really began
            </h2>

            <p className="mt-6 text-lg leading-relaxed text-nexaio-offwhite/80 sm:text-xl">
              Before automation, before systems, before Nexaio had a name, we
              were running a landscaping operation. Some days meant waking up
              before sunrise, renting two aerators, and starting work before
              most people were awake. By the end of the day, we’d knock out 20
              to 25 houses—nonstop. The money was decent, but the cost was
              obvious. Our backs were wrecked. The days were long. And no matter
              how hard we worked, tomorrow always demanded the same thing again.
            </p>

            <p className="mt-6 text-lg leading-relaxed text-nexaio-offwhite/80 sm:text-xl">
              That season changed how we thought about work. The problem wasn’t
              demand. The problem was leverage. We realized that when results
              depend entirely on people pushing harder, the system eventually
              breaks. Not because people are lazy—but because effort doesn’t
              scale.
            </p>

            <p className="mt-6 text-lg leading-relaxed text-nexaio-offwhite/80 sm:text-xl">
              So we started building. Between school, late nights, and constant
              trial-and-error, we experimented relentlessly. Most things didn’t
              work. Some worked until they didn’t. We broke flows, rebuilt them,
              and learned—quickly—that the difference between something
              impressive and something dependable is discipline. Not cleverness.
              Not hype. Discipline.
            </p>

            <p className="mt-6 text-lg leading-relaxed text-nexaio-offwhite/80 sm:text-xl">
              The first real wins didn’t come from a single tool or
              breakthrough. They came from building systems that removed
              pressure—systems that kept work moving when volume increased, edge
              cases appeared, or no one had time to step in manually. That
              experience shaped how we think about automation to this day.
            </p>

            <p className="mt-6 text-lg leading-relaxed text-nexaio-offwhite/80 sm:text-xl">
              Buying nexaio.co made it official. This wasn’t a side project
              anymore.
            </p>

            <p className="mt-6 text-lg leading-relaxed text-nexaio-offwhite/80 sm:text-xl">
              Today, Nexaio is built around the same principle that shaped us
              early on: if a system is operationally important, it should be
              treated like infrastructure. Designed on purpose. Tested against
              real-world conditions. Monitored. Owned.
            </p>
          </div>

          {/* Closing principle (tighter, premium, not a second hero) */}
          <section className="mx-auto mt-14 max-w-5xl">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm sm:p-10">
              <div className="mx-auto max-w-3xl text-center">
                <p className="text-xs font-semibold tracking-[0.18em] text-nexaio-offwhite/55">
                  PRINCIPLE
                </p>

                <h2 className="mt-3 text-2xl font-semibold leading-tight sm:text-3xl">
                  Systems should remove pressure, not create it.
                </h2>
              </div>

              <div className="mx-auto mt-8 max-w-3xl space-y-5 text-center">
                <p className="text-lg leading-relaxed text-nexaio-offwhite/80 sm:text-xl">
                  We refuse to build brittle, one-off automations that only work
                  as long as the original builder is around. We don’t ship
                  demos. We build systems teams can actually rely on—because
                  we’ve lived inside broken workflows, manual bottlenecks, and
                  processes that collapse under pressure.
                </p>

                <p className="text-lg leading-relaxed text-nexaio-offwhite/80 sm:text-xl">
                  Even though we’re young, clients trust us because of how we
                  operate. Clear process. Clean handoffs. Honest work. If we
                  don’t know something, we don’t guess—we find the answer. And
                  if a system matters to your business, we treat it like it
                  matters.
                </p>

                <p className="text-lg leading-relaxed text-nexaio-offwhite/80 sm:text-xl">
                  This is just the beginning. But the foundation is already set.
                </p>
              </div>

              <div className="mx-auto mt-10 flex max-w-3xl flex-col gap-3 sm:flex-row sm:justify-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-lg bg-nexaio-offwhite px-6 py-3 text-sm font-medium text-nexaio-navy"
                >
                  Book a Systems Review
                </Link>
                <Link
                  href="/services"
                  className="inline-flex items-center justify-center rounded-lg border border-white/20 px-6 py-3 text-sm font-medium text-nexaio-offwhite/80 hover:text-nexaio-offwhite"
                >
                  See What We Build
                </Link>
              </div>
            </div>
          </section>
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
