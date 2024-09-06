const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const contactsRouter = require("./routes/api/contacts");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);

app.use((error, req, res, next) => {
  console.error(error);
  const status = error.status || 500;
  const message = error.message || "Internal server error";
  res.status(status).json({ message });
});

module.exports = app;
