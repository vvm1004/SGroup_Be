import fs from 'fs';
import path  from 'path'
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class UserService {
    constructor() {
        this.users = [];
        this.loadUsers();
    }

    loadUsers() {
        const dataPath = path.join(__dirname, '..', 'data', 'data.json');
        try {
            const data = fs.readFileSync(dataPath, 'utf8');
            this.users = JSON.parse(data);
        } catch (error) {
            console.error('Error reading data.json:', error);
        }
    }

    saveUsers() {
        const dataPath = path.join(__dirname, '..', 'data', 'data.json');
        try {
            fs.writeFileSync(dataPath, JSON.stringify(this.users, null, 2), 'utf8');
        } catch (error) {
            console.error('Error writing to data.json:', error);
        }
    }

    getAllUsers() {
        return this.users;
    }

    getUserById(id) {
        return this.users.find(user => user.id === id);
    }

    createUser(newUser) {
        newUser.id = this.users.length + 1;
        this.users.push(newUser);
        this.saveUsers();
    }

    updateUser(id, updateUser) {
        let userFound = false;
        this.users = this.users.map(user => {
            if (user.id === id) {
                userFound = true;
                return { ...user, ...updateUser };
            }
            return user;
        });
        if (userFound) this.saveUsers();
        return userFound;
    }

    deleteUser(id) {
        const initialLength = this.users.length;
        this.users = this.users.filter(user => user.id !== id);
        if (this.users.length < initialLength) {
            this.saveUsers();
            return true;
        }
        return false;
    }
}

export default new UserService();