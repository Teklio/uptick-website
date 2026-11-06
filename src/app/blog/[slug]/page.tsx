import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FiArrowLeft, FiClock, FiUser } from "react-icons/fi";
import PageHero from "@/components/PageHero";
import BlogCard, { formatDate } from "@/components/BlogCard";
import CTA from "@/components/CTA";
import { SbImage, Section } from "@/components/ui";
import { getPost, getPosts } from "@/lib/storyblok";
import { abs, breadcrumbLd, pageMeta } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";

export async function generateStaticParams() {
  const posts = await getPosts();
  // Cache Components requires at least one param; "_" renders a 404 until posts exist in Storyblok.
  return posts.length ? posts.map((p) => ({ slug: p.slug })) : [{ slug: "_" }];
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};
  return pageMeta({ title: post.title, description: post.description, path: "/blog/" + post.slug, image: post.image?.src, type: "article" });
}

async function PostContent({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const [post, all] = await Promise.all([getPost(slug), getPosts()]);
  if (!post) notFound();
  const related = all.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <>
      <JsonLd data={[
        { "@context": "https://schema.org", "@type": "BlogPosting", headline: post.title, description: post.description.slice(0, 200), image: post.image ? [post.image.src] : undefined, datePublished: post.date || undefined, dateModified: post.date || undefined, author: { "@type": post.author ? "Person" : "Organization", name: post.author || "Uptick Tech" }, publisher: { "@id": abs("/#organization") }, mainEntityOfPage: abs("/blog/" + post.slug), keywords: post.tags.join(", ") || undefined },
        breadcrumbLd([{ name: "Home", path: "/" }, { name: "Blog", path: "/blog" }, { name: post.title, path: "/blog/" + post.slug }]),
      ]} />
      <PageHero eyebrow={post.tags[0] ?? "Article"} title={post.title} crumbs={[{ label: "Blog", href: "/blog" }, { label: post.title }]} />
      <Section>
        <article className="mx-auto max-w-3xl">
          <div className="mb-8 flex flex-wrap items-center gap-5 text-sm text-muted">
            {post.author && <span className="flex items-center gap-1.5"><FiUser /> {post.author}</span>}
            {post.date && <span>{formatDate(post.date)}</span>}
            {post.readtime && <span className="flex items-center gap-1.5"><FiClock /> {post.readtime}</span>}
          </div>
          {post.image && <SbImage image={post.image} className="mb-10 aspect-[16/9] rounded-3xl" sizes="768px" />}
          <div className="space-y-6 text-lg leading-relaxed text-ink/85">
            {post.description.split(/\n{2,}/).map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
          {post.tags.length > 0 && (
            <div className="mt-10 flex flex-wrap gap-2">
              {post.tags.map((t) => (
                <span key={t} className="rounded-full bg-soft px-3 py-1 text-xs font-medium text-muted">#{t}</span>
              ))}
            </div>
          )}
          <Link href="/blog" className="mt-10 inline-flex items-center gap-2 font-semibold text-brand"><FiArrowLeft /> Back to all articles</Link>
        </article>
      </Section>
      {related.length > 0 && (
        <Section soft>
          <h2 className="mb-10 font-display text-3xl font-bold text-ink">Keep reading</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {related.map((p) => (
              <BlogCard key={p.slug} post={p} />
            ))}
          </div>
        </Section>
      )}
      <CTA />
    </>
  );
}

// params is read inside <Suspense> so the route's static shell stays instant (Partial Prefetching).
export default function Post(props: PageProps<"/blog/[slug]">) {
  return (
    <Suspense fallback={<div className="min-h-[70vh]" />}>
      <PostContent {...props} />
    </Suspense>
  );
}
