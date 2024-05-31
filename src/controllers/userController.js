import userService from '../services/userService.js';

class UserController {
    getAllUsers(req, res) {
        const users = userService.getAllUsers();
        res.json(users);
    }

    getUserById(req, res) {
        const id = parseInt(req.params.id);
        const user = userService.getUserById(id);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    }

    createUser(req, res) {
        const newUser = req.body;
        userService.createUser(newUser);
        res.status(201).json({ message: 'User created successfully' });
    }

    updateUser(req, res) {
        const id = parseInt(req.params.id);
        const updateUser = req.body;
        const userFound = userService.updateUser(id, updateUser);
        if (userFound) {
            res.json({ message: 'User updated successfully' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    }

    deleteUser(req, res) {
        const id = parseInt(req.params.id);
        const userDeleted = userService.deleteUser(id);
        if (userDeleted) {
            res.json({ message: 'User deleted successfully' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    }
}

export default new UserController();