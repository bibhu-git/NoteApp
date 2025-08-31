import { Schema, model, Types } from 'mongoose';

export interface INote {
  _id: string;
  user: Types.ObjectId;
  title: string;
  content?: string;
  createdAt: Date;
  updatedAt: Date;
}

const noteSchema = new Schema<INote>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    title: { type: String, required: true, trim: true },
    content: { type: String },
  },
  { timestamps: true }
);

export const Note = model<INote>('Note', noteSchema);
