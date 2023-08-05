const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const path = require('path');
const mongoose = require('mongoose')
const dotenv = require('dotenv');


const contactsRouter = require('./routes/api/contacts')
const userRouter = require('./routes/api/userRouter')

const app = express()

dotenv.config();


const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'


mongoose.connect(process.env.MONGO_URL)
  .then(console.log("Database connection successful"))
  .catch((err) => {
      console.log("Database connection Error")
      process.exit(1)
    })


app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())

app.use('/api/contacts', contactsRouter)
app.use('/users', userRouter)

app.get('/ping', (req, res) => {
  // res.status(201).send('<h1>HELLO FROM EXPRESS!!!</h1>');
  // res.sendStatus(200);

  res.status(200).json({
    msg: 'pong!',
  });
});

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message })
})

module.exports = app
