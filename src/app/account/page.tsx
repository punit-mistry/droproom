import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Account" };

export default function AccountPage() {
  return (
    <div className="mx-auto max-w-[1600px] px-4 md:px-8 py-20 md:py-32">
      <p className="label text-muted">Account</p>
      <h1 className="display mt-4 text-[18vw] md:text-[10rem]">Not live.</h1>
      <p className="mt-8 max-w-md text-bone/80">
        Accounts are not live in this demo. There is nothing to sign in to, and no data is collected.
      </p>
      <Link href="/shop" className="mt-10 inline-flex min-h-12 items-center bg-volt px-8 label text-ink hover:bg-bone transition-colors">
        Back to shop
      </Link>
    </div>
  );
}
