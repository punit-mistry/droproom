"use client";
import { useState } from "react";
import Script from "next/script";
import { useCart } from "@/context/cart";

interface RzpResponse { razorpay_order_id: string; razorpay_payment_id: string; razorpay_signature: string }
interface RzpInstance { open: () => void; on: (e: string, cb: (r: { error?: { description?: string } }) => void) => void }
declare global {
  interface Window {
    Razorpay?: new (opts: Record<string, unknown>) => RzpInstance;
  }
}

type State =
  | { s: "idle" }
  | { s: "loading" }
  | { s: "error"; msg: string }
  | { s: "paid"; paymentId: string };

export function CheckoutButton() {
  const { lines, clear } = useCart();
  const [state, setState] = useState<State>({ s: "idle" });

  async function pay() {
    setState({ s: "loading" });
    try {
      if (!window.Razorpay) throw new Error("Razorpay checkout script failed to load. Check your connection.");
      const res = await fetch("/api/razorpay/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lines }),
      });
      const order = await res.json();
      if (!res.ok) throw new Error(order.error ?? "Could not create order");

      const rzp = new window.Razorpay({
        key: order.keyId,
        amount: order.amount,
        currency: order.currency,
        order_id: order.orderId,
        name: "DROPROOM®",
        description: "Drop 001 — TEST MODE",
        theme: { color: "#FF5B1F" },
        modal: { ondismiss: () => setState({ s: "idle" }) },
        handler: async (r: RzpResponse) => {
          const v = await fetch("/api/razorpay/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(r),
          });
          if (v.ok) {
            clear();
            setState({ s: "paid", paymentId: r.razorpay_payment_id });
          } else {
            setState({ s: "error", msg: "Payment signature could not be verified." });
          }
        },
      });
      rzp.on("payment.failed", (e) => setState({ s: "error", msg: e.error?.description ?? "Payment failed" }));
      rzp.open();
    } catch (e) {
      setState({ s: "error", msg: e instanceof Error ? e.message : "Something went wrong" });
    }
  }

  if (state.s === "paid") {
    return (
      <p role="status" className="mt-4 border border-volt p-3 text-sm">
        Test payment verified. Ref <span className="font-mono">{state.paymentId}</span>. No real money moved and no order
        is fulfilled — this is a demo.
      </p>
    );
  }

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
      <button
        onClick={pay}
        disabled={state.s === "loading" || lines.length === 0}
        className="mt-4 w-full min-h-12 bg-volt text-ink label hover:bg-bone transition-colors disabled:opacity-50"
      >
        {state.s === "loading" ? "Opening…" : "Checkout — Razorpay (Test)"}
      </button>
      <p className="label text-muted mt-2">Test mode only. Card 4111 1111 1111 1111, any future expiry, any CVV.</p>
      {state.s === "error" && (
        <p role="alert" className="mt-3 border border-red-400/60 p-3 text-sm">{state.msg}</p>
      )}
    </>
  );
}
