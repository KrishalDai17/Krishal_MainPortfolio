import Link from "next/link";

export default function Page() {
  return (
    <div>
      <h1 className="text-xl font-semibold text-zinc-100 mb-3">Contact</h1>
      <p className="text-sm text-zinc-500 max-w-md">
        The phone, email and location shown in the Contact section come from
        the same profile record used by the Hero.
      </p>
      <Link
        href="/admin/hero"
        className="inline-block mt-4 text-sm text-blue-400 hover:text-blue-300"
      >
        Edit in Hero &amp; Profile →
      </Link>
    </div>
  );
}
