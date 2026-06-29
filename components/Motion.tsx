"use client";

import { useEffect } from "react";

export default function Motion() {
  useEffect(() => {
    document.body.classList.add("motion-ready");

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

    const onMove = (e: Event) => {
      const me = e as MouseEvent;
      const card = (me.currentTarget as HTMLElement);
      const r = card.getBoundingClientRect();
      card.style.setProperty("--mx", me.clientX - r.left + "px");
      card.style.setProperty("--my", me.clientY - r.top + "px");
    };
    const cards = Array.from(
      document.querySelectorAll<HTMLElement>(".glow-card")
    );
    cards.forEach((c) => c.addEventListener("mousemove", onMove));

    const heroBg = document.getElementById("heroBg");
    const onScroll = () => {
      if (heroBg)
        heroBg.style.transform = `translateY(${window.scrollY * 0.25}px)`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      io.disconnect();
      cards.forEach((c) => c.removeEventListener("mousemove", onMove));
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return null;
}
