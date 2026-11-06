"use client";

import { Children, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * On phones: a swipeable, auto-advancing carousel (no arrows) that loops.
 * From `md` up it becomes a normal grid using `desktopClassName`, so large
 * screens are unaffected.
 */
export default function MobileCarousel({
  children,
  desktopClassName,
  interval = 3500,
}: {
  children: React.ReactNode;
  desktopClassName: string;
  interval?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const mq = window.matchMedia("(max-width: 767px)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let paused = 0;
    let index = 0;

    const go = () => {
      if (!mq.matches || reduce || document.hidden || Date.now() < paused) return;
      const items = Array.from(el.children) as HTMLElement[];
      if (items.length < 2) return;
      // follow the user's own swipe position, then advance
      const center = el.scrollLeft + el.clientWidth / 2;
      let cur = 0;
      items.forEach((it, i) => {
        if (Math.abs(it.offsetLeft + it.offsetWidth / 2 - center) < Math.abs(items[cur].offsetLeft + items[cur].offsetWidth / 2 - center)) cur = i;
      });
      index = (cur + 1) % items.length;
      const t = items[index];
      el.scrollTo({ left: t.offsetLeft - (el.clientWidth - t.offsetWidth) / 2, behavior: "smooth" });
    };

    const hold = () => (paused = Date.now() + 6000);
    el.addEventListener("pointerdown", hold, { passive: true });
    el.addEventListener("touchmove", hold, { passive: true });
    const id = window.setInterval(go, interval);
    return () => {
      window.clearInterval(id);
      el.removeEventListener("pointerdown", hold);
      el.removeEventListener("touchmove", hold);
    };
  }, [interval]);

  return (
    <div
      ref={ref}
      className={cn(
        "relative flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-6 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
        "md:grid md:snap-none md:overflow-visible md:px-0 md:pb-0",
        desktopClassName,
      )}
    >
      {Children.map(children, (child) => (
        <div className="w-[82%] shrink-0 snap-center sm:w-[60%] md:w-auto md:shrink">{child}</div>
      ))}
    </div>
  );
}
