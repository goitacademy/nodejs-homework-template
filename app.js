const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");

const contactsRouter = require("./routes/api/contacts");
const { handleMongooseErr } = require("./helpers");
const { route, status } = require("./consts");

dotenv.config();
const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use(route.ROOT, contactsRouter);

app.use((req, res) => {
  res.status(status.NOT_FOUND.status).json(status.NOT_FOUND);
});

app.use((err, req, res, next) => {
  const error = handleMongooseErr(err);

  const { status = 500, message = "Internal Server Error" } = error;
  res.status(status).json({ status, message });
});

module.exports = app;
