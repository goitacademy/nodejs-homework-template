const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const contactsRouter = require("./routes/api/contacts");
const usersRouter = require("./routes/api/users");
const dotenv = require("dotenv");
dotenv.config();

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";
app.use(logger(formatsLogger));

app.use(cors());
app.use(express.json());

// CONTACTS ROUTER
app.use("/api/contacts", contactsRouter);

// USERS ROUTER
app.use("/api/users", usersRouter);

// ERROR HANDLERS/MIDDLEWARES
app.use((req, res) => {
  console.log();
  res.status(404).json({ message: "Not found" });
});

app.use((req, res) => {
  res.status(400).json({ message: "Missing required name field" });
});

app.use((err, req, res, next) => {
  const { status = 500 } = err;
  res.status(status).json({ message: err.message });
});

module.exports = app;
