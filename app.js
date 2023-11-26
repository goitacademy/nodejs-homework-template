const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const { auth } = require("./middlewares");

const contactsRouter = require("./routes/api/contacts");
const usersRouter = require("./routes/users");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/users", usersRouter);
app.use("/api/contacts", auth, contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use(({ status = 500, message }, req, res, next) => {
  res.status(status).json({ message: message });
});

module.exports = app;
