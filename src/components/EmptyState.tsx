import { FiInbox } from "react-icons/fi";

/** Shown when a Storyblok story has no entries yet. */
export default function EmptyState({ title, text }: { title: string; text: string }) {
  return (
    <div className="mx-auto grid max-w-xl place-items-center rounded-3xl border border-dashed border-white/20 bg-white/[0.03] px-8 py-16 text-center backdrop-blur-sm">
      <span className="mb-4 grid size-14 place-items-center rounded-full bg-white/10 text-2xl text-white"><FiInbox /></span>
      <h2 className="font-display text-2xl font-semibold text-white">{title}</h2>
      <p className="mt-2 text-white/80">{text}</p>
    </div>
  );
}
