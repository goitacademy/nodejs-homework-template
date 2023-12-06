const nodemailer = require("nodemailer");
require("dotenv").config();

const { UKR_NET_PASSWORD } = process.env;

const nodemailerConfig = {
  host: "smtp.ukr.net",
  port: 2525,
  secure: true,
  auth: {
    user: "lera.maiorova@ukr.net",
    pass: UKR_NET_PASSWORD,
  },
};

const transport = nodemailer.createTransport(nodemailerConfig);

// const email = {
//   to: "maliv65188@jalunaki.com",
//   from: "lera.maiorova@ukr.net",
//   subject: "Test email",
//   html: "<p>from localhost:3000</p>",
// };
// transport
//   .sendMail(email)
//   .then(() => console.log("email send success"))
//   .catch((err) => console.log(err.message));

const sendEmail = async (data) => {
  const email = { ...data, from: "lera.maiorova@ukr.net" };
  await transport.sendMail(email);
  return true;
};

module.exports = sendEmail;
