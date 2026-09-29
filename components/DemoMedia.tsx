import { demoVideo } from "../content/demo";

/**
 * The demo video slot.
 *
 * With an approved video in content/demo.ts it renders a native player with
 * captions. Without one it renders a clearly labelled "in production" panel:
 * no play button, no progress bar and no duration, so it can't be mistaken
 * for a player.
 */
export default function DemoMedia({ headingId }: { headingId: string }) {
  if (demoVideo) {
    return (
      <figure className="dm dm--video">
        <video
          className="dm-player"
          controls
          preload="metadata"
          playsInline
          poster={demoVideo.poster}
          aria-describedby={headingId}
        >
          <source src={demoVideo.src} type={demoVideo.mimeType} />
          <track
            kind="captions"
            src={demoVideo.captionsSrc}
            srcLang="en"
            label="English"
            default
          />
          Your browser can’t play this video. <a href={demoVideo.src}>Download the video</a>.
        </video>
        <figcaption className="dm-caption" id={headingId}>
          {demoVideo.title}. Recorded on a demonstration workspace with sample data.
        </figcaption>
      </figure>
    );
  }

  return (
    <section className="dm dm--pending" aria-labelledby={headingId}>
      <div className="dm-art" aria-hidden="true">
        <span className="dm-art-card dm-art-card--a" />
        <span className="dm-art-card dm-art-card--b" />
        <span className="dm-art-card dm-art-card--c" />
      </div>
      <div className="dm-copy">
        <span className="dm-badge">Walkthrough video · in production</span>
        <h2 className="dm-title" id={headingId}>
          The narrated walkthrough is being recorded
        </h2>
        <p className="dm-text">
          It will show the product on sample data. Until it’s published, the
          steps below walk through the same flow with sample screens, or you can
          book a walkthrough and see it live.
        </p>
      </div>
    </section>
  );
}
