"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiPlus } from "react-icons/fi";
import { faqs } from "@/data/site";
import { cn } from "@/lib/utils";

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="mx-auto max-w-3xl space-y-3">
      {faqs.map((f, i) => {
        const isOpen = open === i;
        return (
          <div key={f.q} className={cn("rounded-2xl border bg-white/[0.04] transition", isOpen ? "border-brand/40 shadow-lg shadow-brand/5" : "border-line")}>
            <button className="flex w-full items-center justify-between gap-4 p-5 text-left" aria-expanded={isOpen} onClick={() => setOpen(isOpen ? null : i)}>
              <span className="font-display text-lg font-semibold text-ink">{f.q}</span>
              <FiPlus className={cn("shrink-0 text-xl text-brand transition-transform", isOpen && "rotate-45")} />
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                  <p className="px-5 pb-5 leading-relaxed text-muted">{f.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
