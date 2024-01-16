import nodemailer from "nodemailer";
import "dotenv/config";

const { UKRNET_PASSWORD, UKRNET_FROM } = process.env;

const nodemailerCOnfig = {
  host: "smtp.ukr.net",
  port: 465,
  secure: true,
  auth: { user: UKRNET_FROM, pass: UKRNET_PASSWORD },
};

const transport = nodemailer.createTransport(nodemailerCOnfig);

const sendEmail = (data) => {
  const email = { ...data, from: UKRNET_FROM };
  return transport.sendMail(email);
};

export default sendEmail;
