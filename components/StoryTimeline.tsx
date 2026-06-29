"use client";

import { useEffect, useRef } from "react";

const scenes = [
  {
    num: "01 — Before Nexaio",
    title: "The grind",
    body: "Up before sunrise, two rented aerators, 20–25 houses a day. Effort everywhere, leverage nowhere.",
    art: `<svg viewBox="0 0 200 200"><g class="tl-flow"><line x1="20" y1="150" x2="180" y2="150" stroke="#9FC7E8" stroke-width="1.5" opacity="0.6"/></g><rect x="36" y="96" width="16" height="54" fill="none" stroke="#6FA8DC" stroke-width="2"/><rect x="68" y="78" width="16" height="72" fill="none" stroke="#6FA8DC" stroke-width="2"/><rect x="100" y="104" width="16" height="46" fill="none" stroke="#6FA8DC" stroke-width="2"/><rect x="132" y="70" width="16" height="80" fill="none" stroke="#6FA8DC" stroke-width="2"/><circle class="tl-pulse" cx="44" cy="46" r="14" fill="none" stroke="#9FC7E8" stroke-width="2"/></svg>`,
  },
  {
    num: "02 — The shift",
    title: "The realization",
    body: "Hard work has a ceiling. The problem was never demand — it was leverage.",
    art: `<svg viewBox="0 0 200 200"><line x1="20" y1="50" x2="180" y2="50" stroke="#9FC7E8" stroke-width="1.5" stroke-dasharray="4 6" opacity="0.6"/><path class="tl-rise" d="M20 170 C70 168 120 120 150 64 L168 56" fill="none" stroke="#6FA8DC" stroke-width="2"/><circle class="tl-pulse" cx="168" cy="56" r="6" fill="#6FA8DC"/></svg>`,
  },
  {
    num: "03 — Learning",
    title: "Building",
    body: "Late nights and trial-and-error. Breaking flows, rebuilding them, learning discipline beats cleverness.",
    art: `<svg viewBox="0 0 200 200"><g class="tl-dash" stroke="#6FA8DC" stroke-width="2" fill="none"><line x1="50" y1="60" x2="110" y2="50"/><line x1="110" y1="50" x2="150" y2="100"/><line x1="150" y1="100" x2="90" y2="140"/><line x1="90" y1="140" x2="50" y2="60"/><line x1="110" y1="50" x2="90" y2="140"/></g><circle cx="50" cy="60" r="6" fill="#6FA8DC"/><circle cx="110" cy="50" r="6" fill="#6FA8DC"/><circle cx="150" cy="100" r="6" fill="#6FA8DC"/><circle cx="90" cy="140" r="6" fill="#6FA8DC"/></svg>`,
  },
  {
    num: "04 — Traction",
    title: "First real wins",
    body: "Systems that removed pressure — and kept working when volume spiked or no one could step in.",
    art: `<svg viewBox="0 0 200 200"><line x1="20" y1="100" x2="180" y2="100" stroke="#9FC7E8" stroke-width="1.5" opacity="0.6"/><circle class="tl-pulse" cx="60" cy="100" r="5" fill="#9FC7E8"/><circle class="tl-pulse" cx="100" cy="100" r="5" fill="#9FC7E8" style="animation-delay:.4s"/><circle class="tl-pulse" cx="140" cy="100" r="5" fill="#9FC7E8" style="animation-delay:.8s"/><rect x="26" y="84" width="14" height="32" fill="none" stroke="#6FA8DC" stroke-width="2"/><rect x="160" y="84" width="14" height="32" fill="none" stroke="#6FA8DC" stroke-width="2"/></svg>`,
  },
  {
    num: "05 — Official",
    title: "Nexaio is born",
    body: "Buying nexaio.co made it real. This wasn't a side project anymore.",
    art: `<svg viewBox="0 0 200 200"><g class="tl-spin"><polygon points="100,30 160,100 100,170 40,100" fill="none" stroke="#6FA8DC" stroke-width="2"/><polygon points="100,55 138,100 100,145 62,100" fill="none" stroke="#9FC7E8" stroke-width="1.5" opacity="0.6"/></g><text x="100" y="116" text-anchor="middle" font-size="52" font-weight="700" fill="#6FA8DC" font-style="italic">N</text></svg>`,
  },
  {
    num: "06 — Now",
    title: "Today",
    body: "Automation treated like infrastructure: designed on purpose, tested, monitored, owned.",
    art: `<svg viewBox="0 0 200 200"><rect x="50" y="60" width="100" height="22" rx="3" fill="none" stroke="#6FA8DC" stroke-width="2"/><rect x="50" y="92" width="100" height="22" rx="3" fill="none" stroke="#6FA8DC" stroke-width="2"/><rect x="50" y="124" width="100" height="22" rx="3" fill="none" stroke="#6FA8DC" stroke-width="2"/><circle class="tl-pulse" cx="158" cy="71" r="4" fill="#6FA8DC"/><circle class="tl-pulse" cx="158" cy="103" r="4" fill="#6FA8DC" style="animation-delay:.5s"/><circle class="tl-pulse" cx="158" cy="135" r="4" fill="#6FA8DC" style="animation-delay:1s"/></svg>`,
  },
  {
    num: "07 — Ahead",
    title: "What's next",
    body: "This is just the beginning — but the foundation is already set.",
    art: `<svg viewBox="0 0 200 200"><path class="tl-rise" d="M24 150 C70 150 120 110 176 54" fill="none" stroke="#6FA8DC" stroke-width="2"/><path d="M152 54 L176 54 L176 78" fill="none" stroke="#6FA8DC" stroke-width="2"/><circle class="tl-pulse" cx="24" cy="150" r="5" fill="#9FC7E8"/></svg>`,
  },
];

