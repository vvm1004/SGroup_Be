const express = require('express')
const app = express()
const port = 3000


app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/users', (req, res) => {
    console.log(req.query)
    users.sort((a, b) => b.id - a.id)
    res.send(users)
})

app.get('/users/:id', (req, res) => {
    console.log(req.params.id)
    const user = users.filter(user => user.id === parseInt(req.params.id))
    res.send(user)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})