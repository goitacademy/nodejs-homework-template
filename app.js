const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const contactsRouter = require("./routes/api/contacts");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

// const contacts = require("./models/contacts.json");
// app.get("/api/contacts", (req, res) => {
//   res.json(contacts);
// });

app.use("/api/contacts", contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
  // не передает message.
  // "message": "ENOENT: no such file or directory,
  // open 'D:\\projects\\NODEJS\\nodejs-homework-rest-api\\models\\contacts2.json'"
});

module.exports = app;
