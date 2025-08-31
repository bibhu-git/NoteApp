import { Response } from 'express';
import { Note } from '../models/Note.js';
import { AuthRequest } from '../middleware/auth.js';

export async function listNotes(req: AuthRequest, res: Response) {
  const notes = await Note.find({ user: req.userId }).sort({ createdAt: -1 }).lean();
  return res.json({ success: true, notes });
}

export async function createNote(req: AuthRequest, res: Response) {
  const { title, content } = req.body as { title?: string; content?: string };
  if (!title || !title.trim()) return res.status(400).json({ success: false, error: 'Title is required' });
  const note = await Note.create({ user: req.userId, title: title.trim(), content });
  return res.status(201).json({ success: true, note });
}

export async function deleteNote(req: AuthRequest, res: Response) {
  const { id } = req.params;
  const note = await Note.findOneAndDelete({ _id: id, user: req.userId });
  if (!note) return res.status(404).json({ success: false, error: 'Note not found' });
  return res.json({ success: true, message: 'Note deleted' });
}
