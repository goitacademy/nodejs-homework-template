import nodemailer from "nodemailer";
import "dotenv/config.js";

const { META_PASSWORD, META_EMAIL } = process.env;
const config = {
  host: "smtp.meta.ua",
  port: 465,
  secure: true,
  auth: {
    user: META_EMAIL,
    pass: META_PASSWORD,
  },
};

const transporter = nodemailer.createTransport(config);

const sendEmail = (data) => {
  return transporter.sendMail({ ...data, from: META_EMAIL });
};
export default sendEmail;
