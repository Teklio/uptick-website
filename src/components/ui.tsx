import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import type { Img } from "@/lib/storyblok";
import Reveal from "./Reveal";

export { Reveal };

export function Section({
  id,
  className,
  children,
  soft,
}: {
  id?: string;
  className?: string;
  children: React.ReactNode;
  soft?: boolean;
}) {
  return (
    <section id={id} className={cn("py-16 md:py-24", soft && "bg-soft", className)}>
      <div className="mx-auto max-w-7xl px-6">{children}</div>
    </section>
  );
}

export function SectionHeading({
  title,
  sub,
  align = "center",
}: {
  /** kept for call-site compatibility; the label pill is no longer rendered */
  eyebrow?: string;
  title: React.ReactNode;
  sub?: string;
  align?: "center" | "left";
}) {
  return (
    <Reveal className={cn("mb-10 max-w-2xl", align === "center" && "mx-auto text-center")}>
      <h2 className="font-display text-3xl font-bold tracking-tight text-ink md:text-5xl">{title}</h2>
      {sub && <p className="mt-4 text-lg text-muted">{sub}</p>}
    </Reveal>
  );
}

export function Button({
  children,
  href,
  variant = "primary",
  className,
}: {
  children: React.ReactNode;
  href: string;
  variant?: "primary" | "ghost" | "light";
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition duration-300 hover:-translate-y-0.5 active:translate-y-0",
        variant === "primary" &&
          "border border-white/25 bg-white/10 text-white backdrop-blur-md hover:bg-white/20",
        variant === "ghost" && "border border-line bg-white/[0.04] text-ink hover:border-brand hover:text-brand",
        variant === "light" && "border border-white/25 bg-white/10 text-white backdrop-blur-md hover:bg-white/20",
        className,
      )}
    >
      {children}
    </Link>
  );
}

/** Storyblok image with a graceful gradient placeholder when none is set. */
export function SbImage({
  image,
  label,
  className,
  sizes = "(min-width: 1024px) 33vw, 100vw",
  priority = false,
}: {
  image: Img;
  label?: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  if (!image) {
    return (
      <div
        aria-hidden
        className={cn(
          "relative grid place-items-center overflow-hidden bg-gradient-to-br from-emerald-500/70 via-teal-600/60 to-zinc-800",
          className,
        )}
      >
        <div className="absolute inset-0 opacity-25 [background-image:radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:20px_20px]" />
        {label && <span className="relative font-display text-3xl font-bold text-white/90">{label}</span>}
      </div>
    );
  }
  return (
    <div className={cn("relative overflow-hidden", className)}>
      <Image
        src={image.src}
        alt={image.alt || label || ""}
        fill
        sizes={sizes}
        priority={priority}
        unoptimized={image.src.endsWith(".svg")}
        className="object-cover"
      />
    </div>
  );
}
