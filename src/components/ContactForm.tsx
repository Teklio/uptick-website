"use client";

import { useState } from "react";
import { FiCheck, FiChevronDown, FiSend } from "react-icons/fi";
import { validateContact } from "@/lib/validate";

// values mirror the `category` options on the Storyblok `contact` block
export const categories = [
  ["WEB DEVELOPMENT", "Web development"],
  ["APP DEVELOPMENT", "App development"],
  ["E-COMMERCE", "E-commerce"],
  ["ERP SOFTWARE", "ERP software"],
  ["CUSTOME", "Custom software"],
  ["OTHER ENQUIRY", "Other enquiry"],
] as const;

const field =
  "w-full rounded-xl border border-line bg-white/[0.04] px-4 py-3 text-sm text-ink outline-none transition placeholder:text-muted/70 focus:border-brand focus:ring-4 focus:ring-brand/10";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");
  const [errors, setErrors] = useState<Partial<Record<"name" | "email" | "phone", string>>>({});

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const values = Object.fromEntries(new FormData(form)) as Record<string, string>;
    const found = validateContact({ name: values.fullname ?? "", email: values.email ?? "", phone: values.phone ?? "" });
    setErrors(found);
    setError("");
    if (Object.keys(found).length) return;
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await res.json().catch(() => ({}));
      // only report success when the server confirms the enquiry was saved
      if (!res.ok || !data.ok) {
        if (data.errors) setErrors(data.errors);
        throw new Error(data.error || "Something went wrong. Please try again.");
      }
      form.reset();
      setStatus("sent");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="grid place-items-center rounded-3xl border border-line bg-white/[0.04] p-12 text-center shadow-xl shadow-brand/5">
        <span className="mb-4 grid size-16 place-items-center rounded-full bg-emerald-50 text-3xl text-emerald-600"><FiCheck /></span>
        <h3 className="font-display text-2xl font-bold text-ink">Thank you!</h3>
        <p className="mt-2 max-w-sm text-muted">We have received your enquiry and will reply within 2 hours.</p>
        <button onClick={() => setStatus("idle")} className="mt-6 text-sm font-semibold text-brand">Send another message</button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-4 rounded-3xl border border-line bg-white/[0.04] p-8 shadow-xl shadow-brand/5">
      {/* honeypot: real users never see or fill this */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm font-medium text-ink">Full name
          <input name="fullname" autoComplete="name" placeholder="John Doe" className={`${field} mt-1.5 ${errors.name ? "!border-red-400/70" : ""}`} />
          {errors.name && <span role="alert" className="mt-1 block text-xs text-red-400">{errors.name}</span>}
        </label>
        <label className="block text-sm font-medium text-ink">Email
          <input type="email" name="email" autoComplete="email" placeholder="you@company.com" className={`${field} mt-1.5 ${errors.email ? "!border-red-400/70" : ""}`} />
          {errors.email && <span role="alert" className="mt-1 block text-xs text-red-400">{errors.email}</span>}
        </label>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm font-medium text-ink">Phone
          <input name="phone" type="tel" inputMode="numeric" autoComplete="tel-national" maxLength={14} placeholder="10-digit mobile number" className={`${field} mt-1.5 ${errors.phone ? "!border-red-400/70" : ""}`} />
          {errors.phone && <span role="alert" className="mt-1 block text-xs text-red-400">{errors.phone}</span>}
        </label>
        <label className="block text-sm font-medium text-ink">I&apos;m interested in
          <span className="relative mt-1.5 block"><select name="category" defaultValue="WEB DEVELOPMENT" className={`${field} cursor-pointer appearance-none pr-11`}>
            {categories.map(([v, l]) => (
              <option key={v} value={v} className="bg-zinc-900 text-white">{l}</option>
            ))}
          </select><FiChevronDown aria-hidden className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-lg text-white/70" /></span>
        </label>
      </div>
      <label className="block text-sm font-medium text-ink">Tell us about your project
        <textarea required minLength={5} name="subject" rows={5} placeholder="What are you looking to build?" className={`${field} mt-1.5`} />
      </label>
      {status === "error" && <p role="alert" className="text-sm text-red-400">{error}</p>}
      <button
        type="submit"
        disabled={status === "sending"}
        className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/10 text-white backdrop-blur-md hover:bg-white/20 py-3.5 font-semibold transition disabled:opacity-60"
      >
        <FiSend /> {status === "sending" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
