import assert from "node:assert/strict";
import test from "node:test";
import { parseWaitlistBody, postWaitlist } from "../lib/waitlist.ts";

const validLead = {
  name: "Avery Chen",
  schoolName: "Lincoln Park Kids",
  email: "avery@center.example",
  phone: "+1 (312) 555-0199",
  zip: "60614",
  page: "heroes:covered",
};

function post(body: unknown) {
  return postWaitlist(
    new Request("http://localhost/api/waitlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }),
  );
}

test("accepts a valid lead and forwards name and phone", async () => {
  const previousWebhook = process.env.WAITLIST_WEBHOOK_URL;
  const previousFetch = globalThis.fetch;
  let forwarded: Record<string, unknown> | undefined;
  process.env.WAITLIST_WEBHOOK_URL = "https://example.test/waitlist";
  globalThis.fetch = async (_input, init) => {
    forwarded = JSON.parse(String(init?.body)) as Record<string, unknown>;
    return new Response("ok", { status: 200 });
  };

  try {
    const response = await post(validLead);
    assert.equal(response.status, 200);
    assert.deepEqual(await response.json(), { ok: true });
    assert.equal(forwarded?.name, "Avery Chen");
    assert.equal(forwarded?.phone, "3125550199");
    assert.equal(forwarded?.schoolName, "Lincoln Park Kids");
    assert.equal(forwarded?.email, "avery@center.example");
    assert.equal(forwarded?.zip, "60614");
    assert.equal(forwarded?.page, "heroes:covered");
    assert.equal(typeof forwarded?.submittedAt, "string");
  } finally {
    process.env.WAITLIST_WEBHOOK_URL = previousWebhook;
    globalThis.fetch = previousFetch;
  }
});

test("rejects a missing name", async () => {
  const { name: _name, ...withoutName } = validLead;
  const response = await post(withoutName);
  assert.equal(response.status, 400);
  assert.deepEqual(await response.json(), { error: "Enter your name." });
});

test("rejects a phone that is not 10 digits", async () => {
  const response = await post({ ...validLead, phone: "555-019" });
  assert.equal(response.status, 400);
  assert.deepEqual(await response.json(), { error: "Enter a 10-digit phone number." });
});

test("accepts a lead without a phone number", () => {
  const { phone: _phone, ...withoutPhone } = validLead;
  const parsed = parseWaitlistBody(withoutPhone);
  assert.equal(parsed.ok, true);
  if (parsed.ok) assert.equal(parsed.entry.phone, "");
});

test("returns 502 when downstream storage fails", async () => {
  const previousWebhook = process.env.WAITLIST_WEBHOOK_URL;
  const previousFetch = globalThis.fetch;
  process.env.WAITLIST_WEBHOOK_URL = "https://example.test/waitlist";
  globalThis.fetch = async () => new Response("no", { status: 500 });

  try {
    const response = await post(validLead);
    assert.equal(response.status, 502);
    assert.deepEqual(await response.json(), { error: "We couldn't save that. Try again." });
  } finally {
    process.env.WAITLIST_WEBHOOK_URL = previousWebhook;
    globalThis.fetch = previousFetch;
  }
});
