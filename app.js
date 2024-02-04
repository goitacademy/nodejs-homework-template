// app.js
import express from "express";
import dotenv from "dotenv";
import contactsRouter from "./routes/api/contacts-router.js";
import authRouter from "./routes/api/auth-router.js";
import avatarRouter from "./routes/api/avatar-router.js"; // Додано новий роутер для аватарок

dotenv.config();

const app = express();

app.use(express.json());

app.use("/api/users", authRouter);
app.use("/api/contacts", contactsRouter);
app.use("/api/users", avatarRouter); // Додано новий роут для аватарок

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

export default app;
