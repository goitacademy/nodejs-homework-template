import dotenv from "dotenv";
import express from "express";
import logger from "morgan";
import cors from "cors";

import contactsRouter from "./routes/api/contacts-router.js";
import authRouter from "./routes/api/auth-router.js";

dotenv.config();
const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use("/users", authRouter);
app.use("/api/contacts", contactsRouter); // Вказуємо шлях куди потрібно звертатись якщо прийшов запит на /api/contacts

app.use((req, res) => {
  res.status(404).json({ message: "Not found server" });
});

app.use((err, req, res, next) => {
  // При помилці відпрацює данна функція
  res.status(err.status || 500).json({ message: err.message });
});

export default app;
