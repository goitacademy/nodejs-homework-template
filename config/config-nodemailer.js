import nodemailer from "nodemailer";
import "dotenv/config";

const config = {
  host: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
};

const transporter = nodemailer.createTransport(config);
const emailOptions = {
  from: "chraper94@gmail.com",
  to: "chraper94@gmail.com",
  subject: "Nodemailer test",
  text: "Cześć. Testujemy wysyłanie wiadomości!",
};

transporter
  .sendMail(emailOptions)
  .then((info) => console.log(info))
  .catch((err) => console.log(err));
