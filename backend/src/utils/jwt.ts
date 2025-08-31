import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';

export type JwtPayload = { uid: string };

export function signJwt(payload: JwtPayload) {
  return jwt.sign(payload, env.JWT_SECRET, { expiresIn: env.JWT_EXPIRES_IN });
}

export function verifyJwt(token: string): JwtPayload {
  return jwt.verify(token, env.JWT_SECRET) as JwtPayload;
}
