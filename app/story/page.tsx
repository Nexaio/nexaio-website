import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import StoryTimeline from "../../components/StoryTimeline";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "From a landscaping grind to systems that scale. Nexaio exists because we wanted a better way to build — systems that hold up when life gets busy.",
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

      {/* CINEMATIC TIMELINE */}
      <StoryTimeline />

      {/* FULL NARRATIVE */}
      <section className="block" style={{ borderTop: "none" }}>
        <div className="wrap">
          <div className="reveal" style={{ maxWidth: 760, margin: "0 auto" }}>
            <div className="accent-bar" />
            <h2
              style={{
                fontSize: "clamp(24px,3vw,34px)",
                fontWeight: 600,
                letterSpacing: "-0.02em",
                textAlign: "center",
                marginBottom: 30,
              }}
            >
              The full story
            </h2>
          </div>
          <div className="prose stagger reveal" style={{ maxWidth: 720, margin: "0 auto" }}>
            <p className="lead-para">
              Nexaio didn&apos;t start in an office. It started in the heat,
              before sunrise, with two rented aerators and a list of houses that
              never seemed to end.
            </p>
            <p>
              Before automation, before systems, before Nexaio even had a name,
              we ran a landscaping operation. Some mornings started before the
              sun did. We&apos;d knock out twenty to twenty-five houses in a day
              — nonstop, back-breaking, the kind of work that only pays as long
              as you keep moving. The money was real. So was the ceiling. No
              matter how hard we pushed, tomorrow asked for the exact same thing
              all over again.
            </p>
            <p>
              That season taught us something we&apos;ve never forgotten: effort
              doesn&apos;t scale. When everything depends on people pushing
              harder, the system doesn&apos;t break because someone failed — it
              breaks because there&apos;s only so much push to give. The problem
              was never demand. It was leverage.
            </p>
            <p>
              So we started building. Between school, late nights, and an
              obsessive amount of trial and error, we taught ourselves to
              automate the work instead of just surviving it. Most of what we
              tried didn&apos;t work. Some of it worked right up until it
              didn&apos;t. We broke flows, rebuilt them, and learned the lesson
              that still runs through everything we do: the difference between
              impressive and dependable isn&apos;t cleverness — it&apos;s
              discipline.
            </p>
            <p>
              The first real wins were quiet ones. Not a single magic tool, just
              systems that took the pressure off. Systems that kept moving when
              volume spiked, when edge cases showed up, when no one had time to
              babysit them. That&apos;s when it clicked: the goal was never
              automation for its own sake. It was leverage you could trust.
            </p>
            <p>
              Buying nexaio.co made it official. What started as a way out of the
              grind had become the thing we actually wanted to build.
            </p>
            <p>
              Today, Nexaio runs on the same principle those early mornings beat
              into us: if a system is important to a business, it should be
              treated like infrastructure — designed on purpose, tested against
              reality, monitored, and owned. We don&apos;t ship demos. We
              don&apos;t build brittle, one-off automations that only survive
              while their creator is around. We build systems teams can actually
              rely on, because we&apos;ve lived inside the broken ones.
            </p>
            <p>
              We&apos;re young, and we don&apos;t pretend otherwise. What earns
              trust isn&apos;t age — it&apos;s how we operate. Clear process.
              Clean handoffs. Honest work. When we don&apos;t know something, we
              don&apos;t guess; we find the answer. And when a system matters to
              your business, we treat it like it matters. This is just the
              beginning — but the foundation is already set.
            </p>
          </div>
        </div>
      </section>

      {/* PRINCIPLE PULL-QUOTE */}
      <section className="block">
        <div className="wrap reveal" style={{ textAlign: "center", maxWidth: 820, margin: "0 auto" }}>
          <p className="eyebrow">The principle</p>
          <h2
            style={{
              fontSize: "clamp(28px,4vw,46px)",
              fontWeight: 600,
              letterSpacing: "-0.02em",
              lineHeight: 1.12,
              marginTop: 16,
            }}
          >
            Systems should remove pressure,{" "}
            <span className="grad">not create it.</span>
          </h2>
        </div>
      </section>

      {/* CTA */}
      <section className="block">
        <div className="wrap">
          <div className="cta-wrap reveal">
            <div className="glow-c" />
            <h2>Let&apos;s build something that holds up.</h2>
            <p>
              If a system is critical to your operations, it deserves the same
              care as any core infrastructure.
            </p>
            <div className="hero-cta">
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
