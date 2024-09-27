import RoleModel from '../../models/roleModel.js';

class RoleService {
    async createRole(role) {
        const { name, description, isActive } = role;
        const existingRoleName = await RoleModel.getRoleByName(name);

        if (existingRoleName) {
            throw new Error('Role Name already exists');
        }
        return await RoleModel.createRole({ name, description, isActive });
    }

    async getAllRoles() {
        try {
            return await RoleModel.getAllRoles();
        } catch (error) {
            throw new Error('Error in RoleService.getAllRoles: ' + error.message);
        }
    }

    async getRoleById(id) {
        const role = await RoleModel.getRoleById(id);
        if (!role) throw new Error('Role not found');
        return role;
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
            const role = await RoleModel.getRoleById(id);
            if (!role) throw new Error('Role not found');
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
