import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Expertise from "@/components/Expertise";
import Capabilities from "@/components/Capabilities";
import { TechMarquee } from "@/components/Marquees";
import PartnersSection from "@/components/PartnersSection";
import Process from "@/components/Process";
import ProjectShowcase from "@/components/ProjectShowcase";
import Testimonials from "@/components/Testimonials";
import BlogCard from "@/components/BlogCard";
import MobileCarousel from "@/components/MobileCarousel";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import { Reveal, Section, SectionHeading } from "@/components/ui";
import { getPartners, getPosts, getProjects, getTestimonials } from "@/lib/storyblok";
import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { pageMeta } from "@/lib/seo";
import { faqs } from "@/data/site";

export const metadata: Metadata = pageMeta({
  title: "Uptick Tech — Web Apps, SaaS & Custom Software Company",
  description: "Uptick Tech builds scalable web applications, SaaS platforms, dashboards, ERP and custom software with Next.js and the MERN stack. Based in Malappuram, Kerala.",
  path: "/",
  absoluteTitle: true,
});

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

export default async function Home() {
  const [projects, partners, testimonials, posts] = await Promise.all([
    getProjects(),
    getPartners(),
    getTestimonials(),
    getPosts(),
  ]);

  return (
    <>
      <JsonLd data={faqLd} />
      <Hero />
      <Stats />
      <Expertise />

      <Section id="services">
        <SectionHeading
          eyebrow="What we do"
          title={<>Solutions built for <span className="text-gradient">growth</span></>}
          sub="End-to-end engineering — strategy, design, development and deployment under one roof."
        />
        <Capabilities />
      </Section>
      <PartnersSection partners={partners} />

      {projects.length > 0 && <ProjectShowcase projects={projects} />}

      <Section id="process" soft>
        <SectionHeading eyebrow="How we work" title={<>A process built on <span className="text-gradient">clarity</span></>} />
        <Process />
      </Section>

      <Section id="tech" className="overflow-hidden">
        <SectionHeading eyebrow="Tech stack" title={<>Modern tools, <span className="text-gradient">proven</span> in production</>} />
        <TechMarquee />
      </Section>

      {testimonials.length > 0 && (
        <Section soft>
          <SectionHeading eyebrow="Testimonials" title={<>What our <span className="text-gradient">clients</span> say</>} />
          <Testimonials items={testimonials.slice(0, 3)} />
        </Section>
      )}

      {posts.length > 0 && (
      <Section>
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <SectionHeading align="left" eyebrow="Insights" title={<>Latest from the <span className="text-gradient">blog</span></>} />
          <Reveal className="mb-10">
            <Link href="/blog" className="inline-flex items-center gap-2 font-semibold text-brand">All articles <FiArrowRight /></Link>
          </Reveal>
        </div>
        <div className="-mx-6 md:mx-0">
          <MobileCarousel desktopClassName="md:grid-cols-3 md:gap-6">
            {[...posts].reverse().slice(0, 3).map((p) => (
              <BlogCard key={p.slug} post={p} />
            ))}
          </MobileCarousel>
        </div>
      </Section>
      )}

      <Section soft id="faq">
        <SectionHeading eyebrow="FAQs" title={<>Questions? <span className="text-gradient">Answered.</span></>} />
        <FAQ />
      </Section>

      <CTA />
    </>
  );
}
