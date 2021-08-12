const express = require("express")
const logger = require("morgan")
const cors = require("cors")
const { HttpCode } = require("./src/helpers/constants")

const contactsRouter = require("./routes/api/contacts")

const app = express()

const formatsLogger = app.get("env") === "development" ? "dev" : "short"

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())

app.use("/api/contacts", contactsRouter)

app.use((_, res) => {
  res.status(404).json({
    status: "error",
    code: 404,
    message: "Not found",
  })
})
app.use((error, req, res, next) => {
  error.status = error.status ? error.status : HttpCode.INTERNAL_SERVER_ERROR
  res.status(error.status).json({
    status: error.status === 500 ? "fail" : "error",
    code: error.status,
    message: error.message,
    data: error.status === 500 ? "Internal server error" : error.data,
  })
  // const { code = 500, message = "Internal server error" } = error
  // res.status(500).json({
  //   status: "fail",
  //   code,
  //   message,
  // })
})

module.exports = app
