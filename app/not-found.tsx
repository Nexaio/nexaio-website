import Link from "next/link";

export default function NotFound() {
  return (
    <section
      className="phero"
      style={{ minHeight: "72vh", display: "flex", alignItems: "center" }}
    >
      <div className="phero-bg">
        <div className="glow glow-1" />
        <div className="grid-lines" />
      </div>
      <div className="wrap">
        <p className="eyebrow">404</p>
        <h1>
          This page took a <span className="grad">wrong turn.</span>
        </h1>
        <p className="lede">
          The page you&apos;re looking for doesn&apos;t exist or has moved.
          Let&apos;s get you back on track.
        </p>
        <div className="hero-cta" style={{ justifyContent: "center" }}>
          <Link className="btn btn-primary" href="/">
            <span>
              Back to home <i className="arr">→</i>
            </span>
          </Link>
          <Link className="btn btn-ghost" href="/contact">
            <span>Contact us</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
