"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ListEditor, { ListEditorItem } from "./ListEditor";
import ImageUploader, { UploadedImage } from "./ImageUploader";
import { Field, TextInput, TextArea, Select, TagListInput, PrimaryButton, GhostButton } from "./fields";
import { createRecord, updateRecord } from "@/lib/cms/actions";

function useSavingForm<T extends ListEditorItem>(
  table: string,
  item: T | null,
  close: () => void
) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const save = async (record: Record<string, unknown>) => {
    setSaving(true);
    setError("");
    try {
      if (item) await updateRecord(table, item.id, record);
      else await createRecord(table, record);
      close();
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to save.");
    } finally {
      setSaving(false);
    }
  };

  return { save, saving, error };
}

function FormShell({
  onSubmit,
  saving,
  error,
  onCancel,
  children,
}: {
  onSubmit: (e: React.FormEvent) => void;
  saving: boolean;
  error: string;
  onCancel: () => void;
  children: React.ReactNode;
}) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {children}
      {error && <p className="text-xs text-red-400">{error}</p>}
      <div className="flex items-center gap-3 pt-2">
        <PrimaryButton type="submit" disabled={saving}>
          {saving ? "Saving…" : "Save"}
        </PrimaryButton>
        <GhostButton type="button" onClick={onCancel}>
          Cancel
        </GhostButton>
      </div>
    </form>
  );
}

// ---------------------------------------------------------- Projects
interface ProjectRow extends ListEditorItem {
  name: string;
  description: string;
  technology: string[];
  features: string[];
  github_url: string | null;
  demo_url: string | null;
  cover_image_url: string | null;
  cover_image_public_id: string | null;
}

export function ProjectsEditor({ items }: { items: ProjectRow[] }) {
  return (
    <ListEditor
      table="projects"
      items={items}
      title="Projects"
      renderRow={(p) => (
        <div>
          <p className="text-sm text-zinc-100">{p.name}</p>
          <p className="text-xs text-zinc-500">{p.technology?.join(" · ")}</p>
        </div>
      )}
      renderForm={(item, close) => <ProjectForm item={item} close={close} />}
    />
  );
}

function ProjectForm({ item, close }: { item: ProjectRow | null; close: () => void }) {
  const [name, setName] = useState(item?.name ?? "");
  const [description, setDescription] = useState(item?.description ?? "");
  const [technology, setTechnology] = useState<string[]>(item?.technology ?? []);
  const [features, setFeatures] = useState<string[]>(item?.features ?? []);
  const [githubUrl, setGithubUrl] = useState(item?.github_url ?? "");
  const [demoUrl, setDemoUrl] = useState(item?.demo_url ?? "");
  const [cover, setCover] = useState<UploadedImage | null>(
    item?.cover_image_url ? { url: item.cover_image_url, publicId: item.cover_image_public_id ?? "" } : null
  );
  const { save, saving, error } = useSavingForm("projects", item, close);

  return (
    <FormShell
      saving={saving}
      error={error}
      onCancel={close}
      onSubmit={(e) => {
        e.preventDefault();
        save({
          name,
          description,
          technology,
          features,
          github_url: githubUrl || null,
          demo_url: demoUrl || null,
          cover_image_url: cover?.url ?? null,
          cover_image_public_id: cover?.publicId ?? null,
        });
      }}
    >
      <Field label="Name"><TextInput required value={name} onChange={(e) => setName(e.target.value)} /></Field>
      <Field label="Description"><TextArea required rows={3} value={description} onChange={(e) => setDescription(e.target.value)} /></Field>
      <Field label="Technology (comma separated)"><TagListInput value={technology} onChange={setTechnology} /></Field>
      <Field label="Features (comma separated)"><TagListInput value={features} onChange={setFeatures} /></Field>
      <Field label="GitHub URL"><TextInput value={githubUrl} onChange={(e) => setGithubUrl(e.target.value)} /></Field>
      <Field label="Demo URL"><TextInput value={demoUrl} onChange={(e) => setDemoUrl(e.target.value)} /></Field>
      <ImageUploader label="Cover image" value={cover} onChange={setCover} />
    </FormShell>
  );
}

