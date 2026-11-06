"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { FiArrowRight, FiChevronDown, FiMenu, FiX } from "react-icons/fi";
import { nav, services } from "@/data/site";
import { cn } from "@/lib/utils";
import Logo from "./Logo";
import ServiceIcon from "./ServiceIcon";

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [mega, setMega] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // close menus on navigation
  useEffect(() => {
    const t = setTimeout(() => {
      setOpen(false);
      setMega(false);
    }, 0);
    return () => clearTimeout(t);
  }, [pathname]);

  const active = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled || open ? "border-b border-line bg-black/70 backdrop-blur-md" : "bg-transparent",
      )}
    >
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        <Logo variant="white" />

        <ul className="hidden items-center gap-1 lg:flex">
          {nav.map((l) =>
            l.mega ? (
              <li key={l.href} className="relative" onMouseEnter={() => setMega(true)} onMouseLeave={() => setMega(false)}>
                <Link
                  href={l.href}
                  className={cn(
                    "flex items-center gap-1 rounded-full px-4 py-2 text-lg font-medium transition hover:text-brand",
                    active(l.href) ? "text-brand" : "text-ink",
                  )}
                >
                  {l.label} <FiChevronDown className={cn("transition", mega && "rotate-180")} />
                </Link>
                <AnimatePresence>
                  {mega && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.18 }}
                      className="absolute left-1/2 top-full w-[640px] -translate-x-1/2 pt-3"
                    >
                      <div className="grid grid-cols-2 gap-1 rounded-2xl border border-line bg-[#0a0a12] p-3 shadow-2xl shadow-brand/20">
                        {services.map((s) => (
                          <Link
                            key={s.slug}
                            href={`/services/${s.slug}`}
                            className="group flex items-start gap-3 rounded-xl p-3 transition hover:bg-soft"
                          >
                            <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-brand/10 text-lg text-brand">
                              <ServiceIcon name={s.icon} />
                            </span>
                            <span>
                              <span className="block text-base font-semibold text-ink group-hover:text-brand">{s.title}</span>
                              <span className="line-clamp-1 text-xs text-muted">{s.short}</span>
                            </span>
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            ) : (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={cn(
                    "rounded-full px-4 py-2 text-lg font-medium transition hover:text-brand",
                    active(l.href) ? "text-brand" : "text-ink",
                  )}
                >
                  {l.label}
                </Link>
              </li>
            ),
          )}
        </ul>

        <Link
          href="/contact"
          className="hidden items-center gap-2 rounded-full border border-white/25 bg-white/10 text-white backdrop-blur-md hover:bg-white/20 px-6 py-2.5 text-lg font-semibold transition lg:inline-flex"
        >
          Start a project <FiArrowRight />
        </Link>

        <button aria-label="Toggle menu" aria-expanded={open} className="text-2xl lg:hidden" onClick={() => setOpen((o) => !o)}>
          {open ? <FiX /> : <FiMenu />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-line bg-black lg:hidden"
          >
            <ul className="mx-auto max-w-7xl space-y-1 px-6 py-4">
              {nav.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={cn("block rounded-lg px-3 py-3 font-medium", active(l.href) ? "bg-soft text-brand" : "text-ink")}>
                    {l.label}
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <Link href="/contact" className="block rounded-full border border-white/25 bg-white/10 text-white backdrop-blur-md hover:bg-white/20 px-5 py-3 text-center font-semibold">
                  Start a project
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
