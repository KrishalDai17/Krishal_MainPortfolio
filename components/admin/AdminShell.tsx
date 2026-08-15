"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { LogOut, ExternalLink } from "lucide-react";

const NAV = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/hero", label: "Hero & Profile" },
  { href: "/admin/about", label: "About" },
  { href: "/admin/skills", label: "Skills" },
  { href: "/admin/projects", label: "Projects" },
  { href: "/admin/qa", label: "QA" },
  { href: "/admin/data-section", label: "Data" },
  { href: "/admin/photography", label: "Photography" },
  { href: "/admin/videos", label: "Videos" },
  { href: "/admin/education", label: "Education" },
  { href: "/admin/learning", label: "Learning" },
  { href: "/admin/profile-contributions", label: "Professional Profile" },
  { href: "/admin/philosophy", label: "Philosophy" },
  { href: "/admin/social-links", label: "Social Links" },
  { href: "/admin/contact", label: "Contact" },
  { href: "/admin/media", label: "Media Library" },
  { href: "/admin/seo", label: "SEO" },
  { href: "/admin/settings", label: "Settings" },
];

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const signOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex">
      <aside className="w-64 shrink-0 border-r border-zinc-800 hidden md:flex flex-col">
        <div className="px-5 py-5 border-b border-zinc-800">
          <span className="font-semibold tracking-wide">KS Admin</span>
        </div>
        <nav className="flex-1 overflow-y-auto py-3">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`block px-5 py-2.5 text-sm transition-colors ${
                pathname === item.href
                  ? "bg-blue-600/15 text-blue-400 border-r-2 border-blue-500"
                  : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-zinc-800 space-y-2">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-xs text-zinc-400 hover:text-zinc-100"
          >
            <ExternalLink size={13} /> View site
          </a>
          <button
            onClick={signOut}
            className="flex items-center gap-2 text-xs text-zinc-400 hover:text-red-400"
          >
            <LogOut size={13} /> Sign out
          </button>
        </div>
      </aside>
      <main className="flex-1 min-w-0 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-6 md:px-10 py-10">{children}</div>
      </main>
    </div>
  );
}
