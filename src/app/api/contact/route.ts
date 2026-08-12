import { NextResponse } from "next/server";

/**
 * Receives both contact enquiries and meeting bookings.
 *
 * Right now it validates and logs. To actually deliver mail, plug a provider
 * in at the marked spot below (Resend, Postmark, SES) and add the API key to
 * the environment — nothing else here needs to change.
 */

type Payload = {
  kind?: "enquiry" | "booking";
  name?: string;
  email?: string;
  company?: string;
  message?: string;
  budget?: string;
  interest?: string;
  notes?: string;
  meetingType?: string;
  duration?: string;
  date?: string;
  slot?: string;
  timezone?: string;
};

/** Naive per-IP throttle. Replace with a durable store before real traffic. */
const hits = new Map<string, { count: number; resetAt: number }>();
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;

function rateLimited(ip: string) {
  const now = Date.now();
  const entry = hits.get(ip);

  if (!entry || now > entry.resetAt) {
    hits.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }

  entry.count += 1;
  return entry.count > MAX_PER_WINDOW;
}

const isEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    request.headers.get("x-real-ip") ??
    "unknown";

  if (rateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: "Too many requests. Try again in a minute." },
      { status: 429 },
    );
  }

  let body: Payload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON body." },
      { status: 400 },
    );
  }

  const name = body.name?.trim() ?? "";
  const email = body.email?.trim() ?? "";
  const kind = body.kind === "booking" ? "booking" : "enquiry";

  if (name.length < 2) {
    return NextResponse.json(
      { ok: false, error: "Please include your name." },
      { status: 422 },
    );
  }

  if (!isEmail(email)) {
    return NextResponse.json(
      { ok: false, error: "Please include a valid email address." },
      { status: 422 },
    );
  }

  if (kind === "enquiry" && (body.message?.trim().length ?? 0) < 10) {
    return NextResponse.json(
      { ok: false, error: "Tell us a little more about the project." },
      { status: 422 },
    );
  }

  if (kind === "booking" && (!body.date || !body.slot)) {
    return NextResponse.json(
      { ok: false, error: "Pick a date and time slot." },
      { status: 422 },
    );
  }

  // --- Delivery ---------------------------------------------------------
  // Swap this log for your transport, e.g.:
  //
  //   await resend.emails.send({
  //     from: "site@wrathlabs.com",
  //     to: "hello@wrathlabs.com",
  //     subject: `${kind} — ${name}`,
  //     text: JSON.stringify(body, null, 2),
  //   });
  //
  console.info(`[wrathlabs:${kind}]`, {
    name,
    email,
    company: body.company ?? null,
    ...(kind === "booking"
      ? {
          meetingType: body.meetingType,
          duration: body.duration,
          date: body.date,
          slot: body.slot,
          timezone: body.timezone,
          notes: body.notes,
        }
      : {
          budget: body.budget,
          interest: body.interest,
          message: body.message,
        }),
    ip,
    receivedAt: new Date().toISOString(),
  });

  return NextResponse.json({ ok: true, kind });
}

export function GET() {
  return NextResponse.json(
    { ok: false, error: "Method not allowed." },
    { status: 405 },
  );
}
