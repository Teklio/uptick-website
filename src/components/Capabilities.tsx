"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { FiArrowRight, FiCheck } from "react-icons/fi";
import { services } from "@/data/site";
import { cn } from "@/lib/utils";
import ServiceIcon from "./ServiceIcon";

export default function Capabilities() {
  const [i, setI] = useState(0);
  const s = services[i];
  return (
    <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
      <div role="tablist" aria-label="Services" className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0">
        {services.map((x, idx) => (
          <button
            key={x.slug}
            role="tab"
            aria-selected={idx === i}
            onClick={() => setI(idx)}
            onMouseEnter={() => setI(idx)}
            className={cn(
              "flex shrink-0 items-center gap-3 rounded-2xl border px-4 py-3 text-left text-sm font-semibold transition",
              idx === i ? "border-brand bg-brand text-black shadow-lg shadow-brand/25" : "border-line bg-white/[0.04] text-ink hover:border-brand/40",
            )}
          >
            <ServiceIcon name={x.icon} className="text-xl" />
            {x.title}
          </button>
        ))}
      </div>

      <div className="relative min-h-[360px] overflow-hidden rounded-3xl border border-line bg-white/[0.04] p-8 shadow-xl shadow-brand/5 md:p-10">
        <div className="absolute -right-20 -top-20 size-64 rounded-full bg-brand/10 blur-3xl" />
        <AnimatePresence mode="wait">
          <motion.div
            key={s.slug}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.25 }}
            className="relative"
          >
            <span className="mb-5 grid size-14 place-items-center rounded-2xl bg-brand/10 text-3xl text-brand">
              <ServiceIcon name={s.icon} />
            </span>
            <h3 className="font-display text-2xl font-bold text-ink md:text-3xl">{s.title}</h3>
            <p className="mt-3 max-w-xl text-muted">{s.intro}</p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {s.features.slice(0, 4).map((f) => (
                <li key={f} className="flex gap-2 text-sm text-ink">
                  <FiCheck className="mt-0.5 shrink-0 text-brand" /> {f}
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-wrap gap-2">
              {s.tech.map((t) => (
                <span key={t} className="rounded-full bg-soft px-3 py-1 text-xs font-medium text-muted">{t}</span>
              ))}
            </div>
            <Link href={`/services/${s.slug}`} className="mt-8 inline-flex items-center gap-2 font-semibold text-brand hover:gap-3 transition-all">
              Explore {s.title} <FiArrowRight />
            </Link>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
