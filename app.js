const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const contactsRouter = require("./routes");
const notFoundMiddleware = require("./middlewares/notFound");
const errorHandlerMiddleware = require("./middlewares/errorHandler");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";
app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);

app.use("/api", contactsRouter());

app.use(notFoundMiddleware);

app.use(errorHandlerMiddleware);

module.exports = app;
