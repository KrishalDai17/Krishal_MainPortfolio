"use client";

import { useState, useTransition } from "react";
import { ChevronUp, ChevronDown, Eye, EyeOff, Trash2, Plus, X } from "lucide-react";
import { deleteRecord, reorderRecords, togglePublished } from "@/lib/cms/actions";
import { PrimaryButton, GhostButton } from "./fields";

export interface ListEditorItem {
  id: string;
  published?: boolean;
  [key: string]: unknown;
}

export default function ListEditor<T extends ListEditorItem>({
  table,
  items,
  title,
  renderRow,
  renderForm,
  emptyLabel = "No items yet.",
}: {
  table: string;
  items: T[];
  title: string;
  renderRow: (item: T) => React.ReactNode;
  renderForm: (item: T | null, close: () => void) => React.ReactNode;
  emptyLabel?: string;
}) {
  const [editing, setEditing] = useState<T | null | undefined>(undefined); // undefined = closed
  const [order, setOrder] = useState(items.map((i) => i.id));
  const [isPending, startTransition] = useTransition();

  const ordered = order.map((id) => items.find((i) => i.id === id)).filter(Boolean) as T[];

  const move = (id: string, dir: -1 | 1) => {
    const idx = order.indexOf(id);
    const next = [...order];
    const swap = idx + dir;
    if (swap < 0 || swap >= next.length) return;
    [next[idx], next[swap]] = [next[swap], next[idx]];
    setOrder(next);
    startTransition(() => reorderRecords(table, next));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-semibold text-zinc-100">{title}</h1>
        <PrimaryButton onClick={() => setEditing(null)}>
          <Plus size={15} /> Add
        </PrimaryButton>
      </div>

      {ordered.length === 0 && (
        <p className="text-sm text-zinc-500 border border-dashed border-zinc-800 rounded-md p-6 text-center">
          {emptyLabel}
        </p>
      )}

      <ul className="space-y-2">
        {ordered.map((item) => (
          <li
            key={item.id}
            className="flex items-center gap-3 border border-zinc-800 rounded-md px-4 py-3 bg-zinc-900/50"
          >
            <div className="flex flex-col -my-1">
              <button onClick={() => move(item.id, -1)} className="text-zinc-500 hover:text-zinc-200" aria-label="Move up">
                <ChevronUp size={14} />
              </button>
              <button onClick={() => move(item.id, 1)} className="text-zinc-500 hover:text-zinc-200" aria-label="Move down">
                <ChevronDown size={14} />
              </button>
            </div>

            <div className="flex-1 min-w-0">{renderRow(item)}</div>

            <button
              onClick={() =>
                startTransition(() => togglePublished(table, item.id, !(item.published ?? true)))
              }
              className={`p-1.5 rounded ${
                item.published === false ? "text-zinc-600 hover:text-zinc-300" : "text-emerald-400 hover:text-emerald-300"
              }`}
              title={item.published === false ? "Unpublished — click to publish" : "Published — click to unpublish"}
            >
              {item.published === false ? <EyeOff size={15} /> : <Eye size={15} />}
            </button>

            <button
              onClick={() => setEditing(item)}
              className="text-xs font-medium text-blue-400 hover:text-blue-300 px-2"
            >
              Edit
            </button>

            <button
              onClick={() => {
                if (confirm("Delete this item? This cannot be undone.")) {
                  startTransition(() => deleteRecord(table, item.id));
                }
              }}
              className="text-zinc-600 hover:text-red-400 p-1.5"
              aria-label="Delete"
            >
              <Trash2 size={15} />
            </button>
          </li>
        ))}
      </ul>

      {editing !== undefined && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-start md:items-center justify-center p-4 overflow-y-auto">
          <div className="bg-zinc-950 border border-zinc-800 rounded-lg w-full max-w-xl my-8">
            <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800">
              <h2 className="font-medium text-zinc-100">{editing ? "Edit item" : "Add item"}</h2>
              <button onClick={() => setEditing(undefined)} className="text-zinc-500 hover:text-zinc-200">
                <X size={18} />
              </button>
            </div>
            <div className="p-6">{renderForm(editing ?? null, () => setEditing(undefined))}</div>
          </div>
        </div>
      )}

      {isPending && <p className="mt-3 text-xs text-zinc-500">Saving…</p>}
    </div>
  );
}
