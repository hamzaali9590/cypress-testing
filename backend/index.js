const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json())
const port = 3000;


app.get('/dashboard', (req, res) => {
    res.send("Welcome to the dashboard");
})

app.get('/', (req, res) => {
    res.send("Welcome to the Homepage");
})

app.post('/login', function (req, res) {

    const { userName, password } = req.body;

    filePath = path.join(__dirname, 'users.json');

    fs.readFile(filePath, (err, data) => {
        if (err) {
            return res.status(404).json(`Error in reading data ${err}`) ;
        }
        const jsonData = JSON.parse(data);

        if (userName !== jsonData.valid.username || password !== jsonData.valid.password) {
            res.status(401).json('User name or password is not correct');
        } else {
            res.status(201).json('Login successful');
        }
    })
})

app.listen(port, function () {
    console.log("The app is listening at port 3000")
})