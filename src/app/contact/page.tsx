import type { Metadata } from "next";
import { FiClock, FiMail, FiMapPin, FiPhone } from "react-icons/fi";
import PageHero from "@/components/PageHero";
import ContactForm from "@/components/ContactForm";
import FAQ from "@/components/FAQ";
import { Reveal, Section, SectionHeading } from "@/components/ui";
import { site } from "@/data/site";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({ title: "Contact Us — Start Your Project", description: "Tell us about your project. Call +91 73069 94840 or email upticktechllp@gmail.com — Uptick Tech, Malappuram, Kerala. We reply within 2 hours.", path: "/contact" });

export default function Contact() {
  const info = [
    { Icon: FiMail, label: "Email", value: site.contact.email, href: `mailto:${site.contact.email}` },
    { Icon: FiPhone, label: "Phone", value: site.contact.phone, href: `tel:${site.contact.phone.replace(/\s/g, "")}` },
    { Icon: FiMapPin, label: "Location", value: site.contact.address },
    { Icon: FiClock, label: "Response time", value: site.contact.response },
  ];
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={<>Let&apos;s build something <span className="text-gradient">great</span></>}
        description="Tell us about your idea — we usually reply within 2 hours."
        crumbs={[{ label: "Contact" }]}
      />
      <Section>
        <div className="grid gap-10 lg:grid-cols-5">
          <Reveal className="space-y-4 lg:col-span-2">
            {info.map(({ Icon, label, value, href }) => (
              <div key={label} className="flex items-center gap-4 rounded-2xl border border-line bg-white/[0.04] p-5">
                <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-brand/10 text-xl text-brand"><Icon /></span>
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-muted">{label}</p>
                  {href ? <a href={href} className="break-words font-medium text-ink hover:text-brand">{value}</a> : <p className="font-medium text-ink">{value}</p>}
                </div>
              </div>
            ))}
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-3">
            <ContactForm />
          </Reveal>
        </div>
      </Section>
      <Section soft>
        <SectionHeading eyebrow="FAQs" title={<>Before you <span className="text-gradient">write</span></>} />
        <FAQ />
      </Section>
    </>
  );
}
