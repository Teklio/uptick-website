"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiCheck, FiSend, FiX } from "react-icons/fi";
import { validateContact, type Fields } from "@/lib/validate";

export const OPEN_LEAD_EVENT = "open-lead-modal";
export const openLeadModal = () => window.dispatchEvent(new Event(OPEN_LEAD_EVENT));

const input =
  "mt-1.5 w-full rounded-xl border bg-white/[0.06] px-4 py-3 text-base text-white outline-none transition placeholder:text-white/40 focus:border-white/60 focus:ring-4 focus:ring-white/10";

type Errors = Partial<Record<keyof Fields, string>>;

/** "Start a project" popup: name, email, phone → Storyblok `leads` folder. Mounted once in the layout. */
export default function LeadModal() {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [serverError, setServerError] = useState("");
  const firstField = useRef<HTMLInputElement>(null);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    const onOpen = () => {
      setStatus("idle");
      setErrors({});
      setServerError("");
      setOpen(true);
    };
    window.addEventListener(OPEN_LEAD_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_LEAD_EVENT, onOpen);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => firstField.current?.focus(), 80);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
      clearTimeout(t);
    };
  }, [open, close]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const values = {
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      website: String(fd.get("website") ?? ""),
    };
    const found = validateContact(values);
    setErrors(found);
    setServerError("");
    if (Object.keys(found).length) return;

    setStatus("sending");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await res.json().catch(() => ({}));
      // success is only shown when the server confirms the data was saved
      if (!res.ok || !data.ok) {
        if (data.errors) setErrors(data.errors);
        throw new Error(data.error || "Something went wrong. Please try again.");
      }
      setStatus("sent");
    } catch (err) {
      setServerError(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("error");
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] grid place-items-center overflow-y-auto bg-black/70 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onMouseDown={(e) => e.target === e.currentTarget && close()}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="lead-title"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-md rounded-3xl border border-white/15 bg-zinc-950/95 p-7 shadow-2xl shadow-black md:p-9"
          >
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="absolute right-4 top-4 grid size-9 place-items-center rounded-full border border-white/15 bg-white/10 text-lg text-white transition hover:bg-white/20"
            >
              <FiX />
            </button>

            {status === "sent" ? (
              <div className="flex flex-col items-center py-6 text-center">
                <span className="mb-4 grid size-16 place-items-center rounded-full bg-emerald-500/15 text-3xl text-emerald-400">
                  <FiCheck />
                </span>
                <h2 id="lead-title" className="font-display text-2xl font-light text-white">Thank you!</h2>
                <p className="mt-2 text-white/75">We have received your details and will contact you shortly.</p>
                <button
                  type="button"
                  onClick={close}
                  className="mt-6 rounded-full border border-white/25 bg-white/10 px-7 py-2.5 text-sm font-semibold text-white transition hover:bg-white/20"
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={onSubmit} noValidate className="space-y-4">
                <div className="pr-8">
                  <h2 id="lead-title" className="font-display text-3xl font-light text-white">Start a project</h2>
                  <p className="mt-1.5 text-sm text-white/70">Share your details and we will get back to you.</p>
                </div>

                <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

                <label className="block text-sm font-medium text-white">
                  Name
                  <input
                    ref={firstField}
                    name="name"
                    autoComplete="name"
                    placeholder="Your full name"
                    aria-invalid={!!errors.name}
                    className={`${input} ${errors.name ? "border-red-400/70" : "border-white/15"}`}
                  />
                  {errors.name && <span role="alert" className="mt-1 block text-xs text-red-400">{errors.name}</span>}
                </label>

                <label className="block text-sm font-medium text-white">
                  Email
                  <input
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@company.com"
                    aria-invalid={!!errors.email}
                    className={`${input} ${errors.email ? "border-red-400/70" : "border-white/15"}`}
                  />
                  {errors.email && <span role="alert" className="mt-1 block text-xs text-red-400">{errors.email}</span>}
                </label>

                <label className="block text-sm font-medium text-white">
                  Phone
                  <input
                    name="phone"
                    type="tel"
                    inputMode="numeric"
                    autoComplete="tel-national"
                    placeholder="10-digit mobile number"
                    maxLength={14}
                    aria-invalid={!!errors.phone}
                    className={`${input} ${errors.phone ? "border-red-400/70" : "border-white/15"}`}
                  />
                  {errors.phone && <span role="alert" className="mt-1 block text-xs text-red-400">{errors.phone}</span>}
                </label>

                {status === "error" && serverError && (
                  <p role="alert" className="rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                    {serverError}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/10 py-3.5 font-semibold text-white backdrop-blur-md transition hover:bg-white/20 disabled:opacity-60"
                >
                  <FiSend /> {status === "sending" ? "Sending…" : "Submit"}
                </button>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
