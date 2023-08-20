const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv"); // імпортуємо пакет doterv який завантажує змінні середовища з .env

const authRouter = require("./routes/api/auth");
dotenv.config(); // викликаємо метод config який у корні проєкту шукає файл .env і дані з цього файлу додає у змінні оточення (об'єкт process.env)

const contactsRouter = require("./routes/api/contacts"); // імпортуємо "сторінку записної книжки"

const app = express(); // створюємо веб-сервер

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger)); // міделвара яка виводить у консоль інформацію про запит

app.use(cors()); // міделвара кросдомених запитів-скорочений запис(Прим.1)

app.use(express.json()); // міделвара яка перевіряє чи є тіло в запиті при виклику функції додавання контакту

app.use("/users", authRouter);
app.use("/api/contacts", contactsRouter); // вказуємо серверу де знаходяться маршрути для всіх запитів які починаються з - /api/contacts

// обробляємо помилку 404 в ситуації коли запит прийшов на адресу якої не має
app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

// обробка помилок
app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;
