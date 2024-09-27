import { connection } from '../database/config.js';

class UserModel {

    async getAllUsers() {
        try {
            const [rows] = await connection.execute('SELECT * FROM user');
            return rows;
        } catch (error) {
            throw new Error('Error fetching users: ' + error.message);
        }
    }
    async getAllRoles() {
        try {
            const [rows] = await connection.execute('SELECT * FROM role');
            return rows;
        } catch (error) {
            throw new Error('Error fetching role ' + error.message);
        }
    }

    async getUserById(id) {
        try {
            const [rows] = await connection.execute('SELECT * FROM user WHERE id = ?', [id]);
            return rows[0];
        } catch (error) {
            throw new Error('Error fetching user by ID: ' + error.message);
        }
    }


    async createUser(user) {
        try {
            const { name, email, password, gender, age, username, salt, role_id } = user;
            const [result] = await connection.execute(
                'INSERT INTO user (name, email, password, gender, age, username, salt, role_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
                [name, email, password, gender, age, username, salt, role_id]
            );
            return result.insertId;
        } catch (error) {
            throw new Error('Error creating user: ' + error.message);
        }
    }

    async updateUser(id, user) {
        try {
            const { name, email, password, gender, age, salt, resetToken, resetTokenExpiration } = user;
            const [result] = await connection.execute(
                'UPDATE user SET name = ?, email = ?, password = COALESCE(?, password), gender = ?, age = ?, salt = COALESCE(?, salt), resetToken = ?, resetTokenExpiration = ? WHERE id = ?',
                [name, email, password, gender, age, salt, resetToken, resetTokenExpiration, id]
            );
            return result.affectedRows > 0;
        } catch (error) {
            throw new Error('Error updating user: ' + error.message);
        }
    }

    async deleteUser(id) {
        try {
            const [result] = await connection.execute('DELETE FROM user WHERE id = ?', [id]);
            return result.affectedRows > 0;
        } catch (error) {
            throw new Error('Error deleting user: ' + error.message);
        }
    }

    async getUserByUserName(username) {
        try {
            const [rows] = await connection.execute('SELECT * FROM user WHERE username = ?', [username]);
            return rows[0];
        } catch (error) {
            throw new Error('Error fetching user by username: ' + error.message);
        }
    }

    async getUserByEmail(email) {
        try {
            const [rows] = await connection.execute('SELECT * FROM user WHERE email = ?', [email]);
            return rows[0];
        } catch (error) {
            throw new Error('Error fetching user by email: ' + error.message);
        }
    }


    async updateResetToken(id, restToken, resetTokenExpiration) {
        try {
            const [result] = await connection.execute(
                'UPDATE user SET resetToken = ?, resetTokenExpiration = ? WHERE id = ?',
                [restToken, resetTokenExpiration, id]
            )
            return result.affectedRows > 0;
        } catch (error) {
            throw new Error('Error updating reset token: ' + error.message);
        }
    }

    async updatePassword(id, password, salt) {
        try {
            const [result] = await connection.execute(
                'UPDATE user SET password = ?, salt = ?  WHERE id = ?',
                [password, salt, id]
            );
            return result.affectedRows > 0;
        } catch (error) {
            throw new Error('Error updating user: ' + error.message);
        }
    }

    async getUserByResetToken(resetToken) {
        try {
            const [rows] = await connection.execute('SELECT * FROM user WHERE resetToken = ?', [resetToken]);
            return rows[0];
        } catch (error) {
            throw new Error('Error fetching user by reset token: ' + error.message);
        }
    }
}

export default new UserModel();
