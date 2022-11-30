const mongoose = require('mongoose');
const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const usersRouter = require('./routes/api/users');

const contactsRouter = require('./routes/api/contacts');

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())
app.use(express.static("public"))


app.use('/api/users', usersRouter);
app.use('/api/contacts', contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message: message })
})

module.exports = app



//AZJ5FeGmL*Ug9R-      пароль MongoDB

//mongodb+srv://Sasha:AZJ5FeGmL*Ug9R-@cluster0.texgxkt.mongodb.net/test
//mongodb+srv://Sasha:AZJ5FeGmL*Ug9R-@cluster0.texgxkt.mongodb.net/db_contacts
//mongodb+srv://Sasha:AZJ5FeGmL*Ug9R-@cluster0.texgxkt.mongodb.net/db_contacts?retryWrites=true&w=majority