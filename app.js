const express = require("express")
const logger = require("morgan")
const cors = require("cors")
// const passport = require('passport')

const contactsRouter = require("./routes/api/contacts")
const authRouter = require('./routes/api/auth')

const app = express()

const formatsLogger = app.get("env") === "development" ? "dev" : "short"

app.use(logger(formatsLogger))
app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
)

app.use(express.json())
app.use(express.static('public'))

// app.use(passport.initialize())

// app.use((req, res, next) => {
//   console.log(req)
//   next()
// })

app.use('/api/contacts', contactsRouter)
app.use('/api/users', authRouter)


app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message })
})

module.exports = app