import { NextResponse } from "next/server";
import { razorpayKeys, verifySignature } from "@/lib/razorpay";

export async function POST(req: Request) {
  const keys = razorpayKeys();
  if (!keys) return NextResponse.json({ error: "Razorpay test keys are not configured." }, { status: 503 });
  let b: { razorpay_order_id?: string; razorpay_payment_id?: string; razorpay_signature?: string };
  try { b = await req.json(); } catch { return NextResponse.json({ error: "Invalid JSON" }, { status: 400 }); }
  if (!b.razorpay_order_id || !b.razorpay_payment_id || !b.razorpay_signature) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }
  const ok = verifySignature(b.razorpay_order_id, b.razorpay_payment_id, b.razorpay_signature, keys.secret);
  return ok ? NextResponse.json({ verified: true }) : NextResponse.json({ verified: false }, { status: 400 });
}
