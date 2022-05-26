const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const contactsRouter = require("./routes/api/contacts");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(cors());
app.use(express.json());
app.use(logger(formatsLogger));

app.use("/api/contacts", contactsRouter);

// for not correct endpoints
app.use((req, res) => {
  console.log("middleware1");
  res.status(404).json({ message: "Not found" });
});

// for all errors
app.use((err, req, res, next) => {
  console.log("middleware2");
  res.status(err.status || 500).json({ message: err });
});

module.exports = app;
