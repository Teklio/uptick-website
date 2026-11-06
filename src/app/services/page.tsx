import type { Metadata } from "next";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import PageHero from "@/components/PageHero";
import ServiceIcon from "@/components/ServiceIcon";
import CTA from "@/components/CTA";
import FAQ from "@/components/FAQ";
import { Reveal, Section, SectionHeading } from "@/components/ui";
import { services } from "@/data/site";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({ title: "Services — Web, SaaS, ERP & Cloud", description: "Web development, SaaS platforms, dashboards, ERP and custom software, mobile apps, e-commerce, cloud & DevOps and UI/UX design from Uptick Tech.", path: "/services" });

export default function Services() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title={<>Everything you need to <span className="text-gradient">build and scale</span></>}
        description="Strategy, design, development and deployment — delivered by one team that cares about the details."
        crumbs={[{ label: "Services" }]}
      />
      <Section>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.slug} delay={(i % 3) * 0.08}>
              <Link href={`/services/${s.slug}`} className="group flex h-full flex-col rounded-3xl border border-line bg-white/[0.04] p-8 transition duration-300 hover:-translate-y-1.5 hover:border-brand/40 hover:shadow-2xl hover:shadow-brand/10">
                <span className="mb-6 grid size-14 place-items-center rounded-2xl bg-brand/10 text-3xl text-brand transition group-hover:bg-brand group-hover:text-black">
                  <ServiceIcon name={s.icon} />
                </span>
                <h2 className="font-display text-xl font-bold text-ink">{s.title}</h2>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{s.short}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand transition-all group-hover:gap-3">Learn more <FiArrowRight /></span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>
      <Section soft>
        <SectionHeading eyebrow="FAQs" title={<>Questions? <span className="text-gradient">Answered.</span></>} />
        <FAQ />
      </Section>
      <CTA />
    </>
  );
}
