const express = require("express");
const logger = require("morgan");
const cors = require("cors");
// const { listContacts } = require("./contact.js");

const contactsRouter = require("./routes/api/contacts");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);

app.get("/api/contacts", function (req, res) {
  // console.log(res.json(listContacts));
  res.status(200).json(res.data);
});

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;
