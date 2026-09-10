"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { saveSingleton } from "@/lib/cms/actions";
import { Field, TextInput, TextArea, TagListInput, PrimaryButton } from "./fields";
import ImageUploader, { UploadedImage } from "./ImageUploader";

function useSingletonSave(key: string) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  const save = async (data: Record<string, unknown>) => {
    setSaving(true);
    setSaved(false);
    setError("");
    try {
      await saveSingleton(key, data);
      setSaved(true);
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to save.");
    } finally {
      setSaving(false);
    }
  };

  return { save, saving, saved, error };
}

function SaveBar({
  saving,
  saved,
  error,
}: {
  saving: boolean;
  saved: boolean;
  error: string;
}) {
  const isSchemaError =
    error.includes("schema cache") ||
    error.includes("content_singletons") ||
    error.includes("relation");

  return (
    <div className="space-y-3 pt-4 border-t border-zinc-800">
      <div className="flex items-center gap-3">
        <PrimaryButton type="submit" disabled={saving}>
          {saving ? "Saving Changes…" : "Save Changes"}
        </PrimaryButton>
        {saved && <span className="text-xs text-emerald-400">✓ Changes saved successfully.</span>}
        {error && !isSchemaError && <span className="text-xs text-red-400">{error}</span>}
      </div>

      {isSchemaError && (
        <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-md text-xs space-y-2 text-amber-200">
          <p className="font-semibold text-amber-300 flex items-center gap-2">
            <span>⚠️</span> Supabase Table &apos;content_singletons&apos; Not Created Yet
          </p>
          <p className="text-zinc-400 leading-relaxed">
            Your Supabase project is connected, but the SQL tables have not been created yet in Postgres.
            To enable database saving in 30 seconds:
          </p>
          <ol className="list-decimal list-inside space-y-1 text-zinc-300">
            <li>Go to your <strong>Supabase Dashboard → SQL Editor</strong></li>
            <li>Click <strong>New Query</strong></li>
            <li>Paste and run the SQL below (or the full <code className="text-amber-300">supabase/schema.sql</code> file)</li>
          </ol>
          <pre className="p-3 bg-zinc-950 border border-zinc-800 rounded font-mono text-[11px] text-zinc-200 overflow-x-auto select-all">
{`create table if not exists content_singletons (
  key text primary key,
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);
alter table content_singletons enable row level security;
create policy "Allow public read" on content_singletons for select using (true);
create policy "Allow auth write" on content_singletons for all to authenticated using (true) with check (true);`}
          </pre>
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------- Hero & Profile
export function HeroProfileForm({ initial }: { initial: any }) {
  const [name, setName] = useState(initial.name ?? "");
  const [designation, setDesignation] = useState(
    initial.designation ?? "Software Developer · QA Engineer · IT Professional"
  );
  const [roles, setRoles] = useState<string[]>(initial.roles ?? []);
  const [location, setLocation] = useState(initial.location ?? "");
  const [phone, setPhone] = useState(initial.phone ?? "");
  const [email, setEmail] = useState(initial.email ?? "");
  const [avatar, setAvatar] = useState<UploadedImage | null>(
    initial.avatarUrl
      ? { url: initial.avatarUrl, publicId: initial.avatarPublicId ?? "" }
      : null
  );
  const [github, setGithub] = useState(initial.links?.github ?? "");
  const [linkedin, setLinkedin] = useState(initial.links?.linkedin ?? "");
  const [facebook, setFacebook] = useState(initial.links?.facebook ?? "");
  const [instagram, setInstagram] = useState(initial.links?.instagram ?? "");
  const [taglineTop, setTaglineTop] = useState(initial.tagline?.[0] ?? "ENGINEER BY LOGIC.");
  const [taglineBottom, setTaglineBottom] = useState(initial.tagline?.[1] ?? "CREATOR BY VISION.");
  const [heroSupport, setHeroSupport] = useState(initial.heroSupport ?? "");
  const [roleBadges, setRoleBadges] = useState<string[]>(initial.roleBadges ?? []);

  const { save, saving, saved, error } = useSingletonSave("profile");

  return (
    <form
      className="space-y-5 max-w-2xl"
      onSubmit={(e) => {
        e.preventDefault();
        save({
          name,
          firstName: name.split(" ")[0] ?? name,
          lastName: name.split(" ").slice(1).join(" "),
          designation,
          roles,
          location,
          phone,
          email,
          avatarUrl: avatar?.url ?? null,
          avatarPublicId: avatar?.publicId ?? null,
          links: { github, linkedin, facebook, instagram },
          tagline: [taglineTop, taglineBottom],
          heroSupport,
          roleBadges,
        });
      }}
    >
      <div>
        <h1 className="text-xl font-bold text-zinc-100">Hero & Profile Settings</h1>
        <p className="text-xs text-zinc-400 mt-1">
          Controls the primary persona, headline, role badges, and hero content.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Full Name">
          <TextInput required value={name} onChange={(e) => setName(e.target.value)} />
        </Field>
        <Field label="Professional Designation">
          <TextInput
            required
            value={designation}
            onChange={(e) => setDesignation(e.target.value)}
          />
        </Field>
      </div>

      <ImageUploader label="Profile Portrait Photo" value={avatar} onChange={setAvatar} />

      <Field label="Roles (comma separated)">
        <TagListInput value={roles} onChange={setRoles} />
      </Field>

      <Field label="Role Badges shown in Hero">
        <TagListInput value={roleBadges} onChange={setRoleBadges} />
      </Field>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Field label="Location">
          <TextInput required value={location} onChange={(e) => setLocation(e.target.value)} />
        </Field>
        <Field label="Phone">
          <TextInput required value={phone} onChange={(e) => setPhone(e.target.value)} />
        </Field>
        <Field label="Email">
          <TextInput
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Field>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Tagline Line 1 (e.g. ENGINEER BY LOGIC.)">
          <TextInput
            required
            value={taglineTop}
            onChange={(e) => setTaglineTop(e.target.value)}
          />
        </Field>
        <Field label="Tagline Line 2 (e.g. CREATOR BY VISION.)">
          <TextInput
            required
            value={taglineBottom}
            onChange={(e) => setTaglineBottom(e.target.value)}
          />
        </Field>
      </div>

      <Field label="Hero Supporting Statement">
        <TextArea
          rows={3}
          value={heroSupport}
          onChange={(e) => setHeroSupport(e.target.value)}
        />
      </Field>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-zinc-800 pt-4">
        <Field label="GitHub Profile URL">
          <TextInput value={github} onChange={(e) => setGithub(e.target.value)} />
        </Field>
        <Field label="LinkedIn Profile URL">
          <TextInput value={linkedin} onChange={(e) => setLinkedin(e.target.value)} />
        </Field>
        <Field label="Instagram URL">
          <TextInput value={instagram} onChange={(e) => setInstagram(e.target.value)} />
        </Field>
        <Field label="Facebook URL">
          <TextInput value={facebook} onChange={(e) => setFacebook(e.target.value)} />
        </Field>
      </div>

      <SaveBar saving={saving} saved={saved} error={error} />
    </form>
  );
}

// ---------------------------------------------------------- About
export function AboutForm({ initial }: { initial: any }) {
  const [intro, setIntro] = useState<string[]>(initial.intro ?? []);
  const [careerSummary, setCareerSummary] = useState(initial.careerSummary ?? "");
  const [highlights, setHighlights] = useState<string[]>(initial.highlights ?? []);
  const [cards, setCards] = useState(initial.identityCards ?? []);
  const { save, saving, saved, error } = useSingletonSave("about");

  const updateCard = (i: number, field: string, value: string) => {
    const next = [...cards];
    next[i] = { ...next[i], [field]: value };
    setCards(next);
  };

  return (
    <form
      className="space-y-6 max-w-2xl"
      onSubmit={(e) => {
        e.preventDefault();
        save({
          intro,
          careerSummary,
          highlights,
          identityCards: cards,
        });
      }}
    >
      <div>
        <h1 className="text-xl font-bold text-zinc-100">About & Career Summary</h1>
        <p className="text-xs text-zinc-400 mt-1">
          Manages the editorial bio, core highlights, and identity cards.
        </p>
      </div>

      <Field label="Career Summary Callout">
        <TextArea
          rows={2}
          value={careerSummary}
          onChange={(e) => setCareerSummary(e.target.value)}
        />
      </Field>

      <Field label="Core Highlights (comma separated)">
        <TagListInput value={highlights} onChange={setHighlights} />
      </Field>

      {intro.map((p: string, i: number) => (
        <Field key={i} label={`Bio Paragraph ${i + 1}`}>
          <TextArea
            rows={3}
            value={p}
            onChange={(e) => {
              const next = [...intro];
              next[i] = e.target.value;
              setIntro(next);
            }}
          />
        </Field>
      ))}

      <div>
        <span className="text-xs font-medium text-zinc-400 block mb-2">
          Identity Pillars
        </span>
        <div className="space-y-3">
          {cards.map((c: any, i: number) => (
            <div key={i} className="border border-zinc-800 rounded-md p-3 space-y-2 bg-zinc-900/30">
              <TextInput
                value={c.title}
                onChange={(e) => updateCard(i, "title", e.target.value)}
                placeholder="Title"
              />
              <TextArea
                rows={2}
                value={c.description}
                onChange={(e) => updateCard(i, "description", e.target.value)}
                placeholder="Description"
              />
            </div>
          ))}
        </div>
      </div>

      <SaveBar saving={saving} saved={saved} error={error} />
    </form>
  );
}

// ---------------------------------------------------------- QA Section
export function QAForm({ initial }: { initial: any }) {
  const [workflow, setWorkflow] = useState<string[]>(initial.workflow ?? []);
  const [cards, setCards] = useState<string[]>(initial.cards ?? []);
  const [tools, setTools] = useState<string[]>(initial.tools ?? []);
  const { save, saving, saved, error } = useSingletonSave("qa");

  return (
    <form
      className="space-y-5 max-w-xl"
      onSubmit={(e) => {
        e.preventDefault();
        save({ workflow, cards, tools });
      }}
    >
      <h1 className="text-xl font-bold text-zinc-100">QA Methodology & Workflow</h1>
      <Field label="Workflow Steps (in chronological sequence)">
        <TagListInput value={workflow} onChange={setWorkflow} />
      </Field>
      <Field label="Testing Specializations">
        <TagListInput value={cards} onChange={setCards} />
      </Field>
      <Field label="Testing Tools">
        <TagListInput value={tools} onChange={setTools} />
      </Field>
      <SaveBar saving={saving} saved={saved} error={error} />
    </form>
  );
}

// ---------------------------------------------------------- SEO
export function SEOForm({ initial }: { initial: any }) {
  const [title, setTitle] = useState(initial.title ?? "");
  const [description, setDescription] = useState(initial.description ?? "");
  const { save, saving, saved, error } = useSingletonSave("seo");

  return (
    <form
      className="space-y-5 max-w-xl"
      onSubmit={(e) => {
        e.preventDefault();
        save({ title, description });
      }}
    >
      <h1 className="text-xl font-bold text-zinc-100">Global SEO & Metadata</h1>
      <Field label="Site Title Tag">
        <TextInput required value={title} onChange={(e) => setTitle(e.target.value)} />
      </Field>
      <Field label="Meta Description">
        <TextArea
          required
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Field>
      <SaveBar saving={saving} saved={saved} error={error} />
    </form>
  );
}

// ---------------------------------------------------------- Settings
export function SettingsForm({ initial }: { initial: any }) {
  const [available, setAvailable] = useState<boolean>(
    initial.availableForOpportunities ?? true
  );
  const [footerNote, setFooterNote] = useState(initial.footerNote ?? "");
  const [introEnabled, setIntroEnabled] = useState<boolean>(
    initial.introEnabled ?? true
  );
  const [introDuration, setIntroDuration] = useState<number>(
    initial.introDuration ?? 2.2
  );
  const [introFrequency, setIntroFrequency] = useState<string>(
    initial.introFrequency ?? "once_per_session"
  );
  const [introImageUrl, setIntroImageUrl] = useState<string>(
    initial.introImageUrl ?? "/images/nepali-mask-light.jpg"
  );
  const { save, saving, saved, error } = useSingletonSave("settings");

  return (
    <form
      className="space-y-6 max-w-xl"
      onSubmit={(e) => {
        e.preventDefault();
        save({
          availableForOpportunities: available,
          footerNote,
          introEnabled,
          introDuration: Number(introDuration) || 2.2,
          introFrequency,
          introImageUrl,
        });
      }}
    >
      <h1 className="text-xl font-bold text-zinc-100">Site Settings</h1>

      <div className="rounded-lg border border-zinc-800 bg-zinc-900/40 p-5 space-y-4">
        <h2 className="text-sm font-semibold text-zinc-200 uppercase tracking-wider">
          Traditional Nepali Mask Intro Experience
        </h2>
        <label className="flex items-center gap-2 text-sm text-zinc-300">
          <input
            type="checkbox"
            checked={introEnabled}
            onChange={(e) => setIntroEnabled(e.target.checked)}
          />
          Enable Artistic Mask Opening Animation
        </label>
        <Field label="Intro Duration (Seconds, e.g. 2.8)">
          <TextInput
            type="number"
            step="0.1"
            min="1.5"
            max="6.0"
            value={introDuration}
            onChange={(e) => setIntroDuration(parseFloat(e.target.value) || 2.8)}
          />
        </Field>
        <Field label="Intro Display Frequency">
          <select
            value={introFrequency}
            onChange={(e) => setIntroFrequency(e.target.value)}
            className="w-full rounded-md border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 focus:border-zinc-500 focus:outline-none"
          >
            <option value="once_per_session">Once Per Session (Recommended — Fast Repeat Visits)</option>
            <option value="always">Every Visit / Refresh</option>
          </select>
        </Field>
        <Field label="Intro Mask Artwork Path or Cloudinary URL">
          <TextInput
            value={introImageUrl}
            onChange={(e) => setIntroImageUrl(e.target.value)}
          />
        </Field>
      </div>

      <div className="rounded-lg border border-zinc-800 bg-zinc-900/40 p-5 space-y-4">
        <h2 className="text-sm font-semibold text-zinc-200 uppercase tracking-wider">
          General Settings
        </h2>
        <label className="flex items-center gap-2 text-sm text-zinc-300">
          <input
            type="checkbox"
            checked={available}
            onChange={(e) => setAvailable(e.target.checked)}
          />
          Show &quot;Available for opportunities / hire&quot; pulse indicator
        </label>
        <Field label="Footer Copyright Note">
          <TextInput
            value={footerNote}
            onChange={(e) => setFooterNote(e.target.value)}
          />
        </Field>
      </div>

      <SaveBar saving={saving} saved={saved} error={error} />
    </form>
  );
}

// ---------------------------------------------------------- Data section
export function DataSectionForm({ initial }: { initial: any }) {
  const [capabilities, setCapabilities] = useState<string[]>(initial.capabilities ?? []);
  const [flow, setFlow] = useState<string[]>(initial.flow ?? []);
  const { save, saving, saved, error } = useSingletonSave("data_section");

  return (
    <form
      className="space-y-4 max-w-xl"
      onSubmit={(e) => {
        e.preventDefault();
        save({ capabilities, flow });
      }}
    >
      <h1 className="text-xl font-semibold text-zinc-100 mb-4">Data & Digital Operations</h1>
      <Field label="Capabilities (comma separated)">
        <TagListInput value={capabilities} onChange={setCapabilities} />
      </Field>
      <Field label="Flow steps (comma separated, in order)">
        <TagListInput value={flow} onChange={setFlow} />
      </Field>
      <SaveBar saving={saving} saved={saved} error={error} />
    </form>
  );
}

// ---------------------------------------------------------- Philosophy
export function PhilosophyForm({ initial }: { initial: any }) {
  const [words, setWords] = useState<string[]>(initial.words ?? []);
  const [statement, setStatement] = useState(initial.statement ?? "");
  const { save, saving, saved, error } = useSingletonSave("philosophy");

  return (
    <form
      className="space-y-4 max-w-xl"
      onSubmit={(e) => {
        e.preventDefault();
        save({ words, statement });
      }}
    >
      <h1 className="text-xl font-semibold text-zinc-100 mb-4">Philosophy</h1>
      <Field label="Words (comma separated, in order)">
        <TagListInput value={words} onChange={setWords} />
      </Field>
      <Field label="Statement">
        <TextArea rows={3} value={statement} onChange={(e) => setStatement(e.target.value)} />
      </Field>
      <SaveBar saving={saving} saved={saved} error={error} />
    </form>
  );
}
