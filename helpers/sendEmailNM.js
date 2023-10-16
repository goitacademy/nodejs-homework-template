import "dotenv/config";
import nodemailer from "nodemailer";

const { NMAIL_EMAIL_FROM, NMAIL_PASS } = process.env;

// const msg = {
//   to: "chigorv@ukr.net",
//   from: NMAIL_EMAIL_FROM,
//   subject: "Sending with nodemailer is Fun",
//   text: "and easy to do anywhere, even with Node.js",
//   html: "<strong>and easy to do anywhere, even with Node.js</strong>",
// };

export const sendEmailNM = async (data) => {
  const email = { ...data, from: NMAIL_EMAIL_FROM };

  const nodemailerConfig = {
    host: "smtp.meta.ua",
    port: 465,
    secure: true,
    auth: {
      user: NMAIL_EMAIL_FROM,
      pass: NMAIL_PASS,
    },
  };
  const transporter = nodemailer.createTransport(nodemailerConfig);
  try {
    await transporter.sendMail(email);
    console.log(`Email to ${data.mail} send success !`);
  } catch (err) {
    console.log(err.message);
  }

  return true;
};
