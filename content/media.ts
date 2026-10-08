/**
 * Media: the reference-locked ambient field, the cinematic media slots and
 * the explainer video record. Keep this file free of imports.
 */

/**
 * The ambient field plate (V2.3 repair, Website canonical r37 / route r323).
 * The founders' wide midnight-navy reference is used directly as the hero
 * plate for the protected founder preview. Usage rights for public
 * production use are NOT cleared: before any Production release the plate
 * must be replaced by licensed or original artwork of equivalent composition
 * (or its rights cleared) and `rightsCleared` flipped with the receipt.
 */
export const nebulaPlate = {
  src: "/media/nexaio-nebula-reference.webp",
  /** Darker, softened still of the same field for section and page atmospheres. */
  ambient: "/media/nexaio-nebula-poster.webp",
  width: 2000,
  height: 1332,
  provenance: "Uploaded reference IMG_6418 (2026-10-08), sha256 65a92a68…; copied unchanged into public/media/.",
  scope: "preview-only" as const,
  rightsCleared: false,
};

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
  /** Until an asset is approved every slot shows the ambient navy field. */
  fallback: "navy";
  asset: MediaAsset | null;
};

export const mediaSlots: Record<string, MediaSlot> = {
  roofingHero: {
    id: "roofingHero",
    brief: "Wide, film-graded dusk shot: a roofing crew finishing a roof, truck in frame, no readable branding.",
    fallback: "navy",
    asset: null,
  },
  roofingStorm: {
    id: "roofingStorm",
    brief: "Storm clouds breaking over a residential street; calm, not dramatic; no damage close-ups.",
    fallback: "navy",
    asset: null,
  },
  companyOperations: {
    id: "companyOperations",
    brief: "An office at the start of the day: phones, screens out of focus, people unrecognisable.",
    fallback: "navy",
    asset: null,
  },
};

/**
 * The explainer video (V2.3): a short motion-graphics film rendered from the
 * site's own visual language (no stock footage, no third-party assets, no
 * voice). It renders directly below the homepage hero ONLY when this record is
 * complete: every file under public/media/, open captions or a WebVTT track,
 * a transcript, and an approval record naming who approved it for the current
 * stage, when, when it must be re-checked, the rights behind it and who
 * checked the on-screen text. Until then nothing renders in its place.
 */
export type ExplainerVideo = {
  /** Used above the player and as the VideoObject name. Include "Nexaio". */
  title: string;
  /** One or two sentences; also the VideoObject description. */
  description: string;
  /** H.264 MP4 under public/media/. */
  src: string;
  /** WebM under public/media/. */
  webmSrc: string;
  /** 16:9 poster frame under public/media/. */
  poster: string;
  /**
   * Captions: either a WebVTT file under public/media/ (`captionsSrc`) or
   * open captions burned into the picture (`openCaptions: true`, in which
   * case every spoken-equivalent line is on screen and in `transcript`).
   */
  captionsSrc: string | null;
  openCaptions: boolean;
  /** ISO 8601 duration, e.g. "PT42S". */
  duration: string;
  /** Date first published to a preview, e.g. "2026-10-08". */
  uploadDate: string;
  /** Every on-screen line, in order. */
  transcript: string[];
  /** True if any imagery came from a generative model (none here). */
  generated: boolean;
  /** Which approval stage this record represents. */
  stage: "preview" | "public";
  approval: {
    approvedBy: string;
    approvedOn: string;
    /** Date by which the film must be re-checked against the product. */
    reviewBy: string;
    /** Rights behind footage, music, voice and fonts. */
    rights: string;
    /** Who checked the on-screen text / captions. */
    captions: string;
  };
};

/**
 * Preview cut, 42 s, 1920×1080, 30 fps, rendered from the storyboard page in
 * the evidence kit (headless Chrome, MediaRecorder: VP9 WebM + H.264 MP4) over
 * the site's own ambient field. Open captions: every line is on screen and in
 * the transcript. Stage "preview": not yet approved for public release.
 */
export const explainerVideo: ExplainerVideo | null = {
  title: "Nexaio in 42 seconds",
  description: "What the AI agents do around your CRM, in 42 seconds.",
  src: "/media/nexaio-explainer.mp4",
  webmSrc: "/media/nexaio-explainer.webm",
  poster: "/media/nexaio-explainer-poster.webp",
  captionsSrc: null,
  openCaptions: true,
  duration: "PT42S",
  uploadDate: "2026-10-08",
  transcript: [
    "Every home-service business runs on enquiries.",
    "Your CRM keeps the record. The work between the systems still falls on people.",
    "Nexaio adds AI agents around the systems you already use.",
    "They acknowledge, route and follow up, in your wording, on your timing.",
    "When the customer replies, the chase stops.",
    "People only get the real exceptions, with the whole thread.",
    "Keep your CRM. Add the AI that does the work.",
  ],
  generated: false,
  stage: "preview",
  approval: {
    approvedBy: "Preview cut prepared by the Website builder for the protected preview; public release approval pending",
    approvedOn: "2026-10-08",
    reviewBy: "2026-11-08",
    rights: "Original motion graphics rendered from site source (evidence/…/gates/explainer/storyboard.html); backdrop is the ambient poster derived from the uploaded reference plate, so the same preview-only rights limit applies; no stock footage, music, voice or third-party assets; Geist fonts under the SIL Open Font License",
    captions: "Open captions checked line by line against the transcript by the builder; no audio track",
  },
};

/** True only for a complete record. The single render condition. */
export function explainerReady(v: ExplainerVideo | null): v is ExplainerVideo {
  if (!v) return false;
  const filled = (x: unknown) => typeof x === "string" && x.trim() !== "";
  const files = [v.src, v.webmSrc, v.poster, ...(v.captionsSrc ? [v.captionsSrc] : [])];
  const captioned = v.openCaptions === true || filled(v.captionsSrc);
  return (
    [v.title, v.description, v.duration, v.uploadDate, ...files].every(filled) &&
    files.every((f) => f.startsWith("/media/")) &&
    captioned &&
    /^PT(\d+H)?(\d+M)?(\d+S)?$/.test(v.duration) &&
    v.duration !== "PT" &&
    !Number.isNaN(Date.parse(v.uploadDate)) &&
    Array.isArray(v.transcript) &&
    v.transcript.length > 0 &&
    v.transcript.every(filled) &&
    typeof v.generated === "boolean" &&
    (v.stage === "preview" || v.stage === "public") &&
    [v.approval?.approvedBy, v.approval?.approvedOn, v.approval?.reviewBy, v.approval?.rights, v.approval?.captions].every(filled)
  );
}
