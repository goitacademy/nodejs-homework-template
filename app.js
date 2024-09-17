
const path = require("node:path")

const express = require("express");

const logger = require("morgan");
const cors = require("cors");
const authRouter = require("./routes/api/auth");
const contactsRouter = require("./routes/api/contacts");

const userRouter = require("./routes/api/users");
require("dotenv").config();

const app = express();
app.use("/avatars", express.static(path.join(__dirname, "public","avatars")));

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use("/api/users", authRouter);
app.use("/api/users", userRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found my page!" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;
