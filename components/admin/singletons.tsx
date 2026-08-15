"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { saveSingleton } from "@/lib/cms/actions";
import { Field, TextInput, TextArea, TagListInput, PrimaryButton } from "./fields";

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

function SaveBar({ saving, saved, error }: { saving: boolean; saved: boolean; error: string }) {
  return (
    <div className="flex items-center gap-3 pt-2">
      <PrimaryButton type="submit" disabled={saving}>
        {saving ? "Saving…" : "Save changes"}
      </PrimaryButton>
      {saved && <span className="text-xs text-emerald-400">Saved.</span>}
      {error && <span className="text-xs text-red-400">{error}</span>}
    </div>
  );
}

// ---------------------------------------------------------- Hero & Profile
export function HeroProfileForm({ initial }: { initial: any }) {
  const [name, setName] = useState(initial.name ?? "");
  const [roles, setRoles] = useState<string[]>(initial.roles ?? []);
  const [location, setLocation] = useState(initial.location ?? "");
  const [phone, setPhone] = useState(initial.phone ?? "");
  const [email, setEmail] = useState(initial.email ?? "");
  const [github, setGithub] = useState(initial.links?.github ?? "");
  const [facebook, setFacebook] = useState(initial.links?.facebook ?? "");
  const [instagram, setInstagram] = useState(initial.links?.instagram ?? "");
  const [linkedin, setLinkedin] = useState(initial.links?.linkedin ?? "");
  const [taglineTop, setTaglineTop] = useState(initial.tagline?.[0] ?? "");
  const [taglineBottom, setTaglineBottom] = useState(initial.tagline?.[1] ?? "");
  const [heroSupport, setHeroSupport] = useState(initial.heroSupport ?? "");
  const [roleBadges, setRoleBadges] = useState<string[]>(initial.roleBadges ?? []);
  const { save, saving, saved, error } = useSingletonSave("profile");

  return (
    <form
      className="space-y-4 max-w-xl"
      onSubmit={(e) => {
        e.preventDefault();
        save({
          name,
          firstName: name.split(" ")[0] ?? name,
          lastName: name.split(" ").slice(1).join(" "),
          roles,
          location,
          phone,
          email,
          links: { github, facebook, instagram, linkedin },
          tagline: [taglineTop, taglineBottom],
          heroSupport,
          roleBadges,
        });
      }}
    >
      <h1 className="text-xl font-semibold text-zinc-100 mb-4">Hero & Profile</h1>

      <Field label="Full name"><TextInput required value={name} onChange={(e) => setName(e.target.value)} /></Field>
      <Field label="Roles (comma separated)"><TagListInput value={roles} onChange={setRoles} /></Field>
      <Field label="Role badges shown in hero (comma separated)"><TagListInput value={roleBadges} onChange={setRoleBadges} /></Field>
      <Field label="Location"><TextInput required value={location} onChange={(e) => setLocation(e.target.value)} /></Field>
      <Field label="Phone"><TextInput required value={phone} onChange={(e) => setPhone(e.target.value)} /></Field>
      <Field label="Email"><TextInput required type="email" value={email} onChange={(e) => setEmail(e.target.value)} /></Field>
      <Field label="GitHub URL"><TextInput value={github} onChange={(e) => setGithub(e.target.value)} /></Field>
      <Field label="Facebook URL"><TextInput value={facebook} onChange={(e) => setFacebook(e.target.value)} /></Field>
      <Field label="Instagram URL"><TextInput value={instagram} onChange={(e) => setInstagram(e.target.value)} /></Field>
      <Field label="LinkedIn URL"><TextInput value={linkedin} onChange={(e) => setLinkedin(e.target.value)} /></Field>
      <Field label="Tagline — line 1 (e.g. ENGINEER BY LOGIC.)"><TextInput value={taglineTop} onChange={(e) => setTaglineTop(e.target.value)} /></Field>
      <Field label="Tagline — line 2 (e.g. CREATOR BY VISION.)"><TextInput value={taglineBottom} onChange={(e) => setTaglineBottom(e.target.value)} /></Field>
      <Field label="Hero supporting paragraph"><TextArea rows={3} value={heroSupport} onChange={(e) => setHeroSupport(e.target.value)} /></Field>

      <SaveBar saving={saving} saved={saved} error={error} />
    </form>
  );
}

