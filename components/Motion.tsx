"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Motion controller.
 *
 * - [data-reveal]: sections ease in once as they enter the viewport. Anything
 *   already on screen is marked visible BEFORE the page is flagged
 *   `motion-ready`, so nothing above the fold ever flashes out, and if this
 *   script never runs nothing is hidden at all.
 * - [data-loop]: product motion. `was-seen` is added the first time the
 *   element comes into view (one-shot sequences such as the activity rail);
 *   `is-playing` is present only while it is on screen, so loops (the layer
 *   tokens, the live dot) pause off-screen to save the CPU.
 * - [data-signal]: the homepage signal path. Where CSS scroll-driven
 *   animations exist, CSS draws it with scroll. Otherwise each section that
 *   crosses the middle of the viewport sets `--progress` on the flow (no
 *   scroll handlers). Without script it is simply drawn in full.
 * - Reduced motion: does nothing; the CSS shows every final state statically.
 */
export default function Motion() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!("IntersectionObserver" in window)) return;

    const vh = window.innerHeight;
    const reveals = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const pending: HTMLElement[] = [];
    for (const el of reveals) {
      if (el.getBoundingClientRect().top < vh * 0.92) el.classList.add("is-in");
      else pending.push(el);
    }
    root.classList.add("motion-ready");

    const revealer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            revealer.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );
    pending.forEach((el) => revealer.observe(el));

    const player = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const el = e.target as HTMLElement;
          if (e.isIntersecting) {
            el.classList.add("is-playing", "was-seen");
          } else {
            el.classList.remove("is-playing");
          }
        }
      },
      { threshold: 0.2 }
    );
    document.querySelectorAll<HTMLElement>("[data-loop]").forEach((el) => player.observe(el));

    const flow = document.querySelector<HTMLElement>("[data-signal]");
    let stepper: IntersectionObserver | null = null;
    if (flow && !CSS.supports("animation-timeline: view()")) {
      const steps = Array.from(flow.querySelectorAll<HTMLElement>(":scope > section"));
      const n = Math.max(steps.length, 1);
      flow.style.setProperty("--progress", String(0.5 / n));
      stepper = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (!e.isIntersecting) continue;
            const i = steps.indexOf(e.target as HTMLElement);
            if (i >= 0) flow.style.setProperty("--progress", String((i + 1) / n));
          }
        },
        { rootMargin: "-50% 0px -50% 0px", threshold: 0 }
      );
      steps.forEach((el) => stepper?.observe(el));
    }

    return () => {
      revealer.disconnect();
      player.disconnect();
      stepper?.disconnect();
      flow?.style.removeProperty("--progress");
    };
  }, [pathname]);

  return null;
}
