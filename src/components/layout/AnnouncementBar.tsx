import Link from "next/link";

const TEXT = "DROP 001 — LIMITED RELEASE — EXPLORE THE COLLECTION";

function Row({ hidden }: { hidden?: boolean }) {
  return (
    <div className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {Array.from({ length: 4 }).map((_, i) => (
        <span key={i} className="label px-6 text-ink whitespace-nowrap">
          {TEXT} <span className="px-6">/</span>
        </span>
      ))}
    </div>
  );
}

export function AnnouncementBar() {
  return (
    <Link
      href="/shop"
      aria-label="Drop 001, limited release. Explore the collection."
      className="group block overflow-hidden bg-volt h-9 flex items-center"
    >
      <div className="marquee-track flex w-max group-hover:[animation-play-state:paused] group-focus-visible:[animation-play-state:paused]">
        <Row />
        <Row hidden />
      </div>
    </Link>
  );
}
