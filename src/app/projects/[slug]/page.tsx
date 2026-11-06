import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FiArrowLeft, FiArrowRight, FiArrowUpRight, FiGlobe } from "react-icons/fi";
import PageHero from "@/components/PageHero";
import ProjectCard from "@/components/ProjectCard";
import CTA from "@/components/CTA";
import { Button, Reveal, SbImage, Section } from "@/components/ui";
import { getProject, getProjects } from "@/lib/storyblok";
import { abs, breadcrumbLd, pageMeta } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";

export async function generateStaticParams() {
  const projects = await getProjects();
  // Cache Components requires at least one param; "_" renders a 404 until projects exist in Storyblok.
  return projects.length ? projects.map((p) => ({ slug: p.slug })) : [{ slug: "_" }];
}

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = await getProject(slug);
  if (!p) return {};
  const description = p.description.slice(0, 160) || `${p.title} — a project by Uptick Tech.`;
  return pageMeta({ title: p.title + " — Project", description, path: "/projects/" + p.slug, image: p.image?.src });
}

function host(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

async function ProjectPageContent({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const [p, all] = await Promise.all([getProject(slug), getProjects()]);
  if (!p) notFound();

  const idx = all.findIndex((x) => x.slug === p.slug);
  const prev = all.length > 1 ? all[(idx - 1 + all.length) % all.length] : null;
  const next = all.length > 1 ? all[(idx + 1) % all.length] : null;
  const more = all.filter((x) => x.slug !== p.slug).slice(0, 3);

  return (
    <>
      <JsonLd data={[
        { "@context": "https://schema.org", "@type": "CreativeWork", name: p.title, description: p.description || undefined, image: p.image ? [p.image.src] : undefined, url: abs("/projects/" + p.slug), creator: { "@id": abs("/#organization") }, genre: p.category || undefined },
        breadcrumbLd([{ name: "Home", path: "/" }, { name: "Projects", path: "/projects" }, { name: p.title, path: "/projects/" + p.slug }]),
      ]} />
      <PageHero
        eyebrow={p.category || "Project"}
        title={p.title}
        crumbs={[{ label: "Projects", href: "/projects" }, { label: p.title }]}
      />

      <Section>
        <div className="grid gap-10 lg:grid-cols-[1fr_340px]">
          <div>
            {/* browser-style frame around the screenshot */}
            <Reveal>
              <div className="overflow-hidden rounded-3xl border border-line bg-white/[0.04] shadow-2xl shadow-black/50 backdrop-blur-sm">
                <div className="flex items-center gap-2 border-b border-line px-5 py-3">
                  <i className="size-2.5 rounded-full bg-white/40" />
                  <i className="size-2.5 rounded-full bg-white/25" />
                  <i className="size-2.5 rounded-full bg-white/15" />
                  {p.link && <span className="ml-3 truncate rounded-full bg-white/10 px-4 py-1 text-xs text-white/80">{host(p.link)}</span>}
                </div>
                <SbImage image={p.image} label={p.title} sizes="(min-width: 1024px) 66vw, 100vw" priority className="aspect-[21/10] w-full" />
              </div>
            </Reveal>

            {p.description && (
              <Reveal className="mt-12">
                <h2 className="font-display text-2xl font-semibold text-white md:text-3xl">About this project</h2>
                <div className="mt-5 space-y-5 text-lg leading-relaxed text-muted">
                  {p.description.split(/\n{2,}/).map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
              </Reveal>
            )}
          </div>

          <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
            <Reveal>
              <div className="rounded-3xl border border-line bg-white/[0.04] p-6 backdrop-blur-sm">
                <h3 className="font-display text-lg font-semibold text-white">Project details</h3>
                <dl className="mt-5 space-y-5 text-sm">
                  <div>
                    <dt className="text-white/60">Project</dt>
                    <dd className="mt-1 text-base text-white">{p.title}</dd>
                  </div>
                  {p.categories.length > 0 && (
                    <div>
                      <dt className="text-white/60">Category</dt>
                      <dd className="mt-2 flex flex-wrap gap-2">
                        {p.categories.map((c) => (
                          <span key={c} className="rounded-full border border-line bg-white/10 px-3 py-1 text-xs text-white">{c}</span>
                        ))}
                      </dd>
                    </div>
                  )}
                  {p.link && (
                    <div>
                      <dt className="text-white/60">Website</dt>
                      <dd className="mt-1 text-base text-white">{host(p.link)}</dd>
                    </div>
                  )}
                </dl>
                {p.link && (
                  <a
                    href={p.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 flex items-center justify-center gap-2 rounded-full border border-white/25 bg-white/10 px-6 py-3 font-semibold text-white backdrop-blur-md transition hover:bg-white/20"
                  >
                    <FiGlobe /> Visit live website <FiArrowUpRight />
                  </a>
                )}
              </div>
            </Reveal>
            <div className="rounded-3xl border border-line bg-white/[0.04] p-6 backdrop-blur-sm">
              <h3 className="font-display text-xl font-semibold text-white">Want something similar?</h3>
              <p className="mt-2 text-sm text-muted">Tell us about your idea and we&apos;ll get back within 2 hours.</p>
              <Button href="/contact" className="mt-5 w-full">Start a project <FiArrowRight /></Button>
            </div>
          </aside>
        </div>

        {prev && next && (
          <nav aria-label="More projects" className="mt-14 grid gap-4 sm:grid-cols-2">
            <Link href={`/projects/${prev.slug}`} className="group flex items-center gap-3 rounded-2xl border border-line bg-white/[0.04] p-5 transition hover:border-white/30">
              <FiArrowLeft className="text-xl text-white transition group-hover:-translate-x-1" />
              <span>
                <span className="block text-xs uppercase tracking-widest text-white/60">Previous</span>
                <span className="font-display text-lg text-white">{prev.title}</span>
              </span>
            </Link>
            <Link href={`/projects/${next.slug}`} className="group flex items-center justify-end gap-3 rounded-2xl border border-line bg-white/[0.04] p-5 text-right transition hover:border-white/30">
              <span>
                <span className="block text-xs uppercase tracking-widest text-white/60">Next</span>
                <span className="font-display text-lg text-white">{next.title}</span>
              </span>
              <FiArrowRight className="text-xl text-white transition group-hover:translate-x-1" />
            </Link>
          </nav>
        )}
      </Section>

      {more.length > 1 && (
        <Section>
          <h2 className="mb-8 font-display text-3xl font-light text-white md:text-4xl">More projects</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {more.map((x) => (
              <ProjectCard key={x.id} p={x} />
            ))}
          </div>
        </Section>
      )}
      <CTA />
    </>
  );
}

// params is read inside <Suspense> so the route's static shell stays instant (Partial Prefetching).
export default function ProjectPage(props: PageProps<"/projects/[slug]">) {
  return (
    <Suspense fallback={<div className="min-h-[70vh]" />}>
      <ProjectPageContent {...props} />
    </Suspense>
  );
}
