const express = require('express')
const logger = require('morgan') 
const cors = require('cors')
const fs = require('fs/promises');
const mongoose = require('mongoose');
require('dotenv').config('./.env');


mongoose.connect(process.env.MONGO_PASS).then(() => {
  console.log("Database connection successful");
}).catch(() => {
  console.log("NO Database connection")
    process.exit(1);
})

const noticesRouter = require('./routes/api/notices')
const authRouter = require('./routes/api/authRoutes')
const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())
app.use(express.static('public'))
app.use('/api/notices', noticesRouter)
app.use('/api/users', authRouter)


app.get('/', (req, res) => {
  res.status(200).json({ message: 'found' })
})

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message })
})

module.exports = app