// ---------------------------------------------------------- Photography
interface PhotoRow extends ListEditorItem {
  title: string;
  category: string;
  description: string | null;
  image_url: string | null;
  image_public_id: string | null;
  alt_text: string | null;
}

export function PhotographyEditor({ items }: { items: PhotoRow[] }) {
  return (
    <ListEditor
      table="photo_items"
      items={items}
      title="Photography"
      renderRow={(p) => (
        <div>
          <p className="text-sm text-zinc-100">{p.title}</p>
          <p className="text-xs text-zinc-500">{p.category}</p>
        </div>
      )}
      renderForm={(item, close) => <PhotoForm item={item} close={close} />}
    />
  );
}

function PhotoForm({ item, close }: { item: PhotoRow | null; close: () => void }) {
  const [title, setTitle] = useState(item?.title ?? "");
  const [category, setCategory] = useState(item?.category ?? "PORTRAITS");
  const [description, setDescription] = useState(item?.description ?? "");
  const [altText, setAltText] = useState(item?.alt_text ?? "");
  const [image, setImage] = useState<UploadedImage | null>(
    item?.image_url ? { url: item.image_url, publicId: item.image_public_id ?? "" } : null
  );
  const { save, saving, error } = useSavingForm("photo_items", item, close);

  return (
    <FormShell
      saving={saving}
      error={error}
      onCancel={close}
      onSubmit={(e) => {
        e.preventDefault();
        save({
          title,
          category,
          description,
          alt_text: altText,
          image_url: image?.url ?? null,
          image_public_id: image?.publicId ?? null,
        });
      }}
    >
      <Field label="Title"><TextInput required value={title} onChange={(e) => setTitle(e.target.value)} /></Field>
      <Field label="Category">
        <Select value={category} onChange={(e) => setCategory(e.target.value)}>
          {["PORTRAITS", "EVENTS", "LANDSCAPES", "PRODUCTS", "STREET", "LIFESTYLE"].map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </Select>
      </Field>
      <Field label="Description"><TextArea rows={2} value={description ?? ""} onChange={(e) => setDescription(e.target.value)} /></Field>
      <Field label="Alt text"><TextInput value={altText ?? ""} onChange={(e) => setAltText(e.target.value)} /></Field>
      <ImageUploader label="Photo" value={image} onChange={setImage} />
    </FormShell>
  );
}

// ---------------------------------------------------------- Videography
interface VideoRow extends ListEditorItem {
  title: string;
  category: string;
  description: string | null;
  thumbnail_url: string | null;
  thumbnail_public_id: string | null;
  video_url: string | null;
}

export function VideosEditor({ items }: { items: VideoRow[] }) {
  return (
    <ListEditor
      table="video_items"
      items={items}
      title="Videography"
      renderRow={(v) => (
        <div>
          <p className="text-sm text-zinc-100">{v.title}</p>
          <p className="text-xs text-zinc-500">{v.category}</p>
        </div>
      )}
      renderForm={(item, close) => <VideoForm item={item} close={close} />}
    />
  );
}

function VideoForm({ item, close }: { item: VideoRow | null; close: () => void }) {
  const [title, setTitle] = useState(item?.title ?? "");
  const [category, setCategory] = useState(item?.category ?? "EVENTS");
  const [description, setDescription] = useState(item?.description ?? "");
  const [videoUrl, setVideoUrl] = useState(item?.video_url ?? "");
  const [thumb, setThumb] = useState<UploadedImage | null>(
    item?.thumbnail_url ? { url: item.thumbnail_url, publicId: item.thumbnail_public_id ?? "" } : null
  );
  const { save, saving, error } = useSavingForm("video_items", item, close);

  return (
    <FormShell
      saving={saving}
      error={error}
      onCancel={close}
      onSubmit={(e) => {
        e.preventDefault();
        save({
          title,
          category,
          description,
          video_url: videoUrl || null,
          thumbnail_url: thumb?.url ?? null,
          thumbnail_public_id: thumb?.publicId ?? null,
        });
      }}
    >
      <Field label="Title"><TextInput required value={title} onChange={(e) => setTitle(e.target.value)} /></Field>
      <Field label="Category">
        <Select value={category} onChange={(e) => setCategory(e.target.value)}>
          {["EVENTS", "CINEMATIC", "SHORT FORM", "PROMOTIONAL", "TRAVEL"].map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </Select>
      </Field>
      <Field label="Description"><TextArea rows={2} value={description ?? ""} onChange={(e) => setDescription(e.target.value)} /></Field>
      <Field label="Video URL (YouTube / Vimeo / Cloudinary)">
        <TextInput value={videoUrl ?? ""} onChange={(e) => setVideoUrl(e.target.value)} />
      </Field>
      <ImageUploader label="Thumbnail" value={thumb} onChange={setThumb} />
    </FormShell>
  );
}

// ---------------------------------------------------------- Education
interface EducationRow extends ListEditorItem {
  period: string;
  institution: string;
  program: string;
  location: string;
}

export function EducationEditor({ items }: { items: EducationRow[] }) {
  return (
    <ListEditor
      table="education_items"
      items={items}
      title="Education"
      renderRow={(e) => (
        <div>
          <p className="text-sm text-zinc-100">{e.institution}</p>
          <p className="text-xs text-zinc-500">{e.period} · {e.program}</p>
        </div>
      )}
      renderForm={(item, close) => <EducationForm item={item} close={close} />}
    />
  );
}

function EducationForm({ item, close }: { item: EducationRow | null; close: () => void }) {
  const [period, setPeriod] = useState(item?.period ?? "");
  const [institution, setInstitution] = useState(item?.institution ?? "");
  const [program, setProgram] = useState(item?.program ?? "");
  const [location, setLocation] = useState(item?.location ?? "");
  const { save, saving, error } = useSavingForm("education_items", item, close);

  return (
    <FormShell
      saving={saving}
      error={error}
      onCancel={close}
      onSubmit={(e) => {
        e.preventDefault();
        save({ period, institution, program, location });
      }}
    >
      <Field label="Period (e.g. 2022 — PRESENT)"><TextInput required value={period} onChange={(e) => setPeriod(e.target.value)} /></Field>
      <Field label="Institution"><TextInput required value={institution} onChange={(e) => setInstitution(e.target.value)} /></Field>
      <Field label="Program"><TextInput required value={program} onChange={(e) => setProgram(e.target.value)} /></Field>
      <Field label="Location"><TextInput required value={location} onChange={(e) => setLocation(e.target.value)} /></Field>
    </FormShell>
  );
}

// ---------------------------------------------------------- Learning
interface LearningRow extends ListEditorItem {
  name: string;
  stage: string;
}

export function LearningEditor({ items }: { items: LearningRow[] }) {
  return (
    <ListEditor
      table="learning_items"
      items={items}
      title="Currently Learning"
      renderRow={(l) => (
        <div>
          <p className="text-sm text-zinc-100">{l.name}</p>
          <p className="text-xs text-zinc-500">{l.stage}</p>
        </div>
      )}
      renderForm={(item, close) => <LearningForm item={item} close={close} />}
    />
  );
}

function LearningForm({ item, close }: { item: LearningRow | null; close: () => void }) {
  const [name, setName] = useState(item?.name ?? "");
  const [stage, setStage] = useState(item?.stage ?? "LEARNING");
  const { save, saving, error } = useSavingForm("learning_items", item, close);

  return (
    <FormShell
      saving={saving}
      error={error}
      onCancel={close}
      onSubmit={(e) => {
        e.preventDefault();
        save({ name, stage });
      }}
    >
      <Field label="Name"><TextInput required value={name} onChange={(e) => setName(e.target.value)} /></Field>
      <Field label="Stage">
        <Select value={stage} onChange={(e) => setStage(e.target.value)}>
          {["EXPLORING", "LEARNING", "BUILDING"].map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </Select>
      </Field>
    </FormShell>
  );
}

// ---------------------------------------------------------- Contributions (Professional Profile)
interface ContributionRow extends ListEditorItem {
  title: string;
  description: string;
}

export function ContributionsEditor({ items }: { items: ContributionRow[] }) {
  return (
    <ListEditor
      table="contribution_items"
      items={items}
      title="Professional Profile — What I Can Contribute"
      renderRow={(c) => (
        <div>
          <p className="text-sm text-zinc-100">{c.title}</p>
          <p className="text-xs text-zinc-500">{c.description}</p>
        </div>
      )}
      renderForm={(item, close) => <ContributionForm item={item} close={close} />}
    />
  );
}

function ContributionForm({ item, close }: { item: ContributionRow | null; close: () => void }) {
  const [title, setTitle] = useState(item?.title ?? "");
  const [description, setDescription] = useState(item?.description ?? "");
  const { save, saving, error } = useSavingForm("contribution_items", item, close);

  return (
    <FormShell
      saving={saving}
      error={error}
      onCancel={close}
      onSubmit={(e) => {
        e.preventDefault();
        save({ title, description });
      }}
    >
      <Field label="Title"><TextInput required value={title} onChange={(e) => setTitle(e.target.value)} /></Field>
      <Field label="Description"><TextArea required rows={2} value={description} onChange={(e) => setDescription(e.target.value)} /></Field>
    </FormShell>
  );
}

// ---------------------------------------------------------- Social links
interface SocialRow extends ListEditorItem {
  key: string;
  label: string;
  tagline: string;
  handle: string | null;
  url: string;
  cta: string;
}

export function SocialLinksEditor({ items }: { items: SocialRow[] }) {
  return (
    <ListEditor
      table="social_links"
      items={items}
      title="Social Links"
      renderRow={(s) => (
        <div>
          <p className="text-sm text-zinc-100">{s.label}</p>
          <p className="text-xs text-zinc-500">{s.url}</p>
        </div>
      )}
      renderForm={(item, close) => <SocialForm item={item} close={close} />}
    />
  );
}

function SocialForm({ item, close }: { item: SocialRow | null; close: () => void }) {
  const [key, setKey] = useState(item?.key ?? "");
  const [label, setLabel] = useState(item?.label ?? "");
  const [tagline, setTagline] = useState(item?.tagline ?? "");
  const [handle, setHandle] = useState(item?.handle ?? "");
  const [url, setUrl] = useState(item?.url ?? "");
  const [cta, setCta] = useState(item?.cta ?? "");
  const { save, saving, error } = useSavingForm("social_links", item, close);

  return (
    <FormShell
      saving={saving}
      error={error}
      onCancel={close}
      onSubmit={(e) => {
        e.preventDefault();
        save({ key, label, tagline, handle, url, cta });
      }}
    >
      <Field label="Key (unique, e.g. github)"><TextInput required value={key} onChange={(e) => setKey(e.target.value)} /></Field>
      <Field label="Label"><TextInput required value={label} onChange={(e) => setLabel(e.target.value)} /></Field>
      <Field label="Tagline"><TextInput required value={tagline} onChange={(e) => setTagline(e.target.value)} /></Field>
      <Field label="Handle"><TextInput value={handle ?? ""} onChange={(e) => setHandle(e.target.value)} /></Field>
      <Field label="URL"><TextInput required value={url} onChange={(e) => setUrl(e.target.value)} /></Field>
      <Field label="Button text"><TextInput required value={cta} onChange={(e) => setCta(e.target.value)} /></Field>
    </FormShell>
  );
}

// ---------------------------------------------------------- Media library
interface MediaRow extends ListEditorItem {
  cloudinary_public_id: string;
  url: string;
  title: string | null;
  caption: string | null;
  alt_text: string | null;
  category: string | null;
}

export function MediaLibraryEditor({ items }: { items: MediaRow[] }) {
  return (
    <ListEditor
      table="media_assets"
      items={items}
      title="Media Library"
      emptyLabel="No uploads yet. Add one to browse it here."
      renderRow={(m) => (
        <div className="flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={m.url} alt="" className="h-10 w-10 object-cover border border-zinc-800" />
          <div>
            <p className="text-sm text-zinc-100">{m.title || m.cloudinary_public_id}</p>
            <p className="text-xs text-zinc-500">{m.category}</p>
          </div>
        </div>
      )}
      renderForm={(item, close) => <MediaForm item={item} close={close} />}
    />
  );
}

function MediaForm({ item, close }: { item: MediaRow | null; close: () => void }) {
  const [title, setTitle] = useState(item?.title ?? "");
  const [caption, setCaption] = useState(item?.caption ?? "");
  const [altText, setAltText] = useState(item?.alt_text ?? "");
  const [category, setCategory] = useState(item?.category ?? "");
  const [image, setImage] = useState<UploadedImage | null>(
    item?.url ? { url: item.url, publicId: item.cloudinary_public_id } : null
  );
  const { save, saving, error } = useSavingForm("media_assets", item, close);

  return (
    <FormShell
      saving={saving}
      error={error}
      onCancel={close}
      onSubmit={(e) => {
        e.preventDefault();
        if (!image) return;
        save({
          title,
          caption,
          alt_text: altText,
          category,
          url: image.url,
          cloudinary_public_id: image.publicId,
        });
      }}
    >
      <ImageUploader label="Image" value={image} onChange={setImage} />
      <Field label="Title"><TextInput value={title} onChange={(e) => setTitle(e.target.value)} /></Field>
      <Field label="Caption"><TextInput value={caption ?? ""} onChange={(e) => setCaption(e.target.value)} /></Field>
      <Field label="Alt text"><TextInput value={altText ?? ""} onChange={(e) => setAltText(e.target.value)} /></Field>
      <Field label="Category"><TextInput value={category ?? ""} onChange={(e) => setCategory(e.target.value)} /></Field>
    </FormShell>
  );
}
interface SkillRow extends ListEditorItem {
  category_key: string;
  tab: string;
  title: string;
  groups: unknown;
}

export function SkillsEditor({ items }: { items: SkillRow[] }) {
  return (
    <ListEditor
      table="skill_categories"
      items={items}
      title="Skills — Capability Matrix"
      renderRow={(s) => (
        <div>
          <p className="text-sm text-zinc-100">{s.title}</p>
          <p className="text-xs text-zinc-500">Tab: {s.tab}</p>
        </div>
      )}
      renderForm={(item, close) => <SkillForm item={item} close={close} />}
    />
  );
}

function SkillForm({ item, close }: { item: SkillRow | null; close: () => void }) {
  const [categoryKey, setCategoryKey] = useState(item?.category_key ?? "");
  const [tab, setTab] = useState(item?.tab ?? "");
  const [title, setTitle] = useState(item?.title ?? "");
  const [groupsJson, setGroupsJson] = useState(JSON.stringify(item?.groups ?? [], null, 2));
  const { save, saving, error: saveError } = useSavingForm("skill_categories", item, close);
  const [jsonError, setJsonError] = useState("");

  return (
    <FormShell
      saving={saving}
      error={jsonError || saveError}
      onCancel={close}
      onSubmit={(e) => {
        e.preventDefault();
        try {
          const groups = JSON.parse(groupsJson);
          setJsonError("");
          save({ category_key: categoryKey, tab, title, groups });
        } catch {
          setJsonError("Groups must be valid JSON.");
        }
      }}
    >
      <Field label="Category key (unique, e.g. software)"><TextInput required value={categoryKey} onChange={(e) => setCategoryKey(e.target.value)} /></Field>
      <Field label="Tab label"><TextInput required value={tab} onChange={(e) => setTab(e.target.value)} /></Field>
      <Field label="Title"><TextInput required value={title} onChange={(e) => setTitle(e.target.value)} /></Field>
      <Field label='Groups (JSON — [{"label","items":[{"name","level"}]}])'>
        <TextArea
          required
          rows={10}
          className="font-mono text-xs"
          value={groupsJson}
          onChange={(e) => setGroupsJson(e.target.value)}
        />
      </Field>
    </FormShell>
  );
}
