// rU_YP5hCjhf_gXH;
const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const bcrypt = require("bcryptjs");

const password = "123456";

const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
console.log(hashPassword);
const result1 = bcrypt.compareSync(password, hashPassword);
const result2 = bcrypt.compareSync("passwort", hashPassword);
console.log(result1);
console.log(result2);

const dotenv = require("dotenv");
// require("dotenv").config();
dotenv.config();

const authRouter = require("./routes/api/auth");
const contactsRouter = require("./routes/api/contacts");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/contacts", contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;
