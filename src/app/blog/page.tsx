import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import BlogCard from "@/components/BlogCard";
import CTA from "@/components/CTA";
import { Reveal, Section } from "@/components/ui";
import EmptyState from "@/components/EmptyState";
import { getPosts } from "@/lib/storyblok";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({ title: "Blog — Web & Software Insights", description: "Practical articles on web development, SaaS, custom software, digital transformation and building scalable digital products for your business.", path: "/blog" });

export default async function Blog() {
  const posts = await getPosts();
  return (
    <>
      <PageHero
        eyebrow="Blog"
        title={<>Insights & <span className="text-gradient">ideas</span></>}
        description="Practical notes on building fast, scalable and beautiful digital products."
        crumbs={[{ label: "Blog" }]}
      />
      <Section>
        {posts.length === 0 ? <EmptyState title="Articles coming soon" text="We are writing our first posts. Check back shortly." /> : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 3) * 0.08}>
              <BlogCard post={p} />
            </Reveal>
          ))}
        </div>
        )}
      </Section>
      <CTA />
    </>
  );
}
