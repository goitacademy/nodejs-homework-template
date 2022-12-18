const express = require("express");
// midleware, кот выводит сообщение о том какой запрос куда был
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();

const contactsRouter = require("./routes/api/contacts");

const app = express();

// здесь сохраняется либо dev либо short и передается в logger
const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
// для считывания тела запроса в формате json
app.use(express.json());

// все запросы, кот начинаются с /api/contacts будут обрабатываться в contactsRouter
app.use("/api/contacts", contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

// обработчик ошибок 1-й параметр err
app.use((err, req, res, next) => {
  // const { status = 500, message = "Server error" } = err;
  const { status = 500 } = err;
  res.status(status).json({ message: err.message });
});

module.exports = app;

//* создание Веб-сервера
// const express = require("express");
// const cors = require("cors");
// const app = express();
// app.use(cors());
// app.use(express.json());
// app.listen(3300);
