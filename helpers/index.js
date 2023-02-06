const nodemailer = require("nodemailer");
require("dotenv").config();

const { USER_EMAIL, USER_PASS } = process.env;

function HttpError(status, message) {
  const err = new Error(message);
  err.status = status;
  return err;
}

function NotFound(req, res) {
  res.status(404).send(`This path ${req.baseUrl} can't found`);
}

function tryCatchWrapper(enpointFn) {
  return async (req, res, next) => {
    try {
      await enpointFn(req, res, next);
    } catch (error) {
      return next(error);
    }
  };
}

async function sendMail({ to, html, subject }) {
  const email = {
    from: "zubenkoad@meta.ua",
    to,
    subject,
    html,
  };

  const transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: USER_EMAIL,
      pass: USER_PASS,
    },
  });
  console.log(email);
  await transport.sendMail(email);
}

module.exports = {
  HttpError,
  NotFound,
  sendMail,
  tryCatchWrapper,
};
