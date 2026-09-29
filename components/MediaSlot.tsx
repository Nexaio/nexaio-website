import type { ReactNode } from "react";
import { mediaSlots, type MediaSlot as Slot } from "../content/media";

/**
 * A cinematic slot. With an approved asset it plays silent, looping footage (or
 * shows a still) as decoration. Without one it draws a quiet composition in
 * code (dusk, storm or daylight) from lines and gradients. The fallback is
 * plainly a graphic, so it never passes for footage, and it never shows a
 * play control.
 */
export default function MediaSlot({
  slot,
  shape = "wide",
  children,
}: {
  slot: keyof typeof mediaSlots;
  shape?: "wide" | "tall";
  children?: ReactNode;
}) {
  const media = mediaSlots[slot];
  const asset = media?.asset ?? null;
  const fallback = media?.fallback ?? "dusk";

  return (
    <div className={`media media--${shape} media--${asset ? "asset" : fallback}`}>
      {asset?.kind === "video" ? (
        <video
          src={asset.src}
          poster={asset.poster}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
        />
      ) : asset?.kind === "image" ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={asset.src} alt={asset.alt} loading="lazy" />
      ) : (
        <svg
          className="media-art"
          viewBox="0 0 1200 520"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
          focusable="false"
        >
          <Art kind={fallback} />
        </svg>
      )}
      <div className="media-shade" aria-hidden="true" />
      {children ? <div className="media-over">{children}</div> : null}
    </div>
  );
}

// The sky of each composition is a CSS background on .media--<kind>
// (globals.css), so the SVG holds only shapes and needs no gradient ids: the
// same slot can appear twice on a page (e.g. inline and on a sticky stage).
function Art({ kind }: { kind: Slot["fallback"] }) {
  if (kind === "storm") return <Storm />;
  if (kind === "daylight") return <Daylight />;
  return <Dusk />;
}

/** Dusk over rooftops: warm horizon, hairline grid, ridge lines picked out in ice. */
function Dusk() {
  return (
    <>
      <g stroke="rgba(170,196,230,0.10)" strokeWidth="1">
        {Array.from({ length: 13 }).map((_, i) => (
          <line key={i} x1={i * 100} y1="0" x2={i * 100} y2="520" />
        ))}
      </g>
      <polygon points="0,520 0,380 230,260 460,380 460,520" fill="#070B12" />
      <polygon points="420,520 420,400 700,280 980,400 980,520" fill="#05080F" />
      <polygon points="930,520 930,420 1080,340 1200,410 1200,520" fill="#070B12" />
      <line x1="230" y1="260" x2="460" y2="380" stroke="rgba(138,200,255,0.35)" strokeWidth="1.2" />
      <line x1="700" y1="280" x2="980" y2="400" stroke="rgba(138,200,255,0.35)" strokeWidth="1.2" />
    </>
  );
}

/** A storm passing over a street: cool sky, fine rain, a break of light low on the horizon. */
function Storm() {
  const houses = [
    [40, 250],
    [290, 200],
    [500, 260],
    [760, 210],
    [980, 240],
  ];
  return (
    <>
      <g stroke="rgba(170,196,230,0.07)" strokeWidth="1">
        {Array.from({ length: 48 }).map((_, i) => (
          <line key={i} x1={i * 28} y1="0" x2={i * 28 - 90} y2="520" />
        ))}
      </g>
      {houses.map(([x, w]) => (
        <polygon
          key={x}
          points={`${x},520 ${x},420 ${x + w / 2},352 ${x + w},420 ${x + w},520`}
          fill="#05080F"
        />
      ))}
      {houses.map(([x, w]) => (
        <line
          key={`r-${x}`}
          x1={x}
          y1="420"
          x2={x + w / 2}
          y2="352"
          stroke="rgba(138,200,255,0.28)"
          strokeWidth="1.1"
        />
      ))}
      <line x1="0" y1="519" x2="1200" y2="519" stroke="rgba(170,196,230,0.12)" />
    </>
  );
}

/** Field Daylight: morning light through tall windows. */
function Daylight() {
  return (
    <>
      <polygon points="120,0 360,0 900,520 520,520" fill="#FFFFFF" fillOpacity="0.2" />
      <polygon points="470,0 610,0 1130,520 900,520" fill="#FFFFFF" fillOpacity="0.12" />
      <g stroke="#1B2533" strokeOpacity="0.55">
        {Array.from({ length: 7 }).map((_, i) => (
          <line key={i} x1={i * 200} y1="0" x2={i * 200} y2="520" strokeWidth="10" />
        ))}
        <line x1="0" y1="190" x2="1200" y2="190" strokeWidth="6" />
      </g>
      <rect y="440" width="1200" height="80" fill="#1B2533" fillOpacity="0.55" />
    </>
  );
}
