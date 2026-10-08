import QuantumNebula from "./QuantumNebula";

export type CoreState = "idle" | "listening" | "working" | "handoff";

/**
 * Nexaio's AI presence (V2.3 repair).
 *
 * - `size="hero"`: the reference-locked ambient field (components/QuantumNebula.tsx),
 *   anchored inside the section that renders it.
 * - every other size: a small static spark glyph — a point of silver-blue
 *   light with four soft rays. No orb, no ring, no rhombus, no circle; it is a
 *   piece of the same atmosphere at the smallest scale and marks where the AI
 *   acts in a diagram. `state` only tints it (handoff = amber).
 */
export default function AiCore({
  state = "idle",
  size = "md",
  className = "",
}: {
  state?: CoreState;
  size?: "hero" | "lg" | "md" | "sm" | "xs";
  className?: string;
}) {
  if (size === "hero") return <QuantumNebula />;
  return (
    <svg
      className={`spark spark--${size}${className ? ` ${className}` : ""}`}
      data-state={state}
      viewBox="-20 -20 40 40"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <radialGradient id={`spark-g-${state}`} cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="currentColor" stopOpacity="0.9" />
          <stop offset="0.5" stopColor="currentColor" stopOpacity="0.28" />
          <stop offset="1" stopColor="currentColor" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle r="18" fill={`url(#spark-g-${state})`} />
      <path d="M0 -13 L1.6 -1.6 L13 0 L1.6 1.6 L0 13 L-1.6 1.6 L-13 0 L-1.6 -1.6 Z" fill="currentColor" opacity="0.95" />
    </svg>
  );
}
