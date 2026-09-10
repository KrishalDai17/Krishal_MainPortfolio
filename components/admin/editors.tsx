"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ListEditor, { ListEditorItem } from "./ListEditor";
import ImageUploader, { UploadedImage } from "./ImageUploader";
import {
  Field,
  TextInput,
  TextArea,
  Select,
  TagListInput,
  PrimaryButton,
  GhostButton,
} from "./fields";
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
      if (item && !String(item.id).startsWith("mock-")) {
        await updateRecord(table, item.id, record);
      } else {
        await createRecord(table, record);
      }
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
          {saving ? "Saving…" : "Save Record"}
        </PrimaryButton>
        <GhostButton type="button" onClick={onCancel}>
          Cancel
        </GhostButton>
      </div>
    </form>
  );
}

// ---------------------------------------------------------- Projects
export interface ProjectRow extends ListEditorItem {
  name: string;
  slug?: string;
  category?: string;
  status?: string;
  featured?: boolean;
  short_description?: string;
  description: string;
  overview?: string;
  problem?: string;
  solution?: string;
  features: string[];
  technical_implementation?: string;
  my_contribution?: string;
  challenges?: string;
  challenges_solutions?: string;
  technology: string[];
  github_url: string | null;
  demo_url: string | null;
  cover_image_url: string | null;
  cover_image_public_id: string | null;
  screenshots?: string[];
}

export function ProjectsEditor({ items }: { items: ProjectRow[] }) {
  return (
    <ListEditor
      table="projects"
      items={items}
      title="Projects Showcase & Case Studies"
      renderRow={(p) => (
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs bg-blue-500/20 text-blue-400 px-1.5 py-0.5 rounded font-mono">
              {p.category || "PROJECT"}
            </span>
            <p className="text-sm font-medium text-zinc-100">{p.name}</p>
          </div>
          <p className="text-xs text-zinc-500 mt-1">
            {p.technology?.join(" · ")} {p.slug ? `(/projects/${p.slug})` : ""}
          </p>
        </div>
      )}
      renderForm={(item, close) => <ProjectForm item={item} close={close} />}
    />
  );
}

