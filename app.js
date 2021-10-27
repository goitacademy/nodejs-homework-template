const express = require("express")
const logger = require("morgan")
const cors = require("cors")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
dotenv.config()
// const { DB_HOST } = process.env
// console.log(DB_HOST)

const contactsRouter = require("./routes/api/contacts")

const app = express()

const formatsLogger = app.get("env") === "development" ? "dev" : "short"

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())

app.use("/api/contacts", contactsRouter)

app.use((req, res) => {
  res.status(404).json({
    status: "error",
    code: 404,
    message: "Not found",
  })
})

app.use((error, req, res, next) => {
  const { code = 500, message = `Server error` } = error

  res.status(500).json({
    status: "error",
    code,
    message,
  })
})

const { DB_HOST, PORT = 3000 } = process.env

mongoose
  .connect(DB_HOST, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`Server running. Use our API on port: ${PORT}`)
    app.listen(PORT)
  })
  .catch((error) => console.log(error))

module.exports = app
