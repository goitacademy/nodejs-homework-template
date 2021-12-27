const express = require("express");
const logger = require("morgan");
const cors = require("cors");
// const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const authRouter = require("./routes/api/auth");
const usersRouter = require("./routes/api/users");
const contactsRouter = require("./routes/api/contacts");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

// const { SENDGRID_API_KEY } = process.env;
// sgMail.setApiKey(SENDGRID_API_KEY);
// const email = {
//   to: "wegod24947@wiicheat.com",
//   from: "yura.gms@gmail.com",
//   subject: "Новая заявка с сайта",
//   html: "<p>С сайта пришла новая заявка</p>",
// };

// sgMail
//   .send(email)
//   .then(() => console.log("Email send success"))
//   .catch((error) => console.log(error.message));

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/api/auth", authRouter);
app.use("/api/users", usersRouter);
app.use("/api/contacts", contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  // res.status(500).json({ message: err.message })
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message: err.message });
});

module.exports = app;

// mongodb+srv://yuragms:<8DMDjaeKyTh9NR8>@cluster0.yg8ew.mongodb.net/test
// wegod24947@wiicheat.com