const labels = ["Before", "Shift", "Building", "Wins", "Born", "Today", "Next"];

export default function StoryTimeline() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = ref.current;
    if (!section) return;
    const sceneEls = Array.from(
      section.querySelectorAll<HTMLElement>(".tl-scene")
    );
    const dotEls = Array.from(section.querySelectorAll<HTMLElement>(".tl-dot"));
    const fill = section.querySelector<HTMLElement>(".tl-fill");
    const N = sceneEls.length;
    const mq = window.matchMedia("(max-width:860px)");
    let ticking = false;

    const update = () => {
      const rect = section.getBoundingClientRect();
      const total = section.offsetHeight - window.innerHeight;
      let p = total > 0 ? -rect.top / total : 0;
      p = Math.max(0, Math.min(1, p));
      const af = p * (N - 1);
      sceneEls.forEach((s, i) => {
        const d = i - af;
        const ad = Math.abs(d);
        s.style.opacity = String(Math.max(0, 1 - ad * 1.15));
        s.style.transform = `translateX(${d * 80}px) scale(${1 - Math.min(ad, 1) * 0.06})`;
        s.style.zIndex = String(100 - Math.round(ad * 10));
      });
      const idx = Math.round(af);
      dotEls.forEach((dt, i) => {
        dt.classList.toggle("active", i === idx);
        dt.classList.toggle("done", i < idx);
      });
      if (fill) fill.style.width = `${(af / (N - 1)) * 100}%`;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (!mq.matches) update();
          ticking = false;
        });
        ticking = true;
      }
    };
    const setup = () => {
      if (mq.matches) {
        sceneEls.forEach((s) => {
          s.style.opacity = "";
          s.style.transform = "";
          s.style.zIndex = "";
        });
      } else {
        update();
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", setup);
    setup();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", setup);
    };
  }, []);

  return (
    <section className="tl" ref={ref}>
      <div className="tl-stage">
        <div className="tl-glow" />
        <div className="tl-grid" />
        <div className="tl-head">
          <p className="eyebrow">Our story</p>
          <h2>How Nexaio actually started</h2>
        </div>
        <div className="tl-scenes">
          {scenes.map((s, i) => (
            <div className="tl-scene" key={i}>
              <div className="tl-ghost">{String(i + 1).padStart(2, "0")}</div>
              <div className="tl-inner">
                <div>
                  <div className="tl-num">{s.num}</div>
                  <h3>{s.title}</h3>
                  <p>{s.body}</p>
                </div>
                <div
                  className="tl-art"
                  dangerouslySetInnerHTML={{ __html: s.art }}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="tl-rail">
          <div className="tl-railtrack">
            <div className="tl-fill" />
            <div className="tl-dots">
              {labels.map((l, i) => (
                <div className="tl-dot" key={i}>
                  <span className="tl-lbl">{l}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
