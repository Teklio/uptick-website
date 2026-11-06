import { techStack } from "@/data/site";
import type { Partner } from "@/lib/storyblok";
import { SbImage } from "./ui";

const mask = "[mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]";

export function TechMarquee() {
  const row = [...techStack, ...techStack];
  return (
    <div className={`overflow-hidden ${mask}`}>
      <div className="flex w-max animate-marquee gap-4 will-change-transform hover:[animation-play-state:paused]">
        {row.map((t, i) => (
          <span key={i} className="rounded-full border border-line bg-white/[0.04] px-6 py-3 font-display text-lg font-semibold text-ink/70 transition hover:border-brand hover:text-brand">
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

export function PartnersMarquee({ partners }: { partners: Partner[] }) {
  if (!partners.length) return null;
  // 4 copies (an even number) so the -50% marquee loop is seamless
  const row = [...partners, ...partners, ...partners, ...partners];
  return (
    <div className={`overflow-hidden py-2 ${mask}`}>
      <div className="flex w-max animate-marquee items-center gap-6 will-change-transform hover:[animation-play-state:paused] md:gap-8">
        {row.map((p, i) => (
          <div
            key={i}
            title={p.name}
            className="grid h-24 w-44 shrink-0 place-items-center rounded-2xl border-2 border-white bg-white p-4 shadow-lg shadow-white/10 ring-4 ring-white/15 transition duration-300 hover:scale-105 md:h-32 md:w-60 md:p-5"
          >
            {p.logo ? (
              <SbImage image={p.logo} label={p.name} className="h-full w-full [&_img]:object-contain" sizes="240px" />
            ) : (
              <span className="font-display text-xl font-bold text-black">{p.name}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
