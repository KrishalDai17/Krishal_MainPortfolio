import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import SkillMatrix from "@/components/SkillMatrix";
import Projects from "@/components/Projects";
import Photography from "@/components/Photography";
import Education from "@/components/Education";
import SocialLinks from "@/components/SocialLinks";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import {
  getProfile,
  getAbout,
  getSkillCategories,
  getProjects,
  getPhotoItems,
  getEducation,
  getSocialCards,
  getSettings,
} from "@/lib/cms/content";

export const revalidate = 60;

export default async function Home() {
  const [
    profile,
    about,
    skillCategories,
    projects,
    photoItems,
    education,
    socialCards,
    settings,
  ] = await Promise.all([
    getProfile(),
    getAbout(),
    getSkillCategories(),
    getProjects(),
    getPhotoItems(),
    getEducation(),
    getSocialCards(),
    getSettings(),
  ]);

  return (
    <main className="relative">
      {/* 1. Navbar */}
      <Navbar
        availableForOpportunities={settings.availableForOpportunities}
        githubUrl={profile.links.github}
        linkedinUrl={profile.links.linkedin}
      />

      {/* 2. Hero */}
      <Hero profile={profile} />

      {/* 3. About & Disciplines */}
      <About
        profile={profile}
        aboutIntro={about.intro}
        careerSummary={about.careerSummary}
        highlights={about.highlights}
        whatIDo={about.whatIDo}
        identityCards={about.identityCards}
      />

      {/* 4. Skills Capability Matrix */}
      <SkillMatrix skillCategories={skillCategories} />

      {/* 5. Featured Projects (DD Mart, CNP Explore, Signup Auth) */}
      <Projects projects={projects} />

      {/* 6. Creative Photography Showcase */}
      <Photography photoItems={photoItems} profile={profile} />

      {/* 7. Education Timeline */}
      <Education education={education} />

      {/* 8. Connect / Online */}
      <SocialLinks socialCards={socialCards} />

      {/* 9. Contact Inquiry Form */}
      <Contact profile={profile} />

      {/* 10. Footer */}
      <Footer profile={profile} footerNote={settings.footerNote} />
    </main>
  );
}
