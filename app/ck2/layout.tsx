// app/ck2/layout.tsx
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* BACKGROUND LAYERS (inline so they can't be purged) */}
      <div
        className="absolute inset-0 -z-30"
        style={{
          backgroundColor: "#f0f9ff",
          backgroundImage: `
            radial-gradient(circle at 15% 10%, rgba(16,185,129,0.35), transparent 35%),
            radial-gradient(circle at 85% 85%, rgba(59,130,246,0.35), transparent 40%),
            radial-gradient(circle at 110% -10%, rgba(139,92,246,0.35), transparent 30%)
          `,
        }}
      />
      <div
        className="absolute inset-0 -z-20"
        style={{
          opacity: 0.6,
          backgroundImage: "radial-gradient(#a7f3d0 2px, transparent 2px)",
          backgroundSize: "22px 22px",
        }}
      />

      {/* TOP RIBBON */}
      <div className="relative bg-sky-600 text-white shadow">
        <div className="mx-auto max-w-6xl px-4 py-3">
          <div className="text-sm/5 opacity-90">CK2 — Contractor Pay Calculator</div>
        </div>
      </div>

      {/* CONTENT CARD */}
      <div className="relative mx-auto max-w-4xl px-4 py-8">
        <div className="rounded-2xl bg-white/90 backdrop-blur-md p-4 sm:p-6 shadow-2xl ring-1 ring-black/5">
          {children}
        </div>
      </div>
    </div>
  );
}
