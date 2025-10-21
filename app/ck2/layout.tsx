import Link from "next/link";
import type { ReactNode } from "react";

// Live Google Form links
const FEEDBACK_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSfahtEn1tjfUjNbDMQ6vIThVA_xhRfmFGgXvDsQEV312LX_8g/viewform?usp=header";
const TESTIMONIALS_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSfwbI6c3HGrWD54YZJ-BJe94CzDF0rYCMLqwA8uRDYcV4evKg/viewform?usp=header";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen overflow-hidden text-gray-900">
      {/* Background layers (now visible) */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundColor: "#f0f9ff",
          backgroundImage:
            "radial-gradient(circle at 15% 10%, rgba(16,185,129,0.45), transparent 35%), radial-gradient(circle at 85% 85%, rgba(59,130,246,0.45), transparent 40%), radial-gradient(circle at 110% -10%, rgba(139,92,246,0.45), transparent 30%)",
        }}
      />
      <div
        className="absolute inset-0 z-0"
        style={{
          opacity: 0.7,
          backgroundImage: "radial-gradient(#a7f3d0 2.2px, transparent 2.2px)",
          backgroundSize: "22px 22px",
        }}
      />

      {/* Header with buttons */}
      <header className="sticky top-0 z-10 border-b bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
          <Link href="/ck2" className="text-lg font-semibold tracking-tight">
            CK2
          </Link>

          <nav className="flex items-center gap-2">
            <a
              href={FEEDBACK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-xl border px-3 py-2 text-sm font-medium hover:bg-gray-50"
            >
              🛠️ Feedback
            </a>

            <a
              href={TESTIMONIALS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-xl bg-amber-500 px-3 py-2 text-sm font-semibold text-white hover:brightness-110"
            >
              ⭐ Leave a Testimonial
            </a>
          </nav>
        </div>
      </header>

      {/* Page content above background */}
      <main className="relative z-10 mx-auto max-w-5xl px-4 py-6">{children}</main>
    </div>
  );
}
