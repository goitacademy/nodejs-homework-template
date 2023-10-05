const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const { globalError } = require("./middlewares/globalError");

require("dotenv").config();

const contactsRouter = require("./routes/routesContacts");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";
app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api", contactsRouter);
app.use(globalError);

module.exports = app;
