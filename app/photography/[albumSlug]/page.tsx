import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import { ArrowLeft, Camera, FolderHeart } from "lucide-react";
import {
  getPhotographyAlbumBySlug,
  getPhotosByAlbum,
  getSettings,
} from "@/lib/cms/content";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AlbumGallery from "@/components/AlbumGallery";
import { profile } from "@/lib/data";

interface PageProps {
  params: { albumSlug: string };
}

export const revalidate = 60;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const album = await getPhotographyAlbumBySlug(params.albumSlug);
  if (!album) {
    return { title: "Album Not Found | Krishal Shrestha" };
  }

  return {
    title: `${album.title} — Photography Album | Krishal Shrestha`,
    description: album.description,
    openGraph: {
      title: `${album.title} — Krishal Shrestha Photography`,
      description: album.description,
      images: album.coverImageUrl ? [{ url: album.coverImageUrl }] : [],
    },
  };
}

export default async function PhotographyAlbumPage({ params }: PageProps) {
  const [album, photos, settings] = await Promise.all([
    getPhotographyAlbumBySlug(params.albumSlug),
    getPhotosByAlbum(params.albumSlug),
    getSettings(),
  ]);

  if (!album) {
    notFound();
  }

  return (
    <main className="relative min-h-screen flex flex-col justify-between">
      <Navbar availableForOpportunities={settings.availableForOpportunities} />

      <div className="pt-28 pb-20 px-6 md:px-10 max-w-7xl mx-auto w-full">
        {/* Back Link */}
        <div className="mb-8">
          <Link
            href="/photography"
            className="inline-flex items-center gap-2 font-mono text-xs tracking-widest2 text-paper-dim hover:text-pink transition-colors"
          >
            <ArrowLeft size={14} /> BACK TO ALL PHOTOGRAPHY
          </Link>
        </div>

        {/* Album Header Banner */}
        <header className="border-b border-line pb-12 mb-12">
          <div className="flex items-center gap-2 font-mono text-xs text-pink tracking-widest2 mb-3">
            <FolderHeart size={14} /> {album.category} ALBUM
          </div>

          <h1 className="font-editorial text-4xl sm:text-5xl md:text-6xl uppercase text-paper tracking-tight">
            {album.title}
          </h1>

          <p className="mt-4 text-paper-dim max-w-3xl text-base md:text-lg leading-relaxed">
            {album.description}
          </p>

          <div className="mt-6 flex items-center gap-6 font-mono text-xs text-paper-dim">
            <span className="flex items-center gap-1.5">
              <Camera size={13} className="text-pink" /> {photos.length} PHOTOGRAPHS
            </span>
            <span>CURATED BY KRISHAL SHRESTHA</span>
          </div>
        </header>

        {/* Photos Grid with Lightbox */}
        <AlbumGallery photos={photos} />
      </div>

      <Footer profile={profile} footerNote={settings.footerNote} />
    </main>
  );
}
