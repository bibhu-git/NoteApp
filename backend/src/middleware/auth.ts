import { Request, Response, NextFunction } from 'express';
import { verifyJwt } from '../utils/jwt.js';

export interface AuthRequest extends Request {
  userId?: string;
}

export function requireAuth(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const header = req.headers.authorization || '';
    const token = header.startsWith('Bearer ') ? header.slice(7) : undefined;
    if (!token) return res.status(401).json({ success: false, error: 'Missing token' });

    const payload = verifyJwt(token);
    req.userId = payload.uid;
    next();
  } catch (e) {
    return res.status(401).json({ success: false, error: 'Invalid or expired token' });
  }
}
