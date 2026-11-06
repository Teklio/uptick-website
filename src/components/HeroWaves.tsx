"use client";

import { useEffect, useRef } from "react";

/**
 * Glowing multicolour light waves on a canvas. The starfield is global
 * (layout.tsx), so this only draws the waves. Scales to its container, so it
 * is used both in the home hero and in the inner-page heroes.
 */
export default function HeroWaves({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0;
    let h = 0;
    let raf = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const WAVES = 5;

    const draw = (time: number) => {
      const t = time / 1000;
      ctx.globalCompositeOperation = "source-over";
      ctx.clearRect(0, 0, w, h);

      const cy = h * 0.5;
      const amp = Math.min(h * 0.17, 140);
      ctx.globalCompositeOperation = "lighter";
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      for (let k = 0; k < WAVES; k++) {
        const phase = k * 1.15;
        const grad = ctx.createLinearGradient(0, 0, w, 0);
        const hue = (t * 14 + k * 38) % 360;
        grad.addColorStop(0, `hsla(${hue + 20},100%,60%,0)`);
        grad.addColorStop(0.12, `hsla(${hue + 20},100%,62%,0.95)`);
        grad.addColorStop(0.35, `hsla(${hue + 130},100%,62%,0.9)`);
        grad.addColorStop(0.6, `hsla(${hue + 230},100%,66%,0.9)`);
        grad.addColorStop(0.88, `hsla(${hue + 320},100%,64%,0.95)`);
        grad.addColorStop(1, `hsla(${hue + 320},100%,60%,0)`);

        ctx.beginPath();
        for (let x = -10; x <= w + 10; x += 6) {
          const nx = x / w;
          const envelope = 0.45 + 0.55 * Math.sin(nx * Math.PI);
          const y =
            cy +
            envelope *
              amp *
              (0.65 * Math.sin(nx * 5.2 + t * 0.7 + phase) + 0.35 * Math.sin(nx * 11 - t * 0.9 + phase * 1.7)) +
            (k - WAVES / 2) * 5 * Math.sin(nx * 3 + t * 0.4);
          if (x === -10) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = grad;
        ctx.shadowColor = `hsla(${hue + 200},100%,60%,0.9)`;
        ctx.shadowBlur = 28;
        ctx.globalAlpha = 0.35;
        ctx.lineWidth = 12;
        ctx.stroke();
        ctx.shadowBlur = 10;
        ctx.globalAlpha = 0.95;
        ctx.lineWidth = 1.6 + (k % 2);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;

      raf = reduce || !visible || document.hidden ? 0 : requestAnimationFrame(draw);
    };

    // The waves are the heaviest thing on the page (blurred strokes), so only
    // animate while the hero is actually on screen.
    let visible = true;
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible && !raf && !reduce) raf = requestAnimationFrame(draw);
    });
    io.observe(canvas);
    const onVisibility = () => {
      if (!document.hidden && visible && !raf && !reduce) raf = requestAnimationFrame(draw);
    };

    resize();
    raf = requestAnimationFrame(draw);
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return <canvas ref={ref} aria-hidden className={`absolute inset-0 h-full w-full ${className}`} />;
}
