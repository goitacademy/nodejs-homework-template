const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const contactsRouter = require("./routes/api/contacts.router");
const authRouter = require("./routes/api/auth.router");

// const { CustomError } = require("./helpers/errors");
const errorHandler = require("./helpers/errorHandler");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);
app.use("/api/users", authRouter);
app.use("/api/avatars", authRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

// app.use((err, req, res, next) => {
//   if (err instanceof CustomError) {
//     return res.status(err.status).json({ message: err.message });
//   }
//   res.status(500).json({ message: err.message });
// });

app.use(errorHandler);

module.exports = app;
