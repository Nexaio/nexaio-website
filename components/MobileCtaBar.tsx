"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { bookCta, demoCta } from "../lib/cta";

/**
 * Bottom action bar on small screens.
 *
 * It appears only once the page's own call-to-action row (marked
 * `data-hero-ctas`) has scrolled up out of view, so the same buttons are never
 * on screen twice, and never on the booking page itself. It never offers a
 * call button: the published number's routing is unverified (content/site.ts).
 */
export default function MobileCtaBar() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(false);
    const target = document.querySelector<HTMLElement>("[data-hero-ctas]");
    if (target && "IntersectionObserver" in window) {
      const io = new IntersectionObserver(
        ([entry]) => {
          // Visible only when the CTA row is off screen ABOVE the viewport.
          setVisible(!entry.isIntersecting && entry.boundingClientRect.top < 0);
        },
        { threshold: 0 }
      );
      io.observe(target);
      return () => io.disconnect();
    }
    const onScroll = () => setVisible(window.scrollY > 480);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  // The booking page is the destination: no bar there at all.
  if (pathname === bookCta.href) return null;
  const showDemo = pathname !== demoCta.href;

  return (
    <>
      <div className="mobile-bar-spacer" aria-hidden="true" />
      <div className={`mobile-bar${visible ? " is-visible" : ""}`}>
        <Link className="btn btn-primary" href={bookCta.href}>
          {bookCta.label}
        </Link>
        {showDemo ? (
          <Link className="btn btn-secondary" href={demoCta.href}>
            {demoCta.label}
          </Link>
        ) : null}
      </div>
    </>
  );
}
