// userService.js
import UserModel from '../../models/userModel.js';
import bcrypt from 'bcrypt';

class UserService {
    async getAllUsers() {
        try {
            return await UserModel.getAllUsers();
        } catch (error) {
            throw new Error('Error in UserService.getAllUsers: ' + error.message);
        }
    }

    async getUserById(id) {
        try {
            return await UserModel.getUserById(id);
        } catch (error) {
            throw new Error('Error in UserService.getUserById: ' + error.message);
        }
    }

    async createUser(user) {
        try {
            const passwordString = String( user.password);
            const hashedPassword = await bcrypt.hash(passwordString, 10); // Hash the password with a salt round of 10
            user.password = hashedPassword
            return await UserModel.createUser(user);
        } catch (error) {
            throw new Error('Error in UserService.createUser: ' + error.message);
        }
    }

    async updateUser(id, user) {
        try {
            const passwordString = String( user.password);
            const hashedPassword = user.password ? await bcrypt.hash(passwordString, 10) : null;
            user.password = hashedPassword
            return await UserModel.updateUser(id, user);
        } catch (error) {
            throw new Error('Error in UserService.updateUser: ' + error.message);
        }
    }

    async deleteUser(id) {
        try {
            return await UserModel.deleteUser(id);
        } catch (error) {
            throw new Error('Error in UserService.deleteUser: ' + error.message);
        }
    }
}

export default new UserService();
