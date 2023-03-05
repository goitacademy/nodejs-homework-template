const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const { SG_API_TOKEN } = process.env;
sgMail.setApiKey(SG_API_TOKEN);

const sendEmail = async (data) => {
  const email = { ...data, from: "testkrasti@gmail.com" };
  try {
    await sgMail.send(email);
    return true;
  } catch (error) {
    throw error;
  }
};

module.exports = sendEmail;
