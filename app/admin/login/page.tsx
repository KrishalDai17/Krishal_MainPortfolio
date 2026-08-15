"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Loader2 } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      setError(error.message);
      return;
    }
    router.push("/admin");
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm border border-zinc-800 rounded-lg p-8 bg-zinc-900/40"
      >
        <h1 className="text-lg font-semibold text-zinc-100 mb-1">KS Admin</h1>
        <p className="text-sm text-zinc-500 mb-6">Sign in to manage the portfolio.</p>

        <label className="block mb-4">
          <span className="text-xs font-medium text-zinc-400 block mb-1.5">Email</span>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-800 rounded-md px-3 py-2 text-sm text-zinc-100 focus:border-blue-500 outline-none"
          />
        </label>

        <label className="block mb-6">
          <span className="text-xs font-medium text-zinc-400 block mb-1.5">Password</span>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-800 rounded-md px-3 py-2 text-sm text-zinc-100 focus:border-blue-500 outline-none"
          />
        </label>

        {error && <p className="text-xs text-red-400 mb-4">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white py-2.5 rounded-md text-sm font-medium transition-colors"
        >
          {loading && <Loader2 size={14} className="animate-spin" />}
          Sign in
        </button>

        <p className="mt-6 text-[11px] leading-relaxed text-zinc-600">
          Admin users are created in the Supabase dashboard (Authentication →
          Users) or via the Supabase CLI — there is no signup form and no
          hardcoded password.
        </p>
      </form>
    </div>
  );
}