function ProjectForm({ item, close }: { item: ProjectRow | null; close: () => void }) {
  const [name, setName] = useState(item?.name ?? "");
  const [slug, setSlug] = useState(
    item?.slug ??
      item?.name?.toLowerCase().replace(/[^a-z0-9]+/g, "-") ??
      ""
  );
  const [category, setCategory] = useState(item?.category ?? "WEB");
  const [status, setStatus] = useState(item?.status ?? "COMPLETED");
  const [featured, setFeatured] = useState<boolean>(item?.featured ?? true);
  const [shortDescription, setShortDescription] = useState(
    item?.short_description ?? item?.description ?? ""
  );
  const [description, setDescription] = useState(item?.description ?? "");
  const [overview, setOverview] = useState(item?.overview ?? "");
  const [problem, setProblem] = useState(item?.problem ?? "");
  const [solution, setSolution] = useState(item?.solution ?? "");
  const [features, setFeatures] = useState<string[]>(item?.features ?? []);
  const [technicalImplementation, setTechnicalImplementation] = useState(
    item?.technical_implementation ?? ""
  );
  const [myContribution, setMyContribution] = useState(
    item?.my_contribution ?? ""
  );
  const [challenges, setChallenges] = useState(item?.challenges ?? "");
  const [challengesSolutions, setChallengesSolutions] = useState(
    item?.challenges_solutions ?? ""
  );
  const [technology, setTechnology] = useState<string[]>(item?.technology ?? []);
  const [githubUrl, setGithubUrl] = useState(item?.github_url ?? "");
  const [demoUrl, setDemoUrl] = useState(item?.demo_url ?? "");
  const [cover, setCover] = useState<UploadedImage | null>(
    item?.cover_image_url
      ? { url: item.cover_image_url, publicId: item.cover_image_public_id ?? "" }
      : null
  );
  const [screenshots, setScreenshots] = useState<string[]>(
    item?.screenshots ?? []
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
          slug:
            slug.trim() ||
            name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
          category,
          status,
          featured,
          short_description: shortDescription,
          description,
          overview,
          problem,
          solution,
          features,
          technical_implementation: technicalImplementation,
          my_contribution: myContribution,
          challenges,
          challenges_solutions: challengesSolutions,
          technology,
          github_url: githubUrl || null,
          demo_url: demoUrl || null,
          cover_image_url: cover?.url ?? null,
          cover_image_public_id: cover?.publicId ?? null,
          screenshots,
        });
      }}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Project Name">
          <TextInput required value={name} onChange={(e) => setName(e.target.value)} />
        </Field>
        <Field label="URL Slug (e.g. library-management-system)">
          <TextInput
            required
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder="project-slug"
          />
        </Field>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Field label="Category">
          <Select value={category} onChange={(e) => setCategory(e.target.value)}>
            {["WEB", "MOBILE", "PYTHON", "PHP", "FLASK", "QA", "DATABASE", "OTHER"].map(
              (c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              )
            )}
          </Select>
        </Field>
        <Field label="Status">
          <Select value={status} onChange={(e) => setStatus(e.target.value)}>
            {["COMPLETED", "ACTIVE", "IN PROGRESS"].map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </Select>
        </Field>
        <div className="flex items-center pt-6">
          <label className="flex items-center gap-2 text-xs text-zinc-300">
            <input
              type="checkbox"
              checked={featured}
              onChange={(e) => setFeatured(e.target.checked)}
            />
            Featured on Homepage
          </label>
        </div>
      </div>

      <Field label="Short Description (Card summary)">
        <TextArea
          required
          rows={2}
          value={shortDescription}
          onChange={(e) => setShortDescription(e.target.value)}
        />
      </Field>

      <Field label="Detailed Case Study Overview">
        <TextArea
          rows={3}
          value={overview}
          onChange={(e) => setOverview(e.target.value)}
        />
      </Field>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Problem / Challenge">
          <TextArea
            rows={3}
            value={problem}
            onChange={(e) => setProblem(e.target.value)}
          />
        </Field>
        <Field label="Engineered Solution">
          <TextArea
            rows={3}
            value={solution}
            onChange={(e) => setSolution(e.target.value)}
          />
        </Field>
      </div>

      <Field label="Technologies (comma separated)">
        <TagListInput value={technology} onChange={setTechnology} />
      </Field>

      <Field label="Key Features (comma separated)">
        <TagListInput value={features} onChange={setFeatures} />
      </Field>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Technical Implementation Details">
          <TextArea
            rows={2}
            value={technicalImplementation}
            onChange={(e) => setTechnicalImplementation(e.target.value)}
          />
        </Field>
        <Field label="My Contribution">
          <TextArea
            rows={2}
            value={myContribution}
            onChange={(e) => setMyContribution(e.target.value)}
          />
        </Field>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Challenges Faced">
          <TextArea
            rows={2}
            value={challenges}
            onChange={(e) => setChallenges(e.target.value)}
          />
        </Field>
        <Field label="Solutions Applied">
          <TextArea
            rows={2}
            value={challengesSolutions}
            onChange={(e) => setChallengesSolutions(e.target.value)}
          />
        </Field>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="GitHub Repository URL">
          <TextInput
            value={githubUrl}
            onChange={(e) => setGithubUrl(e.target.value)}
            placeholder="https://github.com/KrishalDai17/repo"
          />
        </Field>
        <Field label="Live Demo URL">
          <TextInput
            value={demoUrl}
            onChange={(e) => setDemoUrl(e.target.value)}
            placeholder="https://demo.example.com"
          />
        </Field>
      </div>

      <ImageUploader label="Project Cover Image" value={cover} onChange={setCover} />

      <Field label="Screenshots URLs (comma separated)">
        <TagListInput value={screenshots} onChange={setScreenshots} />
      </Field>
    </FormShell>
  );
}

// ---------------------------------------------------------- Photography Albums
export interface AlbumRow extends ListEditorItem {
  title: string;
  slug: string;
  category: string;
  description: string | null;
  cover_image_url: string | null;
  cover_image_public_id: string | null;
}

export function PhotographyAlbumsEditor({ items }: { items: AlbumRow[] }) {
  return (
    <ListEditor
      table="photography_albums"
      items={items}
      title="Photography Albums & Collections"
      renderRow={(a) => (
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs bg-pink-500/20 text-pink-400 px-1.5 py-0.5 rounded font-mono">
              {a.category}
            </span>
            <p className="text-sm font-medium text-zinc-100">{a.title}</p>
          </div>
          <p className="text-xs text-zinc-500 mt-1">/photography/{a.slug}</p>
        </div>
      )}
      renderForm={(item, close) => <PhotographyAlbumForm item={item} close={close} />}
    />
  );
}

