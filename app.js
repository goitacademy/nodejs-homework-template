<<<<<<< HEAD
const dotenv = require("dotenv");
const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const createError = require("http-errors");
const path = require("path");

dotenv.config();
=======
const express = require('express')
const logger = require('morgan')
const cors = require('cors')
require("dotenv").config();

const contactsRouter = require('./routes/api/contacts')
const usersRouter = require('./routes/api/users')
>>>>>>> 03ddca3ab856225ac93889b1ec630c997ac37fef

const contactsRouter = require("./routes/api/contacts");
const usersRouter = require("./routes/api/users");

const { connectDatabase } = require("./config/database.js");

<<<<<<< HEAD
connectDatabase();

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api/contacts", contactsRouter);
app.use("/api/users", usersRouter);
app.use("/avatars", express.static(path.join(__dirname, "./public/avatars")));

app.use("/public", express.static("public"));

app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({ message: err.message, status: err.status });
});

module.exports = app;
=======
app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())

<<<<<<< HEAD
app.use('/api/contacts', contactsRouter)
app.use('/api/users', usersRouter)
=======
app.use('/', contactsRouter)
>>>>>>> master

<<<<<<< HEAD
app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((erro, req, res, next) => {
  const { status = 500, message = "Server error" } = erro;
  res.status(status).json({ message })
=======
app.use((requirement, response) => {
  response.status(404).json({ message: 'Not found' })
})

app.use((erro, requirement, response, next) => {
  const { status = 500, message = "Server error" } = erro;
  response.status(status).json({ message })
>>>>>>> master
})

module.exports = app
>>>>>>> 03ddca3ab856225ac93889b1ec630c997ac37fef
