import { z } from 'zod';

export const requestOtpSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1).max(60).optional(),
});

export const verifyOtpSchema = z.object({
  email: z.string().email(),
  otp: z.string().regex(/^\d{6}$/),
  name: z.string().min(1).max(60).optional(),
});

export const googleLoginSchema = z.object({
  idToken: z.string().min(10),
});
