import Image from "next/image";
import { brand, site } from "../content/site";

/**
 * The Nexaio lockup (V2.2 packet §4), switched by `brand.markVariant` in
 * content/site.ts:
 *
 * - "refined": a vector redraw of the split-stroke N. Both strokes sit on one
 *   16° italic axis with square outer terminals and a rounded inner elbow;
 *   the two halves are point-symmetric, the diagonal gap is 1/8 of the stem
 *   and holds a small ice rhombus, the Core. Static everywhere (the header
 *   never animates); the large hero mark is the Core itself (AiCore).
 * - "current": the canonical PNG, exactly as before.
 *
 * Canonical PNGs, favicon, app icons and the share image are never touched,
 * so reverting is one value.
 */

export const markPaths = {
  left: "M100 820L256 820L399.9 318L543.8 550L595 371.3L468.9 168C438.2 118.4 307.2 97.3 292.1 150Z",
  right: "M891.2 156L735.2 156L591.2 658L447.4 426L396.2 604.7L522.2 808C553 857.6 684 878.7 699.1 826Z",
  core: "M517.2 522.8L488.6 492.3L474 453.2L502.6 483.7Z",
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
      <path d={markPaths.left} fill="currentColor" />
      <path d={markPaths.right} fill="currentColor" />
      <path className="nmark-core" d={markPaths.core} fill="#8ac8ff" />
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
