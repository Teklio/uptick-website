import { Button } from "@/components/ui";

export default function NotFound() {
  return (
    <section className="grid min-h-[80vh] place-items-center px-6 pt-24 text-center">
      <div>
        <p className="text-gradient font-display text-8xl font-bold">404</p>
        <h1 className="mt-4 font-display text-3xl font-bold text-ink">Page not found</h1>
        <p className="mt-3 text-muted">The page you are looking for doesn&apos;t exist or has moved.</p>
        <div className="mt-8 flex justify-center"><Button href="/">Back to home</Button></div>
      </div>
    </section>
  );
}
