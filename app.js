const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const contactsRouter = require('./routes/api/contacts')
const usersRouter = require('./routes/api/users') // Dodane

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())
app.use('/avatars', express.static('public/avatars'))

// Twoje routy
app.use('/api/contacts', contactsRouter)
app.use('/api/users', usersRouter) // Dodane

// Middleware do obsługi błędów 404
app.use((req, res, next) => {
    res.status(404).json({ message: 'Not found' })
})

// Middleware do obsługi błędów 500
app.use((err, req, res, next) => {
    res.status(err.status || 500).json({ message: err.message })
})

const port = 3002 // Dodane

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`)
})

module.exports = app
