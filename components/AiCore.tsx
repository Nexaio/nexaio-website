import type { CSSProperties } from "react";
import QuantumNebula from "./QuantumNebula";

export type CoreState = "idle" | "listening" | "working" | "handoff";

/**
 * Nexaio's AI presence (V2.3). Two forms of the same Quantum Nebula:
 *
 * - `size="hero"`: the living field itself, drawn procedurally on a canvas
 *   behind the whole page (components/QuantumNebula.tsx).
 * - every other size: a small CSS-only nebula orb — three layered cloud
 *   gradients that slowly turn and breathe, two hairline strands and a few
 *   particles. Transform and opacity only; it plays while on screen
 *   (`data-loop`, components/Motion.tsx) and sits still under reduced motion.
 *
 * No rhombus, no ring, no icon: the orb is a piece of the same atmosphere.
 * States shade the orb (listening = calmer, working = brighter streams,
 * handoff = one amber particle leaves toward a person). Decorative only: the
 * words around it carry the meaning.
 */

const PARTICLES: [number, number, number][] = [
  [24, 40, 0],
  [76, 32, 1.1],
  [70, 70, 2.3],
  [32, 68, 3.2],
  [16, 54, 4.4],
  [84, 52, 0.6],
  [44, 18, 1.8],
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
  /** Kept for callers; the orb has no one-shot glint. */
  glint?: boolean;
  className?: string;
}) {
  if (size === "hero") return <QuantumNebula />;
  void glint;
  return (
    <div
      className={`core core--${size}${className ? ` ${className}` : ""}`}
      data-state={state}
      data-loop=""
      aria-hidden="true"
    >
      <span className="core-cloud core-cloud--a" />
      <span className="core-cloud core-cloud--b" />
      <span className="core-cloud core-cloud--c" />
      {size === "xs" ? null : (
        <svg className="core-net" viewBox="-50 -50 100 100" focusable="false">
          <path d="M-46 -8C-30 -22 -8 -20 4 -6S26 10 44 -2" />
          <path d="M-40 18C-22 30 -4 18 8 26S30 34 46 16" />
          <path d="M-12 -44C-4 -24 -10 -4 2 12S10 34 6 46" />
        </svg>
      )}
      <span className="core-heart" />
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