function PhotographyAlbumForm({
  item,
  close,
}: {
  item: AlbumRow | null;
  close: () => void;
}) {
  const [title, setTitle] = useState(item?.title ?? "");
  const [slug, setSlug] = useState(
    item?.slug ??
      item?.title?.toLowerCase().replace(/[^a-z0-9]+/g, "-") ??
      ""
  );
  const [category, setCategory] = useState(item?.category ?? "STREET");
  const [description, setDescription] = useState(item?.description ?? "");
  const [cover, setCover] = useState<UploadedImage | null>(
    item?.cover_image_url
      ? { url: item.cover_image_url, publicId: item.cover_image_public_id ?? "" }
      : null
  );

  const { save, saving, error } = useSavingForm("photography_albums", item, close);

  return (
    <FormShell
      saving={saving}
      error={error}
      onCancel={close}
      onSubmit={(e) => {
        e.preventDefault();
        save({
          title,
          slug:
            slug.trim() ||
            title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
          category,
          description,
          cover_image_url: cover?.url ?? null,
          cover_image_public_id: cover?.publicId ?? null,
        });
      }}
    >
      <Field label="Album Title">
        <TextInput required value={title} onChange={(e) => setTitle(e.target.value)} />
      </Field>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="URL Slug (e.g. kathmandu-street-photography)">
          <TextInput required value={slug} onChange={(e) => setSlug(e.target.value)} />
        </Field>
        <Field label="Category">
          <Select value={category} onChange={(e) => setCategory(e.target.value)}>
            {["STREET", "PORTRAITS", "EVENTS", "LANDSCAPES", "LIFESTYLE", "PRODUCTS"].map(
              (c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              )
            )}
          </Select>
        </Field>
      </div>
      <Field label="Album Description">
        <TextArea
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Field>
      <ImageUploader label="Album Cover Image" value={cover} onChange={setCover} />
    </FormShell>
  );
}

// ---------------------------------------------------------- Photography Items
export interface PhotoRow extends ListEditorItem {
  title: string;
  category: string;
  album_slug?: string | null;
  description: string | null;
  location?: string | null;
  date_taken?: string | null;
  image_url: string | null;
  image_public_id: string | null;
  alt_text: string | null;
  featured?: boolean;
}

export function PhotographyEditor({ items }: { items: PhotoRow[] }) {
  return (
    <ListEditor
      table="photo_items"
      items={items}
      title="Photographs & Gallery Frames"
      renderRow={(p) => (
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs bg-pink-500/20 text-pink-400 px-1.5 py-0.5 rounded font-mono">
              {p.category}
            </span>
            <p className="text-sm font-medium text-zinc-100">{p.title}</p>
            {p.featured && (
              <span className="text-[10px] bg-amber-500/20 text-amber-400 px-1 rounded">
                FEATURED
              </span>
            )}
          </div>
          <p className="text-xs text-zinc-500 mt-1">
            {p.location ? `${p.location} · ` : ""}
            {p.album_slug ? `Album: ${p.album_slug}` : ""}
          </p>
        </div>
      )}
      renderForm={(item, close) => <PhotoForm item={item} close={close} />}
    />
  );
}

