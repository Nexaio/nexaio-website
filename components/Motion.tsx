"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function Motion() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Fail open: if the browser can't observe, just show everything.
    if (!("IntersectionObserver" in window)) {
      document
        .querySelectorAll(".reveal")
        .forEach((el) => el.classList.add("in"));
      return;
    }

    let io: IntersectionObserver | null = null;
    const cards: HTMLElement[] = [];

    const onMove = (e: Event) => {
      const me = e as MouseEvent;
      const el = me.currentTarget as HTMLElement;
      const r = el.getBoundingClientRect();
      el.style.setProperty("--mx", me.clientX - r.left + "px");
      el.style.setProperty("--my", me.clientY - r.top + "px");
    };

    const parallaxEls = Array.from(
      document.querySelectorAll<HTMLElement>("[data-parallax]")
    );
    const onScroll = () => {
      const y = window.scrollY;
      for (const el of parallaxEls) {
        const sp = parseFloat(el.dataset.parallax || "0.2");
        el.style.transform = `translateY(${y * sp}px)`;
      }
    };

    // Run after the new route's DOM has committed.
    const raf = requestAnimationFrame(() => {
      document.body.classList.add("motion-ready");

      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add("in");
              io?.unobserve(e.target);
            }
          });
        },
        { threshold: 0.1, rootMargin: "0px 0px -5% 0px" }
      );

      const vh = window.innerHeight;
      document.querySelectorAll<HTMLElement>(".reveal").forEach((el) => {
        // Anything already on screen reveals immediately; the rest on scroll.
        if (el.getBoundingClientRect().top < vh * 0.95) {
          el.classList.add("in");
        } else {
          io!.observe(el);
        }
      });

      document.querySelectorAll<HTMLElement>(".glow-card").forEach((c) => {
        cards.push(c);
        c.addEventListener("mousemove", onMove);
      });

      window.addEventListener("scroll", onScroll, { passive: true });
    });

    return () => {
      cancelAnimationFrame(raf);
      io?.disconnect();
      cards.forEach((c) => c.removeEventListener("mousemove", onMove));
      window.removeEventListener("scroll", onScroll);
    };
  }, [pathname]);

  return null;
}
