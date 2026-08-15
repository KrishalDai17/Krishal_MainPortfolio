import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import IdentityWords from "@/components/IdentityWords";
import SkillMatrix from "@/components/SkillMatrix";
import Projects from "@/components/Projects";
import QASection from "@/components/QASection";
import DataSection from "@/components/DataSection";
import Photography from "@/components/Photography";
import Videography from "@/components/Videography";
import CreativeSection from "@/components/CreativeSection";
import Education from "@/components/Education";
import Learning from "@/components/Learning";
import ProfessionalProfile from "@/components/ProfessionalProfile";
import Philosophy from "@/components/Philosophy";
import SocialLinks from "@/components/SocialLinks";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import {
  getProfile,
  getAbout,
  getSkillCategories,
  getProjects,
  getQASection,
  getDataSection,
  getPhotoItems,
  getVideoItems,
  getEducation,
  getCurrentLearning,
  getContributions,
  getPhilosophy,
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
    qa,
    dataSection,
    photoItems,
    videoItems,
    education,
    currentLearning,
    contributions,
    philosophy,
    socialCards,
    settings,
  ] = await Promise.all([
    getProfile(),
    getAbout(),
    getSkillCategories(),
    getProjects(),
    getQASection(),
    getDataSection(),
    getPhotoItems(),
    getVideoItems(),
    getEducation(),
    getCurrentLearning(),
    getContributions(),
    getPhilosophy(),
    getSocialCards(),
    getSettings(),
  ]);

  return (
    <main className="relative">
      <Navbar availableForOpportunities={settings.availableForOpportunities} />
      <Hero profile={profile} roleBadges={profile.roleBadges} />
      <About aboutIntro={about.intro} identityCards={about.identityCards} />
      <IdentityWords personalIdentityWords={about.personalIdentityWords} />
      <SkillMatrix skillCategories={skillCategories} />
      <Projects projects={projects} />
      <QASection qaWorkflow={qa.workflow} qaCards={qa.cards} qaTools={qa.tools} />
      <DataSection dataCapabilities={dataSection.capabilities} dataFlow={dataSection.flow} />
      <Photography photoItems={photoItems} profile={profile} />
      <Videography videoItems={videoItems} />
      <CreativeSection />
      <Education education={education} />
      <Learning currentLearning={currentLearning} />
      <ProfessionalProfile contributions={contributions} />
      <Philosophy philosophyWords={philosophy.words} philosophyStatement={philosophy.statement} />
      <SocialLinks socialCards={socialCards} />
      <Contact profile={profile} />
      <Footer profile={profile} footerNote={settings.footerNote} />
    </main>
  );
}
