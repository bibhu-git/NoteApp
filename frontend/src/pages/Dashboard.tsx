/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../api/api";
import NoteCard from "../components/NoteCard";

export default function Dashboard() {
  const { user, logout } = useContext(AuthContext);
  const [notes, setNotes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const fetchNotes = async () => {
    setLoading(true);
    try {
      const res = await api.get("/notes");
      setNotes(res.data.notes || []);
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to load notes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleCreateNote = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post("/notes", { title, content });
      setNotes((p) => [res.data.note, ...p]);
      setTitle("");
      setContent("");
      setIsModalOpen(false);
    } catch (err: any) {
      alert(err?.response?.data?.message || "Failed to create note");
    }
  };

  const deleteNote = async (id: string) => {
    if (!confirm("Delete this note?")) return;
    await api.delete(`/notes/${id}`);
    setNotes((p) => p.filter((n) => n._id !== id));
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <div className="flex items-center justify-between px-4 py-3 border-b">
        <div className="flex items-center gap-2">
          <img src="/assets/logo2.png" alt="logo" className="h-6" />
          <span className="font-semibold">Dashboard</span>
        </div>
        <button
          onClick={logout}
          className="text-sm font-semibold text-blue-600 underline hover:text-blue-800"
        >
          Sign Out
        </button>
      </div>

      <div className="p-4 max-w-md mx-auto">
        {/* Welcome Card */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6 text-center">
          <h3 className="font-semibold text-lg">Welcome, {user?.name} !</h3>
          <p className="text-sm text-gray-500">
            Email: {user?.email?.replace(/(.{2})(.*)(@.*)/, "$1xxxxx$3")}
          </p>
        </div>

        {/* Create Note Button */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="w-full bg-blue-600 text-white py-3 rounded-md text-sm font-medium mb-6 hover:bg-blue-700 transition"
        >
          Create Note
        </button>

        {/* Notes Section */}
        <div>
          <h2 className="text-base font-semibold mb-3">Notes</h2>

          {loading ? (
            <div className="text-gray-500">Loading notes...</div>
          ) : error ? (
            <div className="text-red-600">{error}</div>
          ) : notes.length === 0 ? (
            <div className="text-gray-500">
              No notes yet. Create your first note!
            </div>
          ) : (
            <div className="space-y-3">
              {notes.map((n) => (
                <NoteCard key={n._id} note={n} onDelete={deleteNote} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
            <h2 className="text-lg font-semibold mb-4">Create a New Note</h2>
            <form onSubmit={handleCreateNote} className="space-y-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Description
                </label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                  rows={4}
                  required
                />
              </div>
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-sm rounded-md border hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
