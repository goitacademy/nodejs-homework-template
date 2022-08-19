const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const dotenv = require('dotenv');

dotenv.config();

global.basedir = __dirname;

const authRouter = require('./routes/api/auth');
const avatarsRouter = require('./routes/api/avatars');
const contactsRouter = require('./routes/api/contacts');

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())
app.use(express.static('public'))

app.use('/api/auth', authRouter);
app.use('/users/avatars', avatarsRouter);
app.use('/api/contacts', contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message })
})

module.exports = app;