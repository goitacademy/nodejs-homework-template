const sgMail = require("@sendgrid/mail");
const RequestError = require("./RequestError");
require("dotenv").config();

const { SENDGRID_API_KEY } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const sendEmail = async (data) => {
  const email = { ...data, from: "specter.ode@gmail.com" };
  try {
    await sgMail.send(email);
    console.log("sgMail sent");
  } catch (error) {
    throw RequestError(400, error.message);
  }
};

module.exports = sendEmail;
