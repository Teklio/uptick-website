/** Shared (client + server) field validation for the contact and lead forms. */

const NAME_RE = /^[\p{L}][\p{L}\p{M} .'-]{1,79}$/u;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/;

/** Keep digits only; drop a leading 91 / 0 country or trunk prefix when it makes a 10-digit number. */
export function normalizePhone(v: string) {
  const d = v.replace(/\D/g, "");
  if (d.length === 12 && d.startsWith("91")) return d.slice(2);
  if (d.length === 11 && d.startsWith("0")) return d.slice(1);
  return d;
}

export type Fields = { name: string; email: string; phone: string };

/** Returns an error message per invalid field (empty object = valid). */
export function validateContact(f: Fields): Partial<Record<keyof Fields, string>> {
  const e: Partial<Record<keyof Fields, string>> = {};
  const name = f.name.trim();
  if (!name) e.name = "Please enter your name.";
  else if (!NAME_RE.test(name)) e.name = "Enter a valid name (letters only, at least 2 characters).";
  if (!f.email.trim()) e.email = "Please enter your email.";
  else if (!EMAIL_RE.test(f.email.trim())) e.email = "Enter a valid email address.";
  if (!f.phone.trim()) e.phone = "Please enter your phone number.";
  else if (!/^\d{10}$/.test(normalizePhone(f.phone))) e.phone = "Phone number must be exactly 10 digits.";
  return e;
}
