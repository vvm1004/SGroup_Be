import AuthService from '../auth/authService.js';

class AuthController {
    async register(req, res) {
        try {
            const user = req.body;
            const token = await AuthService.register(user);
            res.status(201).json({ success: true, token: token });
        } catch (error) {
            if (error.message === 'User already exists') {
                res.status(409).json({ success: false, message: 'Username or email already exists' });
            } else {
                res.status(500).json({ success: false, message: 'Internal Service Error' });
            }
        }
    }

    async login(req, res) {
        try {
            const { username, password } = req.body;
            const token = await AuthService.login(username, password);
            res.status(200).json({ success: true, token: token });
        } catch (error) {
           if (error.message === 'User not found' || error.message === 'Invalid password') {
                res.status(401).json({ success: false, message: 'Invalid username or password' });
            } else {
                res.status(500).json({ success: false, message: 'Internal Service Error' });
            }
        }
    }
}

export default new AuthController();
