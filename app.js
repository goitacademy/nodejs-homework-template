const express = require("express");
const logger = require("morgan");
const cors = require("cors");

// доступ к .env
require("dotenv").config();

const usersRouter = require("./routes/api/authorization");
const contactsRouter = require("./routes/api/contacts");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// маршрут -> роут
app.use("/api/auth", usersRouter);
app.use("/api/contacts", contactsRouter);

// выдает ошибку 404, если машрут не найден
app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

// универсальная мидлвара выдачи ошибки
app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;
