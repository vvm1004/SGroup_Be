import express from 'express';
import userController from './userController.js';
import { verifyToken } from '../../middleware/index.js';

const router = express.Router();

router.get('/', (req, res) => userController.getAllUsers(req, res));
router.get('/:id', (req, res) => userController.getUserById(req, res));
router.post('/', verifyToken, (req, res) => userController.createUser(req, res));
router.put('/:id', verifyToken, (req, res) => userController.updateUser(req, res));
router.delete('/:id', verifyToken, (req, res) => userController.deleteUser(req, res));

export default router;