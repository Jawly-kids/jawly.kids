export type WaitlistEntry = {
  email: string;
  schoolName: string;
  zip: string;
  page: string;
  submittedAt: string;
};

/**
 * Single handoff for out-of-area waitlist entries.
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
