const nodemailer = require("nodemailer");

const { USER_NAME, USER_PASSWORD } = process.env;

const nodemailerConfig = {
  host: "smtp.mailgun.org",
  port: 587,
  auth: {
    user: USER_NAME,
    pass: USER_PASSWORD,
  },
};

const transport = nodemailer.createTransport(nodemailerConfig);

const sendEmail = async (data) => {
  const email = { ...data, from: USER_NAME };
  await transport.sendMail(email);
  return true;
};

module.exports = sendEmail;
