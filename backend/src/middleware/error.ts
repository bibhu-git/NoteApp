import { NextFunction, Request, Response } from 'express';

export function notFound(req: Request, res: Response) {
  res.status(404).json({ success: false, error: 'Route not found' });
}

export function errorHandler(err: any, req: Request, res: Response, _next: NextFunction) {
  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';
  const details = err.details || undefined;
  if (process.env.NODE_ENV !== 'production') {
    console.error(err);
  }
  res.status(status).json({ success: false, error: message, details });
}
