import express from 'express';
import { register, login, verifyEmail, verifyMobile } from '../controllers/authController.js';
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/verify-email', verifyEmail);
router.post('/verify-mobile', verifyMobile);

export default router;
