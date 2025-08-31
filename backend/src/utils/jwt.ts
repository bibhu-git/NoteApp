import jwt, { SignOptions } from "jsonwebtoken";
import { env } from "../config/env.js";

export type JwtPayload = { uid: string };

export function signJwt(payload: JwtPayload): string {
  return jwt.sign(payload, env.JWT_SECRET as string, {
    expiresIn: env.JWT_EXPIRES_IN as string,
  } as SignOptions);
}

export function verifyJwt(token: string): JwtPayload {
  return jwt.verify(token, env.JWT_SECRET as string) as JwtPayload;
}
