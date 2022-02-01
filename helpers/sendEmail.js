const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const { SENDGRID_API_KEY } = process.env;
const { SENDER_EMAIL } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);
/*
data = {
    to: "lohimec589@peykesabz.com",
    subject: "Новая заявка с сайта",
    html: "<p>Ваша заявка в обработке</p>"}
*/

async function sendEmail(data) {
  // eslint-disable-next-line no-useless-catch
  try {
    const email = { ...data, from: `${SENDER_EMAIL}` };
    await sgMail.send(email);
    return true;
  } catch (error) {
    throw error;
  }
}

module.exports = sendEmail;
