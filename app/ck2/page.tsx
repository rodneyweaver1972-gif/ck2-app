// app/ck2/page.tsx
import CK2 from "../../components/CK2";

export default function Page() {
  return (
    <main className="max-w-5xl mx-auto p-6 space-y-6">
      {/* Calculator (kept) */}
      <CK2 />

      {/* BUY: Rate Card ($4.99) — LIVE Stripe link */}
      <section className="mt-4">
        <a
          href="https://buy.stripe.com/fZu4gyeBwgfRakw0Xv5wI02"
          target="_blank"
          rel="noreferrer"
          className="inline-block rounded-xl px-4 py-3 text-sm font-semibold shadow hover:opacity-90 border"
        >
          Get the Contractor Rate Card — $4.99
        </a>
        <p className="mt-2 text-xs opacity-70">
          After purchase, Stripe emails you a receipt. If anything looks off, use the
          Suggestion Box and I’ll help.
        </p>
      </section>

      {/* Suggestion Box only (updates link removed) */}
      <section className="text-sm space-y-1">
        <a
          href="https://forms.gle/uKdB5GWtoyV3K7tw9"
          target="_blank"
          rel="noreferrer"
          className="underline"
        >
          Suggestion Box (tell me what you need)
        </a>
      </section>

      <p className="mt-6 text-xs opacity-60">
        © 2025 CK2. Personal use only. No redistribution.
      </p>
    </main>
  );
}
