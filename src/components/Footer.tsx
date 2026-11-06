import Link from "next/link";
import { FiMail, FiMapPin, FiNavigation, FiPhone } from "react-icons/fi";
import { FaGithub, FaInstagram, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import { nav, services, site } from "@/data/site";
import Logo from "./Logo";

const socialIcons = { LinkedIn: FaLinkedinIn, GitHub: FaGithub, Instagram: FaInstagram, X: FaXTwitter } as const;

export default function Footer() {
  return (
    <footer className="border-t border-line bg-black/50 text-white">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-x-4 gap-y-8 px-6 py-9 text-center md:grid-cols-2 md:gap-10 md:py-14 md:text-left lg:grid-cols-4">
        <div className="col-span-2 flex flex-col items-center md:col-span-1 md:items-start">
          <Logo variant="white" imgClassName="h-14 md:h-10" />
          <p className="mt-4 max-w-xs text-sm md:mt-5 leading-relaxed text-white/80">{site.tagline}. Scalable, secure and high-performance digital products.</p>
          <div className="mt-5 flex gap-3 md:mt-6">
            {site.social.map((s) => {
              const Icon = socialIcons[s.label as keyof typeof socialIcons];
              return (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} className="grid size-10 place-items-center rounded-full border border-white/15 text-white/70 transition hover:border-white hover:bg-white hover:text-black">
                  <Icon />
                </a>
              );
            })}
          </div>
        </div>

        <div>
          <h3 className="mb-3 font-display text-sm md:mb-5 font-semibold uppercase tracking-widest text-white/70">Company</h3>
          <ul className="space-y-2.5 text-sm md:space-y-3">
            {nav.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-white/80 transition hover:text-white">{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-3 font-display text-sm md:mb-5 font-semibold uppercase tracking-widest text-white/70">Services</h3>
          <ul className="space-y-2.5 text-sm md:space-y-3">
            {services.slice(0, 6).map((s) => (
              <li key={s.slug}>
                <Link href={`/services/${s.slug}`} className="text-white/80 transition hover:text-white">{s.title}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-3 font-display text-sm md:mb-5 font-semibold uppercase tracking-widest text-white/70">Get in touch</h3>
          <ul className="space-y-3 text-center text-sm text-white/80 md:space-y-4 md:text-left">
            <li className="flex justify-center gap-3 md:justify-start"><FiMail className="mt-0.5 shrink-0 text-brand" /><a href={`mailto:${site.contact.email}`}>{site.contact.email}</a></li>
            <li className="flex justify-center gap-3 md:justify-start"><FiPhone className="mt-0.5 shrink-0 text-brand" /><a href={`tel:${site.contact.phone.replace(/\s/g, "")}`}>{site.contact.phone}</a></li>
            <li className="flex justify-center gap-3 md:justify-start">
              <FiMapPin className="mt-0.5 shrink-0 text-brand" />
              <span>
                {site.contact.address}
                <a href={site.contact.mapUrl} target="_blank" rel="noopener noreferrer" className="mt-1 flex items-center justify-center gap-1.5 font-medium md:justify-start text-white transition hover:underline">
                  <FiNavigation className="text-xs" /> Get directions
                </a>
              </span>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <p className="mx-auto max-w-7xl px-6 py-4 text-center text-sm md:py-6 text-white/70">© 2026 {site.name}. All rights reserved.</p>
      </div>
    </footer>
  );
}
