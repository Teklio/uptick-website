import Link from "next/link";
import { FiArrowRight, FiArrowUpRight } from "react-icons/fi";
import type { Project } from "@/lib/storyblok";
import Reveal from "./Reveal";
import MobileCarousel from "./MobileCarousel";
import { SbImage } from "./ui";

/**
 * Home-page project section: big heading + wide, image-first cards in a
 * plain static grid (no scroll effects). Each card opens the project's page.
 */
export default function ProjectShowcase({ projects }: { projects: Project[] }) {
  return (
    <section id="work" className="py-16 md:py-24">
      <Reveal className="mx-auto mb-12 max-w-6xl px-6 text-center">
        <h2 className="font-display text-3xl font-light leading-tight tracking-tight text-white sm:text-5xl md:text-7xl">
          Products we are proud of
        </h2>
      </Reveal>

      <div className="mx-auto max-w-[88rem] md:px-6">
      <MobileCarousel desktopClassName="md:grid-cols-2 md:gap-8">
        {[...projects].reverse().slice(0, 4).map((p, i) => (
          <div key={p.id} className="h-full">
            <Link
              href={`/projects/${p.slug}`}
              aria-label={`View project: ${p.title}`}
              className="group block overflow-hidden rounded-3xl border border-line bg-white/[0.04] transition duration-300 hover:-translate-y-1.5 hover:border-white/30 hover:shadow-2xl hover:shadow-white/5"
            >
              <div className="overflow-hidden">
                <SbImage
                  image={p.image}
                  label={p.title}
                  sizes="(min-width: 1536px) 704px, (min-width: 768px) 50vw, 100vw"
                  priority={i < 2}
                  className="aspect-[21/10] transition duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex items-center justify-between gap-4 px-6 py-5">
                <div>
                  {p.category && <p className="text-xs font-semibold uppercase tracking-widest text-white/70">{p.category}</p>}
                  <p className="mt-1 font-display text-2xl font-light text-white md:text-3xl">{p.title}</p>
                </div>
                <span className="grid size-12 shrink-0 place-items-center rounded-full border border-white/25 bg-white/10 text-xl text-white transition group-hover:bg-white group-hover:text-black">
                  <FiArrowUpRight />
                </span>
              </div>
            </Link>
          </div>
        ))}
      </MobileCarousel>
      </div>

      <div className="mt-12 flex justify-center">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-7 py-3 text-base font-semibold text-white backdrop-blur-md transition hover:-translate-y-0.5 hover:bg-white/20"
        >
          View all projects <FiArrowRight />
        </Link>
      </div>
    </section>
  );
}
