require("dotenv").config();
const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const path = require("path");

const AVATARS_OF_USERS = process.env.AVATARS_OF_USERS;

const { HttpCode } = require("./helpers/constants");

const contactsRouter = require("./routes/api/contacts");
const usersRouter = require("./routes/api/users");

const app = express();

app.use(express.static(path.join(__dirname, "public", AVATARS_OF_USERS)));
const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);
app.use("/api/users", usersRouter);

app.use((req, res) => {
  res.status(HttpCode.NOT_FOUND).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res
    .status(err.status || HttpCode.INTERNAL_SERAVER_ERROR)
    .json({ message: err.message });
});

module.exports = app;
