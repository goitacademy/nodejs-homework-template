<<<<<<< HEAD
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();
=======
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
require('dotenv').config()
>>>>>>> d6f6e2a926844bfe6cace489a8d3bd79471308d0

const contactsRouter = require("./routes/api/contacts");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

<<<<<<< HEAD
app.use(morgan(formatsLogger));
app.use(cors());
app.use(express.json());
=======
app.use(morgan(formatsLogger))
app.use(cors())
app.use(express.json())
>>>>>>> d6f6e2a926844bfe6cace489a8d3bd79471308d0

app.use("/api/contacts", contactsRouter);

app.use((requirement, response) => {
<<<<<<< HEAD
  response.status(404).json({ message: "Not found contact" });
});

app.use((error, requirement, response, next) => {
  const { status = 500, message = "Server error" } = error;
  response.status(status).json({ message });
});

module.exports = app;
=======
  response.status(404).json({ message: 'Not found contact' })
})

app.use((erro, requirement, response, next) => {
  const {status = 500, message = "Server error"} = erro;
  respose.status(status).json({ message, })
})

module.exports = app
>>>>>>> d6f6e2a926844bfe6cace489a8d3bd79471308d0
