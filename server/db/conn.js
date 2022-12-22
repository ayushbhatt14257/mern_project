const mongoos = require('mongoose');
const DB = process.env.DATABASE;

mongoos.connect(DB).then(() => {
    console.log("connection SuccesFull");
}).catch((error) => console.log("no connextion"))