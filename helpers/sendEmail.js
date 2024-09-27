const nodemailer = require("nodemailer");
const { UKR_NET_EMAIL, UKR_NET_PASSWORD } = process.env;

const nodemailerConfig = {
  host: "smtp.ukr.net",
  port: 465,
  secure: true,
  auth: {
    user: UKR_NET_EMAIL,
    pass: UKR_NET_PASSWORD,
  },
};

const transporter = nodemailer.createTransport(nodemailerConfig);

const sendEmail = async (emailOptions) => {
  const email = { ...emailOptions, from: UKR_NET_EMAIL };
  await transporter.sendMail(email);
  return true;
};

module.exports = sendEmail;
