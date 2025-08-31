import crypto from 'crypto';
import { Request, Response } from 'express';
import { User } from '../models/User.js';
import { Otp } from '../models/Otp.js';
import { sendOtpMail } from '../utils/mailer.js';
import { signJwt } from '../utils/jwt.js';
import { requestOtpSchema, verifyOtpSchema, googleLoginSchema } from '../validators/authSchemas.js';
import { OAuth2Client } from 'google-auth-library';
import { env } from '../config/env.js';

const googleClient = new OAuth2Client(env.GOOGLE_CLIENT_ID);

function hash(text: string) {
  return crypto.createHash('sha256').update(text).digest('hex');
}

function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function requestOtp(req: Request, res: Response) {
  const parsed = requestOtpSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ success: false, error: 'Invalid input', details: parsed.error.flatten() });

  const { email } = parsed.data;
  const code = generateOtp();
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

  await Otp.deleteMany({ email }); // remove previous active codes
  await Otp.create({ email, codeHash: hash(code), expiresAt });
  await sendOtpMail(email, code);

  return res.json({ success: true, message: 'OTP sent to email' });
}

export async function verifyOtp(req: Request, res: Response) {
  const parsed = verifyOtpSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ success: false, error: 'Invalid input', details: parsed.error.flatten() });

  const { name, email, otp } = parsed.data;
  const record = await Otp.findOne({ email }).sort({ expiresAt: -1 });
  if (!record) return res.status(400).json({ success: false, error: 'OTP not found. Please request a new code.' });
  if (record.expiresAt < new Date()) return res.status(400).json({ success: false, error: 'OTP expired. Please request a new code.' });
  if (record.codeHash !== hash(otp)) return res.status(400).json({ success: false, error: 'Incorrect OTP.' });

  // upsert user
  const user = await User.findOneAndUpdate(
    { email },
    { $setOnInsert: { provider: 'email' }, $set: { emailVerified: true, name: name ?? undefined } },
    { upsert: true, new: true }
  );

  await Otp.deleteMany({ email }); // cleanup any codes

  const token = signJwt({ uid: user._id.toString() });
  return res.json({ success: true, token, user: { id: user._id, name: user.name, email: user.email, provider: user.provider } });
}

export async function googleAuth(req: Request, res: Response) {
  const parsed = googleLoginSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ success: false, error: 'Invalid input', details: parsed.error.flatten() });

  const { idToken } = parsed.data;
  const ticket = await googleClient.verifyIdToken({ idToken, audience: env.GOOGLE_CLIENT_ID });
  const payload = ticket.getPayload();
  if (!payload || !payload.email) return res.status(400).json({ success: false, error: 'Google token verification failed' });

  const email = payload.email.toLowerCase();
  const name = payload.name;

  const user = await User.findOneAndUpdate(
    { email },
    { $setOnInsert: { provider: 'google' }, $set: { emailVerified: true, name } },
    { upsert: true, new: true }
  );

  const token = signJwt({ uid: user._id.toString() });
  return res.json({ success: true, token, user: { id: user._id, name: user.name, email: user.email, provider: user.provider } });
}

export async function me(req: Request, res: Response) {
  // populated by requireAuth
  const userId: string | undefined = (req as any).userId;
  if (!userId) return res.status(401).json({ success: false, error: 'Unauthorized' });
  const user = await User.findById(userId).lean();
  if (!user) return res.status(404).json({ success: false, error: 'User not found' });
  return res.json({ success: true, user: { id: user._id, name: user.name, email: user.email, provider: user.provider } });
}
