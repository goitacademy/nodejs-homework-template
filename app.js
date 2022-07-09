const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const contactsRouter = require("./routes/api/contacts");

const app = express();

// настройки моргана
const formatsLogger = app.get("env") === "development" ? "dev" : "short";

// мидлвары
// морган - логирует в консоле действия на сервере
app.use(logger(formatsLogger));

app.use(cors());
// мидлвар который переделывает тело post запроса с json на обьект. если не добавлен будем получать undefined
app.use(express.json());

// что делать если есть запрос на маршрут /api/contacts
app.use("/api/contacts", contactsRouter);

// что делать если запрос на не существующий маршрут
app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

// обрабатывает все ошибки сервера(и прокинутые через next в catch)
app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;
