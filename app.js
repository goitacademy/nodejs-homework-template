const express = require("express");
const logger = require("morgan");
const cors = require("cors");
// const { NotFound, InternalServerError } = require("http-errors");
const { contactsRouter } = require("./routes/api");
const { authRouter } = require("./routes/api");
const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(cors());
app.use(logger(formatsLogger));
app.use(express.json());

app.use("/api/v1/contacts", contactsRouter);
app.use("/api/v1/users", authRouter);

app.use((_, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, _req, res, _next) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;
