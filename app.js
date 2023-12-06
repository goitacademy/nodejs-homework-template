const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const dotnev = require("dotenv");
dotnev.config();

const nodemailer = require("nodemailer");

const { GMAIL_PASSWORD } = process.env;

const nodemailerConfig = {
  host: "smtp.ukr.net",
  port: 2525,
  secure: true,
  auth: {
    user: "lera.maiorova@ukr.net",
    pass: GMAIL_PASSWORD,
  },
};

const transport = nodemailer.createTransport(nodemailerConfig);

const email = {
  to: "maliv65188@jalunaki.com",
  from: "lera.maiorova@ukr.net",
  subject: "Test email",
  html: "<p>from localhost:3000</p>",
};
transport
  .sendMail(email)
  .then(() => console.log("email send success"))
  .catch((err) => console.log(err.message));

const { contactsRouter } = require("./routes/api");
const { authRouter } = require("./routes/api");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/api/contacts", contactsRouter);
app.use("/users", authRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;
