"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { journey } from "../content/journey";
import AiCore from "./AiCore";

/**
 * "Watch one enquiry" (V2.3): one sample enquiry handled by the AI, shown as
 * a console with the thread on one side and the timeline on the other, so it
 * is obvious who did what.
 *
 * It plays by time, not by scroll: while the console is on screen the active
 * station advances every few seconds, the thread fills in, and the run loops
 * with a pause at the end. Nothing is pinned, nothing dims to illegibility,
 * and the page scrolls normally. Under reduced motion, or without script or
 * IntersectionObserver, the whole run is shown complete and still.
 */
const STEP_MS = 2600;
const HOLD_MS = 3800;

export default function SignalJourney() {
  const { stations } = journey;
  const n = stations.length;
  const [active, setActive] = useState(n - 1);
  const [playing, setPlaying] = useState(false);
  const box = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = box.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setPlaying(e.isIntersecting), { threshold: 0.35 });
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

  const shown = stations.slice(0, active + 1);
  const current = stations[active];

  return (
    <div className="jr" ref={box} data-state={playing ? "playing" : "still"} style={{ "--p": (active + 1) / n } as CSSProperties}>
      <div className="jr-side">
        <div className="jr-presence">
          <AiCore size="sm" state={current.core} />
          <div className="jr-card">
            <span className="view-tag">{journey.sampleTag}</span>
            <b>{journey.sample}</b>
          </div>
        </div>
        <div className="jr-thread" aria-live="off">
          {shown.map((s) =>
            s.msg ? (
              <div key={s.id} className={`jr-msg jr-msg--${s.msg.from}`}>
                <small>{s.msg.from === "ai" ? journey.byAi : journey.customer}</small>
                {s.msg.text}
              </div>
            ) : null
          )}
          {current.id === "handoff" || active >= 4 ? (
            <div className="jr-msg jr-msg--note">
              <small>{journey.byPerson}</small>
              {stations[4].line}
            </div>
          ) : null}
        </div>
      </div>
      <ol className="jr-timeline">
        {stations.map((s, i) => (
          <li key={s.id} className={`jr-st${i === active ? " is-on" : ""}${i < active ? " is-done" : ""}${i > active ? " is-next" : ""}`}>
            <span className="jr-time">{s.time}</span>
            <span className="jr-mark" aria-hidden="true" />
            <div className="jr-body">
              <b className="jr-step">
                {s.step}
                <em className={`jr-who jr-who--${s.who}`}>{s.who === "ai" ? journey.aiTag : journey.byPerson}</em>
              </b>
              <span className="jr-line">{s.line}</span>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
