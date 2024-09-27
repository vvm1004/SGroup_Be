// controllers/roleController.js
import RoleService from './roleService.js';

class RoleController {
    static async createRole(req, res) {
        try {
            console.log(req.body);
            const roleId = await RoleService.createRole(req.body);
            res.status(201).json({ message: 'Role created', id: roleId });
        } catch (error) {
            if (error.message === 'Role Name already exists') {
                res.status(400).json({ message: 'Role Name already exists' });
            } else {
                res.status(500).json({ message: error.message });
            }
        }
    }

    static async getAllRoles(req, res) {
        try {
            const roles = await RoleService.getAllRoles();
            res.status(200).json(roles);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    static async getRoleById(req, res) {
        try {
            const { id } = req.params;
            const role = await RoleService.getRoleById(id);
            res.status(200).json(role);
        } catch (error) {
            if (error.message === 'Role not found') {
                res.status(404).json({ message: 'Role not found' });
            } else {
                res.status(500).json({ message: error.message });
            }
        }
    }

    static async updateRole(req, res) {
        try {
            const { id } = req.params;
            await RoleService.updateRole(id, req.body);
            res.status(200).json({ message: 'Role updated successfully' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    static async deleteRole(req, res) {
        try {
            const { id } = req.params;
            await RoleService.deleteRole(id);
            res.status(200).json({ message: 'Role deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    static async getUsersByRole(req, res) {
        try {
            const { id } = req.params;
            const users = await RoleService.getUsersByRole(id);
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

export default RoleController;
