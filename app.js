const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const contactsRouter = require("./routes/api/contacts"); // імпортуємо "сторінку записної книжки"
const app = express(); // створюємо веб-сервер

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger)); // міделвара яка виводить у консоль інформацію про запит

app.use(cors()); // міделвара кросдомених запитів-скорочений запис(Прим.1)

app.use(express.json()); // міделвара яка перевіряє чи є тіло в запиті при виклику функції додавання контакту

app.use("/api/contacts", contactsRouter); // вказуємо серверу де знаходяться маршрути для всіх запитів які починаються з - /api/contacts

// обробляємо помилку 404 в ситуації коли запит прийшов на адресу якої не має
app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

// обробка помилок
app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });

  // res.status(500).json({ message: err.message });
});

module.exports = app;

// =====================================================================
/**
 ** Прим.1
 * створюємо міделвару яка дозволяє кросдомені запити тобто запити які приходять з адреси яка відрізніється від адреси на якій запущений сервер.
 * 
 * повний запис:
 * const corsMiddleware = cors();
 * app.use(corsMiddleware);
 * 
 * 
 * 

 
 */
