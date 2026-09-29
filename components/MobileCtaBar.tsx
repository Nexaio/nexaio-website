"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { bookCta, demoCta } from "../lib/cta";

/**
 * Bottom action bar on small screens. It slides in once the page's own calls
 * to action have scrolled away, and it never offers a call button: the
 * published number's routing is unverified (content/site.ts).
 */
export default function MobileCtaBar() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 320);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  const showDemo = pathname !== demoCta.href;
  const showBook = pathname !== bookCta.href;
  if (!showDemo && !showBook) return null;

  return (
    <>
      <div className="mobile-bar-spacer" aria-hidden="true" />
      <div className={`mobile-bar${visible ? " is-visible" : ""}`}>
        {showDemo ? (
          <Link className={`btn ${showBook ? "btn-secondary" : "btn-primary"}`} href={demoCta.href}>
            {demoCta.label}
          </Link>
        ) : null}
        {showBook ? (
          <Link className="btn btn-primary" href={bookCta.href}>
            {bookCta.label}
          </Link>
        ) : null}
      </div>
    </>
  );
}
