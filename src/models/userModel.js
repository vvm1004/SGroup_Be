import { connection } from '../database/config.js';

class UserModel {
    constructor(id, name, gender, username, age, password, email, salt, resetToken, resetTokenExpiration) {
        this.id = id;
        this.name = name;
        this.username = username;
        this.age = age;
        this.password = password;
        this.email = email;
        this.gender = gender;
        this.salt = salt;
        this.resetToken = resetToken;
        this.resetTokenExpiration = resetTokenExpiration;
    }

    async getAllUsers() {
        try {
            const [rows] = await connection.execute('SELECT * FROM user');
            return rows;
        } catch (error) {
            throw new Error('Error fetching users: ' + error.message);
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
            const { name, email, password, gender, age, username, salt } = user;
            const [result] = await connection.execute(
                'INSERT INTO user (name, email, password, gender, age, username, salt) VALUES (?, ?, ?, ?, ?, ?, ?)',
                [name, email, password, gender, age, username, salt]
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
