const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const connectDB = require("./config/db");

const contactsRouter = require("./routes/api/contacts");
const signupRouter = require("./routes/api/users/signup");
const loginRouter = require("./routes/api/users/login");
const logoutRouter = require("./routes/api/users/logout");
const currentRouter = require("./routes/api/users/current");
const avatarsRouter = require("./routes/api/users/avatars");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

connectDB();

app.use(express.static("public"));

app.use("/api/contacts", contactsRouter);
app.use("/api/users/signup", signupRouter);
app.use("/api/users/login", loginRouter);
app.use("/api/users/logout", logoutRouter);
app.use("/api/users/current", currentRouter);
app.use("/api/users/avatars", avatarsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const statusCode = err.status || 500;
  res.status(statusCode).json({ message: err.message });
});

module.exports = app;
