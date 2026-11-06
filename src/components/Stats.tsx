"use client";

import { useEffect, useRef } from "react";
import { animate, motion, useInView } from "framer-motion";
import { stats } from "@/data/site";

// decorative ring fill per stat (0–1)
const fills = [0.8, 0.66, 0.99, 1];

function Counter({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView || !ref.current) return;
    const el = ref.current;
    const c = animate(0, to, {
      duration: 2,
      ease: "easeOut",
      onUpdate: (v) => (el.textContent = Math.round(v) + suffix),
    });
    return () => c.stop();
  }, [inView, to, suffix]);
  return <span ref={ref}>{to}{suffix}</span>;
}

/** Counters sit directly under the hero: animated rings, no cards. */
export default function Stats() {
  return (
    <section className="relative py-14 md:py-16">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-y-10 px-6 md:grid-cols-4">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center"
          >
            <div className="relative grid size-32 place-items-center md:size-40">
              <svg viewBox="0 0 120 120" className="absolute inset-0 -rotate-90">
                <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="2.5" />
                <motion.circle
                  cx="60"
                  cy="60"
                  r="52"
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="3"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: fills[i] }}
                  viewport={{ once: true }}
                  transition={{ duration: 2, delay: 0.2 + i * 0.12, ease: "easeOut" }}
                  style={{ filter: "drop-shadow(0 0 6px rgb(255 255 255 / 0.55))" }}
                />
              </svg>
              <span className="font-display text-4xl font-light text-white md:text-5xl">
                <Counter to={s.value} suffix={s.suffix} />
              </span>
            </div>
            <p className="mt-5 text-center text-base text-white md:text-lg">{s.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
