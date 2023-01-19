const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const userMiddleware = require("./middlewares/user");

const contactsRouter = require("./contacts/router");
const usersRouter = require("./users/router");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app
  .use(logger(formatsLogger))
  .use(cors())
  .use(express.json())
  .use("/api/contacts", contactsRouter)
  .use("/users", usersRouter)
  .use((err, req, res, next) => {
    if (err instanceof mongoose.Error.DisconnectedError) {
      res.status(500).json({ message: err.message });
    } else if (err instanceof mongoose.Error.DocumentNotFoundError) {
      res.status(404).json({ message: "Document not found" });
    }
  });

module.exports = app;
