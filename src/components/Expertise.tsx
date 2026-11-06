"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { services } from "@/data/site";

export default function Expertise() {
  return (
    <section className="relative overflow-hidden py-16 md:py-24">

      <div className="relative mx-auto max-w-6xl px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-3xl font-light leading-tight tracking-tight text-white sm:text-5xl md:text-7xl"
        >
          Modern Technology Expertise
          <span className="block">Built for Growing Businesses</span>
        </motion.h2>

        <div className="mx-auto mt-10 flex max-w-4xl flex-wrap justify-center gap-4 md:mt-12">
          {services.map((s, i) => (
            <motion.div
              key={s.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.6 }}
            >
              <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 4 + (i % 3), repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}>
                <Link
                  href={`/services/${s.slug}`}
                  className="block rounded-full border border-white/10 bg-white/[0.05] px-7 py-4 text-base text-white backdrop-blur-md transition duration-300 hover:scale-105 hover:border-white/30 hover:bg-white/15 md:px-9 md:py-5 md:text-lg"
                >
                  # {s.title}
                </Link>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
