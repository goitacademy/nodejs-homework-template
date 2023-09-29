const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const authRouter = require('./routes/api/auth')
const contactsRouter = require("./routes/api/contacts");
const app = express();

const ErrorHandler = require("./middlewares/ErrorHandler");

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"))

app.use("/api/users", authRouter)
app.use("/api/contacts", contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use(ErrorHandler);

module.exports = app;
