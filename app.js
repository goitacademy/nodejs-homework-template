const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const contactsRouter = require("./routes/api/contacts");
const authRouter = require("./routes/api/auth");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);
app.use("/api/users", authRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  if (err.status) {
    return res.status(err.status).json({
      message: err.message,
    });
  }

  if (
    err.message.includes("Cannot read properties of null (reading 'password')")
  ) {
    return res.status(401).json({
      message: "Email or password is wrong",
    });
  }

  res.status(409).json({ message: err.message });

  res.status(500).json({ message: err.message });
});

module.exports = app;
