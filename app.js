const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const contactsRouter = require("./routes/api/contacts");

const app = express();

// настройки морган

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

// мидлвары
// морган - логирует в консоле действия на сервере

app.use(logger(formatsLogger));

app.use(cors());

// мидлвар который переделывает тело post запроса с json на обьект. если не добавлен будем получать undefined

app.use(express.json());

app.use("/api/contacts", contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;
