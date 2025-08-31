import 'dotenv/config';

const required = (name: string, value: string | undefined) => {
  if (!value) throw new Error(`Missing env var: ${name}`);
  return value;
};

export const env = {
  NODE_ENV: process.env.NODE_ENV ?? 'development',
  PORT: Number(process.env.PORT ?? 8080),
  CLIENT_ORIGIN: required('CLIENT_ORIGIN', process.env.CLIENT_ORIGIN),
  MONGODB_URI: required('MONGODB_URI', process.env.MONGODB_URI),
  JWT_SECRET: required('JWT_SECRET', process.env.JWT_SECRET),
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN ?? '7d',
  SMTP_HOST: required('SMTP_HOST', process.env.SMTP_HOST),
  SMTP_PORT: Number(required('SMTP_PORT', process.env.SMTP_PORT)),
  SMTP_USER: required('SMTP_USER', process.env.SMTP_USER),
  SMTP_PASS: required('SMTP_PASS', process.env.SMTP_PASS),
  MAIL_FROM: required('MAIL_FROM', process.env.MAIL_FROM),
  GOOGLE_CLIENT_ID: required('GOOGLE_CLIENT_ID', process.env.GOOGLE_CLIENT_ID),
  APP_NAME: required("APP_NAME", process.env.APP_NAME),
};
