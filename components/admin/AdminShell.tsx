"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import {
  LayoutDashboard,
  Home,
  User,
  Cpu,
  FolderGit2,
  ShieldCheck,
  Briefcase,
  GraduationCap,
  FolderHeart,
  Camera,
  Share2,
  Mail,
  Image as ImageIcon,
  Search,
  Settings,
  LogOut,
  ExternalLink,
} from "lucide-react";

const NAV = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/hero", label: "Home & Hero", icon: Home },
  { href: "/admin/about", label: "About & Profile", icon: User },
  { href: "/admin/skills", label: "Skills Matrix", icon: Cpu },
  { href: "/admin/projects", label: "Projects Showcase", icon: FolderGit2 },
  { href: "/admin/qa", label: "QA Portfolio", icon: ShieldCheck },
  { href: "/admin/experience", label: "Experience", icon: Briefcase },
  { href: "/admin/education", label: "Education", icon: GraduationCap },
  { href: "/admin/albums", label: "Photo Albums", icon: FolderHeart },
  { href: "/admin/photography", label: "Photography", icon: Camera },
  { href: "/admin/social-links", label: "Social Links", icon: Share2 },
  { href: "/admin/messages", label: "Contact Messages", icon: Mail },
  { href: "/admin/media", label: "Media Library", icon: ImageIcon },
  { href: "/admin/seo", label: "SEO Settings", icon: Search },
  { href: "/admin/settings", label: "Site Settings", icon: Settings },
];

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const signOut = async () => {
    const supabase = createClient();
    if (supabase) {
      await supabase.auth.signOut();
    }
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <div className="dark min-h-screen bg-zinc-950 text-zinc-100 flex" style={{ colorScheme: "dark" }}>
      {/* Sidebar */}
      <aside className="w-64 shrink-0 border-r border-zinc-800 hidden md:flex flex-col justify-between">
        <div>
          <div className="px-5 py-5 border-b border-zinc-800 flex items-center justify-between">
            <div>
              <span className="font-semibold text-sm tracking-wide text-zinc-100">
                KS Portfolio CMS
              </span>
              <span className="text-[10px] block text-blue-400 font-mono">
                ADMIN CONSOLE
              </span>
            </div>
          </div>
          <nav className="overflow-y-auto max-h-[calc(100vh-140px)] py-3 px-2 space-y-0.5">
            {NAV.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2 rounded-md text-xs font-medium transition-colors ${
                    isActive
                      ? "bg-blue-600/20 text-blue-400 border border-blue-500/30"
                      : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900"
                  }`}
                >
                  <Icon size={14} className={isActive ? "text-blue-400" : "text-zinc-500"} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="p-4 border-t border-zinc-800 space-y-2 bg-zinc-900/30">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-xs text-zinc-400 hover:text-zinc-100 transition-colors"
          >
            <ExternalLink size={13} /> View Live Website
          </a>
          <button
            onClick={signOut}
            className="flex items-center gap-2 text-xs text-red-400/80 hover:text-red-400 transition-colors w-full pt-1"
          >
            <LogOut size={13} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 overflow-y-auto">
        <div className="max-w-5xl mx-auto px-6 md:px-10 py-10">{children}</div>
      </main>
    </div>
  );
}
