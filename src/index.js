const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); // To parse JSON data in the req.body
app.use(express.urlencoded({ extended: true })); // To parse form data in the req.body

let users = [];

// Load users from data.json
const loadUsers = () => {
    const dataPath = path.join(__dirname, '..', 'data.json');
    try {
        const data = fs.readFileSync(dataPath, 'utf8');
        users = JSON.parse(data);
    } catch (error) {
        console.error('Error reading data.json:', error);
    }
};

// Save users to data.json
const saveUsers = () => {
    const dataPath = path.join(__dirname, '..', 'data.json');
    try {
        fs.writeFileSync(dataPath, JSON.stringify(users, null, 2), 'utf8');
    } catch (error) {
        console.error('Error writing to data.json:', error);
    }
};

loadUsers();

// API GET tất cả users
app.get('/api/users', (req, res) => {
    console.log(req.query);
    res.json(users);
    console.log(users);
});

// API GET chi tiết user
app.get('/api/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const user = users.find(user => user.id === id);
    console.log(req.params);
    console.log('Get user by id');

    if (user) {
        res.json(user);
        console.log(user);
    } else {
        res.status(404).json({ message: 'User not found' });
        console.log('User not found');
    }
});

// API POST user
app.post('/api/users', (req, res) => {
    console.log(req.body);
    const newUser = req.body;
    newUser.id = users.length + 1;
    users.push(newUser);
    saveUsers(); 
    res.status(201).json({ message: 'User created successfully' });
    console.log('User created successfully');
    console.log(users);
});

// API PUT user
app.put('/api/users/:id', (req, res) => {
    console.log(req.body);
    console.log(req.params);
    const id = parseInt(req.params.id);
    const updateUser = req.body;
    let userFound = false;
    users = users.map(user => {
        if (user.id === id) {
            userFound = true;
            return { ...user, ...updateUser };
        }
        return user;
    });
    if (userFound) {
        saveUsers(); 
        res.json({ message: 'User updated successfully' });
        console.log('User updated successfully');
        console.log(users);
    } else {
        res.status(404).json({ message: 'User not found' });
        console.log('User not found');
    }
});

// API DELETE user
app.delete('/api/users/:id', (req, res) => {
    console.log(req.params);
    const id = parseInt(req.params.id);
    const initialLength = users.length;
    users = users.filter(user => user.id !== id);
    if (users.length < initialLength) {
        saveUsers(); 
        res.json({ message: 'User deleted successfully' });
        console.log('User deleted successfully');
        console.log(users);
    } else {
        res.status(404).json({ message: 'User not found' });
        console.log('User not found');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

