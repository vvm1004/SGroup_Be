import UserModel from '../../models/userModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import 'dotenv/config'

const SECRET_KEY = process.env.SECRET_KEY;

class AuthService {
    async register(user) {
        const existingUser = await UserModel.getUserByUserName(user.username);
        if (existingUser) {
            throw new Error('User already exists');
        }
        const password = String(user.password)
        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;

        const userId = await UserModel.createUser(user)
        return this.generateToken({ id: userId });
    }

    async login(username, password) {
        const user = await UserModel.getUserByUserName(username);;
        if (!user) {
            throw new Error('User not found');
        }

        const isPasswordValid = await bcrypt.compare(String(password), user.password);
        if (!isPasswordValid) {
            throw new Error('Invalid password');
        }

        return this.generateToken({ id: user.id });
    }

    generateToken(payload) {
        return jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
    }
}

export default new AuthService();
