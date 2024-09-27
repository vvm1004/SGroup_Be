import { connection as db } from '../database/config.js';


class RoleModel {
    static async createRole(role) {

        const { name, description, isActive } = role;
        const [result] = await db.execute(
            'INSERT INTO role (name, description, isActive) VALUES (?, ?, ?)',
            [name, description, isActive]
        );
        return result.insertId;
    }

    static async getAllRoles() {
        const [rows] = await db.execute('SELECT * FROM role');
        return rows;
    }

    static async getRoleById(id) {
        const [rows] = await db.execute('SELECT * FROM role WHERE id = ?', [id]);
        return rows[0];
    }
    static async getRoleByName(name) {
        const [rows] = await db.execute('SELECT * FROM role WHERE name = ?', [name]);
        return rows[0];
    }

    static async updateRole(id, role) {
        const { name, description, isActive } = role;
        await db.execute(
            'UPDATE role SET name = ?, description = ?, isActive = ? WHERE id = ?',
            [name, description, isActive, id]
        );
    }

    static async deleteRole(id) {
        await db.execute('DELETE FROM role WHERE id = ?', [id]);
    }

    static async getUsersByRole(id) {
        const [rows] = await db.execute(
            'SELECT u.id, u.username, u.email FROM user u JOIN role r ON u.role_id = r.id WHERE r.id = ?',
            [id]
        );
        return rows;
    }
}

export default RoleModel;
