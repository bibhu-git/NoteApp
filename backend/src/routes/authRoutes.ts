import { Router } from 'express';
import { requestOtp, verifyOtp, googleAuth, me } from '../controllers/authController.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

// Email + OTP flow
router.post('/request-otp', requestOtp); // { email, name? }
router.post('/verify-otp', verifyOtp);   // { email, otp, name? }

// Google Sign-In (ID token from front-end)
router.post('/google', googleAuth);      // { idToken }

// Current user info
router.get('/me', requireAuth, me);

export default router;
