import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "We learned early that hard work has a ceiling. Nexaio exists because we wanted a better way to build — with systems that hold up when life gets busy.",
};

const BOOK = "https://calendar.app.google/kNiFGpgUmyJUtZat5";

export default function StoryPage() {
  return (
    <>
      {/* PHOTO HERO */}
      <section style={{ position: "relative", paddingTop: 74 }}>
        <div style={{ position: "relative", height: 520, width: "100%" }}>
          <Image
            src="/story-hero.jpeg"
            alt="Nexaio founders on site"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to bottom, rgba(11,31,50,0.35), rgba(11,31,50,0.15) 40%, var(--navy))",
            }}
          />
        </div>

        <div className="wrap" style={{ position: "relative", zIndex: 2 }}>
          <div
            className="panel reveal"
            style={{ marginTop: -120, textAlign: "center", padding: "40px 32px" }}
          >
            <p className="eyebrow">Our story</p>
            <h1
              style={{
                fontSize: "clamp(34px,5vw,52px)",
                fontWeight: 600,
                letterSpacing: "-0.025em",
                lineHeight: 1.06,
                margin: "14px auto 0",
                maxWidth: 720,
              }}
            >
              Built by doing the work{" "}
              <span className="grad">the hard way first.</span>
            </h1>
            <p
              style={{
                margin: "20px auto 0",
                maxWidth: 640,
                color: "var(--lgray)",
                fontWeight: 300,
                fontSize: 18,
                lineHeight: 1.6,
              }}
            >
              We learned early that hard work has a ceiling. Nexaio exists
              because we wanted a better way to build — with systems that hold up
              when life gets busy.
            </p>
            <div className="hero-cta" style={{ justifyContent: "center" }}>
              <a className="btn btn-primary" href={BOOK} target="_blank" rel="noopener noreferrer">
                <span>Book a Systems Review <i className="arr">→</i></span>
              </a>
              <Link className="btn btn-ghost" href="/process">
                <span>See our process</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* STORY BODY */}
      <section className="block" style={{ borderTop: "none" }}>
        <div className="wrap">
          <div style={{ maxWidth: 760, margin: "0 auto" }}>
            <div className="reveal">
              <div className="accent-bar" />
              <h2
                style={{
                  fontSize: "clamp(24px,3vw,34px)",
                  fontWeight: 600,
                  letterSpacing: "-0.02em",
                  textAlign: "center",
                  marginBottom: 28,
                }}
              >
                Where it really began
              </h2>
            </div>
            <div className="prose stagger reveal">
              <p className="lead-para">
                Before automation, before systems, before Nexaio had a name, we
                were running a landscaping operation. Some days meant waking up
                before sunrise, renting two aerators, and starting work before
                most people were awake. By the end of the day, we&apos;d knock
                out 20 to 25 houses — nonstop. The money was decent, but the cost
                was obvious. Our backs were wrecked. The days were long. And no
                matter how hard we worked, tomorrow always demanded the same
                thing again.
              </p>
              <p>
                That season changed how we thought about work. The problem
                wasn&apos;t demand. The problem was leverage. We realized that
                when results depend entirely on people pushing harder, the system
                eventually breaks. Not because people are lazy — but because
                effort doesn&apos;t scale.
              </p>
              <p>
                So we started building. Between school, late nights, and constant
                trial-and-error, we experimented relentlessly. Most things
                didn&apos;t work. Some worked until they didn&apos;t. We broke
                flows, rebuilt them, and learned — quickly — that the difference
                between something impressive and something dependable is
                discipline. Not cleverness. Not hype. Discipline.
              </p>
              <p>
                The first real wins didn&apos;t come from a single tool or
                breakthrough. They came from building systems that removed
                pressure — systems that kept work moving when volume increased,
                edge cases appeared, or no one had time to step in manually. That
                experience shaped how we think about automation to this day.
              </p>
              <p>
                Buying nexaio.co made it official. This wasn&apos;t a side
                project anymore.
              </p>
              <p>
                Today, Nexaio is built around the same principle that shaped us
                early on: if a system is operationally important, it should be
                treated like infrastructure. Designed on purpose. Tested against
                real-world conditions. Monitored. Owned.
              </p>
            </div>
          </div>

          {/* CLOSING PRINCIPLE */}
          <div className="panel reveal" style={{ marginTop: 48, maxWidth: 900, marginLeft: "auto", marginRight: "auto", padding: "40px 32px" }}>
            <div style={{ textAlign: "center", maxWidth: 680, margin: "0 auto" }}>
              <p className="eyebrow">Principle</p>
              <h2
                style={{
                  fontSize: "clamp(22px,3vw,30px)",
                  fontWeight: 600,
                  lineHeight: 1.2,
                  marginTop: 12,
                }}
              >
                Systems should remove pressure,{" "}
                <span className="grad">not create it.</span>
              </h2>
            </div>
            <div className="prose stagger reveal" style={{ textAlign: "center", maxWidth: 680, margin: "24px auto 0" }}>
              <p>
                We refuse to build brittle, one-off automations that only work as
                long as the original builder is around. We don&apos;t ship demos.
                We build systems teams can actually rely on — because we&apos;ve
                lived inside broken workflows, manual bottlenecks, and processes
                that collapse under pressure.
              </p>
              <p>
                Even though we&apos;re young, clients trust us because of how we
                operate. Clear process. Clean handoffs. Honest work. If we
                don&apos;t know something, we don&apos;t guess — we find the
                answer. And if a system matters to your business, we treat it
                like it matters.
              </p>
              <p>This is just the beginning. But the foundation is already set.</p>
            </div>
            <div className="hero-cta" style={{ justifyContent: "center", marginTop: 8 }}>
              <a className="btn btn-primary" href={BOOK} target="_blank" rel="noopener noreferrer">
                <span>Book a Systems Review <i className="arr">→</i></span>
              </a>
              <Link className="btn btn-ghost" href="/services">
                <span>See what we build</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
