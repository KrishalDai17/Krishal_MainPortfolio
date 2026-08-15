"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

const LIST_TABLES = [
  "skill_categories",
  "projects",
  "photo_items",
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

export async function saveSingleton(key: string, data: Record<string, unknown>) {
  const supabase = await requireAdmin();
  const { error } = await supabase
    .from("content_singletons")
    .upsert({ key, data, updated_at: new Date().toISOString() });
  if (error) throw new Error(error.message);
  revalidatePath("/");
  revalidatePath("/admin");
}

export async function createRecord(table: string, record: Record<string, unknown>) {
  assertTable(table);
  const supabase = await requireAdmin();
  const { error } = await supabase.from(table).insert(record);
  if (error) throw new Error(error.message);
  revalidatePath("/");
  revalidatePath(`/admin/${table}`);
}

export async function updateRecord(table: string, id: string, record: Record<string, unknown>) {
  assertTable(table);
  const supabase = await requireAdmin();
  const { error } = await supabase.from(table).update(record).eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/");
  revalidatePath(`/admin/${table}`);
}

export async function deleteRecord(table: string, id: string) {
  assertTable(table);
  const supabase = await requireAdmin();
  const { error } = await supabase.from(table).delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/");
  revalidatePath(`/admin/${table}`);
}

export async function togglePublished(table: string, id: string, published: boolean) {
  assertTable(table);
  const supabase = await requireAdmin();
  const { error } = await supabase.from(table).update({ published }).eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/");
  revalidatePath(`/admin/${table}`);
}

// Accepts an ordered array of ids reflecting the new order and
// writes sequential order_index values.
export async function reorderRecords(table: string, orderedIds: string[]) {
  assertTable(table);
  const supabase = await requireAdmin();
  await Promise.all(
    orderedIds.map((id, i) => supabase.from(table).update({ order_index: i }).eq("id", id))
  );
  revalidatePath("/");
  revalidatePath(`/admin/${table}`);
}
