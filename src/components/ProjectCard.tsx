import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";
import type { Project } from "@/lib/storyblok";
import { SbImage } from "./ui";

/** Grid card — the whole card links to the project's own page. */
export default function ProjectCard({ p }: { p: Project }) {
  return (
    <Link
      href={`/projects/${p.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-white/[0.04] backdrop-blur-sm transition duration-300 hover:-translate-y-1.5 hover:border-white/30 hover:shadow-2xl hover:shadow-white/5"
    >
      <div className="overflow-hidden">
        <SbImage image={p.image} label={p.title} className="aspect-[16/10] transition duration-500 group-hover:scale-105" />
      </div>
      <div className="flex flex-1 items-start justify-between gap-4 p-6">
        <div>
          {p.category && <p className="text-xs font-semibold uppercase tracking-widest text-white/80">{p.category}</p>}
          <h3 className="mt-2 font-display text-xl font-semibold text-white">{p.title}</h3>
          {p.description && <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted">{p.description}</p>}
        </div>
        <span className="grid size-11 shrink-0 place-items-center rounded-full border border-white/20 text-xl text-white transition group-hover:bg-white group-hover:text-black">
          <FiArrowUpRight />
        </span>
      </div>
    </Link>
  );
}
