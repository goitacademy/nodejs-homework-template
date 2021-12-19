const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");

const contactsRouter = require("./routes/contacts");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.set("views", "./views");
app.set("view engine", "ejs");

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(
  "/",
  contactsRouter
); /* первый параметр - рутовый маршрут от которого строятся все следующие из contactsRouter */

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;
