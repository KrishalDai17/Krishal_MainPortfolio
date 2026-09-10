"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Trash2, CheckCircle, MailOpen, Phone, Calendar, User } from "lucide-react";
import { markMessageRead, deleteContactMessage } from "@/lib/cms/actions";
import { ContactMessage } from "@/lib/cms/content";

export default function ContactMessagesInbox({
  messages,
}: {
  messages: ContactMessage[];
}) {
  const router = useRouter();
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [processingId, setProcessingId] = useState<string | null>(null);

  const handleToggleRead = async (id: string, currentRead: boolean) => {
    setProcessingId(id);
    try {
      await markMessageRead(id, !currentRead);
      if (selectedMessage && selectedMessage.id === id) {
        setSelectedMessage({ ...selectedMessage, read: !currentRead });
      }
      router.refresh();
    } catch (e) {
      alert("Failed to update status.");
    } finally {
      setProcessingId(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this message? This cannot be undone.")) {
      return;
    }
    setProcessingId(id);
    try {
      await deleteContactMessage(id);
      if (selectedMessage && selectedMessage.id === id) {
        setSelectedMessage(null);
      }
      router.refresh();
    } catch (e) {
      alert("Failed to delete message.");
    } finally {
      setProcessingId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-zinc-100 flex items-center gap-2">
            <Mail size={20} className="text-blue-400" /> Contact Inquiries Inbox
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Messages transmitted directly from the public website contact form.
          </p>
        </div>
        <span className="text-xs font-mono text-zinc-400 border border-zinc-800 px-2.5 py-1 rounded bg-zinc-900">
          {messages.length} Total ({messages.filter((m) => !m.read).length} Unread)
        </span>
      </div>

      {messages.length === 0 ? (
        <div className="border border-zinc-800 rounded-lg p-12 text-center text-zinc-500 font-mono text-xs bg-zinc-900/30">
          No inquiries received yet. Submissions from the public contact form will appear here.
        </div>
      ) : (
        <div className="space-y-3">
          {messages.map((m) => (
            <div
              key={m.id}
              onClick={() => setSelectedMessage(m)}
              className={`border rounded-lg p-4 cursor-pointer transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                m.read
                  ? "border-zinc-800 bg-zinc-900/20 hover:border-zinc-700"
                  : "border-blue-500/50 bg-blue-950/20 hover:border-blue-500"
              }`}
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  {!m.read && (
                    <span className="h-2 w-2 rounded-full bg-blue-500 shrink-0" />
                  )}
                  <span className="text-sm font-semibold text-zinc-100">{m.name}</span>
                  <span className="text-xs text-zinc-500 font-mono">({m.email})</span>
                </div>
                <p className="text-xs font-medium text-zinc-300 line-clamp-1">
                  {m.subject || "Website Inquiry"}
                </p>
                <p className="text-xs text-zinc-500 line-clamp-1 font-mono">{m.message}</p>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                <span className="text-[11px] text-zinc-500 font-mono mr-2">
                  {new Date(m.created_at).toLocaleDateString()}
                </span>
                <button
                  type="button"
                  disabled={processingId === m.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleToggleRead(m.id, m.read);
                  }}
                  className="p-1.5 border border-zinc-800 rounded hover:border-zinc-600 text-zinc-400 hover:text-zinc-200"
                  title={m.read ? "Mark as Unread" : "Mark as Read"}
                >
                  {m.read ? <Mail size={13} /> : <MailOpen size={13} className="text-blue-400" />}
                </button>
                <button
                  type="button"
                  disabled={processingId === m.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(m.id);
                  }}
                  className="p-1.5 border border-zinc-800 rounded hover:border-red-500/50 text-zinc-400 hover:text-red-400"
                  title="Delete Message"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Message Details Modal */}
      {selectedMessage && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedMessage(null)}
        >
          <div
            className="bg-zinc-900 border border-zinc-700 rounded-lg p-6 max-w-lg w-full space-y-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <h2 className="text-base font-bold text-zinc-100">Inquiry Details</h2>
              <span
                className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                  selectedMessage.read
                    ? "bg-zinc-800 text-zinc-400"
                    : "bg-blue-500/20 text-blue-400"
                }`}
              >
                {selectedMessage.read ? "READ" : "UNREAD"}
              </span>
            </div>

            <div className="space-y-2 text-xs text-zinc-300">
              <div className="flex items-center gap-2">
                <User size={13} className="text-zinc-500" />
                <span className="font-semibold">{selectedMessage.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={13} className="text-zinc-500" />
                <a
                  href={`mailto:${selectedMessage.email}`}
                  className="text-blue-400 hover:underline"
                >
                  {selectedMessage.email}
                </a>
              </div>
              {selectedMessage.phone && (
                <div className="flex items-center gap-2">
                  <Phone size={13} className="text-zinc-500" />
                  <a
                    href={`tel:${selectedMessage.phone}`}
                    className="text-blue-400 hover:underline"
                  >
                    {selectedMessage.phone}
                  </a>
                </div>
              )}
              <div className="flex items-center gap-2 text-zinc-500 font-mono">
                <Calendar size={13} />
                <span>{new Date(selectedMessage.created_at).toLocaleString()}</span>
              </div>
            </div>

            <div className="border-t border-zinc-800 pt-3">
              <span className="text-[10px] font-mono text-zinc-500 block mb-1">
                SUBJECT: {selectedMessage.subject || "Website Inquiry"}
              </span>
              <div className="bg-zinc-950 p-4 rounded border border-zinc-800 text-sm text-zinc-200 whitespace-pre-wrap leading-relaxed">
                {selectedMessage.message}
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() =>
                    handleToggleRead(selectedMessage.id, selectedMessage.read)
                  }
                  className="px-3 py-1.5 border border-zinc-700 rounded text-xs text-zinc-300 hover:bg-zinc-800"
                >
                  {selectedMessage.read ? "Mark Unread" : "Mark Read"}
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(selectedMessage.id)}
                  className="px-3 py-1.5 border border-red-500/40 rounded text-xs text-red-400 hover:bg-red-500/10"
                >
                  Delete
                </button>
              </div>

              <button
                type="button"
                onClick={() => setSelectedMessage(null)}
                className="px-4 py-1.5 bg-zinc-800 hover:bg-zinc-700 rounded text-xs text-zinc-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
