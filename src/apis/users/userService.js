// userService.js
import UserModel from '../../models/userModel.js';
import PasswordService from '../../services/password.service.js';

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
            const salt = PasswordService.generateSalt();
            const hashedPassword = PasswordService.hashPassword(user.password, salt);
            user.password = hashedPassword;
            user.salt = salt;
            return await UserModel.createUser(user);
        } catch (error) {
            throw new Error('Error in UserService.createUser: ' + error.message);
        }
    }

    async updateUser(id, user) {
        try {
            if (user.password) {
                const salt = PasswordService.generateSalt();
                const hashedPassword = PasswordService.hashPassword(user.password, salt);
                user.password = hashedPassword;
                user.salt = salt;
            }
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
