const express = require('express');
const {contactsRouter} = require('./routes/contacts.route');
const cors = require('cors');
const morgan = require('morgan');
require("dotenv").config();

const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());


app.use("/api/contacts",contactsRouter)


app.use("/api", (req, res) => {
  res.status(404).json({message: "Not Found"})
})

app.use("/api", (err, req, res, next) => {
  console.error(`app error ${err.message}`)
  if (err.name === 'ValidationError') {
    return res.status(400).json({message: err.message})
  }
  return res.status(500).json({message: "Internal server error"})
})


module.exports = app;

