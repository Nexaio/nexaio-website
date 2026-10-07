"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { industries, nav } from "../content/site";
import { bookCta, demoCta } from "../lib/cta";
import BrandMark from "./BrandMark";
import Icon from "./Icon";

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const menuBtnRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close both menus on navigation.
  useEffect(() => {
    setOpen(false);
    setMenu(false);
  }, [pathname]);

  // Escape closes whichever menu is open and returns focus to its button;
  // a click outside closes the Industries menu.
  useEffect(() => {
    if (!open && !menu) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (menu) {
        setMenu(false);
        menuBtnRef.current?.focus();
      }
      setOpen(false);
    };
    const onClick = (e: MouseEvent) => {
      if (menu && menuRef.current && !menuRef.current.contains(e.target as Node)) setMenu(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("click", onClick);
    };
  }, [open, menu]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className={`site-header${scrolled || open ? " is-solid" : ""}`}>
      <div className="wrap nav">
        <Link href="/" className="brand" aria-label="Nexaio home">
          <BrandMark priority />
        </Link>

        <nav className="nav-links" aria-label="Main">
          {nav.map((item) =>
            item.href === "/industries" ? (
              <div className="nav-menu" key={item.href} ref={menuRef}>
                <button
                  ref={menuBtnRef}
                  type="button"
                  className={`nav-link${isActive("/industries") ? " is-current" : ""}`}
                  aria-expanded={menu}
                  aria-controls="industries-menu"
                  onClick={() => setMenu((v) => !v)}
                >
                  {item.label}
                  <Icon name="chevron" size={15} />
                </button>
                {menu ? (
                  <div className="nav-panel" id="industries-menu">
                    {industries.map((ind) => (
                      <Link key={ind.href} href={ind.href} onClick={() => setMenu(false)}>
                        <b>
                          {ind.label} <em className="live-badge">Live now</em>
                        </b>
                        <span>{ind.summary}</span>
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className="nav-link"
                aria-current={isActive(item.href) ? "page" : undefined}
              >
                {item.label}
              </Link>
            )
          )}
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

      <div id="mobile-menu" className="mobile-menu" hidden={!open}>
        <nav className="wrap mobile-menu-inner" aria-label="Mobile">
          {nav
            .filter((item) => item.href !== "/industries")
            .map((item) => (
              <Link key={item.href} href={item.href} aria-current={isActive(item.href) ? "page" : undefined}>
                {item.label}
              </Link>
            ))}
          <p className="eyebrow mobile-menu-label">Industries</p>
          {industries.map((ind) => (
            <Link key={ind.href} href={ind.href}>
              {ind.label}
            </Link>
          ))}
          <Link href="/contact">Contact</Link>
          <div className="mobile-menu-ctas">
            <Link className="btn btn-primary" href={bookCta.href}>
              {bookCta.label}
            </Link>
            <Link className="btn btn-secondary" href={demoCta.href}>
              {demoCta.label}
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
