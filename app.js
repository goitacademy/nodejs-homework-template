// const fs = require("fs/promises");

const express = require("express");
const logger = require("morgan");
const cors = require("cors");

// const contacts = require("./models/contacts");
// const listContacts = require("./models/contacts");

const contactsRouter = require("./routes/api/contacts");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);

app.use((req, res) => {
  // res.send({ message: "home work 02 done!!! MaryDan" });
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;
