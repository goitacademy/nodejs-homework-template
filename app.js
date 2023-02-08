const express = require('express')
const logger = require('morgan')
const cors = require('cors')
require("dotenv").config();
const mongoose = require("mongoose");
const contactsRouter = require('./src/routes/api/contacts');
const router = require('./src/routes/api/auth');
const app = express()
const jwt = require("jsonwebtoken");

// const bcrypt = require("bcryptjs");

mongoose.set("strictQuery", true);
mongoose
  .connect(
    `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.bjfqkyj.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("Database connection successful");
  }); 

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())

app.use('/api/contacts', contactsRouter)
app.use('/api/user', router);

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message })
})

const data = {
  id: 10,
  email: "test@gmail.com",
};

const SECRET = "$2a$10$MThLJqxShDMNxtsGZ7fn2";
const token = jwt.sign(data, SECRET, { expiresIn: "1h" });
console.log("token", token);

const decoded = jwt.decode(token);
console.log("decoded", decoded);

try {
  const result = jwt.verify(token, SECRET)
  console.log("result", result);

} catch (error) { 
console.log("error", error);
};

module.exports = app
