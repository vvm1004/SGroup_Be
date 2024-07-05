import AuthService from '../auth/authService.js';

class AuthController {
    async register(req, res) {
        try {
            const user = req.body;
            const token = await AuthService.register(user);
            res.status(201).json({ success: true, token: token });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async login(req, res) {
        try {
            const { username, password } = req.body;
            const token = await AuthService.login(username, password);
            res.status(200).json({ success: true, token: token });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async forgotPassword(req, res) {
        try {
            const { email } = req.body;
            await AuthService.forgotPassword(email);
            res.status(200).json({ success: true, message: 'Password reset link sent' });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async resetPassword(req, res) {
        try {
            const { token } = req.params;
            const {  newPassword } = req.body;
           await AuthService.resetPassword(token, newPassword);
            res.status(200).json({ success: true, message: 'Password reset successful' });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

export default new AuthController();
