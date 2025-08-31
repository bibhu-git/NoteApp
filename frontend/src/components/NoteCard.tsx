import React from "react";
import type { Note } from "../types";

export default function NoteCard({ note, onDelete }: { note: Note; onDelete: (id: string) => void }) {
  return (
    <div className="card p-4 rounded-xl">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold">{note.title}</h3>
          <p className="text-sm text-gray-600 mt-2">{note.content}</p>
        </div>
        <div>
          <button
            onClick={() => onDelete(note._id)}
            className="text-sm px-2 py-1 rounded bg-red-50 border border-red-200 text-red-600"
          >
            Delete
          </button>
        </div>
      </div>
      <div className="text-xs text-gray-400 mt-2">{note.createdAt ? new Date(note.createdAt).toLocaleString() : ""}</div>
    </div>
  );
}
