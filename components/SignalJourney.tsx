"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { journey } from "../content/journey";

/**
 * "Watch one enquiry" (V2.3 repair): six plain steps on one line (a column
 * on small screens), each with its time, what happened, who did it (AI or
 * Dana) and one short line. While the strip is on screen the active step
 * advances every few seconds and loops; every step stays fully legible.
 * Under reduced motion, or without script, the whole run is shown complete
 * and still. It is a labelled sample, never a live account.
 */
const STEP_MS = 2400;
const HOLD_MS = 3600;

export default function SignalJourney() {
  const { stations } = journey;
  const n = stations.length;
  const [active, setActive] = useState(n - 1);
  const [playing, setPlaying] = useState(false);
  const box = useRef<HTMLOListElement | null>(null);

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = box.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setPlaying(e.isIntersecting), { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!playing) return;
    setActive(0);
    let i = 0;
    let timer = 0;
    const tick = () => {
      i = (i + 1) % n;
      setActive(i);
      timer = window.setTimeout(tick, i === n - 1 ? HOLD_MS : STEP_MS);
    };
    timer = window.setTimeout(tick, STEP_MS);
    return () => window.clearTimeout(timer);
  }, [playing, n]);

  return (
    <div className="jr" data-state={playing ? "playing" : "still"} style={{ "--p": (active + 1) / n, "--n": n } as CSSProperties}>
      <div className="jr-head">
        <span className="view-tag">{journey.sampleTag}</span>
        <b>{journey.sample}</b>
      </div>
      <ol className="jr-steps" ref={box}>
        {stations.map((s, i) => (
          <li key={s.id} className={`jr-st${i === active ? " is-on" : ""}${i < active ? " is-done" : ""}`} style={{ "--k": i } as CSSProperties}>
            <span className="jr-time">{s.time}</span>
            <span className="jr-mark" aria-hidden="true" />
            <b className="jr-step">{s.step}</b>
            <em className={`jr-who jr-who--${s.who}`}>{s.who === "ai" ? journey.aiTag : journey.byPerson}</em>
            <span className="jr-line">{s.line}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
