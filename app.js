const express = require("express");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();

require("./auth/auth");

const contactsRouter = require("./routes/api/contacts");
const usersRouter = require("./routes/api/users");

const connectDB = require("./db");

const app = express();
app.use(express.static("public"));

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/contacts", contactsRouter);
app.use("/api/users", usersRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found page" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;
