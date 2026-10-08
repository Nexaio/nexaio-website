import type { ReactNode } from "react";
import { mediaSlots, nebulaPlate } from "../content/media";

/**
 * A cinematic slot. With an approved asset it plays silent, looping footage
 * (or shows a still) as decoration. Without one it shows the ambient navy
 * field: the darker still of the reference-locked plate (V2.3), the same
 * atmosphere as the homepage, never a lit white surface, never a player.
 * `children` sit in the lower overlay band.
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

  return (
    <div className={`media media--${shape} media--${asset ? "asset" : "navy"}`}>
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
        // eslint-disable-next-line @next/next/no-img-element
        <img className="media-ambient" src={nebulaPlate.ambient} alt="" loading="lazy" decoding="async" />
      )}
      <div className="media-shade" aria-hidden="true" />
      {children ? <div className="media-over">{children}</div> : null}
    </div>
  );
}
