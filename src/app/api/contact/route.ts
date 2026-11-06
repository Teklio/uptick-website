import { NextResponse } from "next/server";
import { createSubmission } from "@/lib/storyblok-write";
import { normalizePhone, validateContact } from "@/lib/validate";

/** Contact-form enquiry → new story in the Storyblok "Conatct-leads" folder (CONTACT_LEAD_FOLDER_ID). */

const CATEGORIES = ["E-COMMERCE", "WEB DEVELOPMENT", "APP DEVELOPMENT", "ERP SOFTWARE", "CUSTOME", "OTHER ENQUIRY"];
const clean = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // honeypot — silently accept bots without storing anything
  if (clean(body.website, 100)) return NextResponse.json({ ok: true });

  const fullname = clean(body.fullname, 80);
  const email = clean(body.email, 160);
  const phoneRaw = clean(body.phone, 40);
  const subject = clean(body.subject, 4000);
  const cat = clean(body.category, 40);
  const category = CATEGORIES.includes(cat) ? cat : "OTHER ENQUIRY";

  const errors = validateContact({ name: fullname, email, phone: phoneRaw });
  if (!subject) return NextResponse.json({ error: "Please tell us about your project." }, { status: 400 });
  if (Object.keys(errors).length) {
    return NextResponse.json({ error: Object.values(errors)[0], errors }, { status: 400 });
  }

  try {
    await createSubmission({
      folderEnv: "CONTACT_LEAD_FOLDER_ID",
      prefix: "enquiry",
      label: fullname,
      rootComponent: "Contacts",
      listField: "enquiry",
      block: { component: "contact", fullname, email, phone: normalizePhone(phoneRaw), category, subject },
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json({ error: "We could not save your message. Please try again in a moment." }, { status: 502 });
  }
}
