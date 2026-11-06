import { FaQuoteLeft } from "react-icons/fa6";
import type { Testimonial } from "@/lib/storyblok";
import Reveal from "./Reveal";
import { SbImage } from "./ui";

export default function Testimonials({ items }: { items: Testimonial[] }) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {items.map((t, i) => (
        <Reveal key={t.id} delay={i * 0.08}>
          <figure className="flex h-full flex-col rounded-3xl border border-line bg-white/[0.04] p-8 shadow-sm">
            <FaQuoteLeft className="text-2xl text-brand/30" />
            <blockquote className="mt-4 flex-1 leading-relaxed text-ink">{t.text}</blockquote>
            <figcaption className="mt-6 flex items-center gap-3">
              <SbImage image={t.image} label={t.name.slice(0, 1)} className="size-12 rounded-full [&_span]:text-lg" sizes="48px" />
              <div>
                <p className="font-semibold text-ink">{t.name}</p>
                <p className="text-sm text-muted">{[t.role, t.company].filter(Boolean).join(", ")}</p>
              </div>
            </figcaption>
          </figure>
        </Reveal>
      ))}
    </div>
  );
}
