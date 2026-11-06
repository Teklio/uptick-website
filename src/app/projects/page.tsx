import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import ProjectsGrid from "@/components/ProjectsGrid";
import CTA from "@/components/CTA";
import { Section } from "@/components/ui";
import EmptyState from "@/components/EmptyState";
import { getProjects } from "@/lib/storyblok";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({ title: "Our Projects — Web, SaaS & E-commerce", description: "Explore web apps, SaaS platforms, dashboards, e-commerce stores and ERP software delivered by Uptick Tech for growing businesses.", path: "/projects" });

export default async function Projects() {
  const projects = await getProjects();
  return (
    <>
      <PageHero
        eyebrow="Our work"
        title={<>Products we are <span className="text-gradient">proud of</span></>}
        description="20+ projects delivered across SaaS, e-commerce, ERP and mobile for 15+ happy clients."
        crumbs={[{ label: "Projects" }]}
      />
      <Section>
        {projects.length ? <ProjectsGrid projects={projects} /> : <EmptyState title="Projects coming soon" text="Our case studies are being added. Check back shortly." />}
      </Section>
      <CTA />
    </>
  );
}
