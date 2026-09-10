import { getPhotographyAlbums, getPhotoItems, getSettings } from "@/lib/cms/content";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PhotographyHub from "@/components/PhotographyHub";
import { profile } from "@/lib/data";
import { Metadata } from "next";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Photography Portfolio & Albums | Krishal Shrestha",
  description:
    "Explore the visual creative portfolio of Krishal Shrestha — portraits, Kathmandu street photography, cultural celebrations, and Himalayan landscapes.",
};

export default async function PhotographyPage() {
  const [albums, photos, settings] = await Promise.all([
    getPhotographyAlbums(),
    getPhotoItems(),
    getSettings(),
  ]);

  return (
    <main className="relative min-h-screen flex flex-col justify-between">
      <Navbar availableForOpportunities={settings.availableForOpportunities} />

      <div className="pt-28 pb-20 px-6 md:px-10 max-w-7xl mx-auto w-full">
        {/* Editorial Header */}
        <div className="border-b border-line pb-10 mb-12">
          <span className="font-mono text-xs text-pink tracking-widest2">
            CREATIVE DISCIPLINE
          </span>
          <h1 className="font-editorial text-4xl sm:text-5xl md:text-6xl uppercase text-paper mt-2">
            Visual Perspectives & Photography
          </h1>
          <p className="font-serif italic text-orange text-xl sm:text-2xl mt-3 max-w-2xl">
            Technology solves problems. Creativity gives them meaning.
          </p>
          <p className="text-paper-dim mt-4 max-w-2xl text-sm md:text-base leading-relaxed">
            Photography informs my approach to software engineering through observation, spatial composition, attention to detail, and user perspective.
          </p>
        </div>

        {/* Photography Hub */}
        <PhotographyHub albums={albums} photos={photos} />
      </div>

      <Footer profile={profile} footerNote={settings.footerNote} />
    </main>
  );
}
