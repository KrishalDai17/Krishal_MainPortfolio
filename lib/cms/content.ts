import { createClient } from "@/lib/supabase/server";
import * as fallback from "@/lib/data";
import type {
  SkillCategory,
  Project,
  PhotoItem,
  PhotographyAlbum,
  QAProject,
  ExperienceItem,
  VideoItem,
  Profile,
} from "@/lib/data";

// Safe query helper: try Supabase (published rows only, ordered).
// On any error, missing table, or empty result, safely return fallbackValue.
async function safeQuery<T>(
  fn: (supabase: NonNullable<Awaited<ReturnType<typeof createClient>>>) => Promise<T[]>,
  fallbackValue: T[]
): Promise<T[]> {
  try {
    const supabase = await createClient();
    if (!supabase) return fallbackValue;
    const rows = await fn(supabase);
    return rows && rows.length > 0 ? rows : fallbackValue;
  } catch {
    return fallbackValue;
  }
}

async function safeSingleton<T>(key: string, fallbackValue: T): Promise<T> {
  try {
    const supabase = await createClient();
    if (!supabase) return fallbackValue;
    const { data, error } = await supabase
      .from("content_singletons")
      .select("data")
      .eq("key", key)
      .maybeSingle();
    if (error || !data) return fallbackValue;
    return { ...fallbackValue, ...(data.data as object) } as T;
  } catch {
    return fallbackValue;
  }
}

export async function getProfile(): Promise<Profile> {
  return safeSingleton("profile", {
    ...fallback.profile,
    roleBadges: fallback.roleBadges,
  });
}

export async function getAbout() {
  return safeSingleton("about", {
    focus: fallback.aboutFocus,
    intro: fallback.aboutIntro,
    careerSummary: fallback.careerSummary,
    highlights: fallback.aboutHighlights,
    whatIDo: fallback.whatIDoItems,
    identityCards: fallback.identityCards,
    personalIdentityWords: fallback.personalIdentityWords,
  });
}

export async function getSkillCategories(): Promise<SkillCategory[]> {
  return safeQuery(async (supabase) => {
    const { data, error } = await supabase
      .from("skill_categories")
      .select("category_key, tab, index:order_index, title, groups")
      .eq("published", true)
      .order("order_index");
    if (error || !data) return [];
    return data.map((r: any) => ({
      id: r.category_key,
      tab: r.tab,
      index: String(r.index + 1).padStart(2, "0"),
      title: r.title,
      groups: r.groups,
    }));
  }, fallback.skillCategories);
}

export async function getProjects(): Promise<Project[]> {
  return safeQuery(async (supabase) => {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("published", true)
      .order("order_index");
    if (error || !data) return [];
    return data.map((r: any, i: number) => ({
      id: r.id,
      index: String(i + 1).padStart(2, "0"),
      name: r.name,
      slug: r.slug || r.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      category: r.category || "WEB",
      status: r.status || "COMPLETED",
      featured: r.featured ?? true,
      shortDescription: r.short_description || r.description,
      description: r.description,
      overview: r.overview || r.description,
      problem: r.problem || "",
      solution: r.solution || "",
      features: r.features ?? [],
      technicalImplementation: r.technical_implementation || "",
      myContribution: r.my_contribution || "",
      challenges: r.challenges || "",
      challengesSolutions: r.challenges_solutions || "",
      technology: r.technology ?? [],
      github:
        r.github_url?.trim() ||
        `https://github.com/KrishalDai17/${r.slug || r.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
      demo:
        r.demo_url?.trim() ||
        (r.slug === "dd-mart" ? "https://ddmart.com.np/" : undefined) ||
        r.github_url?.trim() ||
        `https://github.com/KrishalDai17/${r.slug || r.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
      coverImageUrl: r.cover_image_url ?? undefined,
      screenshots: r.screenshots ?? [],
    }));
  }, fallback.projects);
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const allProjects = await getProjects();
  const match = allProjects.find(
    (p) => p.slug.toLowerCase() === slug.toLowerCase()
  );
  return match || null;
}

export async function getPhotographyAlbums(): Promise<PhotographyAlbum[]> {
  return safeQuery(async (supabase) => {
    const { data, error } = await supabase
      .from("photography_albums")
      .select("*")
      .eq("published", true)
      .order("order_index");
    if (error || !data) return [];
    return data.map((r: any) => ({
      id: r.id,
      title: r.title,
      slug: r.slug,
      category: r.category,
      description: r.description ?? "",
      coverImageUrl: r.cover_image_url ?? "",
    }));
  }, fallback.photographyAlbums);
}

export async function getPhotographyAlbumBySlug(slug: string): Promise<PhotographyAlbum | null> {
  const albums = await getPhotographyAlbums();
  return albums.find((a) => a.slug.toLowerCase() === slug.toLowerCase()) || null;
}

export async function getPhotoItems(): Promise<PhotoItem[]> {
  return safeQuery(async (supabase) => {
    const { data, error } = await supabase
      .from("photo_items")
      .select("*")
      .eq("published", true)
      .order("order_index");
    if (error || !data) return [];
    return data.map((r: any) => ({
      id: r.id,
      title: r.title,
      category: r.category,
      albumSlug: r.album_slug ?? undefined,
      description: r.description ?? "",
      location: r.location ?? undefined,
      dateTaken: r.date_taken ?? undefined,
      imageUrl: r.image_url ?? undefined,
      altText: r.alt_text ?? undefined,
      featured: r.featured ?? false,
    }));
  }, fallback.photoItems);
}

