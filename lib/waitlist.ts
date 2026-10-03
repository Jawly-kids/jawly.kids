export type WaitlistEntry = {
  name: string;
  email: string;
  schoolName: string;
  phone: string;
  zip: string;
  page: string;
  submittedAt: string;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Single handoff for lead-capture entries.
 * Set WAITLIST_WEBHOOK_URL to forward each entry as JSON.
 * Until that destination is chosen, entries are written to the server log.
 */
export async function deliverWaitlist(entry: WaitlistEntry): Promise<void> {
  const webhook = process.env.WAITLIST_WEBHOOK_URL;
  if (!webhook) {
    console.info("waitlist", JSON.stringify(entry));
    return;
  }

  const response = await fetch(webhook, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(entry),
  });

  if (!response.ok) {
    throw new Error(`Waitlist webhook responded ${response.status}`);
  }
}

/** Strip common US formatting. A leading country code 1 is removed when 11 digits remain. */
export function normalizeUsPhone(input: string): string | null {
  const digits = input.replace(/\D/g, "");
  const national = digits.length === 11 && digits.startsWith("1") ? digits.slice(1) : digits;
  return /^\d{10}$/.test(national) ? national : null;
}

export type ParsedWaitlist =
  | { ok: true; entry: Omit<WaitlistEntry, "submittedAt"> }
  | { ok: false; error: string };

export function parseWaitlistBody(body: unknown): ParsedWaitlist {
  if (!body || typeof body !== "object") {
    return { ok: false, error: "That request couldn't be read." };
  }

  const record = body as Record<string, unknown>;
  const name = typeof record.name === "string" ? record.name.trim() : "";
  const schoolName = typeof record.schoolName === "string" ? record.schoolName.trim() : "";
  const email = typeof record.email === "string" ? record.email.trim() : "";
  const rawPhone = typeof record.phone === "string" ? record.phone.trim() : "";
  const phone = rawPhone ? normalizeUsPhone(rawPhone) : "";
  const zip = typeof record.zip === "string" ? record.zip.trim() : "";

  if (name.length < 2 || name.length > 100) {
    return { ok: false, error: "Enter your name." };
  }
  if (schoolName.length < 2 || schoolName.length > 200) {
    return { ok: false, error: "Enter your school or center name." };
  }
  if (!emailPattern.test(email) || email.length > 200) {
    return { ok: false, error: "Enter a valid email address." };
  }
  if (rawPhone && !phone) {
    return { ok: false, error: "Enter a 10-digit phone number." };
  }
  if (!/^\d{5}$/.test(zip)) {
    return { ok: false, error: "Enter a 5-digit ZIP code." };
  }

  let page = "";
  if (record.page !== undefined && record.page !== null && record.page !== "") {
    if (typeof record.page !== "string") {
      return { ok: false, error: "Page must be 80 characters or fewer." };
    }
    page = record.page.trim();
    if (page.length > 80) {
      return { ok: false, error: "Page must be 80 characters or fewer." };
    }
  }

  return { ok: true, entry: { name, schoolName, email, phone: phone ?? "", zip, page } };
}

export async function postWaitlist(request: Request): Promise<Response> {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "That request couldn't be read." }, { status: 400 });
  }

  const parsed = parseWaitlistBody(body);
  if (!parsed.ok) {
    return Response.json({ error: parsed.error }, { status: 400 });
  }

  try {
    await deliverWaitlist({
      ...parsed.entry,
      submittedAt: new Date().toISOString(),
    });
  } catch {
    return Response.json({ error: "We couldn't save that. Try again." }, { status: 502 });
  }

  return Response.json({ ok: true });
}
