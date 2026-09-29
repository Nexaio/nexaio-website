import Link from "next/link";
import { DemoButton } from "../components/Cta";

export default function NotFound() {
  return (
    <section className="phero phero--full">
      <div className="phero-bg" aria-hidden="true">
        <div className="glow glow-1" />
        <div className="grid-lines" />
      </div>
      <div className="wrap">
        <p className="eyebrow">404</p>
        <h1 className="h1">This page took a wrong turn.</h1>
        <p className="lede">
          The page you’re looking for doesn’t exist or has moved. Let’s get you
          back on track.
        </p>
        <div className="cta-row cta-row--center">
          <Link className="btn btn-primary" href="/">
            Back to home
          </Link>
          <DemoButton variant="secondary" />
        </div>
      </div>
    </section>
  );
}
