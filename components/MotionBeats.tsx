"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Three beats beside one sticky product stage. As a beat's text crosses the
 * middle of the viewport, the stage shows that beat's product view. Nothing
 * scroll-jacks: the page scrolls normally, and on small screens each beat
 * shows its own view inline instead (see .beat-inline in globals.css).
 *
 * Each view is rendered twice, but only one copy is ever displayed: the stage
 * is display:none on small screens and the inline copies are display:none on
 * large ones, so assistive technology meets each view once.
 */
export default function MotionBeats({
  beats,
}: {
  beats: { id: string; index: string; title: string; body: string; view: ReactNode }[];
}) {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            const i = Number((e.target as HTMLElement).dataset.beat);
            if (!Number.isNaN(i)) setActive(i);
          }
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="beats">
      <div className="beat-list">
        {beats.map((b, i) => (
          <article
            key={b.id}
            id={b.id}
            data-beat={i}
            ref={(el) => {
              refs.current[i] = el;
            }}
            className={`beat${i === active ? " is-on" : ""}`}
          >
            <span className="idx">{b.index}</span>
            <h3 className="h3">{b.title}</h3>
            <p className="body">{b.body}</p>
            <div className="beat-inline">{b.view}</div>
          </article>
        ))}
      </div>
      <div className="beat-stage">
        {beats.map((b, i) => (
          <div key={b.id} className={`beat-view${i === active ? " is-on" : ""}`}>
            {b.view}
          </div>
        ))}
      </div>
    </div>
  );
}
