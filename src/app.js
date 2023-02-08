const express = require("express");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();

const authRouter = require("./routes/api/auth");
const usersRouter = require("./routes/api/user");
const contactsRouter = require("./routes/api/contacts");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("./public")); // middleware for get request (путь где искать)

app.use("/api/auth", authRouter);
app.use("/api/users", usersRouter);
app.use("/api/contacts", contactsRouter);


app.use((res) => {
  res.status(200).json({ message: "Success" });
});

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;
