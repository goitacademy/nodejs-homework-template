const express = require('express')
const logger = require('morgan')
const cors = require('cors')

const contactsRouter = require('./routes/api/contacts');
const authRouter = require("./routes/api/users")
// const ordersRouter = require("./routes/api/owners")
const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())

/* app.use("api/v1/auth", authRouter) */
app.use("/api/users", authRouter)
// app.use("/api/owners", ordersRouter)
app.use('/api/contacts', contactsRouter)

app.use((req, res) => {
  res.status(404).json({
    status: "error",
    message: 'Not found'
  })
})

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({
    status: "error",
    code: status,
    message: "jhhf"
  })
})

module.exports = app
