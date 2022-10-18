const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://ihorshark:ia8xNREoTiDZ49pg@cluster0.j6n14cw.mongodb.net/contacts_reader?retryWrites=true&w=majority"
  )
  .then(() => console.log("Connect successful"))
  .catch(error => console.log(error.message));

const contactsRouter = require("./routes/api/contacts");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;
