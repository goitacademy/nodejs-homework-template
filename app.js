const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const contactsRouter = require("./routes/api/contacts.router");
const currentRouter = require("./routes/api/current.router");
const loginRouter = require("./routes/api/login.router");
const logoutRouter = require("./routes/api/logout.router");
const signupRouter = require("./routes/api/signup.router");
const updateUserSubscriptionRouter = require("./routes/api/updateUserSubscription.router");

const tokenMiddleware = require("./middleware/tokenMiddleware");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/api/signup", signupRouter);
app.use("/api/login", loginRouter);
app.use("/api/contacts", tokenMiddleware, contactsRouter);
app.use("/api/current", tokenMiddleware, currentRouter);
app.use("/api/logout", tokenMiddleware, logoutRouter);
app.use(
  "/api/updateUserSubscription",
  tokenMiddleware,
  updateUserSubscriptionRouter
);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;
