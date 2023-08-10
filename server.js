
const mongoose = require("mongoose");
const app = require('./app')


const { DB_HOST, PORT = 3000 } = process.env;

mongoose.set("strictQuery", true);


