const express = require("express");
const logger = require("morgan"); // спец мідлвар який виводить у консоль інфо про запит(іноді то потрібно щоб дебажити код)
const cors = require("cors"); // дозволяє виконання кросдоменних запитів
const path = require("node:path");

const app = express();
// підключення бази даних
require("./mongoose/mongoose");

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

// app.use - middleware (методи для обробки HTTP-запитів)
app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

// підключення шляхів по яким будуть відбуватися HTTP-запити
const contactsRouter = require("./routes/api/contacts");
const authRouter = require("./routes/api/auth");
const userRouter = require("./routes/api/users");
const auth = require("./middleware/auth");

// використання шляху та його підключення + наявність авторизації 
app.use("/api/contacts", contactsRouter);
app.use("/users", authRouter);
app.use("/users",auth, userRouter);

// якщо буде get запит на /avatars то віддати статичні файли з public / avatars
app.use("/avatars", express.static(path.join(__dirname, "public", "avatars")));

// Обробка помилок
app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});
app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;
