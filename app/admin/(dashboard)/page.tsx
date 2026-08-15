import Link from "next/link";
import {
  getProfile,
  getProjects,
  getPhotoItems,
  getVideoItems,
  getSkillCategories,
} from "@/lib/cms/content";

export default async function AdminDashboard() {
  const [profile, projects, photos, videos, skills] = await Promise.all([
    getProfile(),
    getProjects(),
    getPhotoItems(),
    getVideoItems(),
    getSkillCategories(),
  ]);

  const stats = [
    { label: "Projects", value: projects.length, href: "/admin/projects" },
    { label: "Photography items", value: photos.length, href: "/admin/photography" },
    { label: "Video items", value: videos.length, href: "/admin/videos" },
    { label: "Skill categories", value: skills.length, href: "/admin/skills" },
  ];

  return (
    <div>
      <h1 className="text-xl font-semibold text-zinc-100">Dashboard</h1>
      <p className="text-sm text-zinc-500 mt-1">
        Signed in as admin of {profile.name}&apos;s portfolio.
      </p>

      <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((s) => (
          <Link
            key={s.label}
            href={s.href}
            className="border border-zinc-800 rounded-lg p-5 hover:border-blue-600/60 transition-colors"
          >
            <span className="text-2xl font-semibold text-zinc-100">{s.value}</span>
            <p className="text-xs text-zinc-500 mt-1">{s.label}</p>
          </Link>
        ))}
      </div>

      <div className="mt-10 border border-zinc-800 rounded-lg p-6 bg-zinc-900/40">
        <h2 className="text-sm font-medium text-zinc-100 mb-2">Quick tips</h2>
        <ul className="text-sm text-zinc-500 space-y-1.5 list-disc pl-5">
          <li>Edits here update the live site immediately (published items only).</li>
          <li>Use the eye icon to unpublish an item without deleting it.</li>
          <li>Use the up/down arrows to control display order.</li>
          <li>Images are uploaded to Cloudinary — nothing is stored in Postgres.</li>
        </ul>
      </div>
    </div>
  );
}
