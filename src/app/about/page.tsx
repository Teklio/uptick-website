import type { Metadata } from "next";
import { FiAward, FiCheck, FiEye, FiHeart, FiTarget, FiTrendingUp } from "react-icons/fi";
import PageHero from "@/components/PageHero";
import Stats from "@/components/Stats";
import Process from "@/components/Process";
import CTA from "@/components/CTA";
import { Reveal, Section, SectionHeading } from "@/components/ui";
import { values } from "@/data/site";
import Testimonials from "@/components/Testimonials";
import { getTestimonials } from "@/lib/storyblok";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({ title: "About Us — IT & Software Company", description: "Meet Uptick Tech, a Kerala-based IT company building scalable web applications, SaaS platforms, dashboards and custom software with Next.js, MERN and cloud.", path: "/about" });

const icons = [FiAward, FiEye, FiTrendingUp, FiHeart];

export default async function About() {
  const testimonials = await getTestimonials();
  return (
    <>
      <PageHero
        eyebrow="About us"
        title={<>We build software that <span className="text-gradient">moves businesses forward</span></>}
        description="Uptick Tech is an IT company specialising in modern web applications, SaaS platforms, business websites, dashboards and custom software."
        crumbs={[{ label: "About" }]}
      />

      <Section>
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <Reveal>
            <h2 className="font-display text-3xl font-bold text-ink md:text-4xl">Our story</h2>
            <p className="mt-5 leading-relaxed text-muted">
              With expertise in the MERN stack, Next.js, cloud technologies and modern development practices, we build scalable, secure and high-performance digital solutions tailored to each business.
            </p>
            <p className="mt-4 leading-relaxed text-muted">
              Our team focuses on delivering reliable applications, optimising performance and helping businesses transform their ideas into innovative digital products — from the first sketch to production and beyond.
            </p>
          </Reveal>
          <Reveal delay={0.1} className="grid gap-5">
            {[
              {
                title: "Our mission",
                Icon: FiTarget,
                lead: "Make powerful software accessible to every growing business.",
                body: "We believe great technology should not be reserved for large enterprises. Our mission is to turn business ideas into reliable, scalable and easy-to-use digital products — delivered on time, at a fair price, and built to last.",
                points: ["Practical solutions built around real business goals", "Transparent communication from kickoff to launch", "Long-term support so your product keeps improving"],
              },
              {
                title: "Our vision",
                Icon: FiEye,
                lead: "Be the most trusted engineering partner for ambitious digital products.",
                body: "We see a future where every business, whatever its size, runs on smart, secure and well-designed software. We want to be the team founders and growing companies call first when they are ready to build, scale and automate.",
                points: ["Set the standard for quality and reliability", "Grow alongside our clients as a lasting partner", "Embrace modern tech — cloud, automation and AI"],
              },
            ].map(({ title, Icon, lead, body, points }) => (
              <div key={title} className="rounded-3xl border border-line bg-soft p-7">
                <div className="flex items-center gap-3">
                  <span className="grid size-11 place-items-center rounded-xl bg-brand/10 text-xl text-brand"><Icon /></span>
                  <h3 className="font-display text-2xl font-light text-white">{title}</h3>
                </div>
                <p className="mt-4 text-lg font-medium text-white">{lead}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted">{body}</p>
                <ul className="mt-4 space-y-2 text-sm text-white/85">
                  {points.map((p) => (
                    <li key={p} className="flex gap-2.5"><FiCheck className="mt-0.5 shrink-0 text-emerald-400" />{p}</li>
                  ))}
                </ul>
              </div>
            ))}
          </Reveal>
        </div>
      </Section>

      <div className="pb-24"><Stats /></div>

      <Section soft>
        <SectionHeading eyebrow="Our values" title={<>What we <span className="text-gradient">stand for</span></>} />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map(([t, d], i) => {
            const Icon = icons[i];
            return (
              <Reveal key={t} delay={i * 0.08}>
                <div className="h-full rounded-3xl border border-line bg-white/[0.04] p-7">
                  <span className="mb-5 grid size-12 place-items-center rounded-xl bg-brand/10 text-2xl text-brand"><Icon /></span>
                  <h3 className="font-display text-xl font-bold text-ink">{t}</h3>
                  <p className="mt-2 text-sm text-muted">{d}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Section>

      <Section>
        <SectionHeading eyebrow="How we work" title={<>A process built on <span className="text-gradient">clarity</span></>} />
        <Process />
      </Section>

      {testimonials.length > 0 && (
        <Section>
          <SectionHeading eyebrow="Testimonials" title={<>What our <span className="text-gradient">clients</span> say</>} />
          <Testimonials items={testimonials} />
        </Section>
      )}

      <CTA />
    </>
  );
}
