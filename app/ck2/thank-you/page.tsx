export default function ThankYou() {
  return (
    <main className="mx-auto max-w-2xl p-6 space-y-6">
      <h1 className="text-3xl font-bold">Thanks for your purchase!</h1>
      <p className="text-sm text-gray-600">
        Your CK2 Rate Card (PDF) is ready. Click the button below to download.
      </p>

      <a
        href="https://drive.google.com/file/d/1tnfe3oiVgl5LdHx1xTdM5rT6M912Qb4r/view?usp=sharing"
        className="inline-flex items-center justify-center rounded-xl px-6 py-3 font-medium bg-emerald-600 text-white hover:opacity-90 transition"
        target="_blank"
        rel="noopener noreferrer"
      >
        Download Rate Card (PDF)
      </a>

      <p className="text-xs text-gray-500">
        Didn’t get it? We also emailed a link to your checkout email.
        Need help? Email <a className="underline" href="mailto:ck2helpdesk@gmail.com">ck2helpdesk@gmail.com</a>.
      </p>

      <a href="/ck2" className="text-sm underline">← Back to CK2</a>
    </main>
  );
}
