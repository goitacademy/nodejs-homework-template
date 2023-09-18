const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const port = 3001
const contactsRouter = require('./routes/api/contacts')

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())

// Middleware dla statycznych plików powinno być przed middleware do obsługi błędów
app.use('/avatars', express.static('public/avatars'))

// moje routy
app.use('/api/contacts', contactsRouter)

// Middleware do obsługi błędów 404 i 500 powinno być na końcu
app.use((req, res) => {
    res.status(404).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {
    res.status(500).json({ message: err.message })
})

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`)
})

module.exports = app