export async function getPhotosByAlbum(albumSlug: string): Promise<PhotoItem[]> {
  const allPhotos = await getPhotoItems();
  return allPhotos.filter(
    (p) => p.albumSlug?.toLowerCase() === albumSlug.toLowerCase()
  );
}

export async function getQASection() {
  return safeSingleton("qa", {
    workflow: fallback.qaWorkflow,
    cards: fallback.qaCards,
    tools: fallback.qaTools,
  });
}

export async function getQAProjects(): Promise<QAProject[]> {
  return safeQuery(async (supabase) => {
    const { data, error } = await supabase
      .from("qa_projects")
      .select("*")
      .eq("published", true)
      .order("order_index");
    if (error || !data) return [];
    return data.map((r: any) => ({
      id: r.id,
      title: r.title,
      project: r.project,
      testingType: r.testing_type,
      tools: r.tools ?? [],
      testCases: r.test_cases ?? "",
      bugReports: r.bug_reports ?? "",
      apiTesting: r.api_testing ?? "",
      databaseTesting: r.database_testing ?? "",
      result: r.result ?? "",
    }));
  }, fallback.qaProjects);
}

export async function getExperience(): Promise<ExperienceItem[]> {
  return safeQuery(async (supabase) => {
    const { data, error } = await supabase
      .from("experience_items")
      .select("*")
      .eq("published", true)
      .order("order_index");
    if (error || !data) return [];
    return data.map((r: any) => ({
      id: r.id,
      company: r.company,
      position: r.position,
      period: r.period,
      description: r.description,
      responsibilities: r.responsibilities ?? [],
      technologies: r.technologies ?? [],
    }));
  }, fallback.experience);
}

export async function getDataSection() {
  return safeSingleton("data_section", {
    capabilities: fallback.dataCapabilities,
    flow: fallback.dataFlow,
  });
}

export async function getVideoItems(): Promise<VideoItem[]> {
  return safeQuery(async (supabase) => {
    const { data, error } = await supabase
      .from("video_items")
      .select("*")
      .eq("published", true)
      .order("order_index");
    if (error || !data) return [];
    return data.map((r: any) => ({
      id: r.id,
      title: r.title,
      category: r.category,
      description: r.description ?? "",
      thumbnailUrl: r.thumbnail_url ?? undefined,
      videoUrl: r.video_url ?? undefined,
    }));
  }, fallback.videoItems);
}

export async function getEducation() {
  return safeQuery(async (supabase) => {
    const { data, error } = await supabase
      .from("education_items")
      .select("*")
      .eq("published", true)
      .order("order_index");
    if (error || !data) return [];
    return data.map((r: any) => ({
      period: r.period,
      institution: r.institution,
      program: r.program,
      location: r.location,
      description: r.description,
    }));
  }, fallback.education);
}

export async function getCurrentLearning() {
  return safeQuery(async (supabase) => {
    const { data, error } = await supabase
      .from("learning_items")
      .select("*")
      .eq("published", true)
      .order("order_index");
    if (error || !data) return [];
    return data.map((r: any) => ({ name: r.name, stage: r.stage }));
  }, fallback.currentLearning);
}

export async function getContributions() {
  return safeQuery(async (supabase) => {
    const { data, error } = await supabase
      .from("contribution_items")
      .select("*")
      .eq("published", true)
      .order("order_index");
    if (error || !data) return [];
    return data.map((r: any) => ({ title: r.title, description: r.description }));
  }, fallback.contributions);
}

export async function getPhilosophy() {
  return safeSingleton("philosophy", {
    words: fallback.philosophyWords,
    statement: fallback.philosophyStatement,
  });
}

export async function getSocialCards() {
  return safeQuery(async (supabase) => {
    const { data, error } = await supabase
      .from("social_links")
      .select("*")
      .eq("published", true)
      .order("order_index");
    if (error || !data) return [];
    return data.map((r: any) => ({
      key: r.key,
      label: r.label,
      tagline: r.tagline,
      handle: r.handle ?? "",
      url: r.url,
      cta: r.cta,
    }));
  }, fallback.socialCards);
}

export async function getSEO() {
  return safeSingleton("seo", {
    title: "Krishal Shrestha | Software Developer, QA Engineer & IT Professional",
    description:
      "Official portfolio of Krishal Shrestha — Computer Engineering undergraduate, software developer, QA engineer, data operations specialist and creative photographer from Kathmandu, Nepal.",
  });
}

export async function getSettings(): Promise<fallback.SiteSettings> {
  return safeSingleton("settings", fallback.siteSettings);
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  read: boolean;
  created_at: string;
}

export async function getContactMessages(): Promise<ContactMessage[]> {
  try {
    const supabase = await createClient();
    if (!supabase) return [];
    const { data, error } = await supabase
      .from("contact_messages")
      .select("*")
      .order("created_at", { ascending: false });
    if (error || !data) return [];
    return data;
  } catch {
    return [];
  }
}
