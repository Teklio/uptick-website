"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Project } from "@/lib/storyblok";
import { cn } from "@/lib/utils";
import ProjectCard from "./ProjectCard";

export default function ProjectsGrid({ projects }: { projects: Project[] }) {
  const categories = useMemo(() => ["All", ...Array.from(new Set(projects.flatMap((p) => p.categories)))], [projects]);
  const [cat, setCat] = useState("All");
  const shown = cat === "All" ? projects : projects.filter((p) => p.categories.includes(cat));

  return (
    <div>
      <div className="-mx-6 mb-10 flex gap-2 overflow-x-auto px-6 pb-1 [scrollbar-width:none] md:mx-0 md:flex-wrap md:overflow-visible md:px-0 [&::-webkit-scrollbar]:hidden">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={cn(
              "shrink-0 whitespace-nowrap rounded-full border px-5 py-2 text-sm font-semibold transition",
              c === cat ? "border-brand bg-brand text-black" : "border-line bg-white/[0.04] text-ink hover:border-brand hover:text-brand",
            )}
          >
            {c}
          </button>
        ))}
      </div>
      <motion.div layout className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {shown.map((p) => (
            <motion.div key={p.id} layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.3 }}>
              <ProjectCard p={p} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
