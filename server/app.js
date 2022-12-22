const express = require('express');
const mongoos = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require('cookie-parser');
const path = require('path');
const { application } = require('express');
const app = express();

dotenv.config({ path: './config.env' });
require('./db/conn')
app.use(express.json());
app.use(cookieParser());
app.use(require("./router/auth"))
    // const User = require("./models/userschema")

const PORT = process.env.PORT || 3000


// app.get("/", (req, res) => {
//     res.send('Hello from index');
// })

// app.get("/about", (req, res) => {
//     res.send("Hello from Index Page");
// })

// app.get("/register", (req, res) => {
//     res.send("Hello from Index Page");
// })

// app.get("/signin", (req, res) => {
//     res.send("Hello from Index Page");
// })

const _dirname = path.resolve();
app.use(express.static(path.join(_dirname, '/client/build')));
app.get('*', (req, res) =>
    res.sendFile(path.join(_dirname, '/client/build/index.html'))
);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static("client/build"));
}

app.listen(PORT, () => {
    console.log(`Linting to port ${PORT}`);
})