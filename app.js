const express = require("express");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();

const routers = require("./routes/api");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/api/contacts", routers.contactsRouter);
app.use("/api/auth", routers.authRouter);
app.use("/api/users", routers.userRouter);

app.use((req, res) => {
  res.status(404).json({
    status: "Error",
    code: 404,
    message: "Not found",
  });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({
    status: "Error",
    code: status,
    message: message,
  });
});

module.exports = app;
