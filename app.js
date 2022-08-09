const express = require("express");
const logger = require("morgan");
const moment = require("moment");
const fs = require("fs/promises");
const cors = require("cors");
const path = require("path");

const { errorHandler } = require("./Helpers/errorHandler");
const { authMiddleware } = require("./middlewares/authMiddleware");

const contactsRouter = require("./routes/api/contacts");
const authRouter = require("./routes/api/auth");
const usersRouter = require("./routes/api/users");

const { request } = require("express");
const FILE_DIR = path.resolve("./public");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(async (req, res, next) => {
  const { method, url } = req;
  const data = moment().format("DD-MM-YYYY_hh:mm:ss");
  await fs.appendFile("server.log", `\n${method} ${url} ${data}`);
  next();
});

app.use("/api/contacts", authMiddleware, contactsRouter);
app.use("/api/auth", authRouter);
app.use("/api/users", usersRouter);
app.use("/avatars", express.static(FILE_DIR));

app.use(errorHandler);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;
