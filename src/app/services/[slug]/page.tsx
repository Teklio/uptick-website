import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FiArrowRight, FiCheckCircle } from "react-icons/fi";
import PageHero from "@/components/PageHero";
import ServiceIcon from "@/components/ServiceIcon";
import CTA from "@/components/CTA";
import { Button, Reveal, Section } from "@/components/ui";
import { processSteps, services } from "@/data/site";
import { abs, breadcrumbLd, pageMeta } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const s = services.find((x) => x.slug === slug);
  return s ? pageMeta({ title: s.title + " Services", description: s.intro, path: "/services/" + s.slug }) : {};
}

async function ServicePageContent({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const s = services.find((x) => x.slug === slug);
  if (!s) notFound();
  const others = services.filter((x) => x.slug !== s.slug).slice(0, 4);

  return (
    <>
      <JsonLd data={[
        { "@context": "https://schema.org", "@type": "Service", name: s.title, description: s.intro, serviceType: s.title, url: abs("/services/" + s.slug), provider: { "@id": abs("/#organization") }, areaServed: "Worldwide" },
        breadcrumbLd([{ name: "Home", path: "/" }, { name: "Services", path: "/services" }, { name: s.title, path: "/services/" + s.slug }]),
      ]} />
      <PageHero
        eyebrow="Service"
        title={s.title}
        description={s.short}
        crumbs={[{ label: "Services", href: "/services" }, { label: s.title }]}
      />

      <Section>
        <div className="grid gap-12 lg:grid-cols-[1fr_360px]">
          <div>
            <Reveal>
              <span className="mb-6 grid size-16 place-items-center rounded-2xl bg-brand/10 text-4xl text-brand"><ServiceIcon name={s.icon} /></span>
              <h2 className="font-display text-3xl font-bold text-ink">Overview</h2>
              <p className="mt-4 text-lg leading-relaxed text-muted">{s.intro}</p>
            </Reveal>

            <Reveal className="mt-12">
              <h2 className="font-display text-2xl font-bold text-ink">What&apos;s included</h2>
              <ul className="mt-6 grid gap-4 sm:grid-cols-2">
                {s.features.map((f) => (
                  <li key={f} className="flex gap-3 rounded-2xl border border-line bg-white/[0.04] p-5 text-ink">
                    <FiCheckCircle className="mt-0.5 shrink-0 text-xl text-brand" /> {f}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal className="mt-12">
              <h2 className="font-display text-2xl font-bold text-ink">How we deliver</h2>
              <ol className="mt-6 space-y-4">
                {processSteps.map(([n, t, d]) => (
                  <li key={n} className="flex gap-4">
                    <span className="grid size-10 shrink-0 place-items-center rounded-full bg-brand font-display text-sm font-bold text-black">{n}</span>
                    <div>
                      <h3 className="font-semibold text-ink">{t}</h3>
                      <p className="text-sm text-muted">{d}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>

          <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-3xl border border-line bg-soft p-6">
              <h3 className="font-display text-lg font-bold text-ink">Technologies</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {s.tech.map((t) => (
                  <span key={t} className="rounded-full border border-line bg-white/[0.04] px-3 py-1 text-xs font-medium text-ink">{t}</span>
                ))}
              </div>
            </div>
            <div className="rounded-3xl border border-brand/30 bg-brand/10 p-6 text-white">
              <h3 className="font-display text-xl font-bold">Ready to start?</h3>
              <p className="mt-2 text-sm text-white/70">Tell us about your project and get a free consultation.</p>
              <Button href="/contact" variant="light" className="mt-5 w-full">Get a free quote <FiArrowRight /></Button>
            </div>
            <div className="rounded-3xl border border-line p-6">
              <h3 className="font-display text-lg font-bold text-ink">Other services</h3>
              <ul className="mt-4 space-y-3 text-sm">
                {others.map((o) => (
                  <li key={o.slug}>
                    <Link href={`/services/${o.slug}`} className="flex items-center justify-between text-muted transition hover:text-brand">{o.title} <FiArrowRight /></Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </Section>
      <CTA />
    </>
  );
}

// params is read inside <Suspense> so the route's static shell stays instant (Partial Prefetching).
export default function ServicePage(props: PageProps<"/services/[slug]">) {
  return (
    <Suspense fallback={<div className="min-h-[70vh]" />}>
      <ServicePageContent {...props} />
    </Suspense>
  );
}
