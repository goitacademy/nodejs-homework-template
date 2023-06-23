const express = require("express");
require("dotenv").config({ path: "./.env" });
const logger = require("morgan");
const cors = require("cors");

const contactsRouter = require("./routes/api/contacts.js");
const usersRouter = require("./routes/api/users.js");
const { auth } = require("./auth/auth.js");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", auth, contactsRouter);
app.use("/api/users", usersRouter);

app.use((req, res) => {
  res.status(404).json({
    status: "error",
    code: 404,
    message: `Use api on routes: 
    /api/registration - registration user {username, email, password}
    /api/login - login {email, password}
    /api/list - get message if user is authenticated`,
    data: "Not found",
  });
});

app.use((err, req, res, next) => {
  res.status(500).json({
    status: "fail",
    code: 500,
    message: err.message,
    data: "Something went wrong",
  });
});

module.exports = app;