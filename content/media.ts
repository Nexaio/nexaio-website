/**
 * Cinematic media slots (the "Field Daylight" moments).
 *
 * Each slot renders a lit surface (CSS only) until real footage or stills are
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
  /** The lit surface drawn until an asset is approved (warm, cool or daylight light source). */
  fallback: "warm" | "cool" | "daylight";
  asset: MediaAsset | null;
};

export const mediaSlots: Record<string, MediaSlot> = {
  roofingHero: {
    id: "roofingHero",
    brief: "Wide, film-graded dusk shot: a roofing crew finishing a roof, truck in frame, no readable branding.",
    fallback: "warm",
    asset: null,
  },
  roofingStorm: {
    id: "roofingStorm",
    brief: "Storm clouds breaking over a residential street; calm, not dramatic; no damage close-ups.",
    fallback: "cool",
    asset: null,
  },
  companyOperations: {
    id: "companyOperations",
    brief: "An office at the start of the day: phones, screens out of focus, people unrecognisable.",
    fallback: "daylight",
    asset: null,
  },
};

/**
 * The explainer video (V2.2 packet §5): a 60-second film of the Core carrying
 * one enquiry. It renders on the homepage (under the hero) and at the top of
 * /demo ONLY when `explainerVideo` is set AND its record is complete:
 * every file under public/media/, captions, transcript, and an approval
 * record naming who approved it, when, when it must be re-checked, and the
 * rights and licences behind the footage, music and voice. Until then the
 * site renders nothing in its place: no placeholder, no slot, no notice.
 *
 * No asset exists yet (V2.2-B "explainer asset" produces it).
 */
export type ExplainerVideo = {
  /** Used above the player and as the VideoObject name. Include "Nexaio". */
  title: string;
  /** One or two sentences; also the VideoObject description. */
  description: string;
  /** H.264 MP4 under public/media/ (1920×1080, ≤ 8 MB). */
  src: string;
  /** WebM under public/media/. */
  webmSrc: string;
  /** 16:9 poster frame under public/media/ (1920×1080). */
  poster: string;
  /** English WebVTT captions under public/media/, on by default. */
  captionsSrc: string;
  /** ISO 8601 duration, e.g. "PT60S". */
  duration: string;
  /** Date first published on nexaio.co, e.g. "2026-10-20". */
  uploadDate: string;
  /** Full transcript, one paragraph per entry. */
  transcript: string[];
  /** True if any imagery or voice came from a generative model. */
  generated: boolean;
  approval: {
    approvedBy: string;
    approvedOn: string;
    /** Date by which the film must be re-checked against the product. */
    reviewBy: string;
    /** Footage, music, voice and font licences, and any consents. */
    rights: string;
    /** Who checked the captions against the narration. */
    captions: string;
  };
};

export const explainerVideo: ExplainerVideo | null = null;

/** True only for a complete, approved record. The single render condition. */
export function explainerReady(v: ExplainerVideo | null): v is ExplainerVideo {
  if (!v) return false;
  const filled = (x: unknown) => typeof x === "string" && x.trim() !== "";
  const files = [v.src, v.webmSrc, v.poster, v.captionsSrc];
  return (
    [v.title, v.description, v.duration, v.uploadDate, ...files].every(filled) &&
    files.every((f) => f.startsWith("/media/")) &&
    /^PT(\d+H)?(\d+M)?(\d+S)?$/.test(v.duration) &&
    v.duration !== "PT" &&
    !Number.isNaN(Date.parse(v.uploadDate)) &&
    Array.isArray(v.transcript) &&
    v.transcript.length > 0 &&
    v.transcript.every(filled) &&
    typeof v.generated === "boolean" &&
    [v.approval?.approvedBy, v.approval?.approvedOn, v.approval?.reviewBy, v.approval?.rights, v.approval?.captions].every(filled)
  );
}
