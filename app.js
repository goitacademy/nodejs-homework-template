const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const path = require("path");

const contactsRouter = require("./routes/api/contacts");
const usersRouter = require("./routes/api/users");

const setJWTStrategy = require("./config/jwt");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

setJWTStrategy();

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "./public")));

app.use("/api/contacts", contactsRouter);
app.use("/api/users", usersRouter);

app.use((req, res, next) => {
    res.status(404).json({ message: `Not found - ${req.path}` });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Internal Server Error" });
});

module.exports = app;