// userModel.js
import { connection } from '../database/config.js';

class UserModel {
    constructor(id, name, gender, username, age, password, email) {
        this.id = id;
        this.name = name;
        this.username = username;
        this.age = age;
        this.password = password;
        this.email = email;
        this.gender = gender; 
     
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
            const { name, email, password, gender, age } = user;
       
            const [result] = await connection.execute('INSERT INTO user (name, email, password, gender, age) VALUES (?, ?, ?, ?, ?)', [name, email, password, gender, age]);
            return result.insertId;
        } catch (error) {
            throw new Error('Error creating user: ' + error.message);
        }
    }

    async updateUser(id, user) {
        try {
            const { name, email, password, gender, age } = user;
        
            const [result] = await connection.execute(
                'UPDATE user SET name = ?, email = ?, password = COALESCE(?, password), gender = ?, age = ? WHERE id = ?',
                [name, email, password, gender, age, id]
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
}

export default new UserModel();
