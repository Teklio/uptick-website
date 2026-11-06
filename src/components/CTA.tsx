import { FiArrowRight } from "react-icons/fi";
import Reveal from "./Reveal";
import { Button } from "./ui";

export default function CTA({
  title = "Have an idea? Let's build it together.",
  text = "Tell us about your project and we'll get back to you within 2 hours.",
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section className="px-6 py-12">
      <Reveal className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-line bg-white/[0.04] px-8 backdrop-blur-sm py-12 text-center md:py-14">
        <div className="absolute -left-20 -top-20 size-80 rounded-full bg-white/10 blur-[100px]" />
        <div className="absolute -bottom-24 -right-16 size-80 rounded-full bg-white/5 blur-[100px]" />
        <div className="relative">
          <h2 className="mx-auto max-w-2xl font-display text-3xl font-bold text-white md:text-5xl">{title}</h2>
          <p className="mx-auto mt-4 max-w-xl text-white/80">{text}</p>
          <div className="mt-8 flex justify-center">
            <Button href="/contact" variant="light">
              Start a project <FiArrowRight />
            </Button>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
