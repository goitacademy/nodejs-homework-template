const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const authMiddleware = require("./middlewares/jwt");

const contactsRouter = require("./routes/api/contacts");
const authRouter = require("./routes/api/auth");
const listRouter = require("./routes/api/current");
const logoutRouter = require("./routes/api/logout");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", authMiddleware, contactsRouter);
app.use("/users", authRouter);
app.use("/users/current", authMiddleware, listRouter);
app.use("/users/logout", authMiddleware, logoutRouter);

app.use((err, _, res, __) => {
  console.log(err.stack);

  res.status(500).json({
    message: err.message,
  });
});

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;
