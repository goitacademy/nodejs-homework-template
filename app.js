const express = require("express");
const logger = require("morgan");
const cors = require("cors");
// require("dotenv").config();

const authRouter = require("./routes/api/auth-router");
const contactsRouter = require("./routes/api/contacts-router");

// dotenv.config();
// add comments

const app = express();
const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/contacts", contactsRouter);

//  Error handling
app.use((req, res, next) => {
  res.status(404).json({ message: "Not found" });
  next();
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server Error" } = err;
  res.status(status).json({ message });
});

module.exports = app;
