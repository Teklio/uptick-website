"use client";

import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import { openLeadModal } from "./LeadModal";
import { TypeAnimation } from "react-type-animation";
import HeroWaves from "./HeroWaves";

const container = { hidden: {}, show: { transition: { staggerChildren: 0.14, delayChildren: 0.15 } } };
const item = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] as const } },
};

export default function Hero() {
  return (
    <section className="relative flex min-h-[68svh] md:min-h-[min(100svh,1000px)] items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_55%,rgb(40_30_120/0.25),transparent_65%)]" />
      <HeroWaves />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center px-6 pb-8 pt-24 text-center md:pb-10 md:pt-28"
      >
        <motion.h1 variants={item} className="font-display font-light leading-[1.15] tracking-tight text-white text-[2.75rem] [text-shadow:0_2px_30px_rgb(0_0_0/0.6)] sm:text-6xl md:text-7xl lg:text-[5.5rem]">
          Transform Your Business with
          <span className="mt-2 block min-h-[1.2em] bg-gradient-to-r from-emerald-400 via-green-300 to-emerald-400 bg-clip-text font-medium text-transparent md:mt-6">
            <TypeAnimation
              sequence={["Scalable SaaS Platforms", 2200, "Modern Web Applications", 2200, "Smart Dashboards", 2200, "Custom Software", 2200]}
              repeat={Infinity}
              cursor={false}
            />
          </span>
        </motion.h1>

        <motion.div variants={item} className="mt-8 md:mt-12">
          <button
            type="button"
            onClick={openLeadModal}
            className="group inline-flex items-center gap-4 rounded-full border border-white/25 bg-white/10 py-2 pl-7 pr-2 text-base font-medium text-white backdrop-blur-md transition duration-300 hover:scale-105 hover:bg-white/20"
          >
            Start a Project
            <span className="grid size-11 place-items-center rounded-full bg-white/25 text-xl transition group-hover:translate-x-1">
              <FiArrowRight />
            </span>
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}
