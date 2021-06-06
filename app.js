const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const helmet = require("helmet"); // подключение защиты
const rateLimit = require("express-rate-limit"); // подключение пакета по ограничению доступов по api к серверу
const boolParser = require("express-query-boolean"); // подключение пакета, который при фильтрации boolean-выражений, чтобы не ломался код, и выражение вместо Boolean становилось String

const { limeterAPI } = require("./helpers/constants");

const app = express();

app.use(helmet()); // подключение защиты

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json({ limit: 10000 })); // всегда нужно ограничивать лимит, чтобы не положили сервер
app.use(boolParser()); // подключение пакета, который при фильтрации boolean-выражений, чтобы не ломался код, и выражение вместо Boolean становилось String

app.use("/api/", rateLimit(limeterAPI)); // подключение пакета по ограничению доступов по api к серверу

// подключение роутеров (usersRouter и contactsRouter), которые вынесены в отдельный файл для удобства кода routes/api/index
app.use("/api/", require("./routes/api"));

app.use((req, res) => {
  res.status(404).json({ status: "error", code: 404, message: "Not found" });
});

app.use((err, req, res, next) => {
  const status = err.status || 500;
  res
    .status(status)
    .json({ status: "fail", code: status, message: err.message });
});

process.on("unhandledRejection", (reason, promise) => {
  console.log("Unhandled Rejection at:", promise, "reason:", reason);
  // unhandledRejection применяется для отлавливания и исправления ошибок если какой-либо async await ошибочно завершился, или остался необработанным try{}catch(){}
});

module.exports = app;
