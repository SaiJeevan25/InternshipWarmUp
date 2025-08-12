import express from 'express';
import { registerCompany, getProfile, updateProfile, uploadLogo, uploadBanner } from '../controllers/companyController.js';
import { authenticateJWT } from '../middleware/authMiddleware.js';
const router = express.Router();

router.post('/register', authenticateJWT, registerCompany);
router.get('/profile', authenticateJWT, getProfile);
router.put('/profile', authenticateJWT, updateProfile);
router.post('/upload-logo', authenticateJWT, uploadLogo);
router.post('/upload-banner', authenticateJWT, uploadBanner);

export default router;