function PhotoForm({ item, close }: { item: PhotoRow | null; close: () => void }) {
  const [title, setTitle] = useState(item?.title ?? "");
  const [category, setCategory] = useState(item?.category ?? "PORTRAITS");
  const [albumSlug, setAlbumSlug] = useState(item?.album_slug ?? "");
  const [description, setDescription] = useState(item?.description ?? "");
  const [location, setLocation] = useState(item?.location ?? "");
  const [dateTaken, setDateTaken] = useState(item?.date_taken ?? "");
  const [featured, setFeatured] = useState<boolean>(item?.featured ?? false);
  const [altText, setAltText] = useState(item?.alt_text ?? "");
  const [image, setImage] = useState<UploadedImage | null>(
    item?.image_url
      ? { url: item.image_url, publicId: item.image_public_id ?? "" }
      : null
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
          album_slug: albumSlug || null,
          description,
          location: location || null,
          date_taken: dateTaken || null,
          featured,
          alt_text: altText,
          image_url: image?.url ?? null,
          image_public_id: image?.publicId ?? null,
        });
      }}
    >
      <Field label="Photo Title (No raw filenames!)">
        <TextInput required value={title} onChange={(e) => setTitle(e.target.value)} />
      </Field>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Field label="Category">
          <Select value={category} onChange={(e) => setCategory(e.target.value)}>
            {["PORTRAITS", "EVENTS", "LANDSCAPES", "PRODUCTS", "STREET", "LIFESTYLE"].map(
              (c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              )
            )}
          </Select>
        </Field>
        <Field label="Album Slug (Optional)">
          <TextInput
            value={albumSlug}
            onChange={(e) => setAlbumSlug(e.target.value)}
            placeholder="e.g. kathmandu-street-photography"
          />
        </Field>
        <div className="flex items-center pt-6">
          <label className="flex items-center gap-2 text-xs text-zinc-300">
            <input
              type="checkbox"
              checked={featured}
              onChange={(e) => setFeatured(e.target.checked)}
            />
            Showcase on Homepage
          </label>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Location (e.g. Bhaktapur Durbar Square)">
          <TextInput value={location} onChange={(e) => setLocation(e.target.value)} />
        </Field>
        <Field label="Date / Year Captured">
          <TextInput value={dateTaken} onChange={(e) => setDateTaken(e.target.value)} />
        </Field>
      </div>

      <Field label="Photo Story / Description">
        <TextArea
          rows={2}
          value={description ?? ""}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Field>

      <ImageUploader label="Upload High-Res Photograph" value={image} onChange={setImage} />
    </FormShell>
  );
}

// ---------------------------------------------------------- QA Projects
export interface QARow extends ListEditorItem {
  title: string;
  project: string;
  testing_type: string;
  tools: string[];
  test_cases: string;
  bug_reports: string;
  api_testing: string;
  database_testing: string;
  result: string;
}

export function QAProjectsEditor({ items }: { items: QARow[] }) {
  return (
    <ListEditor
      table="qa_projects"
      items={items}
      title="QA Reports & Case Studies"
      renderRow={(q) => (
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs bg-lime-500/20 text-lime-400 px-1.5 py-0.5 rounded font-mono">
              {q.testing_type}
            </span>
            <p className="text-sm font-medium text-zinc-100">{q.title}</p>
          </div>
          <p className="text-xs text-zinc-500 mt-1">
            Project: {q.project} · Tools: {q.tools?.join(", ")}
          </p>
        </div>
      )}
      renderForm={(item, close) => <QAProjectForm item={item} close={close} />}
    />
  );
}

function QAProjectForm({ item, close }: { item: QARow | null; close: () => void }) {
  const [title, setTitle] = useState(item?.title ?? "");
  const [project, setProject] = useState(item?.project ?? "");
  const [testingType, setTestingType] = useState(item?.testing_type ?? "Functional Testing");
  const [tools, setTools] = useState<string[]>(item?.tools ?? []);
  const [testCases, setTestCases] = useState(item?.test_cases ?? "");
  const [bugReports, setBugReports] = useState(item?.bug_reports ?? "");
  const [apiTesting, setApiTesting] = useState(item?.api_testing ?? "");
  const [databaseTesting, setDatabaseTesting] = useState(item?.database_testing ?? "");
  const [result, setResult] = useState(item?.result ?? "");

  const { save, saving, error } = useSavingForm("qa_projects", item, close);

  return (
    <FormShell
      saving={saving}
      error={error}
      onCancel={close}
      onSubmit={(e) => {
        e.preventDefault();
        save({
          title,
          project,
          testing_type: testingType,
          tools,
          test_cases: testCases,
          bug_reports: bugReports,
          api_testing: apiTesting,
          database_testing: databaseTesting,
          result,
        });
      }}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Case Study Title">
          <TextInput required value={title} onChange={(e) => setTitle(e.target.value)} />
        </Field>
        <Field label="Associated Project Name">
          <TextInput required value={project} onChange={(e) => setProject(e.target.value)} />
        </Field>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Testing Type">
          <TextInput
            required
            value={testingType}
            onChange={(e) => setTestingType(e.target.value)}
          />
        </Field>
        <Field label="Tools Utilized (comma separated)">
          <TagListInput value={tools} onChange={setTools} />
        </Field>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Test Cases Design & Coverage">
          <TextArea
            rows={2}
            value={testCases}
            onChange={(e) => setTestCases(e.target.value)}
          />
        </Field>
        <Field label="Bug Reports & Defect Tracking">
          <TextArea
            rows={2}
            value={bugReports}
            onChange={(e) => setBugReports(e.target.value)}
          />
        </Field>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="API & Contract Testing">
          <TextArea
            rows={2}
            value={apiTesting}
            onChange={(e) => setApiTesting(e.target.value)}
          />
        </Field>
        <Field label="Database Validation">
          <TextArea
            rows={2}
            value={databaseTesting}
            onChange={(e) => setDatabaseTesting(e.target.value)}
          />
        </Field>
      </div>

      <Field label="Quality Outcome & Result Metrics">
        <TextArea rows={2} value={result} onChange={(e) => setResult(e.target.value)} />
      </Field>
    </FormShell>
  );
}

