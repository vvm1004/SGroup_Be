import RoleModel from '../../models/roleModel.js';

class RoleService {
    async createRole(role) {
        try {
            const { name, description, isActive } = role;
            return await RoleModel.createRole({ name, description, isActive });
        } catch (error) {
            throw new Error('Error in RoleService.createRole: ' + error.message);
        }
    }

    async getAllRoles() {
        try {
            return await RoleModel.getAllRoles();
        } catch (error) {
            throw new Error('Error in RoleService.getAllRoles: ' + error.message);
        }
    }

    async getRoleById(id) {
        try {
            const role = await RoleModel.getRoleById(id);
            if (!role) throw new Error('Role not found');
            return role;
        } catch (error) {
            throw new Error('Error in RoleService.getRoleById: ' + error.message);
        }
    }

    async updateRole(id, role) {
        try {
            await RoleModel.updateRole(id, role);
        } catch (error) {
            throw new Error('Error in RoleService.updateRole: ' + error.message);
        }
    }

    async deleteRole(id) {
        try {
            await RoleModel.deleteRole(id);
        } catch (error) {
            throw new Error('Error in RoleService.deleteRole: ' + error.message);
        }
    }

    async getUsersByRole(id) {
        try {
            return await RoleModel.getUsersByRole(id);
        } catch (error) {
            throw new Error('Error in RoleService.getUsersByRole: ' + error.message);
        }
    }
}

export default new RoleService();
