const express = require("express");
const logger = require("morgan");
const cors = require("cors"); // обробка cors запитів

const contactsRouter = require("./routes/api/contacts");

const app = express(); // створення API

const formatsLogger = app.get("env") === "development" ? "dev" : "short"; // логування операцій залежно від режиму роботи

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json()); // обробка формату json в req.body

app.use("/api/contacts", contactsRouter); // імпорт окремого роуту

// обробка, якщо роуту не знайдено
app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

// функція обробки помилок
// по дефолту обробка помилки серверу
// обов'язково 4 аргументи!!!
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Server Error";
  res.status(status).json({ message: err.message });
});

module.exports = app;
