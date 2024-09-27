let express = require("express");
let dotenv = require("dotenv");

let connectDB = require("./db");
require('colors')


const app = express()

// Load env variables
dotenv.config();

// Connect DB
connectDB();


// Provide server
const { PORT, NODE_ENV } = process.env || 5050;

console.log(PORT)
app.listen(PORT, () => {
    console.log(`Server running in ${NODE_ENV} mode on port ${PORT}`.cyan.bold);
});

