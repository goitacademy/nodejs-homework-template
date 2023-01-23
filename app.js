const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const { contactsRouter } = require("./routes/api/contacts");
const { authRouter } = require("./routes/api/auth");
const { userRouter } = require("./routes/api/user");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json()); // tell express to work with JSON in body

// routes
app.use("/api/contacts", contactsRouter);
app.use("/api/auth/users", authRouter);
app.use("/api/user", userRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  // handle mongoose validation error
  if (err.name === "ValidationError") {
    return res.status(400).json({ message: err.message });
  }

  res
    .status(err.status || 500)
    .json({ message: err.message || "Default error message..." });
});
module.exports = app;
