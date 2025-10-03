// app/ck2/layout.tsx
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white">
      {/* Top ribbon */}
      <div className="bg-sky-600 text-white">
        <div className="mx-auto max-w-6xl px-4 py-3">
          <div className="text-sm/5 opacity-90">
            CK2 — Contractor Pay Calculator
          </div>
        </div>
      </div>

      {/* Page content area */}
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="rounded-2xl bg-white/70 backdrop-blur-sm p-4 sm:p-6 shadow">
          {children}
        </div>
      </div>
    </div>
  );
}
