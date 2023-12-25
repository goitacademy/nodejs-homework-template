const express = require('express');
const logger = require('morgan');
const cors = require('cors');
require("dotenv").config();

const authRouter = require("./routes/api/auth"); // импорт роутера из роутес апи

const contactsRouter = require('./routes/api/contacts');

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())  // перевіряє тіло запиту та тип
app.use(express.static("public"))

// app.use("/api/auth", authRouter) // указываем экспрессу что любой запрос на апи аусф обрабатывается роутом аусРоут
app.use("/users", authRouter);

app.use('/api/contacts', contactsRouter) // всі запити, що поч. /api/contacts знаходяться в contactsRouter

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message, })
})

module.exports = app

