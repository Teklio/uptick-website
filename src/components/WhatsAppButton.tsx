import { FaWhatsapp } from "react-icons/fa6";
import { site } from "@/data/site";

/** Floating WhatsApp chat button, stuck to the bottom-right of every page. */
export default function WhatsAppButton() {
  const href = `https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent("Hi Uptick Tech, I'd like to discuss a project.")}`;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Chat on WhatsApp ${site.contact.phone}`}
      className="fixed bottom-5 right-5 z-50 grid size-14 place-items-center rounded-full bg-[#25D366] text-3xl text-white shadow-[0_10px_30px_-5px_rgb(37_211_102/0.6)] transition hover:scale-110 md:bottom-7 md:right-7 md:size-16 md:text-4xl"
    >
      <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366]/40 [animation-duration:2.5s]" aria-hidden />
      <FaWhatsapp className="relative" />
    </a>
  );
}
