import Link from "next/link";
import { bookCta, demoCta } from "../lib/cta";
import Icon from "./Icon";

type Variant = "primary" | "secondary";

export function DemoButton({
  variant = "primary",
  className = "",
}: {
  variant?: Variant;
  className?: string;
}) {
  return (
    <Link className={`btn btn-${variant} ${className}`} href={demoCta.href}>
      {demoCta.label}
      {variant === "primary" ? <Icon name="arrow" size={18} className="btn-arrow" /> : null}
    </Link>
  );
}

export function BookButton({
  variant = "secondary",
  withArrow = false,
  className = "",
}: {
  variant?: Variant;
  withArrow?: boolean;
  className?: string;
}) {
  return (
    <Link className={`btn btn-${variant} ${className}`} href={bookCta.href}>
      {bookCta.label}
      {withArrow ? <Icon name="arrow" size={18} className="btn-arrow" /> : null}
    </Link>
  );
}

/** The standard pair, in priority order: see/watch the demo, then book a walkthrough. */
export function CtaPair({ centered = false }: { centered?: boolean }) {
  return (
    <div className={`cta-row${centered ? " cta-row--center" : ""}`}>
      <DemoButton variant="primary" />
      <BookButton variant="secondary" />
    </div>
  );
}
