const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const contactsRouter = require("./routes/api/contacts");
const signup = require("./controllers/auth");
const login = require("./controllers/auth");
const current = require("./controllers/auth");
const logout = require("./controllers/auth");
const { middleware } = require("./controllers/middleware");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);


app.use(express.urlencoded());
app.use("/api/users", signup);
app.use("/api/users", login);
app.use("/api/users", middleware, current);
app.use("/api/users", middleware, logout);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;
