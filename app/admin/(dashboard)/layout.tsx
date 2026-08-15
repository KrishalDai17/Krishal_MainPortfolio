import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import AdminShell from "@/components/admin/AdminShell";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();

  if (!supabase) {
    return (
      <div className="min-h-screen bg-zinc-950 text-zinc-300 flex items-center justify-center p-8 text-center">
        <div className="max-w-md">
          <h1 className="text-lg font-semibold text-zinc-100 mb-2">CMS not configured</h1>
          <p className="text-sm text-zinc-500">
            Add <code className="text-zinc-300">NEXT_PUBLIC_SUPABASE_URL</code> and{" "}
            <code className="text-zinc-300">NEXT_PUBLIC_SUPABASE_ANON_KEY</code> to your
            environment, run <code className="text-zinc-300">supabase/schema.sql</code>, and
            create an admin user in Supabase Auth to enable /admin.
          </p>
        </div>
      </div>
    );
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/admin/login");

  return <AdminShell>{children}</AdminShell>;
}
