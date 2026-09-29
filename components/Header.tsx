"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { nav } from "../content/site";
import { bookCta, demoCta } from "../lib/cta";
import Icon from "./Icon";

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu on navigation and on Escape.
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (href: string) => !href.includes("#") && pathname === href;

  return (
    <header className={`site-header${scrolled || open ? " is-solid" : ""}`}>
      <div className="wrap nav">
        <Link href="/" className="brand" aria-label="Nexaio home">
          <Image src="/nexaio-logo-light.png" alt="" width={28} height={28} priority />
          <span className="brand-name">Nexaio</span>
        </Link>

        <nav className="nav-links" aria-label="Main">
          {nav.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={isActive(l.href) ? "is-active" : undefined}
              aria-current={isActive(l.href) ? "page" : undefined}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="nav-actions">
          <Link className="btn btn-primary btn-sm" href={bookCta.href}>
            {bookCta.label}
          </Link>
        </div>

        <button
          type="button"
          className="menu-btn"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          <Icon name={open ? "close" : "menu"} size={24} />
        </button>
      </div>

      <div id="mobile-menu" className={`mobile-menu${open ? " is-open" : ""}`} hidden={!open}>
        <nav className="wrap mobile-menu-inner" aria-label="Mobile">
          {nav.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              aria-current={isActive(l.href) ? "page" : undefined}
            >
              {l.label}
            </Link>
          ))}
          <Link href="/contact" onClick={() => setOpen(false)}>
            Contact
          </Link>
          <div className="mobile-menu-ctas">
            <Link className="btn btn-primary" href={demoCta.href} onClick={() => setOpen(false)}>
              {demoCta.label}
            </Link>
            <Link className="btn btn-secondary" href={bookCta.href} onClick={() => setOpen(false)}>
              {bookCta.label}
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
