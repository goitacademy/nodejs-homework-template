const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const contactsRouter = require("./routes/api/contacts");
const usersRouter = require("./routes/api/user");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);
app.use("/api/users", usersRouter);

app.use((req, res) => {
  return res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  console.log("err :", err);
  if (err.status) {
    return res.status(err.status).json({ message: err.message });
  }
  if (err.message.includes("Cast to ObjectId failed for value")) {
    return res.status(404).json({ message: "Not found" });
  }
  if (err.name === "ValidationError") {
    return res.status(400).json({ message: err.message });
  }
  console.error("API Error", err.message);
  return res.status(500).json({ message: "Internal error message" });
});

module.exports = app;
