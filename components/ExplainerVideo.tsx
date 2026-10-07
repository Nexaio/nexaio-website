import { explainerReady, explainerVideo } from "../content/media";
import { explainerVideoJsonLd } from "../lib/seo";
import JsonLd from "./JsonLd";

/**
 * The explainer band (V2.2 packet §5): under the homepage hero and at the
 * top of /demo. It renders ONLY for a complete, approved record in
 * content/media.ts (`explainerReady`). Otherwise it renders nothing at all:
 * no placeholder, no slot, no notice.
 *
 * When real: a 16:9 poster in a glass card with the browser's own player
 * controls, captions on by default, the transcript beneath and VideoObject
 * structured data.
 */
export default function ExplainerVideo({ placement }: { placement: "home" | "demo" }) {
  const v = explainerVideo;
  if (!explainerReady(v)) return null;
  const titleId = `explainer-title-${placement}`;
  return (
    <section className="section explainer" aria-labelledby={titleId}>
      <JsonLd data={explainerVideoJsonLd(v)} />
      <div className="wrap">
        <div className="explainer-card">
          <video controls playsInline preload="none" poster={v.poster} aria-labelledby={titleId}>
            <source src={v.webmSrc} type="video/webm" />
            <source src={v.src} type="video/mp4" />
            <track kind="captions" src={v.captionsSrc} srcLang="en" label="English" default />
          </video>
          <div className="explainer-copy">
            <h2 className="h3" id={titleId}>
              {v.title}
            </h2>
            <p className="body">{v.description}</p>
            <details className="faq-item">
              <summary className="faq-q">
                <span>Transcript</span>
              </summary>
              {v.transcript.map((para) => (
                <p className="faq-a" key={para}>
                  {para}
                </p>
              ))}
            </details>
          </div>
        </div>
      </div>
    </section>
  );
}
