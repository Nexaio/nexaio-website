"use client";

import { useEffect, useRef, useState } from "react";
import { explainerReady, explainerVideo } from "../content/media";
import { explainerVideoJsonLd } from "../lib/seo";
import Icon from "./Icon";
import JsonLd from "./JsonLd";

/**
 * The explainer film (V2.3): directly below the homepage hero and at the top
 * of /demo. It renders ONLY for a complete record in content/media.ts
 * (`explainerReady`); otherwise nothing at all — no placeholder, no box.
 *
 * Playback: muted, inline, autoplay when the visitor has not asked for
 * reduced motion or reduced data (otherwise it waits on the poster), with
 * visible Pause / Replay / Sound controls, keyboard reachable. The film is
 * understandable without sound: every line is on screen (open captions) and
 * repeated in the transcript below. Sound, if the film ever carries any, is
 * only on an explicit click.
 */
export default function ExplainerVideo({ placement }: { placement: "home" | "demo" }) {
  const v = explainerVideo;
  const ref = useRef<HTMLVideoElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [auto, setAuto] = useState<boolean | null>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const nav = navigator as Navigator & { connection?: { saveData?: boolean } };
    const saveData = nav.connection?.saveData === true;
    setAuto(!reduced && !saveData);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el || auto !== true) return;
    el.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
  }, [auto]);

  if (!explainerReady(v)) return null;
  const titleId = `explainer-title-${placement}`;

  const toggle = () => {
    const el = ref.current;
    if (!el) return;
    if (el.paused) el.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    else {
      el.pause();
      setPlaying(false);
    }
  };
  const replay = () => {
    const el = ref.current;
    if (!el) return;
    el.currentTime = 0;
    el.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
  };
  const sound = () => {
    const el = ref.current;
    if (!el) return;
    el.muted = !el.muted;
    setMuted(el.muted);
  };

  return (
    <section className="section explainer" aria-labelledby={titleId}>
      <JsonLd data={explainerVideoJsonLd(v)} />
      <div className="wrap">
        <div className="explainer-card">
          <div className="explainer-stage">
            <video
              ref={ref}
              muted
              playsInline
              preload={auto === false ? "none" : "metadata"}
              poster={v.poster}
              aria-labelledby={titleId}
              onPlay={() => setPlaying(true)}
              onPause={() => setPlaying(false)}
              onEnded={() => setPlaying(false)}
            >
              <source src={v.webmSrc} type="video/webm" />
              <source src={v.src} type="video/mp4" />
              {v.captionsSrc ? <track kind="captions" src={v.captionsSrc} srcLang="en" label="English" default /> : null}
            </video>
            <div className="explainer-controls" role="group" aria-label="Video controls">
              <button type="button" className="btn btn-secondary btn-sm" onClick={toggle} aria-pressed={playing}>
                {playing ? "Pause" : "Play"}
              </button>
              <button type="button" className="btn btn-secondary btn-sm" onClick={replay}>
                Replay
              </button>
              <button type="button" className="btn btn-secondary btn-sm" onClick={sound} aria-pressed={!muted}>
                {muted ? "Sound off" : "Sound on"}
              </button>
            </div>
          </div>
          <div className="explainer-copy">
            <h2 className="h3" id={titleId}>
              {v.title}
            </h2>
            <p className="body">{v.description}</p>
            {v.stage === "preview" ? <p className="meta">Preview cut · not yet approved for public release</p> : null}
            <details className="faq-item">
              <summary className="faq-q">
                <span>Transcript</span>
                <Icon name="plus" size={18} className="faq-icon" />
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
