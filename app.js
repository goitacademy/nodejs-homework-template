const express = require('express')
const logger = require('morgan')// спец мідлвар який виводить у консоль інфо про запит(іноді то потрібно щоб дебажити код) 
const cors = require('cors')// дозволяє виконання кросдоменних запитів

// пыдключення бази даних 
require("./mongoose/mongoose")

const contactsRouter = require('./routes/api/contacts')

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

// app.use - middleware (методи для обробки HTTP-запитів)
app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json());

// підключення шляхів по яким будуть відбуватися HTTP-запити 
app.use('/api/contacts', contactsRouter);


// Обробка помилок 
app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})
app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message })
})

module.exports = app
