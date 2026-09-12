/**
 * Migration/seed script.
 *
 * Reads static content from lib/data.ts and inserts it
 * into Supabase, so the CMS starts out with all portfolio content.
 * Safe to re-run — list tables are cleared and re-inserted in order;
 * singletons are upserted by key.
 *
 * Requires SUPABASE_SERVICE_ROLE_KEY. Run with: npm run seed
 */
import "dotenv/config";
import { createClient } from "@supabase/supabase-js";
import * as data from "../lib/data";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceKey) {
  console.error(
    "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in your environment (.env)."
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
  const { error: deleteError } = await supabase.from(table).delete().neq("id", "00000000-0000-0000-0000-000000000000");
  if (deleteError) console.warn(`  (clear ${table}: ${deleteError.message})`);
  const { error } = await supabase.from(table).insert(rows);
  if (error) throw error;
  console.log(`✓ ${table}: ${rows.length} rows`);
}

async function main() {
  await seedSingleton("profile", {
    ...data.profile,
    roleBadges: data.roleBadges,
  });

  await seedSingleton("about", {
    focus: data.aboutFocus,
    intro: data.aboutIntro,
    careerSummary: data.careerSummary,
    highlights: data.aboutHighlights,
    whatIDo: data.whatIDoItems,
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
    title: "Krishal Shrestha | Software Developer, QA Engineer & IT Professional",
    description:
      "Official portfolio of Krishal Shrestha — Computer Engineering undergraduate, software developer, QA engineer, data operations specialist and creative photographer from Kathmandu, Nepal.",
  });

  await seedSingleton("settings", {
    availableForOpportunities: true,
    footerNote: `© 2026 ${data.profile.name}. All rights reserved.`,
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
      slug: p.slug,
      category: p.category,
      status: p.status,
      featured: p.featured,
      short_description: p.shortDescription,
      description: p.description,
      overview: p.overview,
      problem: p.problem,
      solution: p.solution,
      features: p.features,
      technical_implementation: p.technicalImplementation,
      my_contribution: p.myContribution,
      challenges: p.challenges,
      challenges_solutions: p.challengesSolutions,
      technology: p.technology,
      github_url: p.github ?? null,
      demo_url: p.demo ?? null,
      cover_image_url: p.coverImageUrl ?? null,
      screenshots: p.screenshots ?? [],
      order_index: i,
    }))
  );

  await seedList(
    "photography_albums",
    data.photographyAlbums.map((a, i) => ({
      title: a.title,
      slug: a.slug,
      category: a.category,
      description: a.description,
      cover_image_url: a.coverImageUrl,
      order_index: i,
    }))
  );

  await seedList(
    "photo_items",
    data.photoItems.map((p, i) => ({
      title: p.title,
      category: p.category,
      album_slug: p.albumSlug ?? null,
      description: p.description,
      location: p.location ?? null,
      date_taken: p.dateTaken ?? null,
      image_url: p.imageUrl ?? null,
      alt_text: p.altText ?? null,
      featured: p.featured ?? false,
      order_index: i,
    }))
  );

  await seedList(
    "qa_projects",
    data.qaProjects.map((q, i) => ({
      title: q.title,
      project: q.project,
      testing_type: q.testingType,
      tools: q.tools,
      test_cases: q.testCases,
      bug_reports: q.bugReports,
      api_testing: q.apiTesting,
      database_testing: q.databaseTesting,
      result: q.result,
      order_index: i,
    }))
  );

  await seedList(
    "experience_items",
    data.experience.map((e, i) => ({
      company: e.company,
      position: e.position,
      period: e.period,
      description: e.description,
      responsibilities: e.responsibilities,
      technologies: e.technologies,
      order_index: i,
    }))
  );

  await seedList(
    "video_items",
    data.videoItems.map((v, i) => ({
      title: v.title,
      category: v.category,
      description: v.description,
      thumbnail_url: v.thumbnailUrl ?? null,
      order_index: i,
    }))
  );

  await seedList(
    "education_items",
    data.education.map((e, i) => ({
      ...e,
      order_index: i,
    }))
  );

  await seedList(
    "learning_items",
    data.currentLearning.map((l, i) => ({
      ...l,
      order_index: i,
    }))
  );

  await seedList(
    "contribution_items",
    data.contributions.map((c, i) => ({
      ...c,
      order_index: i,
    }))
  );

  await seedList(
    "social_links",
    data.socialCards.map((s, i) => ({
      ...s,
      order_index: i,
    }))
  );

  console.log("\n✓ Seed complete. All portfolio records synchronized.");
}

main().catch((err) => {
  console.error("Seed error:", err);
  process.exit(1);
});
