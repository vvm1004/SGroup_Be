import express from 'express';
import userRoutes from '../users/userRoutes.js';
import authRoutes from '../auth/authRoutes.js';

const router = express.Router();

router.use('/users', userRoutes);
router.use('/auth', authRoutes);


export default router;