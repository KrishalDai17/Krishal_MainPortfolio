"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

const LIST_TABLES = [
  "skill_categories",
  "projects",
  "photography_albums",
  "photo_items",
  "qa_projects",
  "experience_items",
  "contact_messages",
  "video_items",
  "education_items",
  "learning_items",
  "contribution_items",
  "social_links",
  "media_assets",
] as const;
type ListTable = (typeof LIST_TABLES)[number];

async function requireAdmin() {
  const supabase = await createClient();
  if (!supabase) throw new Error("CMS is not configured (missing Supabase env vars).");
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated.");
  return supabase;
}

function assertTable(table: string): asserts table is ListTable {
  if (!LIST_TABLES.includes(table as ListTable)) {
    throw new Error(`Unknown CMS table: ${table}`);
  }
}

const TABLE_ROUTES: Record<string, string> = {
  skill_categories: "/admin/skills",
  projects: "/admin/projects",
  photography_albums: "/admin/albums",
  photo_items: "/admin/photography",
  qa_projects: "/admin/qa",
  experience_items: "/admin/experience",
  contact_messages: "/admin/messages",
  education_items: "/admin/education",
  social_links: "/admin/social-links",
  media_assets: "/admin/media",
};

function safeRevalidate(table?: string) {
  try {
    revalidatePath("/");
    revalidatePath("/admin");
    if (table && TABLE_ROUTES[table]) {
      revalidatePath(TABLE_ROUTES[table]);
    }
  } catch (err) {
    console.warn("Revalidate path warning:", err);
  }
}

export type ServerActionResult = {
  success: boolean;
  error?: string;
};

export async function saveSingleton(
  key: string,
  data: Record<string, unknown>
): Promise<ServerActionResult> {
  try {
    const supabase = await requireAdmin();
    const { error } = await supabase
      .from("content_singletons")
      .upsert({ key, data, updated_at: new Date().toISOString() });
    if (error) return { success: false, error: error.message };
    safeRevalidate();
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || "Failed to save singleton." };
  }
}

export async function createRecord(
  table: string,
  record: Record<string, unknown>
): Promise<ServerActionResult> {
  try {
    assertTable(table);
    const supabase = await requireAdmin();
    const { error } = await supabase.from(table).insert(record);
    if (error) {
      console.error(`Error inserting into ${table}:`, error.message);
      return { success: false, error: error.message };
    }
    safeRevalidate(table);
    return { success: true };
  } catch (err: any) {
    console.error(`Exception inserting into ${table}:`, err.message);
    return { success: false, error: err.message || "Failed to create record." };
  }
}

export async function updateRecord(
  table: string,
  id: string,
  record: Record<string, unknown>
): Promise<ServerActionResult> {
  try {
    assertTable(table);
    const supabase = await requireAdmin();
    const { error } = await supabase.from(table).update(record).eq("id", id);
    if (error) {
      console.error(`Error updating in ${table}:`, error.message);
      return { success: false, error: error.message };
    }
    safeRevalidate(table);
    return { success: true };
  } catch (err: any) {
    console.error(`Exception updating in ${table}:`, err.message);
    return { success: false, error: err.message || "Failed to update record." };
  }
}

export async function deleteRecord(
  table: string,
  id: string
): Promise<ServerActionResult> {
  try {
    assertTable(table);
    const supabase = await requireAdmin();
    const { error } = await supabase.from(table).delete().eq("id", id);
    if (error) return { success: false, error: error.message };
    safeRevalidate(table);
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || "Failed to delete record." };
  }
}

export async function togglePublished(
  table: string,
  id: string,
  published: boolean
): Promise<ServerActionResult> {
  try {
    assertTable(table);
    const supabase = await requireAdmin();
    const { error } = await supabase.from(table).update({ published }).eq("id", id);
    if (error) return { success: false, error: error.message };
    safeRevalidate(table);
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || "Failed to toggle published." };
  }
}

export async function reorderRecords(
  table: string,
  orderedIds: string[]
): Promise<ServerActionResult> {
  try {
    assertTable(table);
    const supabase = await requireAdmin();
    await Promise.all(
      orderedIds.map((id, i) =>
        supabase.from(table).update({ order_index: i }).eq("id", id)
      )
    );
    safeRevalidate(table);
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || "Failed to reorder records." };
  }
}

// ----------------------------------------------------------
// Public Contact Submission Handler
// ----------------------------------------------------------
export async function submitContactInquiry(data: {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}) {
  if (!data.name?.trim() || !data.email?.trim() || !data.message?.trim()) {
    throw new Error("Name, email, and message are required.");
  }

  const supabase = await createClient();
  if (supabase) {
    const { error } = await supabase.from("contact_messages").insert({
      name: data.name.trim(),
      email: data.email.trim(),
      phone: data.phone?.trim() || null,
      subject: data.subject?.trim() || "Website Inquiry",
      message: data.message.trim(),
      read: false,
    });
    if (error) {
      console.warn("Could not write contact message to Supabase:", error.message);
      throw new Error("Failed to save message to database. Table might be missing.");
    }
  }

  revalidatePath("/admin/messages");
  return { success: true };
}

// ----------------------------------------------------------
// Admin Contact Message Management
// ----------------------------------------------------------
export async function markMessageRead(id: string, read: boolean) {
  const supabase = await requireAdmin();
  const { error } = await supabase
    .from("contact_messages")
    .update({ read })
    .eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/messages");
  revalidatePath("/admin");
}

export async function deleteContactMessage(id: string) {
  const supabase = await requireAdmin();
  const { error } = await supabase
    .from("contact_messages")
    .delete()
    .eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/messages");
  revalidatePath("/admin");
}
