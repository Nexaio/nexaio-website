"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/process", label: "Process" },
  { href: "/story", label: "Our Story" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`site-header${scrolled ? " scrolled" : ""}`}>
      <div className="wrap nav">
        <Link href="/" className="logo" onClick={() => setOpen(false)}>
          <img src="/nexaio-logo-light.png" alt="Nexaio logo" /> Nexaio
        </Link>

        <nav className="nav-links">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={pathname === l.href ? "active" : ""}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <Link className="btn btn-primary" href="/contact">
          <span>
            Book a Systems Review <i className="arr">→</i>
          </span>
        </Link>

        <button
          className="menu-btn"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      <div className={`mobile-menu${open ? " open" : ""}`}>
        <div className="mm-inner">
          {links.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)}>
              {l.label}
            </Link>
          ))}
          <Link
            className="btn btn-primary mm-cta"
            href="/contact"
            onClick={() => setOpen(false)}
          >
            <span>Book a Systems Review</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
