import dotenv from "dotenv"; // Бібліотека для роботи зі зміними оточення
import express from "express"; // Імпортуємо бібліотеку експресс для створення WEB-SERVER
import logger from "morgan";
import cors from "cors"; // Бібліотека для крос домених запитів

import contactsRouter from "./routes/api/contacts-router.js";
import authRouter from "./routes/api/auth-router.js";

dotenv.config(); // Запускаємо бібліотеку для роботи зі зміними оточення
const app = express(); // Викликаємо express та створюємо SERVER

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors()); // Запускаємо cors для запитів
app.use(express.json());
app.use(express.static("public")); // Методом static ми дозволяємо роздачу з певної директорії
app.use("/users", authRouter); // Вказуємо шлях куди потрібно звертатись якщо прийшов запит на /users
app.use("/api/contacts", contactsRouter); // Вказуємо шлях куди потрібно звертатись якщо прийшов запит на /api/contacts

// Данна функція спрацьовує коли надісланий запит з неправильним маршрутом
app.use((req, res) => {
  // Вівдповідь відправляємо 404 помилку та меседж Not found server
  res.status(404).json({ message: "Not found server" });
});

app.use((err, req, res, next) => {
  // При помилці відпрацює данна функція
  res.status(err.status || 500).json({ message: err.message });
});

export default app;
