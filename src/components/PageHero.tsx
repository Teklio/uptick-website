import Reveal from "./Reveal";

/** Inner-page hero — centred light heading, no wave lines. */
export default function PageHero({
  title,
  description,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: string;
  crumbs?: { label: string; href?: string }[];
}) {
  return (
    <section
      className="relative flex items-center justify-center overflow-hidden pb-10 pt-36 md:pt-40"
    >
      <Reveal className="relative z-10 mx-auto flex max-w-5xl flex-col items-center px-6 text-center">
        <h1 className="font-display text-4xl font-light leading-[1.15] tracking-tight text-white [text-shadow:0_2px_30px_rgb(0_0_0/0.6)] md:text-6xl lg:text-7xl">{title}</h1>
        {description && <p className="mt-6 max-w-2xl text-lg text-white/85 md:text-xl">{description}</p>}
      </Reveal>
    </section>
  );
}
