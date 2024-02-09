const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const contactsRouter = require("./routes/api/contacts");
const authRouter = require("./routes/api/auth");
const usersRouter = require("./routes/api/users");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);
app.use("/api/users", usersRouter);
app.use("/api/auth", authRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error", code, name } = err;
  // res.status(500).json({ message: err.message });

  if (name === "ValidationError") {
    return res.status(400).json({ message });
  }

  if (message.includes("E11000")) {
    return res.status(400).json({ message: "Duplicated key!" });
  }

  res.status(status).json({ message });
});

module.exports = app;
