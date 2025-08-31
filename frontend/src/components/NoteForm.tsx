import React, { useState } from "react";

export default function NoteForm({ onCreate }: { onCreate: (data: { title: string; content: string }) => void }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return alert("Please enter a title");
    setLoading(true);
    try {
      await onCreate({ title, content });
      setTitle("");
      setContent("");
    } catch (err) {
      console.error(err);
      alert("Failed to create note");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} className="space-y-2">
      <input
        className="w-full border rounded px-3 py-2"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        className="w-full border rounded px-3 py-2"
        rows={4}
        placeholder="Write your note..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <div>
        <button type="submit" disabled={loading} className="px-4 py-2 bg-brand rounded text-white">
          {loading ? "Saving..." : "Create Note"}
        </button>
      </div>
    </form>
  );
}
