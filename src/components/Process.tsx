"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { processSteps } from "@/data/site";
import Reveal from "./Reveal";

export default function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 25 });

  return (
    <div ref={ref} className="relative mx-auto max-w-4xl">
      <div className="absolute left-6 top-0 h-full w-px bg-line md:left-1/2" />
      <motion.div style={{ scaleY }} className="absolute left-6 top-0 h-full w-px origin-top bg-brand md:left-1/2" />
      {processSteps.map(([n, t, d], i) => (
        <Reveal key={n} className={`relative mb-12 pl-16 last:mb-0 md:w-1/2 md:pl-0 ${i % 2 ? "md:ml-auto md:pl-14" : "md:pr-14 md:text-right"}`}>
          <span className={`absolute left-6 top-1 grid size-12 -translate-x-1/2 place-items-center rounded-full border-2 border-brand bg-black font-display text-sm font-bold text-brand ${i % 2 ? "md:left-0" : "md:left-full"}`}>
            {n}
          </span>
          <h3 className="font-display text-2xl font-semibold text-ink">{t}</h3>
          <p className="mt-2 text-muted">{d}</p>
        </Reveal>
      ))}
    </div>
  );
}
