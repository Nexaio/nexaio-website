import Link from "next/link";
import GeodeHero from "../components/GeodeHero";

const BOOK = "https://calendar.app.google/kNiFGpgUmyJUtZat5";

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="hero-bg" id="heroBg">
          <div className="glow glow-1" />
          <div className="glow glow-2" />
          <div className="grid-lines" />
        </div>
        <GeodeHero />
        <div className="wrap hero-inner">
          <p className="eyebrow">Automation infrastructure</p>
          <h1 className="hero-title">
            Operational automation built to{" "}
            <span className="grad">scale, not break.</span>
          </h1>
          <p className="hero-sub">
            Nexaio designs and owns automation systems that keep operations
            clean, reliable, and scalable as businesses grow.
          </p>
          <div className="hero-cta">
            <a className="btn btn-primary" href={BOOK} target="_blank" rel="noopener noreferrer">
              <span>
                Book a Systems Review <i className="arr">→</i>
              </span>
            </a>
            <Link className="btn btn-ghost" href="/services">
              <span>See how it works</span>
            </Link>
          </div>
          <div className="trust">
            <div className="trust-item">
              <span className="ic">⬡</span>
              <h4>Cleaner intake</h4>
              <p>Less manual routing, fewer dropped handoffs.</p>
            </div>
            <div className="trust-item">
              <span className="ic">⟳</span>
              <h4>Faster response</h4>
              <p>Consistent first-touch without founder rewrites.</p>
            </div>
            <div className="trust-item">
              <span className="ic">◈</span>
              <h4>Ongoing ownership</h4>
              <p>Monitoring and maintenance so systems don&apos;t rot.</p>
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="marquee">
        <div className="marquee-track">
          <span>n8n&nbsp;workflows</span><span>API integrations</span><span>CRM automation</span><span>Lead routing</span><span>AI-assisted ops</span><span>Webhooks</span><span>Data enrichment</span><span>Monitoring</span>
          <span>n8n&nbsp;workflows</span><span>API integrations</span><span>CRM automation</span><span>Lead routing</span><span>AI-assisted ops</span><span>Webhooks</span><span>Data enrichment</span><span>Monitoring</span>
        </div>
      </div>

      {/* WHAT WE BUILD */}
      <section className="block" id="build">
        <div className="wrap">
          <div className="sec-head reveal">
            <p className="eyebrow">What we build</p>
            <h2>End-to-end automation systems, not disconnected workflows.</h2>
            <p>
              We build systems that move information cleanly from first contact
              to final outcome, with guardrails that prevent breakdowns as
              volume increases.
            </p>
          </div>
          <div className="pipe reveal">
            {[
              ["01", "Lead Intake"],
              ["02", "Data Enrichment"],
              ["03", "Business Logic"],
              ["04", "Execution"],
              ["05", "System of Record"],
              ["06", "Monitoring"],
              ["07", "Reporting"],
            ].map(([n, t]) => (
              <div className="pipe-step" key={n}>
                <div className="n">{n}</div>
                <div className="t">{t}</div>
                <div className="dot" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RELIABILITY */}
      <section className="block">
        <div className="wrap two">
          <div className="reveal">
            <p className="eyebrow">Why Nexaio</p>
            <h2
              style={{
                fontSize: "clamp(26px,3.4vw,40px)",
                fontWeight: 600,
                letterSpacing: "-0.02em",
                lineHeight: 1.12,
                margin: "14px 0 22px",
              }}
            >
              Built for reliability.
            </h2>
            <p className="lead">
              We design automation as operational infrastructure. Clear logic,
              guardrails, and monitoring come standard — so systems keep working
              as complexity increases.
            </p>
            <p className="sub">
              This is not &ldquo;set it and forget it.&rdquo; It&apos;s
              ownership, testing, and ongoing refinement so your team isn&apos;t
              stuck babysitting workflows.
            </p>
          </div>
          <div className="featlist reveal">
            {[
              ["⤢", "Designed for scale", "Systems don't break when volume grows."],
              ["◇", "Operational ownership", "We stay accountable after launch."],
              ["⊞", "Clear system logic", "Defined rules, fallbacks, and failure handling."],
              ["◎", "Business-first", "Built around operations, not tools or trends."],
            ].map(([ic, h, p]) => (
              <div className="feat glow-card" key={h}>
                <div className="ic">{ic}</div>
                <div>
                  <h4>{h}</h4>
                  <p>{p}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STANDARDS */}
      <section className="block">
        <div className="wrap">
          <div className="sec-head reveal">
            <p className="eyebrow">Standard on every build</p>
            <h2>Guardrails, monitoring, and a source of truth.</h2>
          </div>
          <div className="cards">
            <div className="card glow-card reveal">
              <div className="ic">▣</div>
              <h4>Guardrails</h4>
              <p>Clear rules and fallbacks for when edge cases hit, so nothing silently fails.</p>
            </div>
            <div className="card glow-card reveal">
              <div className="ic">◴</div>
              <h4>Monitoring</h4>
              <p>Failures surface early, not weeks later when the damage is already done.</p>
            </div>
            <div className="card glow-card reveal">
              <div className="ic">⛁</div>
              <h4>Source of truth</h4>
              <p>Clean records that your reporting can actually trust.</p>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="block">
        <div className="wrap">
          <div className="sec-head reveal">
            <p className="eyebrow">How we work</p>
            <h2>A structured approach, from audit to ownership.</h2>
          </div>
          <div className="steps reveal">
            {[
              ["01", "Audit", "Map current processes, data flow, and failure points."],
              ["02", "System Design", "Define rules, ownership, and edge-case handling."],
              ["03", "Build & Validation", "Implement and test against real scenarios."],
              ["04", "Ownership", "Maintain and evolve systems as the business changes."],
            ].map(([n, h, p]) => (
              <div className="step" key={n}>
                <div className="n">{n}</div>
                <h4>{h}</h4>
                <p>{p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OPERATE */}
      <section className="block">
        <div className="wrap reveal" style={{ textAlign: "center", maxWidth: 760, margin: "0 auto" }}>
          <p className="eyebrow">How we operate</p>
          <h2
            style={{
              fontSize: "clamp(24px,3vw,34px)",
              fontWeight: 600,
              letterSpacing: "-0.02em",
              lineHeight: 1.2,
              marginTop: 16,
            }}
          >
            Clear process. Clean handoffs. Honest work.
          </h2>
          <p style={{ marginTop: 18, color: "var(--lgray)", fontWeight: 300, fontSize: 16.5 }}>
            If we don&apos;t know something, we don&apos;t guess — we find the
            answer. And if a system matters to your business, we treat it like
            it matters.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="block">
        <div className="wrap">
          <div className="cta-wrap reveal">
            <div className="glow-c" />
            <h2>Build systems you don&apos;t have to babysit.</h2>
            <p>
              If automation is critical to your operations, it deserves the same
              level of care as any core infrastructure.
            </p>
            <div className="hero-cta">
              <a className="btn btn-primary" href={BOOK} target="_blank" rel="noopener noreferrer">
                <span>
                  Book a Systems Review <i className="arr">→</i>
                </span>
              </a>
              <Link className="btn btn-ghost" href="/services">
                <span>See how it works</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
