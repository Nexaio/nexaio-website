import type { ReactNode } from "react";
import { mediaSlots } from "../content/media";

/**
 * A cinematic slot. With an approved asset it plays silent, looping footage (or
 * shows a still) as decoration. Without one it renders a lit surface in CSS:
 * a deep gradient, a fine hairline grid and one soft light source (warm, cool
 * or daylight). It is plainly a surface, never passes for footage, and never
 * shows a play control.
 *
 * `float` places a product fragment (a sample-labelled recreated view) on the
 * surface; `children` sit in the lower overlay band.
 */
export default function MediaSlot({
  slot,
  shape = "wide",
  float,
  children,
}: {
  slot: keyof typeof mediaSlots;
  shape?: "wide" | "tall";
  float?: ReactNode;
  children?: ReactNode;
}) {
  const media = mediaSlots[slot];
  const asset = media?.asset ?? null;
  const fallback = media?.fallback ?? "warm";

  return (
    <div className={`media media--${shape} media--${asset ? "asset" : fallback}${float ? " has-float" : ""}`}>
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
        <div className="media-surface" aria-hidden="true" />
      )}
      <div className="media-shade" aria-hidden="true" />
      {float ? <div className="media-float">{float}</div> : null}
      {children ? <div className="media-over">{children}</div> : null}
    </div>
  );
}
