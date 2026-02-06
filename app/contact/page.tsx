import Image from "next/image";
import Link from "next/link";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-nexaio-navy text-nexaio-offwhite">
      {/* Header */}
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
          backgroundPosition: "center top",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-nexaio-navy/60" />

        <div className="relative mx-auto max-w-7xl px-6 py-20">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold tracking-[0.18em] text-nexaio-offwhite/55">
              CONTACT
            </p>

            <h1 className="mt-4 text-4xl font-semibold leading-tight sm:text-5xl">
              Let’s figure out if this is worth building.
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-nexaio-offwhite/75">
              This isn’t a sales call. It’s a discovery and walkthrough to see
              what systems would actually create leverage in your business.
            </p>
          </div>
        </div>
      </section>

      {/* CONTENT */}
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

        <div className="relative mx-auto max-w-7xl px-6 py-20 text-nexaio-navy">
          <div className="grid gap-14 lg:grid-cols-2 lg:items-start">
            <div>
              <p className="text-xs font-semibold tracking-[0.18em] text-nexaio-navy/60">
                SYSTEMS REVIEW
              </p>

              <h2 className="mt-4 text-3xl font-semibold leading-tight">
                What this call is (and isn’t)
              </h2>

              <div className="mt-8 space-y-6 text-base leading-relaxed text-nexaio-navy/70">
                <p>
                  This is a discovery and walkthrough call. You’ll show us how
                  work currently moves through your business — tools, handoffs,
                  and any systems you already have in place.
                </p>

                <p>
                  If you don’t have formal systems or automations yet, that’s
                  completely fine. We regularly work with teams starting from
                  scratch and can design the right foundation from the ground
                  up.
                </p>

                <p>
                  After the call, our team reviews what we’ve seen and outlines
                  where automation or system changes would have the biggest
                  impact. If it makes sense, we’ll schedule a follow-up to walk
                  through recommendations.
                </p>
              </div>

              <div className="mt-10 space-y-4 text-sm">
                <div className="flex gap-3">
                  <span className="font-semibold">✓</span>
                  <span>Clear understanding of your current workflow</span>
                </div>
                <div className="flex gap-3">
                  <span className="font-semibold">✓</span>
                  <span>
                    Where things break, stall, or rely on manual effort
                  </span>
                </div>
                <div className="flex gap-3">
                  <span className="font-semibold">✓</span>
                  <span>A concrete next-step plan</span>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-black/10 bg-white/70 p-8 backdrop-blur-sm sm:p-10">
              <p className="text-sm font-semibold">Book a Systems Review</p>

              <p className="mt-3 text-sm leading-relaxed text-nexaio-navy/70">
                Best fit for teams who want clarity before committing to build.
              </p>

              <div className="mt-8 space-y-3">
                <a
                  href="https://calendar.app.google/kNiFGpgUmyJUtZat5"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center rounded-lg bg-nexaio-navy px-6 py-3 text-sm font-medium text-nexaio-offwhite"
                >
                  Book a Systems Review
                </a>

                <Link
                  href="/process"
                  className="inline-flex w-full items-center justify-center rounded-lg border border-black/15 px-6 py-3 text-sm font-medium"
                >
                  See how we work
                </Link>
              </div>

              <p className="mt-6 text-xs text-nexaio-navy/60">
                Typical response time: within 24 hours on weekdays.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
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
