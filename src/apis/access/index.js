import express from 'express';
import userRoutes from '../users/userRoutes.js';
import authRoutes from '../auth/authRoutes.js';
import pollRoutes from '../pool/poolRoutes.js';
import roleRoutes from '../role/roleRoutes.js';

const router = express.Router();

router.use('/users', userRoutes);
router.use('/auth', authRoutes);
router.use('/roles', roleRoutes);
router.use('/', pollRoutes);



export default router;