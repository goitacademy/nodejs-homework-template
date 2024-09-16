const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const contactsRouter = require("./routes/api/contacts");

// создаем сервер основной
const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";
// ?
app.use(logger(formatsLogger));

// cors - разрешает кроссдоменный запрос ( запрет серверов КОРС)
app.use(cors());
// для передачи тела в JSON формате (  когда записываем на сервер)
app.use(express.json());

// (основной запрос, все последующие ищи в этом файле)

app.use("/api/contacts", contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;
