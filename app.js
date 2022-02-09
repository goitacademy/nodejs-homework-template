const express = require("express");
const logger = require("morgan");
const cors = require("cors");

// писать в апп, что бы переменные окружения были доступны везде
require("dotenv").config();

const { contactsRouter } = require("./routes/api/contactsRouter");
const {
  errorHandlerNotFound,
  errorHandlerServerError,
} = require("./src/helpers/apiHelpers");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);

// порядок подключаемого промежуточного ПО имеет значение. В конце приложения идет обработка ошибок. Вначале происходит обработка несуществующего роута или ошибка 404
app.use(errorHandlerNotFound);

app.use(errorHandlerServerError);

module.exports = app;
