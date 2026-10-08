"use client";

import { useEffect, useRef } from "react";

/**
 * The Nexaio Quantum Nebula (V2.3 motion proof): an original, living energy
 * field drawn procedurally on one Canvas 2D surface. No library, no asset,
 * no WebGL, no stock art.
 *
 * What it draws, back to front:
 * - a far cloud layer (large, slow, with its own parallax) and a near cloud of
 *   soft screen-blended puffs that drift and breathe: the volumetric body;
 * - soft plasma streams and fine filaments that curl out of the cloud on
 *   spiral paths and flex slowly; a few brighter trunks carry light pulses;
 * - an interconnected network of luminous nodes inside the cloud;
 * - a swirling cluster of sparks around the heart;
 * - thousands of depth-sorted particles across the viewport — small dots and
 *   the digital squares from the reference, including soft bokeh squares —
 *   with restrained parallax.
 *
 * Palette: the second reference's midnight navy, layered cobalt and steel
 * blue, cold silver-blue highlights. No aqua, no neon.
 *
 * Composition follows scroll (read once per frame from a passive listener,
 * never scroll-jacked): the field sits behind the hero copy at the top, then
 * drifts across and dims as the page goes on, so every section has
 * atmosphere and the copy stays legible.
 *
 * Budget: the clouds are rendered at half resolution; device pixel ratio is
 * capped at 1.5 (1 on small screens); counts scale with the viewport; the
 * loop stops while the tab is hidden. Reduced motion draws one complete frame
 * and stops. Without canvas or script the CSS hero field stands in.
 */

const C = {
  navy: [14, 38, 78],
  cobalt: [31, 82, 150],
  steel: [78, 132, 200],
  silver: [164, 200, 248],
  white: [214, 232, 255],
} as const;
type Tone = keyof typeof C;

type Puff = { a: number; r: number; s: number; f1: number; f2: number; p: number; tone: Tone; alpha: number; far: boolean };
type Knot = { a: number; r: number; amp: number; f: number; p: number };
type Strand = { knots: Knot[]; width: number; alpha: number; kind: "trunk" | "fine" | "stream" };
type Node = { x: number; y: number; vx: number; vy: number };
type Particle = { x: number; y: number; z: number; vx: number; vy: number; s: number; sq: boolean; tw: number; tone: Tone };
type Spark = { a: number; r: number; w: number; s: number; tw: number; tone: Tone };
type Pulse = { strand: number; t0: number; life: number };

/** Deterministic PRNG so every load composes the same field. */
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

const rgba = (tone: Tone, a: number) => `rgba(${C[tone][0]},${C[tone][1]},${C[tone][2]},${a})`;
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const clamp01 = (x: number) => Math.max(0, Math.min(1, x));
const smooth = (x: number) => x * x * (3 - 2 * x);

/** A soft radial sprite, drawn once, scaled many times. */
function makeSprite(tone: Tone, size = 128) {
  const c = document.createElement("canvas");
  c.width = c.height = size;
  const g = c.getContext("2d");
  if (!g) return c;
  const grad = g.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  grad.addColorStop(0, rgba(tone, 1));
  grad.addColorStop(0.3, rgba(tone, 0.45));
  grad.addColorStop(0.68, rgba(tone, 0.09));
  grad.addColorStop(1, rgba(tone, 0));
  g.fillStyle = grad;
  g.fillRect(0, 0, size, size);
  return c;
}

