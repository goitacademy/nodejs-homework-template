const express = require("express"); // Фреймворк для створення веб-додатків
const logger = require("morgan"); // Модуль для ведення журналу запитів до сервера
const cors = require("cors"); // Модуль для обробки Cross-Origin Resource Sharing (CORS)

// Підключення маршруту для обробки запитів, що стосуються контактів
const contactsRouter = require("./routes/api/contacts");

// Створення ВЕБ-серверу (об'єкту додатка Express)
const app = express();

// Визначення формату логування залежно від середовища виконання
const formatsLogger = app.get("env") === "development" ? "dev" : "short";

// Використання логгера з визначеним форматом
app.use(logger(formatsLogger));

// Використання CORS для обробки Cross-Origin запитів
app.use(cors());

// Використання вбудованого парсера JSON для обробки JSON-даних у тілі запиту
app.use(express.json()); // Щоб Експрес перетворив рядок-запит на JSON-об'єкт

// Використання маршруту /api/contacts для обробки запитів, що стосуються контактів
app.use("/api/contacts", contactsRouter);

// Обробник для невідомих маршрутів (404 Not Found)
app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

// Обробник помилок, які виникають під час обробки запитів
app.use((err, req, res, next) => {
  //! ------   ВАРІАНТ-2  ------
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
  //! ------   ВАРІАНТ-1  ------
  // res.status(500).json({ message: err.message });
});

// Експорт об'єкту додатка Express для використання в інших частинах програми
module.exports = app;
