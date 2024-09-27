// routes/roleRoutes.js
import { Router } from 'express';
import RoleController from './roleController.js'

const router = Router();

// CRUD routes for roles
router.post('/', RoleController.createRole);
router.get('/', RoleController.getAllRoles);
router.get('/:id', RoleController.getRoleById);
router.put('/:id', RoleController.updateRole);
router.delete('/:id', RoleController.deleteRole);

// Get users by role
router.get('/:id/users', RoleController.getUsersByRole);

export default router;
