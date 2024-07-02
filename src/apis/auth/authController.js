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
}

export default new AuthController();
