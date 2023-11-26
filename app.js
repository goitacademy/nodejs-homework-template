const express = require("express");
const logger = require("morgan");
const globalErrorHandler = require("./controllers/errorController");
const AppError = require("./utils/appError");
const cors = require("cors");

const contactsRouter = require("./routes/api/contacts");
const authRouter = require("./routes/api/auth");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"))

app.use("/api/users", authRouter);
app.use("/api/contacts", contactsRouter);
app.use("/api", require("./routes/news.route"));
app.use("/api", require("./routes/blog.route"));
app.use("/api", require("./routes/projects.route"));
app.use("/api", require("./routes/events.route"));

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);
module.exports = app;