// ---------------------------------------------------------- Experience
export interface ExperienceRow extends ListEditorItem {
  company: string;
  position: string;
  period: string;
  description: string;
  responsibilities: string[];
  technologies: string[];
}

export function ExperienceEditor({ items }: { items: ExperienceRow[] }) {
  return (
    <ListEditor
      table="experience_items"
      items={items}
      title="Professional Experience Timeline"
      renderRow={(e) => (
        <div>
          <p className="text-sm font-medium text-zinc-100">{e.position}</p>
          <p className="text-xs text-zinc-500">
            {e.company} ({e.period})
          </p>
        </div>
      )}
      renderForm={(item, close) => <ExperienceForm item={item} close={close} />}
    />
  );
}

function ExperienceForm({
  item,
  close,
}: {
  item: ExperienceRow | null;
  close: () => void;
}) {
  const [company, setCompany] = useState(item?.company ?? "");
  const [position, setPosition] = useState(item?.position ?? "");
  const [period, setPeriod] = useState(item?.period ?? "");
  const [description, setDescription] = useState(item?.description ?? "");
  const [responsibilities, setResponsibilities] = useState<string[]>(
    item?.responsibilities ?? []
  );
  const [technologies, setTechnologies] = useState<string[]>(
    item?.technologies ?? []
  );

  const { save, saving, error } = useSavingForm("experience_items", item, close);

  return (
    <FormShell
      saving={saving}
      error={error}
      onCancel={close}
      onSubmit={(e) => {
        e.preventDefault();
        save({
          company,
          position,
          period,
          description,
          responsibilities,
          technologies,
        });
      }}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Company / Organization">
          <TextInput required value={company} onChange={(e) => setCompany(e.target.value)} />
        </Field>
        <Field label="Position / Role">
          <TextInput required value={position} onChange={(e) => setPosition(e.target.value)} />
        </Field>
      </div>

      <Field label="Timeframe (e.g. 2023 — PRESENT)">
        <TextInput required value={period} onChange={(e) => setPeriod(e.target.value)} />
      </Field>

      <Field label="Summary Description">
        <TextArea
          required
          rows={2}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Field>

      <Field label="Key Responsibilities (comma separated)">
        <TagListInput value={responsibilities} onChange={setResponsibilities} />
      </Field>

      <Field label="Technologies Used (comma separated)">
        <TagListInput value={technologies} onChange={setTechnologies} />
      </Field>
    </FormShell>
  );
}

// ---------------------------------------------------------- Education
export interface EducationRow extends ListEditorItem {
  period: string;
  institution: string;
  program: string;
  location: string;
  description?: string;
}

export function EducationEditor({ items }: { items: EducationRow[] }) {
  return (
    <ListEditor
      table="education_items"
      items={items}
      title="Education Timeline"
      renderRow={(e) => (
        <div>
          <p className="text-sm text-zinc-100">{e.institution}</p>
          <p className="text-xs text-zinc-500">
            {e.program} ({e.period})
          </p>
        </div>
      )}
      renderForm={(item, close) => <EducationForm item={item} close={close} />}
    />
  );
}

