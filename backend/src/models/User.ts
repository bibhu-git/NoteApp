import { Schema, model } from 'mongoose';

export interface IUser {
  _id: string;
  name?: string;
  email: string;
  provider: 'email' | 'google';
  emailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    provider: { type: String, enum: ['email', 'google'], required: true },
    emailVerified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const User = model<IUser>('User', userSchema);
