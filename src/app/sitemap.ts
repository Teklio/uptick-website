import type { MetadataRoute } from "next";
import { services, site } from "@/data/site";
import { getPosts, getProjects } from "@/lib/storyblok";

type Entry = MetadataRoute.Sitemap[number];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, projects] = await Promise.all([getPosts(), getProjects()]);
  const u = (p: string) => `${site.url.replace(/\/$/, "")}${p}`;

  const core: Entry[] = [
    { url: u("/"), changeFrequency: "weekly", priority: 1 },
    { url: u("/services"), changeFrequency: "monthly", priority: 0.9 },
    { url: u("/projects"), changeFrequency: "weekly", priority: 0.9 },
    { url: u("/about"), changeFrequency: "monthly", priority: 0.7 },
    { url: u("/blog"), changeFrequency: "weekly", priority: 0.8 },
    { url: u("/contact"), changeFrequency: "yearly", priority: 0.8 },
  ];
  const svc: Entry[] = services.map((s) => ({ url: u(`/services/${s.slug}`), changeFrequency: "monthly", priority: 0.8 }));
  const proj: Entry[] = projects.map((p) => ({ url: u(`/projects/${p.slug}`), changeFrequency: "monthly", priority: 0.6 }));
  const blog: Entry[] = posts.map((p) => ({
    url: u(`/blog/${p.slug}`),
    lastModified: p.date || undefined,
    changeFrequency: "monthly",
    priority: 0.7,
  }));
  return [...core, ...svc, ...proj, ...blog];
}
