import { cacheLife, cacheTag } from "next/cache";

/**
 * Storyblok Content Delivery API client (no SDK needed).
 *
 * Block library -> story mapping (see Storyblok space):
 *   Projects     (story "projects")      -> project[]      { title, description, image, category }
 *   Partners     (story "partnerss")     -> partner[]      { logo, name }
 *   Testmonials  (story "testimonials")  -> testimonials[] { Username, role, company, description, image }
 *   blog         (content type, any story with content_type=blog)
 *                { title, readtime, author, image, description, tags }
 *   Contacts     (story "contacts")      <- enquiries written by /api/contact
 */

const API = "https://api.storyblok.com/v2/cdn";

// "draft" shows unpublished content (needs a preview token). In production we
// default to "published"; override with STORYBLOK_VERSION=draft while the
// space content is still unpublished.
const VERSION =
  process.env.STORYBLOK_VERSION ??
  (process.env.NODE_ENV === "production" ? "published" : "draft");

const SLUGS = {
  projects: process.env.STORYBLOK_PROJECTS_SLUG ?? "projects",
  partners: process.env.STORYBLOK_PARTNERS_SLUG ?? "partnerss",
  testimonials: process.env.STORYBLOK_TESTIMONIALS_SLUG ?? "testimonials",
  blogs: process.env.STORYBLOK_BLOGS_SLUG ?? "blogs",
};

export type Img = { src: string; alt: string } | null;
export type Project = {
  id: string;
  slug: string;
  title: string;
  description: string;
  /** first category, for display */
  category: string;
  categories: string[];
  image: Img;
  /** live site URL (Storyblok `link` field) */
  link: string;
};
export type Partner = { id: string; name: string; logo: Img };
export type Testimonial = {
  id: string;
  name: string;
  role: string;
  company: string;
  text: string;
  image: Img;
};
export type Post = {
  slug: string;
  title: string;
  description: string;
  author: string;
  readtime: string;
  tags: string[];
  image: Img;
  date: string;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Blok = Record<string, any>;

async function sb(path: string, params: Record<string, string> = {}) {
  const token = process.env.STORYBLOK_ACCESS_TOKEN;
  if (!token) return null;
  const qs = new URLSearchParams({ token, version: VERSION, ...params });
  try {
    const res = await fetch(`${API}/${path}?${qs}`);
    if (!res.ok) return null;
    return (await res.json()) as Blok;
  } catch {
    return null;
  }
}

function img(a: Blok | undefined | null): Img {
  return a?.filename ? { src: a.filename, alt: a.alt || "" } : null;
}

const str = (v: unknown) => (typeof v === "string" ? v : "");

// multi-select (`options`) fields arrive as string[]; single ones as string
const list = (v: unknown): string[] => (Array.isArray(v) ? v.map(str).filter(Boolean) : str(v) ? [str(v)] : []);

const slugify = (s: string) =>
  s.toLowerCase().normalize("NFKD").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "project";

function externalUrl(v: unknown) {
  const u = str(v).trim();
  if (!u) return "";
  return /^https?:\/\//i.test(u) ? u : `https://${u}`;
}

export async function getProjects(): Promise<Project[]> {
  "use cache";
  cacheLife("minutes");
  cacheTag("storyblok");
  const data = await sb(`stories/${SLUGS.projects}`);
  const items: Blok[] = data?.story?.content?.project ?? [];
  const seen = new Map<string, number>();
  return items.map((p) => {
    const base = slugify(str(p.title));
    const n = (seen.get(base) ?? 0) + 1;
    seen.set(base, n);
    const categories = list(p.category);
    return {
      id: str(p._uid),
      slug: n > 1 ? `${base}-${n}` : base,
      title: str(p.title),
      description: str(p.description),
      category: categories[0] ?? "",
      categories,
      image: img(p.image),
      link: externalUrl(p.link),
    };
  });
}

export async function getProject(slug: string): Promise<Project | null> {
  const all = await getProjects();
  return all.find((p) => p.slug === slug) ?? null;
}

export async function getPartners(): Promise<Partner[]> {
  "use cache";
  cacheLife("minutes");
  cacheTag("storyblok");
  const data = await sb(`stories/${SLUGS.partners}`);
  const items: Blok[] = data?.story?.content?.partner ?? [];
  return items.map((p) => ({ id: str(p._uid), name: str(p.name), logo: img(p.logo) }));
}

export async function getTestimonials(): Promise<Testimonial[]> {
  "use cache";
  cacheLife("minutes");
  cacheTag("storyblok");
  const data = await sb(`stories/${SLUGS.testimonials}`);
  const items: Blok[] = data?.story?.content?.testimonials ?? [];
  return items.map((t) => ({
    id: str(t._uid),
    name: str(t.Username ?? t.username),
    role: str(t.role),
    company: str(t.company),
    text: str(t.description),
    image: img(t.image),
  }));
}

export async function getPosts(): Promise<Post[]> {
  "use cache";
  cacheLife("minutes");
  cacheTag("storyblok");
  const data = await sb(`stories/${SLUGS.blogs}`);
  const items: Blok[] = data?.story?.content?.blogs ?? [];
  const date = str(data?.story?.first_published_at ?? data?.story?.created_at).slice(0, 10);
  const seen = new Map<string, number>();
  return items.map((c) => {
    const base = slugify(str(c.title));
    const n = (seen.get(base) ?? 0) + 1;
    seen.set(base, n);
    return {
      slug: n > 1 ? `${base}-${n}` : base,
      title: str(c.title),
      description: str(c.description),
      author: str(c.author),
      readtime: str(c.readtime),
      tags: str(c.tags)
        .split(",")
        .map((t) => t.trim().replace(/[.\s]+$/, ""))
        .filter(Boolean),
      image: img(c.image),
      date,
    };
  });
}

export async function getPost(slug: string): Promise<Post | null> {
  const posts = await getPosts();
  return posts.find((p) => p.slug === slug) ?? null;
}
