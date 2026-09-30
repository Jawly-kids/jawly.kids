import { NextResponse } from "next/server";
import { deliverWaitlist } from "@/lib/waitlist";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "That request couldn't be read." }, { status: 400 });
  }

  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "That request couldn't be read." }, { status: 400 });
  }

  const { email, schoolName, zip, page } = body as Record<string, unknown>;
  const trimmedEmail = typeof email === "string" ? email.trim() : "";
  const trimmedSchool = typeof schoolName === "string" ? schoolName.trim() : "";
  const trimmedZip = typeof zip === "string" ? zip.trim() : "";
  const trimmedPage = typeof page === "string" ? page.trim().slice(0, 80) : "";

  if (!emailPattern.test(trimmedEmail) || trimmedEmail.length > 200) {
    return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  }
  if (trimmedSchool.length < 2 || trimmedSchool.length > 200) {
    return NextResponse.json({ error: "Enter your school or center name." }, { status: 400 });
  }
  if (!/^\d{5}$/.test(trimmedZip)) {
    return NextResponse.json({ error: "Enter a 5-digit ZIP code." }, { status: 400 });
  }

  try {
    await deliverWaitlist({
      email: trimmedEmail,
      schoolName: trimmedSchool,
      zip: trimmedZip,
      page: trimmedPage,
      submittedAt: new Date().toISOString(),
    });
  } catch {
    return NextResponse.json({ error: "We couldn't save that. Try again." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
