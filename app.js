// Web-Server (express)
// 1. Middlewares
// 2. Routes
// 3. Error handler
const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const authRouter = require("./routes/api/auth");
const contactsRouter = require("./routes/api/contacts");
const usersRouter = require("./routes/api/users");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger)); // middleware outputs data (requests)
app.use(cors());
app.use(express.json()); // checks Content-Type, parses body as an object

app.use("/api/auth", authRouter);
app.use("/api/contacts", contactsRouter);
app.use("/api/users", usersRouter);

// app.use((req, res) => {
//   res.status(404).json({ message: "Not found" });
// });

// app.use((err, req, res, next) => {
//   res.status(err.status || 500).json({ message: err.message });
// });

// const routerApi = require("./routes/api");
// app.use("/api/contacts", routerApi);

// Error handler
app.use((_, res, __) => {
  res.status(404).json({
    status: "error",
    code: 404,
    message: "Use api on routes: /api/contacts",
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
