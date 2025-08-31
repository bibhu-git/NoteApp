import nodemailer from 'nodemailer';
import { env } from '../config/env.js';
import { logger } from './logger.js';

export const transporter = nodemailer.createTransport({
  host: env.SMTP_HOST,
  port: env.SMTP_PORT,
  secure: false, // set true if using port 465
  auth: { user: env.SMTP_USER, pass: env.SMTP_PASS },
});

export async function sendOtpMail(to: string, code: string) {
  const info = await transporter.sendMail({
    from: env.MAIL_FROM,
    to,
    subject: 'Your OTP Code for Verification',
    text: `
Dear User,

Your One-Time Password (OTP) is: ${code}

This code is valid for 10 minutes. 
Please do not share this code with anyone for security reasons.

If you did not request this code, you can safely ignore this email.

Thank you,
${env.APP_NAME || 'Support Team'}
    `,
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px;">
        <h2 style="color:#2c3e50;">Email Verification</h2>
        <p>Dear User,</p>
        <p>Your One-Time Password (OTP) is:</p>
        <p style="font-size: 20px; font-weight: bold; color: #2c3e50;">${code}</p>
        <p>This code will expire in <b>10 minutes</b>.</p>
        <p style="color: #b30000;">Please do not share this code with anyone for security reasons.</p>
        <hr style="margin:20px 0;">
        <p>If you did not request this code, please ignore this email.</p>
        <p>Thank you,<br/>${env.APP_NAME || 'Support Team'}</p>
      </div>
    `,
  });

  logger.info('OTP mail sent', info.messageId);
}
