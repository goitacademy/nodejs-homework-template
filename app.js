// a3rY7gdV6R3Nqt08
// marynaV
const express = require('express')
const logger = require('morgan')
const cors = require('cors')

const authRouter = require('./routes/api/auth');
const contactsRouter = require('./routes/api/contacts');
const usersRouter = require('./routes/api/users');

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())

app.use(express.static('public'));


app.use('/api/contacts', contactsRouter)
app.use('/api/users', authRouter);
app.use('/api/users', usersRouter);

app.all('*', (req, res) => {
  res.status(404).json({ msg: 'Not found' })
})

app.use((err, req, res, next) => {
  const msg = Array.isArray(err.message) ? err.message.join(";++;") : err.message;

  res.status(err.status || 500).json({
    msg,
    stack: err.stack
  })
})

module.exports = app