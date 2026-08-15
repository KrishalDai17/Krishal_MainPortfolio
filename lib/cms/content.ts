import { createClient } from "@/lib/supabase/server";
import * as fallback from "@/lib/data";
import type {
  SkillCategory,
  Project,
  PhotoItem,
  VideoItem,
} from "@/lib/data";

// Every getter: try Supabase (published rows only, ordered) → on any
// failure or empty result, fall back to the original static content.
// This means the public site works identically whether or not the
// CMS has been set up / migrated yet.

async function safeQuery<T>(
  fn: (supabase: NonNullable<Awaited<ReturnType<typeof createClient>>>) => Promise<T[]>,
  fallbackValue: T[]
): Promise<T[]> {
  try {
    const supabase = await createClient();
    if (!supabase) return fallbackValue;
    const rows = await fn(supabase);
    return rows.length > 0 ? rows : fallbackValue;
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

export async function getProfile() {
  return safeSingleton("profile", { ...fallback.profile, roleBadges: fallback.roleBadges });
}

export async function getAbout() {
  return safeSingleton("about", {
    intro: fallback.aboutIntro,
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
      index: String(r.index).padStart(2, "0"),
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
      index: String(i + 1).padStart(2, "0"),
      name: r.name,
      description: r.description,
      technology: r.technology ?? [],
      features: r.features ?? [],
      github: r.github_url ?? undefined,
      demo: r.demo_url ?? undefined,
      coverImageUrl: r.cover_image_url ?? undefined,
    }));
  }, fallback.projects);
}

export async function getQASection() {
  return safeSingleton("qa", {
    workflow: fallback.qaWorkflow,
    cards: fallback.qaCards,
    tools: fallback.qaTools,
  });
}

export async function getDataSection() {
  return safeSingleton("data_section", {
    capabilities: fallback.dataCapabilities,
    flow: fallback.dataFlow,
  });
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
      description: r.description ?? "",
      imageUrl: r.image_url ?? undefined,
      altText: r.alt_text ?? undefined,
    }));
  }, fallback.photoItems);
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
    title: "Krishal Shrestha | Software Developer, QA Engineer & Creative",
    description:
      "Portfolio of Krishal Shrestha — Computer Engineering undergraduate, software developer, QA enthusiast, data professional, photographer and videographer from Kathmandu, Nepal.",
  });
}

export async function getSettings() {
  return safeSingleton("settings", {
    availableForOpportunities: true,
    footerNote: `© 2026 ${fallback.profile.name}`,
  });
}
