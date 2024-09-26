const sgMail = require("@sendgrid/mail");
require("dotenv").config();
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;

sgMail.setApiKey(SENDGRID_API_KEY);

//загальна інформація хто відправив email
const sendEmail = async (data) => {
  const email = { ...data, from: "myshko.alona@gmail.com" };
  await sgMail.send(email);
  return true;
};
// sendEmail({
//     to:"evstafienko_a@ukr.net",
//     subject:"try send email",
//     html:"<p><b>Hey!</b>I do it, send email.</p>"
// })
module.exports = sendEmail;
