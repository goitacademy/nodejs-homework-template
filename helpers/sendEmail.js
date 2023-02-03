const nodemailer = require("nodemailer");
const { HttpError } = require("./index");
const { EMAIL_USER, EMAIL_PASS } = process.env;
const dotenv = require("dotenv");
dotenv.config();

const sendEmail = async ({ to, subject, html }) => {
  try {
    const email = {
      from: "bazilevich098@gmail.com",
      to,
      subject,
      html,
    };
    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
      },
    });

    await transport.sendMail(email);
    return true;
  } catch (error) {
    throw HttpError(error.status, error.message);
  }
};

module.exports = {
  sendEmail,
};
