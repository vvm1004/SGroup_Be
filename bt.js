const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()) // To parse JSON data in the req.body
app.use(express.urlencoded({ // To parse form data in the req.body
    extended: true
}))

let users = [
    { id: 1, name: 'John' },
    { id: 2, name: 'Jane' },
    { id: 3, name: 'Doe' },
];


// API GET tất cả users
app.get('/api/users', (req, res) => {
    console.log(req.query);
    res.json(users);
    console.log(users)

});
app.get('/api/users/ngu', (req, res) => {

    res.send("vao day la ngu");

});
// API GET chi tiết user
app.get('/api/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const user = users.find(user => user.id === id);
    console.log(req.params);
    console.log('Get user by id');

    if (user) {
        res.json(user);
        console.log(user)
    } else {
        res.status(404).json({ message: 'User not found' });
        console.log('User not found')
    }
});

// API POST user
app.post('/api/users', (req, res) => {
    console.log(req.body);
    const newUser = req.body;
    newUser.id = users.length + 1;
    users.push(newUser);
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
    users = users.map(user => {
        if (user.id === id) {
            return { ...user, ...updateUser };
        }
        return user;
    });
    res.json({ message: 'User updated successfully' });
    console.log('User updated successfully')
    console.log(users);

});

// API DELETE user
app.delete('/api/users/:id', (req, res) => {
    console.log(req.params);
    const id = parseInt(req.params.id);
    users = users.filter(user => user.id !== id);

    res.json({ message: 'User deleted successfully' });
    console.log('User deleted successfully')
    console.log(users);
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


