/**
 * Cinematic media slots (the "Field Daylight" moments).
 *
 * Each slot renders a designed composition until real footage or stills are
 * approved. To drop in an asset: put the files in public/media/, set `asset`,
 * and fill in the approval record. Generated footage is allowed only as brand
 * mood: never a product screen, a customer, a testimonial, a real company's
 * branding, or an implied real job or place.
 *
 * `generated` must say whether the asset came from a video or image model, so
 * the page can label it when needed. Keep this file free of imports.
 */

export type MediaAsset = {
  kind: "video" | "image";
  /** File under public/media/. Video: muted, looping MP4 (≈2–4 MB) plus a poster. */
  src: string;
  poster?: string;
  alt: string;
  generated: boolean;
  approval: { approvedBy: string; approvedOn: string; reviewBy: string; notes: string };
};

export type MediaSlot = {
  id: string;
  /** What the slot should eventually show; used as the design brief. */
  brief: string;
  /** The coded composition drawn until an asset is approved. */
  fallback: "dusk" | "storm" | "daylight";
  asset: MediaAsset | null;
};

export const mediaSlots: Record<string, MediaSlot> = {
  roofingHero: {
    id: "roofingHero",
    brief: "Wide, film-graded dusk shot: a roofing crew finishing a roof, truck in frame, no readable branding.",
    fallback: "dusk",
    asset: null,
  },
  roofingStorm: {
    id: "roofingStorm",
    brief: "Storm clouds breaking over a residential street; calm, not dramatic; no damage close-ups.",
    fallback: "storm",
    asset: null,
  },
  companyOperations: {
    id: "companyOperations",
    brief: "An office at the start of the day: phones, screens out of focus, people unrecognisable.",
    fallback: "daylight",
    asset: null,
  },
};