function EducationForm({
  item,
  close,
}: {
  item: EducationRow | null;
  close: () => void;
}) {
  const [period, setPeriod] = useState(item?.period ?? "");
  const [institution, setInstitution] = useState(item?.institution ?? "");
  const [program, setProgram] = useState(item?.program ?? "");
  const [location, setLocation] = useState(item?.location ?? "");
  const [description, setDescription] = useState(item?.description ?? "");

  const { save, saving, error } = useSavingForm("education_items", item, close);

  return (
    <FormShell
      saving={saving}
      error={error}
      onCancel={close}
      onSubmit={(e) => {
        e.preventDefault();
        save({ period, institution, program, location, description });
      }}
    >
      <Field label="Period (e.g. 2022 — PRESENT)">
        <TextInput required value={period} onChange={(e) => setPeriod(e.target.value)} />
      </Field>
      <Field label="Institution">
        <TextInput required value={institution} onChange={(e) => setInstitution(e.target.value)} />
      </Field>
      <Field label="Program / Degree">
        <TextInput required value={program} onChange={(e) => setProgram(e.target.value)} />
      </Field>
      <Field label="Location">
        <TextInput required value={location} onChange={(e) => setLocation(e.target.value)} />
      </Field>
      <Field label="Description (Optional)">
        <TextArea rows={2} value={description} onChange={(e) => setDescription(e.target.value)} />
      </Field>
    </FormShell>
  );
}

// ---------------------------------------------------------- Social Links
export interface SocialLinkRow extends ListEditorItem {
  key: string;
  label: string;
  tagline: string;
  handle: string | null;
  url: string;
  cta: string;
}

export function SocialLinksEditor({ items }: { items: SocialLinkRow[] }) {
  return (
    <ListEditor
      table="social_links"
      items={items}
      title="Social Links & Channels"
      renderRow={(s) => (
        <div>
          <p className="text-sm text-zinc-100">{s.label}</p>
          <p className="text-xs text-zinc-500">{s.url}</p>
        </div>
      )}
      renderForm={(item, close) => <SocialLinkForm item={item} close={close} />}
    />
  );
}

function SocialLinkForm({
  item,
  close,
}: {
  item: SocialLinkRow | null;
  close: () => void;
}) {
  const [key, setKey] = useState(item?.key ?? "");
  const [label, setLabel] = useState(item?.label ?? "");
  const [tagline, setTagline] = useState(item?.tagline ?? "");
  const [handle, setHandle] = useState(item?.handle ?? "");
  const [url, setUrl] = useState(item?.url ?? "");
  const [cta, setCta] = useState(item?.cta ?? "CONNECT");

  const { save, saving, error } = useSavingForm("social_links", item, close);

  return (
    <FormShell
      saving={saving}
      error={error}
      onCancel={close}
      onSubmit={(e) => {
        e.preventDefault();
        save({ key, label, tagline, handle: handle || null, url, cta });
      }}
    >
      <Field label="Key (e.g. github, linkedin)">
        <TextInput required value={key} onChange={(e) => setKey(e.target.value)} />
      </Field>
      <Field label="Display Label">
        <TextInput required value={label} onChange={(e) => setLabel(e.target.value)} />
      </Field>
      <Field label="URL">
        <TextInput required value={url} onChange={(e) => setUrl(e.target.value)} />
      </Field>
      <Field label="Username / Handle (e.g. @KrishalDai17)">
        <TextInput value={handle} onChange={(e) => setHandle(e.target.value)} />
      </Field>
      <Field label="Tagline">
        <TextInput value={tagline} onChange={(e) => setTagline(e.target.value)} />
      </Field>
      <Field label="CTA Button Text">
        <TextInput value={cta} onChange={(e) => setCta(e.target.value)} />
      </Field>
    </FormShell>
  );
}

// ---------------------------------------------------------- Skills
export interface SkillRow extends ListEditorItem {
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
  const [groupsJson, setGroupsJson] = useState(
    JSON.stringify(item?.groups ?? [], null, 2)
  );
  const { save, saving, error: saveError } = useSavingForm(
    "skill_categories",
    item,
    close
  );
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
      <Field label="Category key (unique, e.g. programming)">
        <TextInput
          required
          value={categoryKey}
          onChange={(e) => setCategoryKey(e.target.value)}
        />
      </Field>
      <Field label="Tab label">
        <TextInput required value={tab} onChange={(e) => setTab(e.target.value)} />
      </Field>
      <Field label="Title">
        <TextInput required value={title} onChange={(e) => setTitle(e.target.value)} />
      </Field>
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

// ---------------------------------------------------------- Profile Contributions
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

// ---------------------------------------------------------- Media Library
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
