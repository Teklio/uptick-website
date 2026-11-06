import type { Partner } from "@/lib/storyblok";
import { PartnersMarquee } from "./Marquees";
import Reveal from "./Reveal";

/** "Trusted by" band — big light heading (same style as the Expertise section) + coloured logo tiles from Storyblok. */
export default function PartnersSection({ partners }: { partners: Partner[] }) {
  if (!partners.length) return null;
  return (
    <section className="overflow-hidden py-16 md:py-24">
      <Reveal className="mx-auto mb-12 max-w-6xl px-6 text-center">
        <h2 className="font-display text-3xl font-light leading-tight tracking-tight text-white sm:text-5xl md:text-7xl">
          Trusted by Growing Businesses
        </h2>
      </Reveal>
      <PartnersMarquee partners={partners} />
    </section>
  );
}
