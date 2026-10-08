"use client";

import { useEffect, useRef } from "react";
import { nebulaPlate } from "../content/media";

/**
 * The reference-locked ambient field (V2.3 repair, Website canonical r37).
 *
 * The founders' wide midnight-navy reference IS the composition. It is shown
 * as a plate (`<img>`, object-fit cover) and everything drawn on the canvas
 * above it moves INSIDE that picture, slowly:
 * - a soft copy of the plate drifts and breathes (atmospheric cloud);
 * - the plate's own highlights shimmer in place (strands and squares);
 * - a slow light sweep travels along the existing ribbons;
 * - faint plasma pulses flow along four traced streams (the first reference's
 *   energy cue);
 * - sparks and digital squares, seeded where the plate is bright, rise gently.
 *
 * The field is anchored inside its section. It never follows the scroll, the
 * pointer or the visitor. Reduced motion shows the plate with one still pass.
 * Without script the plate alone stands. DPR is capped (1.5; 1 on small
 * screens); the loop stops while the tab is hidden.
 *
 * Rights: the plate is the founders' uploaded reference and is temporary
 * founder-preview material only (content/media.ts `nebulaPlate`).
 */

type Part = { x: number; y: number; z: number; sq: boolean; bokeh?: boolean; s: number; tw: number; vy: number; vx: number };

