import { NextResponse } from "next/server";
import { createSubmission } from "@/lib/storyblok-write";
import { normalizePhone, validateContact } from "@/lib/validate";

/** "Start a project" lead (name, email, phone) → new story in the Storyblok "leads" folder (LEADS_FOLDER_ID). */

const clean = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (clean(body.website, 100)) return NextResponse.json({ ok: true }); // honeypot

  const name = clean(body.name, 80);
  const email = clean(body.email, 160);
  const phoneRaw = clean(body.phone, 40);

  const errors = validateContact({ name, email, phone: phoneRaw });
  if (Object.keys(errors).length) {
    return NextResponse.json({ error: Object.values(errors)[0], errors }, { status: 400 });
  }

  try {
    await createSubmission({
      folderEnv: "LEADS_FOLDER_ID",
      prefix: "lead",
      label: name,
      rootComponent: "Leads",
      listField: "leads",
      block: { component: "lead", name, email, phone: normalizePhone(phoneRaw) },
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Lead form error:", err);
    return NextResponse.json({ error: "We could not save your details. Please try again in a moment." }, { status: 502 });
  }
}
