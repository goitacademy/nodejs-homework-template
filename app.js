const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const path = require('path');
require("dotenv").config();
const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

require("./config/config-passport");

const contactsRouter = require("./routes/api/contactsApi");
const userRouter = require("./routes/api/usersApi");
app.use("/api/users/", userRouter);
app.use("/api/contacts", contactsRouter);

app.use((_, res, __) => {
  res.status(404).json({
    message: `
    Use api on routes: 
    /api/users/signup - registration user {email, password}
    /api/users/login - login user {email, password}
    /api/users/logout - logout user
    /api/users/current - current user info
    /api/contacts - get all contacts - for authorized users
    /api/contacts/:contactId - get, delete or update contact - for authorized users
    `,
    data: "Not found",
  });
});

app.use((err, _, res, __) => {
  console.log(err.stack);
  res.status(500).json({
    status: "fail",
    code: 500,
    message: err.message,
    data: "Internal Server Error",
  });
});

module.exports = app;