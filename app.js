const express = require("express");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();
require("./db");
// const contactsRouter = require("./routes/api/contacts");
const req = require("express/lib/request");
const routes = require("./routes");
const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api", routes);

//Handle 404
app.use((req, res, next) => {
  res.status(404).json({ message: "Not found" });
});

//Handle 500
app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;
