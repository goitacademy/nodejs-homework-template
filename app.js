const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const contactsRouter = require("./api/api");


const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";
app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use((_, res, __) => {
  res.status(404).json({
    status: "error",
    code: 404,
    message: "Use api on routes: /api/",
    data: "Not found",
  });
});
app.use("/api/contacts", contactsRouter);



app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;