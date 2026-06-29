import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Book a Systems Review with Nexaio. A discovery and walkthrough to see what systems would create real leverage in your business.",
};

const BOOK = "https://calendar.app.google/kNiFGpgUmyJUtZat5";

export default function ContactPage() {
  return (
    <>
      <section className="phero" style={{ paddingBottom: 40 }}>
        <div className="phero-bg" data-parallax="0.18">
          <div className="glow glow-1" />
          <div className="glow glow-2" />
          <div className="grid-lines" />
          <div className="phero-decor"><div className="phero-ring2" /></div>
        </div>
        <div className="wrap">
          <p className="eyebrow">Contact</p>
          <h1>
            Let&apos;s figure out if this is{" "}
            <span className="grad">worth building.</span>
          </h1>
          <p className="lede">
            This isn&apos;t a sales call. It&apos;s a discovery and walkthrough to
            see what systems would actually create leverage in your business.
          </p>
        </div>
      </section>

      <section className="block" style={{ borderTop: "none", paddingTop: 20 }}>
        <div className="wrap two" style={{ gridTemplateColumns: "1.05fr 0.95fr" }}>
          <div className="reveal">
            <p className="eyebrow">Systems review</p>
            <h2
              style={{
                fontSize: "clamp(24px,3vw,32px)",
                fontWeight: 600,
                lineHeight: 1.15,
                margin: "14px 0 22px",
              }}
            >
              What this call is (and isn&apos;t)
            </h2>
            <div className="prose" style={{ fontSize: 16 }}>
              <p>
                This is a discovery and walkthrough call. You&apos;ll show us how
                work currently moves through your business — tools, handoffs, and
                any systems you already have in place.
              </p>
              <p>
                If you don&apos;t have formal systems or automations yet,
                that&apos;s completely fine. We regularly work with teams starting
                from scratch and can design the right foundation from the ground
                up.
              </p>
              <p>
                After the call, our team reviews what we&apos;ve seen and outlines
                where automation or system changes would have the biggest impact.
              </p>
            </div>
            <ul className="clist" style={{ marginTop: 22 }}>
              <li>Clear understanding of your current workflow</li>
              <li>Where things break, stall, or rely on manual effort</li>
              <li>A concrete next-step plan</li>
            </ul>
          </div>

          <div className="panel reveal">
            <h3>Book a Systems Review</h3>
            <p style={{ marginBottom: 22 }}>
              Best fit for teams who want clarity before committing to build.
            </p>
            <a
              className="btn btn-primary"
              href={BOOK}
              target="_blank"
              rel="noopener noreferrer"
              style={{ width: "100%", justifyContent: "center" }}
            >
              <span>Book a Systems Review <i className="arr">→</i></span>
            </a>
            <Link
              className="btn btn-ghost"
              href="/process"
              style={{ width: "100%", justifyContent: "center", marginTop: 12 }}
            >
              <span>See how we work</span>
            </Link>
            <p style={{ marginTop: 22, fontSize: 13, color: "var(--mgray)" }}>
              Typical response time: within 24 hours on weekdays.
            </p>
            <div style={{ marginTop: 22, paddingTop: 22, borderTop: "1px solid var(--line)" }}>
              <p style={{ fontSize: 14, color: "var(--lgray)" }}>
                Prefer to talk? Call us at{" "}
                <a href="tel:+13853265746" style={{ color: "var(--accent-2)", textDecoration: "underline" }}>
                  +1 (385) 326-5746
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
