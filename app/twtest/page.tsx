// app/twtest/page.tsx
export default function Page() {
  return (
    <main className="min-h-screen p-10 grid place-items-center gap-6">
      <div className="bg-red-500 text-white p-4 rounded-xl shadow">
        Tailwind is working!
      </div>

      <div className="flex flex-wrap gap-2">
        <span className="px-3 py-1 rounded bg-blue-500 text-white">blue-500</span>
        <span className="px-3 py-1 rounded bg-green-500 text-white">green-500</span>
        <span className="px-3 py-1 rounded bg-yellow-400">yellow-400</span>
        <span className="px-3 py-1 rounded bg-purple-500 text-white">purple-500</span>
      </div>

      <button className="px-4 py-2 rounded-lg bg-black text-white hover:opacity-80">
        Hover me
      </button>
    </main>
  );
}