const clamp01 = (x: number) => Math.max(0, Math.min(1, x));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
function mulberry(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Plasma streams traced over the reference's main light ribbons (plate coordinates, 0–1). */
const RIBBONS: [number, number][][] = [
  [[0.36, 0.0], [0.42, 0.18], [0.5, 0.34], [0.46, 0.5], [0.3, 0.68], [0.14, 0.8]],
  [[0.53, 0.02], [0.57, 0.22], [0.62, 0.4], [0.72, 0.5], [0.86, 0.62], [0.95, 0.68]],
  [[0.03, 0.47], [0.18, 0.5], [0.34, 0.47], [0.44, 0.41], [0.55, 0.37], [0.63, 0.33]],
  [[0.62, 0.3], [0.66, 0.48], [0.68, 0.66], [0.65, 0.84], [0.63, 1.0]],
];

function startField(canvas: HTMLCanvasElement, img: HTMLImageElement, small: boolean, reduced: boolean, focusX: number, focusY: number) {
  const ctx = canvas.getContext("2d", { alpha: true });
  if (!ctx) return () => {};
  const rnd = mulberry(6418);
  const dpr = Math.min(window.devicePixelRatio || 1, small ? 1 : 1.5);
  let W = 1;
  let H = 1;
  let cover = { x: 0, y: 0, w: 1, h: 1 };

  // Plate analysis at quarter resolution: a soft cloud copy and a highlight mask.
  const Q = 4;
  const pw = Math.max(1, Math.round(img.naturalWidth / Q));
  const ph = Math.max(1, Math.round(img.naturalHeight / Q));
  const mk = () => {
    const c = document.createElement("canvas");
    c.width = pw;
    c.height = ph;
    return c;
  };
  const cloud = mk();
  const glow = mk();
  const tmp = mk();
  const gc = glow.getContext("2d");
  const cc = cloud.getContext("2d");
  const tc = tmp.getContext("2d");
  if (!gc || !cc || !tc) return () => {};
  gc.drawImage(img, 0, 0, pw, ph);
  const id = gc.getImageData(0, 0, pw, ph);
  const d = id.data;
  const bright: [number, number][] = [];
  for (let i = 0; i < d.length; i += 4) {
    const l = 0.2126 * d[i] + 0.7152 * d[i + 1] + 0.0722 * d[i + 2];
    d[i + 3] = Math.round(clamp01((l - 95) / 110) * 255);
    if (l > 135 && rnd() < 0.08) bright.push([((i / 4) % pw) / pw, Math.floor(i / 4 / pw) / ph]);
  }
  gc.putImageData(id, 0, 0);
  try {
    cc.filter = "blur(5px)";
  } catch {
    /* no filter support: the sharp copy still reads as cloud at low alpha */
  }
  cc.drawImage(img, 0, 0, pw, ph);
  cc.filter = "none";

  const N = small ? { p: 260, b: 24 } : { p: 620, b: 56 };
  const parts: Part[] = [];
  for (let i = 0; i < N.p; i++) {
    const s = bright.length ? bright[Math.floor(rnd() * bright.length)] : [rnd(), rnd()];
    parts.push({ x: s[0] + (rnd() - 0.5) * 0.04, y: s[1] + (rnd() - 0.5) * 0.04, z: 0.3 + rnd() * 0.7, sq: rnd() < 0.45, s: 1 + rnd() * rnd() * 4.5, tw: rnd() * 6.28, vy: 0.004 + rnd() * 0.008, vx: (rnd() - 0.5) * 0.004 });
  }
  for (let i = 0; i < N.b; i++) {
    parts.push({ x: rnd(), y: rnd(), z: 0.2 + rnd() * 0.3, sq: true, bokeh: true, s: 8 + rnd() * 14, tw: rnd() * 6.28, vy: 0.002 + rnd() * 0.003, vx: (rnd() - 0.5) * 0.002 });
  }

  const resize = () => {
    const r = canvas.getBoundingClientRect();
    W = Math.max(1, Math.round(r.width));
    H = Math.max(1, Math.round(r.height));
    canvas.width = Math.round(W * dpr);
    canvas.height = Math.round(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const s = Math.max(W / img.naturalWidth, H / img.naturalHeight);
    const w = img.naturalWidth * s;
    const h = img.naturalHeight * s;
    cover = { x: (W - w) * focusX, y: (H - h) * focusY, w, h };
  };
  const P = (nx: number, ny: number): [number, number] => [cover.x + nx * cover.w, cover.y + ny * cover.h];
  const curve = (pts: [number, number][]) => {
    ctx.beginPath();
    const [x0, y0] = P(pts[0][0], pts[0][1]);
    ctx.moveTo(x0, y0);
    for (let i = 1; i < pts.length - 1; i++) {
      const [ax, ay] = P(pts[i][0], pts[i][1]);
      const [bx, by] = P(pts[i + 1][0], pts[i + 1][1]);
      ctx.quadraticCurveTo(ax, ay, (ax + bx) / 2, (ay + by) / 2);
    }
    const [lx, ly] = P(pts[pts.length - 1][0], pts[pts.length - 1][1]);
    ctx.lineTo(lx, ly);
  };

  const draw = (t: number) => {
    ctx.clearRect(0, 0, W, H);
    // 1. Soft atmospheric cloud drift: the plate's own soft copy, slowly breathing.
    ctx.globalCompositeOperation = "screen";
    const dx = Math.sin(t * 0.11) * 14;
    const dy = Math.cos(t * 0.09) * 10;
    const sc = 1.035 + Math.sin(t * 0.07) * 0.02;
    ctx.globalAlpha = 0.26 + Math.sin(t * 0.21) * 0.07;
    ctx.drawImage(cloud, cover.x + dx - (cover.w * (sc - 1)) / 2, cover.y + dy - (cover.h * (sc - 1)) / 2, cover.w * sc, cover.h * sc);
    // 2. Highlights breathe in place.
    ctx.globalCompositeOperation = "lighter";
    ctx.globalAlpha = 0.16 + Math.sin(t * 0.47) * 0.1;
    ctx.drawImage(glow, cover.x + Math.sin(t * 0.3) * 2, cover.y + Math.cos(t * 0.26) * 2, cover.w, cover.h);
    // 3. A slow light sweep along the main ribbon: highlights masked by a travelling soft spot.
    const u = (Math.sin(t * 0.17) + 1) / 2;
    const sx = lerp(0.22, 0.86, u);
    const sy = lerp(0.3, 0.62, u);
    tc.globalCompositeOperation = "source-over";
    tc.clearRect(0, 0, pw, ph);
    tc.drawImage(glow, 0, 0);
    tc.globalCompositeOperation = "destination-in";
    const g = tc.createRadialGradient(sx * pw, sy * ph, 0, sx * pw, sy * ph, pw * 0.28);
    g.addColorStop(0, "rgba(255,255,255,1)");
    g.addColorStop(1, "rgba(255,255,255,0)");
    tc.fillStyle = g;
    tc.fillRect(0, 0, pw, ph);
    ctx.globalAlpha = 0.55;
    ctx.drawImage(tmp, cover.x, cover.y, cover.w, cover.h);
    // 4. Plasma pulses: soft light flowing along the traced streams (dash offset only).
    ctx.lineCap = "round";
    RIBBONS.forEach((pts, i) => {
      curve(pts);
      ctx.setLineDash([44, 190]);
      ctx.lineDashOffset = -t * (22 + i * 6);
      ctx.strokeStyle = "rgba(175,210,255,0.5)";
      ctx.lineWidth = 10;
      ctx.globalAlpha = 0.32;
      ctx.stroke();
    });
    ctx.setLineDash([]);
    // 5. Sparks and digital squares: a gentle rise with twinkle.
    for (const q of parts) {
      q.y -= q.vy * 0.016;
      q.x += q.vx * 0.016;
      if (q.y < -0.03) q.y = 1.03;
      if (q.x < -0.03) q.x += 1.06;
      if (q.x > 1.03) q.x -= 1.06;
      const [x, y] = P(q.x, q.y);
      const tw = 0.5 + 0.5 * Math.sin(t * (0.8 + q.z) + q.tw);
      const a = (q.bokeh ? 0.07 : q.sq ? 0.42 : 0.6) * q.z * tw;
      if (a < 0.01) continue;
      ctx.globalAlpha = Math.min(0.95, a);
      ctx.fillStyle = q.bokeh ? "rgb(78,132,200)" : q.z > 0.7 ? "rgb(226,240,255)" : "rgb(164,205,250)";
      const s = q.s * (q.bokeh ? 1 : 0.6 + q.z);
      ctx.fillRect(x - s / 2, y - s / 2, s, s);
    }
    ctx.globalAlpha = 1;
    ctx.globalCompositeOperation = "source-over";
  };

  let raf = 0;
  let frames = 0;
  const t0 = performance.now();
  const frame = (now: number) => {
    draw((now - t0) / 1000 + 11);
    frames++;
    if ((frames & 31) === 0) canvas.dataset.frames = String(frames);
    raf = requestAnimationFrame(frame);
  };
  const start = () => {
    if (!raf && !reduced) raf = requestAnimationFrame(frame);
  };
  const stop = () => {
    if (raf) cancelAnimationFrame(raf);
    raf = 0;
  };
  const onVis = () => (document.hidden ? stop() : start());
  resize();
  window.addEventListener("resize", resize);
  document.addEventListener("visibilitychange", onVis);
  canvas.dataset.field = reduced ? "static" : "live";
  if (reduced) {
    draw(11);
    canvas.dataset.frames = "static";
  } else start();
  return () => {
    stop();
    window.removeEventListener("resize", resize);
    document.removeEventListener("visibilitychange", onVis);
  };
}

export default function QuantumNebula({ focus = "wide" }: { focus?: "wide" | "panel" }) {
  const box = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const img = el.querySelector("img");
    const canvas = el.querySelector("canvas");
    if (!img || !canvas) return;
    const small = window.innerWidth < 900;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let stop = () => {};
    const go = () => {
      stop = startField(canvas, img, small, reduced, small ? 0.5 : 0.62, small ? 0.36 : 0.5);
      el.classList.add("is-live");
    };
    if (img.complete && img.naturalWidth) go();
    else img.addEventListener("load", go, { once: true });
    return () => {
      stop();
      img.removeEventListener("load", go);
    };
  }, []);

  return (
    <div className={`field field--${focus}`} ref={box} aria-hidden="true">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={nebulaPlate.src} alt="" decoding="async" fetchPriority="high" />
      <canvas />
    </div>
  );
}
