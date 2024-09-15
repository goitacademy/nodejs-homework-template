const express = require('express')
const path = require("path")
const configPath = path.join(__dirname, "..", "config", ".env")
require("dotenv").config({ path: configPath })
require("colors")

const app=express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const connectDb = require('./config/connectDb')
app.use("/api/v1/contacts", require("./routes/contactsRoutes"));
app.use("/api/v1/users", require("./routes/usersRoutes"));
const ErrorHandler = require("./midlewares/errorHandler")
app.use(ErrorHandler)
app.use(
  "/avatars",
  express.static(path.join(process.cwd(), "public", "avatars"))
);


connectDb()
app.listen(process.env.PORT, ()=>{
  console.log(`Server is running, port ${process.env.PORT}!`.green.italic.bold)
})
