const express = require('express')
const logger = require('morgan')// спец мідлвар який виводить у консоль інфо про запит(іноді то потрібно щоб дебажити код) 
const cors = require('cors')// дозволяє виконання кросдоменних запитів

const contactsRouter = require('./routes/api/contacts')

const app = express()// пакет для створення веб-серверу

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'


// за допомогою методу app.use() - створюються мідлвари (допомагають виконувати дії для колжного запиту)

app.use(logger(formatsLogger))
app.use(cors())// дозволяє виконання кросдоменних запитів
app.use(express.json())// парс даних формату JSON

app.use('/api/contacts', contactsRouter)// маршути що стосуються шляху /api/contacts

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})// мідлвар, що робити коли приходить запит на адресу якої немає 

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message })
})

module.exports = app
