import { NextResponse } from "next/server";
import { priceLines, razorpayKeys, type CheckoutLine } from "@/lib/razorpay";

export async function POST(req: Request) {
  const keys = razorpayKeys();
  if (!keys) {
    return NextResponse.json(
      { error: "Razorpay test keys are not configured. Set RAZORPAY_KEY_ID (rzp_test_…) and RAZORPAY_KEY_SECRET in .env.local." },
      { status: 503 },
    );
  }
  let body: { lines?: CheckoutLine[] };
  try { body = await req.json(); } catch { return NextResponse.json({ error: "Invalid JSON" }, { status: 400 }); }

  const amount = priceLines(body.lines ?? []);
  if (!amount) return NextResponse.json({ error: "Invalid cart" }, { status: 400 });

  const res = await fetch("https://api.razorpay.com/v1/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Basic " + Buffer.from(`${keys.id}:${keys.secret}`).toString("base64"),
    },
    body: JSON.stringify({ amount, currency: "INR", receipt: `dr_${Date.now()}`, notes: { source: "droproom-demo" } }),
  });
  const data = await res.json();
  if (!res.ok) {
    return NextResponse.json({ error: data?.error?.description ?? "Razorpay order creation failed" }, { status: 502 });
  }
  return NextResponse.json({ orderId: data.id, amount: data.amount, currency: data.currency, keyId: keys.id });
}
