import UserModel from '../../models/userModel.js';
import jwt from 'jsonwebtoken';
import PasswordService from '../../services/password.service.js';
import 'dotenv/config';

const SECRET_KEY = process.env.SECRET_KEY;

class AuthService {
    async register(user) {
        const existingUser = await UserModel.getUserByUserName(user.username);
        if (existingUser) {
            throw new Error('User already exists');
        }

        const salt = PasswordService.generateSalt();
        const hashedPassword = PasswordService.hashPassword(user.password, salt);
        user.password = hashedPassword;
        user.salt = salt;

        const userId = await UserModel.createUser(user);
        return this.generateToken({ id: userId });
    }

    async login(username, password) {
        const user = await UserModel.getUserByUserName(username);
        if (!user) {
            throw new Error('User not found');
        }

        const isPasswordValid = PasswordService.verifyPassword(password, user.salt, user.password);
        if (!isPasswordValid) {
            throw new Error('Invalid password');
        }

        return this.generateToken({ id: user.id });
    }

    generateToken(payload) {
        return jwt.sign(payload, SECRET_KEY, { expiresIn: process.env.JWT_EXPIRES_IN });
    }
}

export default new AuthService();
