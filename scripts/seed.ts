/**
 * Migration/seed script.
 *
 * Reads the current static content from lib/data.ts and inserts it
 * into Supabase, so the CMS starts out with exactly what's on the
 * live site today. Safe to re-run — list tables are cleared and
 * re-inserted in order; singletons are upserted by key.
 *
 * Requires SUPABASE_SERVICE_ROLE_KEY (never expose this to the
 * client — it bypasses RLS). Run with: npm run seed
 */
import "dotenv/config";
import { createClient } from "@supabase/supabase-js";
import * as data from "../lib/data";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceKey) {
  console.error(
    "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in your environment (.env.local)."
  );
  process.exit(1);
}

const supabase = createClient(url, serviceKey);

async function seedSingleton(key: string, value: object) {
  const { error } = await supabase.from("content_singletons").upsert({ key, data: value });
  if (error) throw error;
  console.log(`✓ singleton: ${key}`);
}

async function seedList(table: string, rows: object[]) {
  const { error: deleteError } = await supabase.from(table).delete().neq("id", "");
  if (deleteError) console.warn(`  (clear ${table}: ${deleteError.message})`);
  const { error } = await supabase.from(table).insert(rows);
  if (error) throw error;
  console.log(`✓ ${table}: ${rows.length} rows`);
}

async function main() {
  await seedSingleton("profile", { ...data.profile, roleBadges: data.roleBadges });
  await seedSingleton("about", {
    intro: data.aboutIntro,
    identityCards: data.identityCards,
    personalIdentityWords: data.personalIdentityWords,
  });
  await seedSingleton("qa", {
    workflow: data.qaWorkflow,
    cards: data.qaCards,
    tools: data.qaTools,
  });
  await seedSingleton("data_section", {
    capabilities: data.dataCapabilities,
    flow: data.dataFlow,
  });
  await seedSingleton("philosophy", {
    words: data.philosophyWords,
    statement: data.philosophyStatement,
  });
  await seedSingleton("seo", {
    title: "Krishal Shrestha | Software Developer, QA Engineer & Creative",
    description:
      "Portfolio of Krishal Shrestha — Computer Engineering undergraduate, software developer, QA enthusiast, data professional, photographer and videographer from Kathmandu, Nepal.",
  });
  await seedSingleton("settings", {
    availableForOpportunities: true,
    footerNote: `© 2026 ${data.profile.name}`,
  });

  await seedList(
    "skill_categories",
    data.skillCategories.map((c, i) => ({
      category_key: c.id,
      tab: c.tab,
      title: c.title,
      groups: c.groups,
      order_index: i,
    }))
  );

  await seedList(
    "projects",
    data.projects.map((p, i) => ({
      name: p.name,
      description: p.description,
      technology: p.technology,
      features: p.features,
      github_url: p.github ?? null,
      demo_url: p.demo ?? null,
      order_index: i,
    }))
  );

  await seedList(
    "photo_items",
    data.photoItems.map((p, i) => ({
      title: p.title,
      category: p.category,
      description: p.description,
      order_index: i,
    }))
  );

  await seedList(
    "video_items",
    data.videoItems.map((v, i) => ({
      title: v.title,
      category: v.category,
      description: v.description,
      order_index: i,
    }))
  );

  await seedList(
    "education_items",
    data.education.map((e, i) => ({ ...e, order_index: i }))
  );

  await seedList(
    "learning_items",
    data.currentLearning.map((l, i) => ({ ...l, order_index: i }))
  );

  await seedList(
    "contribution_items",
    data.contributions.map((c, i) => ({ ...c, order_index: i }))
  );

  await seedList(
    "social_links",
    data.socialCards.map((s, i) => ({ ...s, order_index: i }))
  );

  console.log("\nSeed complete.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