export default function QuantumNebula() {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;
    const root = document.documentElement;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    root.classList.add("nebula-live");
    canvas.dataset.nebula = reduced ? "static" : "live";

    // ---- field ----------------------------------------------------------
    const rnd = mulberry(20261008);
    const small = window.innerWidth < 900;
    const N = small
      ? { puffs: 26, far: 10, fine: 26, trunks: 4, streams: 5, nodes: 34, sparks: 180, dots: 320, squares: 110, bokeh: 18 }
      : { puffs: 44, far: 16, fine: 44, trunks: 6, streams: 8, nodes: 64, sparks: 420, dots: 950, squares: 300, bokeh: 40 };

    const puffs: Puff[] = [];
    for (let i = 0; i < N.puffs; i++) {
      puffs.push({
        a: rnd() * Math.PI * 2,
        r: 0.08 + Math.pow(rnd(), 1.35) * 0.78,
        s: 0.28 + rnd() * 0.42,
        f1: 0.05 + rnd() * 0.09,
        f2: 0.04 + rnd() * 0.08,
        p: rnd() * Math.PI * 2,
        tone: i % 4 === 0 ? "steel" : i % 3 === 0 ? "navy" : "cobalt",
        alpha: 0.14 + rnd() * 0.2,
        far: false,
      });
    }
    for (let i = 0; i < N.far; i++) {
      puffs.push({
        a: rnd() * Math.PI * 2,
        r: 0.3 + rnd() * 0.9,
        s: 0.6 + rnd() * 0.55,
        f1: 0.02 + rnd() * 0.04,
        f2: 0.02 + rnd() * 0.03,
        p: rnd() * Math.PI * 2,
        tone: i % 2 ? "navy" : "cobalt",
        alpha: 0.05 + rnd() * 0.05,
        far: true,
      });
    }

    const strand = (kind: Strand["kind"]): Strand => {
      const base = rnd() * Math.PI * 2;
      const spiral = (rnd() - 0.5) * (kind === "stream" ? 2.4 : 3.6);
      const r0 = kind === "stream" ? 0.06 + rnd() * 0.2 : 0.04 + rnd() * 0.4;
      const reach = kind === "stream" ? 0.5 + rnd() * 0.6 : 0.45 + rnd() * 0.85;
      const knots: Knot[] = Array.from({ length: 7 }, (_, k) => {
        const u = k / 6;
        return {
          a: base + spiral * u + (rnd() - 0.5) * 0.3,
          r: r0 + u * reach,
          amp: 0.05 + u * 0.18,
          f: 0.1 + rnd() * 0.2,
          p: rnd() * Math.PI * 2,
        };
      });
      if (kind === "trunk") return { knots, width: 1.8, alpha: 0.55, kind };
      if (kind === "stream") return { knots, width: 12 + rnd() * 16, alpha: 0.05 + rnd() * 0.05, kind };
      return { knots, width: 0.5 + rnd() * 0.9, alpha: 0.1 + rnd() * 0.24, kind };
    };
    const strands: Strand[] = [
      ...Array.from({ length: N.streams }, () => strand("stream")),
      ...Array.from({ length: N.fine }, () => strand("fine")),
      ...Array.from({ length: N.trunks }, () => strand("trunk")),
    ];
    const trunkIdx = strands.map((s, i) => (s.kind === "trunk" ? i : -1)).filter((i) => i >= 0);

    const nodes: Node[] = Array.from({ length: N.nodes }, () => {
      const a = rnd() * Math.PI * 2;
      const r = Math.sqrt(rnd()) * 0.72;
      return { x: Math.cos(a) * r, y: Math.sin(a) * r * 0.78, vx: (rnd() - 0.5) * 0.02, vy: (rnd() - 0.5) * 0.02 };
    });

    const sparks: Spark[] = Array.from({ length: N.sparks }, () => {
      const r = 0.05 + Math.pow(rnd(), 0.7) * 1.05;
      return { a: rnd() * Math.PI * 2, r, w: (0.06 + rnd() * 0.08) / (0.3 + r), s: 0.7 + rnd() * 1.4, tw: rnd() * Math.PI * 2, tone: rnd() < 0.3 ? "white" : "silver" };
    });

    const particles: Particle[] = Array.from({ length: N.dots + N.squares + N.bokeh }, (_, i) => {
      const sq = i >= N.dots;
      const bokeh = i >= N.dots + N.squares;
      const z = 0.25 + rnd() * 0.75;
      return {
        x: rnd(),
        y: rnd(),
        z: bokeh ? 0.3 + rnd() * 0.3 : z,
        vx: (rnd() - 0.5) * 0.004,
        vy: (rnd() - 0.5) * 0.003,
        s: bokeh ? 10 + rnd() * 16 : sq ? 2 + rnd() * rnd() * 9 : 0.6 + rnd() * 1.5,
        sq,
        tw: rnd() * Math.PI * 2,
        tone: bokeh ? (rnd() < 0.5 ? "cobalt" : "steel") : z > 0.85 ? "white" : z > 0.6 ? "silver" : z > 0.4 ? "steel" : "cobalt",
      };
    });

    const sprites = { navy: makeSprite("navy"), cobalt: makeSprite("cobalt"), steel: makeSprite("steel"), silver: makeSprite("silver"), white: makeSprite("white", 64) };
    const cloud = document.createElement("canvas");
    const cctx = cloud.getContext("2d");
    if (!cctx) return;

    // ---- viewport, scroll, composition ---------------------------------
    let w = 0;
    let h = 0;
    let dpr = 1;
    let docH = 1;
    let scrollY = window.scrollY;
    const comp = { cx: 0.68, cy: 0.46, R: 300, dim: 1, px: 0 };

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, w < 900 ? 1 : 1.5);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cloud.width = Math.max(1, Math.round((w * dpr) / 2));
      cloud.height = Math.max(1, Math.round((h * dpr) / 2));
      cctx.setTransform(dpr / 2, 0, 0, dpr / 2, 0, 0);
      docH = Math.max(1, root.scrollHeight - h);
    };
    const onScroll = () => {
      scrollY = window.scrollY;
    };

    /** Where the field sits for this scroll position (targets; eased per frame). */
    const target = () => {
      const p = clamp01(scrollY / docH);
      const narrow = w < 900;
      const drift = Math.sin(p * Math.PI * 2.2) * 0.5 + 0.5; // 0→1→0→1 down the page
      const cx = narrow ? lerp(0.5, 0.66, drift) : lerp(0.72, 0.2, smooth(drift));
      const cy = narrow ? lerp(0.26, 0.46, smooth(clamp01(p * 3))) : lerp(0.48, 0.4, drift);
      const R = (narrow ? w * 0.6 : Math.min(w, h) * 0.5) * lerp(1, 0.82, smooth(clamp01(p * 2.5)));
      const dim = lerp(1, 0.4, smooth(clamp01((scrollY - h * 0.5) / (h * 0.9))));
      return { cx, cy, R, dim, px: scrollY };
    };

    // ---- drawing --------------------------------------------------------
    const pulses: Pulse[] = [];
    let nextPulse = 1.2;
    const path: { x: number; y: number }[][] = strands.map(() => []);

    const strandPoints = (s: Strand, t: number, cx: number, cy: number, R: number, out: { x: number; y: number }[]) => {
      out.length = 0;
      for (const k of s.knots) {
        const a = k.a + Math.sin(t * k.f + k.p) * k.amp;
        const r = k.r * R * (1 + Math.sin(t * k.f * 0.6 + k.p) * 0.05);
        out.push({ x: cx + Math.cos(a) * r, y: cy + Math.sin(a) * r * 0.8 });
      }
    };

    const curve = (g: CanvasRenderingContext2D, pts: { x: number; y: number }[]) => {
      g.beginPath();
      g.moveTo(pts[0].x, pts[0].y);
      for (let i = 1; i < pts.length - 1; i++) {
        const mx = (pts[i].x + pts[i + 1].x) / 2;
        const my = (pts[i].y + pts[i + 1].y) / 2;
        g.quadraticCurveTo(pts[i].x, pts[i].y, mx, my);
      }
      const l = pts[pts.length - 1];
      g.lineTo(l.x, l.y);
    };

    const draw = (t: number) => {
      const { cx, cy, R, dim } = comp;
      const X = cx * w;
      const Y = cy * h;
      const par = comp.px;
      ctx.clearRect(0, 0, w, h);

      // 1. Volumetric clouds at half resolution, additive. The far layer
      //    carries its own small parallax so the body has depth.
      cctx.clearRect(0, 0, w, h);
      cctx.globalCompositeOperation = "screen";
      for (const q of puffs) {
        const a = q.a + Math.sin(t * q.f1 + q.p) * 0.4;
        const r = q.r * R * (1 + Math.sin(t * q.f2 + q.p) * 0.1);
        const s = q.s * R * (1 + Math.sin(t * q.f2 * 0.7 + q.p * 1.3) * 0.08);
        const py = q.far ? Y - par * 0.03 : Y;
        cctx.globalAlpha = q.alpha * dim;
        cctx.drawImage(sprites[q.tone], X + Math.cos(a) * r - s, py + Math.sin(a) * r * 0.72 - s, s * 2, s * 2);
      }
      const heart = R * (0.5 + Math.sin(t * 0.45) * 0.03);
      cctx.globalAlpha = (0.3 + Math.sin(t * 0.5) * 0.05) * dim;
      cctx.drawImage(sprites.silver, X - heart, Y - heart, heart * 2, heart * 2);
      cctx.globalAlpha = 0.5 * dim;
      cctx.drawImage(sprites.white, X - heart * 0.3, Y - heart * 0.3, heart * 0.6, heart * 0.6);
      ctx.globalCompositeOperation = "lighter";
      ctx.globalAlpha = 1;
      ctx.drawImage(cloud, 0, 0, cloud.width, cloud.height, 0, 0, w, h);

      // 2. Streams, filaments and trunks.
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      strands.forEach((s, i) => {
        strandPoints(s, t, X, Y, R, path[i]);
        curve(ctx, path[i]);
        if (s.kind === "stream") {
          ctx.strokeStyle = rgba("steel", s.alpha * dim);
          ctx.lineWidth = s.width;
          ctx.stroke();
          ctx.strokeStyle = rgba("silver", s.alpha * 1.4 * dim);
          ctx.lineWidth = s.width * 0.35;
          ctx.stroke();
        } else if (s.kind === "trunk") {
          ctx.strokeStyle = rgba("steel", 0.14 * dim);
          ctx.lineWidth = 9;
          ctx.stroke();
          ctx.strokeStyle = rgba("silver", s.alpha * dim);
          ctx.lineWidth = s.width;
          ctx.stroke();
        } else {
          ctx.strokeStyle = rgba(i % 3 ? "steel" : "silver", s.alpha * dim);
          ctx.lineWidth = s.width;
          ctx.stroke();
        }
      });

      // 3. The network inside the cloud.
      const link = R * 0.27;
      for (const n of nodes) {
        n.x += n.vx * 0.016 * 60;
        n.y += n.vy * 0.016 * 60;
        const d = Math.hypot(n.x, n.y / 0.78);
        if (d > 0.78) {
          n.vx -= n.x * 0.0012;
          n.vy -= n.y * 0.0012;
        }
        n.vx += Math.sin(t * 0.3 + n.y * 9) * 0.0004;
        n.vy += Math.cos(t * 0.27 + n.x * 9) * 0.0004;
        n.vx *= 0.995;
        n.vy *= 0.995;
      }
      ctx.lineWidth = 0.7;
      for (let i = 0; i < nodes.length; i++) {
        const ax = X + nodes[i].x * R;
        const ay = Y + nodes[i].y * R;
        for (let j = i + 1; j < nodes.length; j++) {
          const bx = X + nodes[j].x * R;
          const by = Y + nodes[j].y * R;
          const d = Math.hypot(ax - bx, ay - by);
          if (d < link) {
            ctx.strokeStyle = rgba("silver", (1 - d / link) * 0.34 * dim);
            ctx.beginPath();
            ctx.moveTo(ax, ay);
            ctx.lineTo(bx, by);
            ctx.stroke();
          }
        }
        ctx.fillStyle = rgba("white", 0.6 * dim);
        ctx.fillRect(ax - 1, ay - 1, 2, 2);
      }

      // 4. Sparks swirling around the heart.
      for (const k of sparks) {
        const a = k.a + t * k.w;
        const r = k.r * R * (1 + Math.sin(t * 0.4 + k.tw) * 0.04);
        const x = X + Math.cos(a) * r;
        const y = Y + Math.sin(a) * r * 0.78;
        const tw = 0.5 + 0.5 * Math.sin(t * 1.3 + k.tw);
        const a2 = (0.25 + 0.55 * tw) * (1 - k.r / 1.25) * (0.55 + 0.45 * dim);
        ctx.fillStyle = rgba(k.tone, Math.min(0.95, a2));
        ctx.fillRect(x - k.s / 2, y - k.s / 2, k.s, k.s);
      }

      // 5. Particles: dots, digital squares and bokeh with depth and parallax.
      for (const q of particles) {
        q.x += q.vx * 0.016;
        q.y += q.vy * 0.016;
        const dx = q.x - cx;
        const dy = (q.y - cy) * (h / w);
        const d2 = dx * dx + dy * dy + 0.02;
        q.vx += (-dy / d2) * 0.00002 * q.z;
        q.vy += (dx / d2) * 0.00002 * q.z;
        q.vx *= 0.999;
        q.vy *= 0.999;
        if (q.x < -0.05) q.x += 1.1;
        if (q.x > 1.05) q.x -= 1.1;
        if (q.y < -0.05) q.y += 1.1;
        if (q.y > 1.05) q.y -= 1.1;
        const py = (q.y * h - par * 0.08 * q.z) % (h * 1.1);
        const sy = py < -h * 0.05 ? py + h * 1.1 : py;
        const sx = q.x * w;
        const near = Math.exp(-(((sx - X) / R) ** 2 + ((sy - Y) / (R * 0.8)) ** 2));
        const tw = 0.55 + 0.45 * Math.sin(t * (0.6 + q.z) + q.tw);
        const base = q.s > 9 ? 0.09 : q.sq ? 0.24 : 0.32;
        const a = base * q.z * tw * (0.4 + near) * (0.6 + 0.4 * dim);
        if (a < 0.012) continue;
        ctx.fillStyle = rgba(q.tone, Math.min(0.92, a));
        const s = q.s * (q.sq ? 1 : q.z + 0.6);
        ctx.fillRect(sx - s / 2, sy - s / 2, s, s);
      }

      // 6. Light pulses along the trunks.
      if (t > nextPulse) {
        pulses.push({ strand: trunkIdx[Math.floor(rnd() * trunkIdx.length)], t0: t, life: 1.4 + rnd() * 0.8 });
        nextPulse = t + 1.4 + rnd() * 1.4;
      }
      for (let i = pulses.length - 1; i >= 0; i--) {
        const p = pulses[i];
        const u = (t - p.t0) / p.life;
        if (u >= 1) {
          pulses.splice(i, 1);
          continue;
        }
        const pts = path[p.strand];
        const f = u * (pts.length - 1);
        const k = Math.min(pts.length - 2, Math.floor(f));
        const x = lerp(pts[k].x, pts[k + 1].x, f - k);
        const y = lerp(pts[k].y, pts[k + 1].y, f - k);
        const glow = 18 * Math.sin(u * Math.PI);
        ctx.globalAlpha = 0.9 * dim;
        ctx.drawImage(sprites.white, x - glow, y - glow, glow * 2, glow * 2);
      }
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = "source-over";
    };

    // ---- loop -----------------------------------------------------------
    let raf = 0;
    let frames = 0;
    const t0 = performance.now();
    const settle = (k: number) => {
      const tg = target();
      comp.cx = lerp(comp.cx, tg.cx, k);
      comp.cy = lerp(comp.cy, tg.cy, k);
      comp.R = lerp(comp.R, tg.R, k);
      comp.dim = lerp(comp.dim, tg.dim, k);
      comp.px = lerp(comp.px, tg.px, k);
    };
    const frame = (now: number) => {
      settle(0.08);
      if ((frames & 63) === 0) docH = Math.max(1, root.scrollHeight - h);
      draw((now - t0) / 1000 + 7.3);
      frames++;
      if ((frames & 31) === 0) canvas.dataset.frames = String(frames);
      raf = requestAnimationFrame(frame);
    };
    const start = () => {
      if (reduced || raf) return;
      raf = requestAnimationFrame(frame);
    };
    const stop = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    };
    const still = () => {
      settle(1);
      draw(7.3);
      canvas.dataset.frames = "static";
    };
    const onVisibility = () => (document.hidden ? stop() : start());

    resize();
    settle(1);
    if (reduced) still();
    else start();

    const onResize = () => {
      resize();
      if (reduced) still();
    };
    window.addEventListener("resize", onResize);
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      stop();
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVisibility);
      root.classList.remove("nebula-live");
    };
  }, []);

  return <canvas ref={ref} className="nebula" aria-hidden="true" />;
}
