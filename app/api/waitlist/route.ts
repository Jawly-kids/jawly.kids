import { postWaitlist } from "@/lib/waitlist";

export function POST(request: Request) {
  return postWaitlist(request);
}
