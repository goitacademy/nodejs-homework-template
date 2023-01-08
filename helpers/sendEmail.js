const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const { SINDGRID_API_KEY } = process.env;

sgMail.setApiKey(SINDGRID_API_KEY);

const sendEmail = async (data) => {
  try {
    const email = { ...data, from: "ysb.ptc@gmail.com" };
    await sgMail.send(email);
    return true;
  } catch (error) {}
};

module.exports = sendEmail;
