const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const contactsRouter = require("./api");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

require("./config/passport/config-passport");

app.use("/api", contactsRouter);

app.use((_, res, __) => {
  res.status(404).json({
    message: "Use api on routes: /api/contacts or /api/users",
  });
});

app.use((err, _, res, __) => {
  console.log(err.stack);
  res.status(500).json({
    message: err.message,
  });
});

module.exports = app;
