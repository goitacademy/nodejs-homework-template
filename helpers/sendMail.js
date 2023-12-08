import "dotenv/config";
import nodemailer from "nodemailer";

const { NODE_EMAIL, NODE_EMAIL_PASSWORD } = process.env;

const config = {
  host: "smtp.ukr.net",
  port: 465,
  secure: true,
  auth: {
    user: NODE_EMAIL,
    pass: NODE_EMAIL_PASSWORD,
  },
};

const transporter = nodemailer.createTransport(config);

const sendMail = (email) => {
  const data = { ...email, from: NODE_EMAIL };

  return transporter.sendMail(data);
};

export default sendMail;
