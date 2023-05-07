const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
require('dotenv').config()

const contactsRouter = require("./routes/api/contacts");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";


app.use(morgan(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(morgan(formatsLogger))

app.use("/", contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found contact" });
});

app.use((error, req, res, next) => {
  const { status = 500, message = "Server error" } = error;
  res.status(status).json({ message });
});



app.use((erro, req, res, next) => {
  const {status = 500, message = "Server error"} = erro;
  res.status(status).json({ message, })
})

module.exports = app

