require("./config/passport");
const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

const contactsRouter = require("./routes/contacts");
const usersRouter = require("./routes/users");

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(logger(formatsLogger));

app.use("/contacts", contactsRouter);
app.use("/user", usersRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  if (err.name === "ValidationError") {
    return res
      .status(400)
      .json({ status: "error", code: 400, message: err.message });
  }
  res.status(500).json({ status: "fail", code: 500, message: err.message });
});

module.exports = app;
