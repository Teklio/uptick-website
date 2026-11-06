import "server-only";

const MAPI = "https://mapi.storyblok.com/v1";

/**
 * Saves one submission as a new, unpublished story inside a Storyblok folder
 * (so private contact details are never exposed by the public CDN).
 * Throws if it could not be stored — callers must not report success then.
 */
export async function createSubmission(opts: {
  folderEnv: "CONTACT_LEAD_FOLDER_ID" | "LEADS_FOLDER_ID";
  prefix: string;
  rootComponent: string;
  listField: string;
  block: Record<string, unknown>;
  label: string;
}) {
  const space = process.env.STORYBLOK_SPACE_ID;
  const pat = process.env.STORYBLOK_PERSONAL_ACCESS_TOKEN;
  const folder = Number(process.env[opts.folderEnv]);
  if (!space || !pat || !folder) throw new Error("Storyblok env vars are missing");

  const id = crypto.randomUUID();
  const res = await fetch(`${MAPI}/spaces/${space}/stories`, {
    method: "POST",
    headers: { Authorization: pat, "Content-Type": "application/json" },
    body: JSON.stringify({
      story: {
        name: `${opts.label} — ${opts.prefix}`,
        slug: `${opts.prefix}-${id.slice(0, 8)}`,
        parent_id: folder,
        content: {
          component: opts.rootComponent,
          [opts.listField]: [{ _uid: id, ...opts.block }],
        },
      },
    }),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Storyblok ${res.status}: ${(await res.text()).slice(0, 200)}`);
}
