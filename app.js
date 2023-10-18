import express from "express";
import logger from "morgan";
import cors from "cors";
// import contactsRouter from "./routes/api/contacts-routers";

import contactsRouter from "./routes/api/contacts-routers.js";
const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";
// middleware для вівода в консоль логов
app.use(logger(formatsLogger));
//
app.use(cors());

app.use(express.json()); //для того чтобы реквест боди можно было считать, переведя в джейсон из формата Буффер

// app.use((req, res, next) => {
//   console.log("Test Middlware");
// });

// Если маршрут начинается с "/api/contacts", то ищи марштуры в контактРоутер (обробник)
app.use("/api/contacts", contactsRouter);

// Если маршрут не найдет, то применяется єта мидлваре с 404 ошибкой
app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message } = err;
  res.status(status).json({ message: err.message });
});
// просто експортируем, но запускаем сервер в server.js
export default app;
