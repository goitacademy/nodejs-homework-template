const express = require('express')
const morgan = require("morgan");
const cors = require('cors')
const mongoose = require("mongoose");

const contactsRouter = require("./routes/api/contacts");
const usersRouter = require("./routes/api/users");

require("dotenv").config();

mongoose.set("strictQuery", true);
mongoose
  .connect(`${process.env.URL}`)
  .then(() => {
    console.log("Database connection successful!");
  })
  .catch((err) => {
    console.log(err);
    console.log("Database not connected");
    return process.exit(1);
  });

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(morgan(formatsLogger));
app.use(cors())
app.use(express.json())

app.use("/api/contacts", contactsRouter);
app.use("/api/users", usersRouter);

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message })
})

module.exports = app
