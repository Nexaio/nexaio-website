import Image from "next/image";
import { brand, site } from "../content/site";

/**
 * The Nexaio lockup, switched by `brand.markVariant` in content/site.ts:
 *
 * - "refined": a vector redraw of the split-stroke N. Both strokes sit on one
 *   16° italic axis with square outer terminals and a rounded inner elbow;
 *   the two halves are point-symmetric and the diagonal gap is 1/8 of the
 *   stem. A small soft point of silver-blue light sits in the gap: the same
 *   atmosphere as the Quantum Nebula, at the smallest scale. Static
 *   everywhere; the header never animates. (V2.3: no rhombus anywhere.)
 * - "current": the canonical PNG, exactly as before.
 *
 * Canonical PNGs, favicon, app icons and the share image are never touched,
 * so reverting is one value.
 */

export const markPaths = {
  left: "M100 820L256 820L399.9 318L543.8 550L595 371.3L468.9 168C438.2 118.4 307.2 97.3 292.1 150Z",
  right: "M891.2 156L735.2 156L591.2 658L447.4 426L396.2 604.7L522.2 808C553 857.6 684 878.7 699.1 826Z",
  viewBox: "80 74 832 828",
};

export function NMark({ size = 24, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      className={`nmark ${className}`}
      width={size}
      height={size}
      viewBox={markPaths.viewBox}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <radialGradient id="nmark-light" cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#e2eeff" />
          <stop offset="0.45" stopColor="#aacdf5" stopOpacity="0.9" />
          <stop offset="1" stopColor="#4e84c8" stopOpacity="0" />
        </radialGradient>
      </defs>
      <path d={markPaths.left} fill="currentColor" />
      <path d={markPaths.right} fill="currentColor" />
      <circle className="nmark-light" cx="495.6" cy="488" r="30" fill="url(#nmark-light)" />
    </svg>
  );
}

export default function BrandMark({ priority = false }: { priority?: boolean }) {
  if (brand.markVariant === "current") {
    return (
      <>
        <Image src="/nexaio-logo-light.png" alt="" width={24} height={24} priority={priority} />
        <span className="brand-name">{site.name}</span>
      </>
    );
  }
  return (
    <>
      <NMark size={24} />
      <span className="brand-name brand-name--refined">{site.name}</span>
    </>
  );
}
