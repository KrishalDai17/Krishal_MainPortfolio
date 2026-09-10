import { getProjects, getSettings } from "@/lib/cms/content";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Projects from "@/components/Projects";
import { profile } from "@/lib/data";

export const revalidate = 60;

export default async function ProjectsPage() {
  const [projects, settings] = await Promise.all([
    getProjects(),
    getSettings(),
  ]);

  return (
    <main className="relative min-h-screen flex flex-col justify-between">
      <Navbar availableForOpportunities={settings.availableForOpportunities} />

      <div className="pt-28 pb-12 px-6 md:px-10 max-w-7xl mx-auto w-full">
        <div className="border-b border-line pb-8 mb-4">
          <span className="font-mono text-xs text-signal tracking-widest2">
            CATALOGUE
          </span>
          <h1 className="font-display text-4xl md:text-6xl uppercase text-paper mt-2">
            Software & Engineering Portfolio
          </h1>
          <p className="text-paper-dim mt-3 max-w-2xl text-base">
            Detailed case studies and source code repositories for web applications, mobile software, database systems, and QA testing suites.
          </p>
        </div>

        <Projects projects={projects} />
      </div>

      <Footer profile={profile} footerNote={settings.footerNote} />
    </main>
  );
}
