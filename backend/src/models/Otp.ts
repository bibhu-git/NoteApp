import { Schema, model } from "mongoose";

export interface IOtp {
  email: string;
  codeHash: string;
  expiresAt: Date;
}

const otpSchema = new Schema<IOtp>(
  {
    email: { type: String, required: true, lowercase: true, index: true },
    codeHash: { type: String, required: true },
    expiresAt: { type: Date, required: true },
  },
  { timestamps: true }
);

// ✅ TTL index to auto-delete documents after `expiresAt`
otpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export const Otp = model<IOtp>("Otp", otpSchema);
