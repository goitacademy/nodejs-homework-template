const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const contactsRouter = require("./routes/api/contacts");
const authRouter = require("./routes/api/auth");
const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/avatars", express.static("public/avatars"));
app.use("/api/contacts", contactsRouter);
app.use("/users", authRouter);
app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const {
    status = 500,
    message = err.message,
    code = err.status,
    result = err.result,
  } = err;
  res.status(status).json({ code, status: result, message });
});

module.exports = app;
