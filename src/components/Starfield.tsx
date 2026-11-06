"use client";

import { useEffect, useRef } from "react";

function rand(seed: number) {
  const x = Math.sin(seed * 127.1) * 43758.5453;
  return x - Math.floor(x);
}

type Star = { x: number; y: number; r: number; p: number; s: number };

/**
 * Animated starfield: twinkling stars drifting slowly sideways.
 * Used once, fixed behind the whole site (see layout.tsx).
 */
export default function Starfield() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0;
    let h = 0;
    let raf = 0;
    let stars: Star[] = [];

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const nw = canvas.clientWidth;
      const nh = canvas.clientHeight;
      // mobile address-bar show/hide fires resize on every scroll — ignore small height-only changes
      if (w && nw === w && Math.abs(nh - h) < 160) return;
      w = nw;
      h = nh;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.min(520, Math.round((w * h) / 3800));
      stars = Array.from({ length: n }, (_, i) => ({
        x: rand(i + 1) * w,
        y: rand(i + 700) * h,
        r: 0.3 + rand(i + 1500) ** 2 * 1.7,
        p: rand(i + 2300) * Math.PI * 2,
        s: 0.5 + rand(i + 3100) * 1.5,
      }));
    };

    // Stars are grouped into a few alpha levels so each frame needs only
    // ~8 fills instead of one fill (and style parse) per star.
    const LEVELS = 8;
    const buckets: number[][] = Array.from({ length: LEVELS }, () => []);
    const TAU = Math.PI * 2;

    const draw = (time: number) => {
      const t = time / 1000;
      ctx.clearRect(0, 0, w, h);
      for (const b of buckets) b.length = 0;
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        const a = 0.5 + 0.5 * Math.sin(t * s.s + s.p);
        buckets[Math.min(LEVELS - 1, (a * LEVELS) | 0)].push(i);
      }
      for (let l = 0; l < LEVELS; l++) {
        const b = buckets[l];
        if (!b.length) continue;
        ctx.fillStyle = `rgba(255,255,255,${0.2 + 0.8 * ((l + 0.5) / LEVELS)})`;
        ctx.beginPath();
        for (const i of b) {
          const s = stars[i];
          const x = (s.x + t * 5 * s.s) % w;
          const y = s.y + Math.sin(t * 0.3 + s.p) * 3;
          ctx.moveTo(x + s.r, y);
          ctx.arc(x, y, s.r, 0, TAU);
        }
        ctx.fill();
      }
      raf = reduce || document.hidden ? 0 : requestAnimationFrame(draw);
    };

    const onVisibility = () => {
      if (!document.hidden && !raf && !reduce) raf = requestAnimationFrame(draw);
    };

    resize();
    raf = requestAnimationFrame(draw);
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return <canvas ref={ref} aria-hidden className="h-full w-full" />;
}
