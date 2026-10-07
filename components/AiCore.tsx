import type { CSSProperties } from "react";

export type CoreState = "idle" | "listening" | "working" | "handoff";

/**
 * The Nexaio Core (V2.2 packet §2): an original AI presence derived from the
 * gap in the N mark. A slim luminous rhombus on the mark's diagonal, two
 * hairline orbit rings and eight micro data particles. Built from inline SVG
 * and CSS only: no canvas, no WebGL, no script.
 *
 * States (globals.css, transform and opacity only):
 * - idle: a slow 8 s breathe;
 * - listening: the rings tighten and particles drift in;
 * - working: particles stream through the Core;
 * - handoff: one amber particle detaches toward a person.
 *
 * Motion runs only while the Core is on screen (`data-loop`, see Motion.tsx)
 * and never under reduced motion, where the idle frame is shown, complete and
 * static. The Core is decorative: the words around it carry the meaning.
 */

/** Particle resting positions (% of the Core box) and a per-particle delay. */
const PARTICLES: [number, number, number][] = [
  [22, 38, 0],
  [78, 30, 1.1],
  [70, 70, 2.3],
  [30, 68, 3.2],
  [14, 54, 4.4],
  [86, 50, 0.6],
  [42, 18, 1.8],
  [58, 84, 2.9],
];

export default function AiCore({
  state = "idle",
  size = "md",
  glint = false,
  className = "",
}: {
  state?: CoreState;
  size?: "hero" | "lg" | "md" | "sm" | "xs";
  /** One 600 ms glint on first load (the hero Core only). */
  glint?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`core core--${size}${glint ? " core--glint" : ""}${className ? ` ${className}` : ""}`}
      data-state={state}
      data-loop=""
      aria-hidden="true"
    >
      {size === "hero" || size === "lg" ? <span className="core-beam" /> : null}
      <span className="core-halo" />
      <svg className="core-ring core-ring--a" viewBox="-100 -100 200 200" focusable="false">
        <ellipse rx="96" ry="34" />
      </svg>
      <svg className="core-ring core-ring--b" viewBox="-100 -100 200 200" focusable="false">
        <ellipse rx="78" ry="24" />
      </svg>
      <svg className="core-gem" viewBox="-100 -100 200 200" focusable="false">
        <g transform="rotate(-32)">
          <path className="gem-body" d="M0 -62L21 0L0 62L-21 0Z" />
          <path className="gem-edge" d="M0 -62L21 0L0 62" />
          <path className="gem-heart" d="M0 -34L7 0L0 34L-7 0Z" />
        </g>
      </svg>
      {glint ? <span className="core-glint" /> : null}
      {size === "xs"
        ? null
        : PARTICLES.map(([x, y, d], i) => (
            <span
              key={i}
              className={`core-p${i === 0 ? " core-p--lead" : ""}`}
              style={{ "--px": x, "--py": y, "--d": `${d}s` } as CSSProperties}
            />
          ))}
    </div>
  );
}
