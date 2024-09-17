const nodemailer = require("nodemailer");

const { UKR_NET_PASSWORD } = process.env;

const nodemailerConfig = {
  host: "smtp.ukr.net",
  port: 465,
  secure: true,
  auth: {
    user: "i.panteliuk@ukr.net",
    pass: UKR_NET_PASSWORD,
  },
};

const transport = nodemailer.createTransport(nodemailerConfig);

const sendEmail = async (data) => {
  const email = { ...data, from: "i.panteliuk@ukr.net" };
  await transport.sendMail(email);
  return true;
};

module.exports = sendEmail;
