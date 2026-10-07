"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { journey } from "../content/journey";
import AiCore from "./AiCore";

/**
 * "Watch one enquiry" (V2.2 packet §2). One sample enquiry, carried by the
 * Core through six stations.
 *
 * - Large screens, with script and motion: a sticky frame (never pinned or
 *   scroll-jacked: the page scrolls normally). Invisible step markers below
 *   the frame cross the middle of the viewport as you scroll; each one moves
 *   the track one station and sets the Core's state.
 * - Small screens: a vertical list; each station lights as it enters.
 * - No script or reduced motion: every station is shown, complete and static.
 *
 * The stations are an ordered list of real text. Nothing here is a live
 * account or a product screen.
 */
export default function SignalJourney() {
  const { stations } = journey;
  const n = stations.length;
  const [active, setActive] = useState(0);
  const markers = useRef<(HTMLDivElement | null)[]>([]);
  const items = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const stepper = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const i = Number((e.target as HTMLElement).dataset.step);
          if (!Number.isNaN(i)) setActive(i);
        }
      },
      { rootMargin: "-50% 0px -50% 0px", threshold: 0 }
    );
    markers.current.forEach((el) => el && stepper.observe(el));

    const lighter = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-lit");
            lighter.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -30% 0px", threshold: 0.3 }
    );
    items.current.forEach((el) => el && lighter.observe(el));

    return () => {
      stepper.disconnect();
      lighter.disconnect();
    };
  }, []);

  // Keep the last stations from leaving empty track behind them.
  const shift = Math.min(active, n - 3);

  return (
    <div className="jr" style={{ "--n": n, "--shift": shift, "--p": (active + 1) / n } as CSSProperties}>
      <div className="jr-sticky">
        <div className="jr-frame">
          <div className="jr-carrier">
            <AiCore size="md" state={stations[active].core} />
            <div className="jr-card">
              <span className="view-tag">{journey.sampleTag}</span>
              <b>{journey.sample}</b>
            </div>
          </div>
          <div className="jr-window">
            <ol className="jr-track">
              {stations.map((s, i) => (
                <li
                  key={s.id}
                  ref={(el) => {
                    items.current[i] = el;
                  }}
                  className={`jr-station${i === active ? " is-on" : ""}${i < active ? " is-done" : ""}`}
                >
                  <span className="jr-dot" aria-hidden="true">
                    <AiCore size="xs" state={s.core} />
                  </span>
                  <span className="jr-n">{String(i + 1).padStart(2, "0")}</span>
                  <b className="jr-step">{s.step}</b>
                  <span className="jr-chip">{s.chip}</span>
                  <span className="jr-line">{s.line}</span>
                </li>
              ))}
            </ol>
          </div>
          <div className="jr-progress" aria-hidden="true">
            <span />
          </div>
        </div>
      </div>
      <div className="jr-markers" aria-hidden="true">
        {stations.map((s, i) => (
          <div
            key={s.id}
            data-step={i}
            ref={(el) => {
              markers.current[i] = el;
            }}
          />
        ))}
      </div>
    </div>
  );
}
