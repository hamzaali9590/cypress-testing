const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json())
const port = 3000;


app.get('/', (req, res) => {
    res.send("Home Page");
})

app.post('/login', function (req, res) {

    const { userName, password } = req.body;

    filePath = path.join(__dirname, 'users.json');

    fs.readFile(filePath, (err, data) => {
        if (err) {
            console.log(`Error in reading data ${err}`);
        }
        const jsonData = JSON.parse(data);

        if (userName !== jsonData.valid.username || password !== jsonData.valid.password) {
            res.sendStatus(401);
            console.log('User name or password is not correct');
        } else {
            res.status(201).json('Login successful');
        }
    })
})

app.listen(port, function () {
    console.log("The app is listening at port 3000")
})