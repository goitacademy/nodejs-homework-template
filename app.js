const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const contactsRouter = require("./routes/api/contacts");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);

dotenv.config();
const { DB_HOST } = process.env;
mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log("database connect success");
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });

/*
1. Получить все товары.
2. Получить товар по id.
3. Добавить товар.
4. Обновить товар по id.
5. Удалить товар по id.
*/

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;