// ---------------------------------------------------------- About
export function AboutForm({ initial }: { initial: any }) {
  const [intro, setIntro] = useState<string[]>(initial.intro ?? []);
  const [cards, setCards] = useState(initial.identityCards ?? []);
  const { save, saving, saved, error } = useSingletonSave("about");

  const updateCard = (i: number, field: string, value: string) => {
    const next = [...cards];
    next[i] = { ...next[i], [field]: value };
    setCards(next);
  };

  return (
    <form
      className="space-y-6 max-w-xl"
      onSubmit={(e) => {
        e.preventDefault();
        save({ intro, identityCards: cards });
      }}
    >
      <h1 className="text-xl font-semibold text-zinc-100 mb-4">About</h1>

      {intro.map((p: string, i: number) => (
        <Field key={i} label={`Paragraph ${i + 1}`}>
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
        <span className="text-xs font-medium text-zinc-400 block mb-2">Identity cards</span>
        <div className="space-y-3">
          {cards.map((c: any, i: number) => (
            <div key={i} className="border border-zinc-800 rounded-md p-3 space-y-2">
              <TextInput value={c.title} onChange={(e) => updateCard(i, "title", e.target.value)} placeholder="Title" />
              <TextArea rows={2} value={c.description} onChange={(e) => updateCard(i, "description", e.target.value)} placeholder="Description" />
            </div>
          ))}
        </div>
      </div>

      <SaveBar saving={saving} saved={saved} error={error} />
    </form>
  );
}

// ---------------------------------------------------------- QA
export function QAForm({ initial }: { initial: any }) {
  const [workflow, setWorkflow] = useState<string[]>(initial.workflow ?? []);
  const [cards, setCards] = useState<string[]>(initial.cards ?? []);
  const [tools, setTools] = useState<string[]>(initial.tools ?? []);
  const { save, saving, saved, error } = useSingletonSave("qa");

  return (
    <form
      className="space-y-4 max-w-xl"
      onSubmit={(e) => {
        e.preventDefault();
        save({ workflow, cards, tools });
      }}
    >
      <h1 className="text-xl font-semibold text-zinc-100 mb-4">QA Section</h1>
      <Field label="Workflow steps (comma separated, in order)"><TagListInput value={workflow} onChange={setWorkflow} /></Field>
      <Field label="Testing focus cards (comma separated)"><TagListInput value={cards} onChange={setCards} /></Field>
      <Field label="Tools (comma separated)"><TagListInput value={tools} onChange={setTools} /></Field>
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
      <Field label="Capabilities (comma separated)"><TagListInput value={capabilities} onChange={setCapabilities} /></Field>
      <Field label="Flow steps (comma separated, in order)"><TagListInput value={flow} onChange={setFlow} /></Field>
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
      <Field label="Words (comma separated, in order)"><TagListInput value={words} onChange={setWords} /></Field>
      <Field label="Statement"><TextArea rows={3} value={statement} onChange={(e) => setStatement(e.target.value)} /></Field>
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
      className="space-y-4 max-w-xl"
      onSubmit={(e) => {
        e.preventDefault();
        save({ title, description });
      }}
    >
      <h1 className="text-xl font-semibold text-zinc-100 mb-4">SEO</h1>
      <Field label="Page title"><TextInput required value={title} onChange={(e) => setTitle(e.target.value)} /></Field>
      <Field label="Meta description"><TextArea required rows={3} value={description} onChange={(e) => setDescription(e.target.value)} /></Field>
      <SaveBar saving={saving} saved={saved} error={error} />
    </form>
  );
}

// ---------------------------------------------------------- Settings
export function SettingsForm({ initial }: { initial: any }) {
  const [available, setAvailable] = useState<boolean>(initial.availableForOpportunities ?? true);
  const [footerNote, setFooterNote] = useState(initial.footerNote ?? "");
  const { save, saving, saved, error } = useSingletonSave("settings");

  return (
    <form
      className="space-y-4 max-w-xl"
      onSubmit={(e) => {
        e.preventDefault();
        save({ availableForOpportunities: available, footerNote });
      }}
    >
      <h1 className="text-xl font-semibold text-zinc-100 mb-4">Site Settings</h1>
      <label className="flex items-center gap-2 text-sm text-zinc-300">
        <input type="checkbox" checked={available} onChange={(e) => setAvailable(e.target.checked)} />
        Show &quot;Available for opportunities&quot; indicator
      </label>
      <Field label="Footer copyright note"><TextInput value={footerNote} onChange={(e) => setFooterNote(e.target.value)} /></Field>
      <SaveBar saving={saving} saved={saved} error={error} />
    </form>
  );
}
