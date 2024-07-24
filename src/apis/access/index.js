import express from 'express';
import userRoutes from '../users/userRoutes.js';
import authRoutes from '../auth/authRoutes.js';
import pollRoutes from '../pool/poolRoutes.js';

const router = express.Router();

router.use('/users', userRoutes);
router.use('/auth', authRoutes);
router.use('/', pollRoutes);



export default router;