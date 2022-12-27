require("dotenv").config();

const nodemailer = require("nodemailer");

const { META_UA_PASSWORD } = process.env;

const config = {
  host: "mntp.meta.ua",
  port: 465,
  secure: true,
  auth: {
    user: "testerovych@meta.ua",
    pass: META_UA_PASSWORD,
  },
};

const transporter = nodemailer.createTransport(config);

async function sendEmail(emailOptions) {
  try {
    if (!emailOptions) {
      return;
    }
    const res = transporter.sendMail(emailOptions);

    return res;
  } catch (error) {
    console.log(error);
    return error;
  }
}

module.exports = sendEmail;
