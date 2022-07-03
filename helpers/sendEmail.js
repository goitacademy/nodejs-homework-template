const nodemailer = require('nodemailer');

require('dotenv').config();

const { META_PASSWORD } = process.env;

const config = {
  host: 'smtp.meta.ua',
  port: 465,
  secure: true,
  auth: {
    user: 'ortbg1988@meta.ua',
    pass: META_PASSWORD,
  },
};

const transporter = nodemailer.createTransport(config);

const sendMail = async data => {
  try {
    await transporter.sendMail({ ...data, from: "ortbg1988@meta.ua" });
    return true;
  } catch (e) {
    console.log(e.message);
    throw e;
  }
}

module.exports = sendMail;