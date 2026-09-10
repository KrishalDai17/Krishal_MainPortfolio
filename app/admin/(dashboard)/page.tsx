import Link from "next/link";
import {
  getProfile,
  getProjects,
  getPhotoItems,
  getPhotographyAlbums,
  getSkillCategories,
  getQAProjects,
  getExperience,
  getContactMessages,
} from "@/lib/cms/content";
import {
  FolderGit2,
  Camera,
  FolderHeart,
  Cpu,
  ShieldCheck,
  Mail,
  Briefcase,
  ExternalLink,
  PlusCircle,
} from "lucide-react";

export const revalidate = 0; // always dynamic for admin

export default async function AdminDashboard() {
  const [
    profile,
    projects,
    photos,
    albums,
    skills,
    qaProjects,
    experience,
    messages,
  ] = await Promise.all([
    getProfile(),
    getProjects(),
    getPhotoItems(),
    getPhotographyAlbums(),
    getSkillCategories(),
    getQAProjects(),
    getExperience(),
    getContactMessages(),
  ]);

  const unreadMessages = messages.filter((m) => !m.read).length;

  const stats = [
    {
      label: "Portfolio Projects",
      value: projects.length,
      sub: "Published works",
      href: "/admin/projects",
      icon: FolderGit2,
      color: "text-blue-400",
    },
    {
      label: "QA Test Reports",
      value: qaProjects.length,
      sub: "Verification case studies",
      href: "/admin/qa",
      icon: ShieldCheck,
      color: "text-lime-400",
    },
    {
      label: "Photography Frames",
      value: photos.length,
      sub: "Photos in portfolio",
      href: "/admin/photography",
      icon: Camera,
      color: "text-pink-400",
    },
    {
      label: "Photo Albums",
      value: albums.length,
      sub: "Curated collections",
      href: "/admin/albums",
      icon: FolderHeart,
      color: "text-orange-400",
    },
    {
      label: "Skill Categories",
      value: skills.length,
      sub: "Technical domains",
      href: "/admin/skills",
      icon: Cpu,
      color: "text-cyan-400",
    },
    {
      label: "Career Milestones",
      value: experience.length,
      sub: "Experience timeline",
      href: "/admin/experience",
      icon: Briefcase,
      color: "text-purple-400",
    },
    {
      label: "Contact Inquiries",
      value: messages.length,
      sub: unreadMessages > 0 ? `${unreadMessages} unread` : "All read",
      href: "/admin/messages",
      icon: Mail,
      color: unreadMessages > 0 ? "text-amber-400" : "text-zinc-400",
      alert: unreadMessages > 0,
    },
  ];

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="border-b border-zinc-800 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-zinc-100">
            Portfolio Command Center
          </h1>
          <p className="text-sm text-zinc-400 mt-1">
            Managing live content for {profile.name} ({profile.email})
          </p>
        </div>
        <div className="flex items-center gap-3">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-zinc-700 bg-zinc-900 px-4 py-2 rounded-md text-xs text-zinc-200 hover:border-blue-500 transition-colors"
          >
            <ExternalLink size={13} /> View Live Site
          </a>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <Link
              key={s.label}
              href={s.href}
              className={`border border-zinc-800 rounded-lg p-5 bg-zinc-900/40 hover:border-blue-500/60 transition-all hover:bg-zinc-900/80 group ${
                s.alert ? "ring-1 ring-amber-500/40" : ""
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono text-zinc-500">{s.label}</span>
                <Icon size={16} className={s.color} />
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-zinc-100 font-display">
                  {s.value}
                </span>
                {s.alert && (
                  <span className="h-2 w-2 rounded-full bg-amber-400 animate-ping" />
                )}
              </div>
              <p className="text-[11px] text-zinc-400 mt-1">{s.sub}</p>
            </Link>
          );
        })}
      </div>

      {/* Quick Access Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="border border-zinc-800 rounded-lg p-6 bg-zinc-900/30 space-y-4">
          <h2 className="text-sm font-semibold text-zinc-100 flex items-center gap-2">
            <PlusCircle size={15} className="text-blue-400" /> Quick Add Content
          </h2>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <Link
              href="/admin/projects"
              className="p-3 border border-zinc-800 rounded bg-zinc-900/80 hover:border-blue-500 text-zinc-300 hover:text-white transition-colors"
            >
              + New Project
            </Link>
            <Link
              href="/admin/albums"
              className="p-3 border border-zinc-800 rounded bg-zinc-900/80 hover:border-pink-500 text-zinc-300 hover:text-white transition-colors"
            >
              + New Album
            </Link>
            <Link
              href="/admin/photography"
              className="p-3 border border-zinc-800 rounded bg-zinc-900/80 hover:border-pink-500 text-zinc-300 hover:text-white transition-colors"
            >
              + Upload Photo
            </Link>
            <Link
              href="/admin/qa"
              className="p-3 border border-zinc-800 rounded bg-zinc-900/80 hover:border-lime-500 text-zinc-300 hover:text-white transition-colors"
            >
              + New QA Report
            </Link>
          </div>
        </div>

        <div className="border border-zinc-800 rounded-lg p-6 bg-zinc-900/30 space-y-3">
          <h2 className="text-sm font-semibold text-zinc-100">
            System Synchronization
          </h2>
          <p className="text-xs text-zinc-400 leading-relaxed">
            All edits saved in this dashboard update your live website instantly via Next.js cache revalidation.
          </p>
          <ul className="text-xs text-zinc-400 space-y-1 list-disc pl-4">
            <li>Media files are stored on Cloudinary with fast CDN delivery.</li>
            <li>Database transactions use Supabase PostgreSQL with row-level security.</li>
            <li>Inquiries received via the contact form appear under Contact Messages.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
