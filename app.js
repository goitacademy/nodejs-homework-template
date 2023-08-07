const express = require("express"); //create web server
const logger = require("morgan");
const cors = require("cors");

const contactsRouter = require("./routes/api/contacts");

const app = express(); //app web server

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));//middleware
app.use(cors());
app.use(express.json());//checken body

app.use("/api/contacts", contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  //midleware
  res.status(500).json({ message: err.message });
});

module.exports = app;
