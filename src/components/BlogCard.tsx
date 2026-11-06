import Link from "next/link";
import { FiArrowUpRight, FiClock } from "react-icons/fi";
import type { Post } from "@/lib/storyblok";
import { SbImage } from "./ui";

export function formatDate(d: string) {
  if (!d) return "";
  return new Date(d + "T00:00:00Z").toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });
}

export default function BlogCard({ post }: { post: Post }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-white/[0.04] transition duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-brand/10">
      <div className="overflow-hidden">
        <SbImage image={post.image} label={post.tags[0]} className="aspect-[16/9] transition duration-500 group-hover:scale-105" />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-3 text-xs text-muted">
          {post.date && <span>{formatDate(post.date)}</span>}
          {post.readtime && (
            <span className="flex items-center gap-1"><FiClock /> {post.readtime}</span>
          )}
        </div>
        <h3 className="mt-3 font-display text-xl font-bold leading-snug text-ink group-hover:text-brand">{post.title}</h3>
        <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-muted">{post.description}</p>
        <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-brand">Read article <FiArrowUpRight /></span>
      </div>
    </Link>
  );
}
