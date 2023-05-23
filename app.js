const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");

// Third module
require("dotenv").config();

// IMPORT ALL ROUTS
const contactRouter = require("./routes/api/contacts");

const aurhRouter = require("./routes/api/auth");

const indexRouter = require("./routes/index");

const usersRouter = require("./routes/users");
// The WAY TO CONTACT.JSON

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", aurhRouter);
app.use("/api/contact", contactRouter);

// view engine setup
// app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "jade");

app.use(logger("dev"));

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
  // set locals, only providing error in development

  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
