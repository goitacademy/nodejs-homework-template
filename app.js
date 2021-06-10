const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const isLoggedIn = require("./helpers/is-loggedin");
const { ContactsRoutePaths, UsersRoutePaths } = require("./helpers/routePaths");
const { HttpCodes, Limits, Statuses } = require("./helpers/constants");
const { ResourseNotFoundMessage } = require("./helpers/messages");
const contactsRouter = require("./routes/api/contacts/contacts");
const usersRouter = require("./routes/api/users/users");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json({ limit: Limits.JSON }));

app.use(ContactsRoutePaths.root, isLoggedIn, contactsRouter);
app.use(UsersRoutePaths.root, usersRouter);

app.use((req, res) => {
  res.status(HttpCodes.NOT_FOUND).json(ResourseNotFoundMessage);
});

app.use((err, req, res, next) => {
  const statusCode = err.status || HttpCodes.INTERNAL_SERVER_ERROR;
  res.status(statusCode).json({
    status:
      statusCode === HttpCodes.INTERNAL_SERVER_ERROR
        ? Statuses.fail
        : Statuses.error,
    code: statusCode,
    message: err.message,
  });
});

module.exports = app;
