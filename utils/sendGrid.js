const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const { SENDGRID_API_KEY } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

// настройка sendgrid

const sendEmail = async (data) => {
  /* data объект в котором:
  { to: "email", subject: "тема", from: "solik098@gmail.com", html: "<p>Текст<p/>",}
   */

  const email = { ...data, subject: "Email verification" };

  try {
    sgMail.send(email);
    return true;
  } catch (error) {
    throw new Error();
  }
};

module.exports = sendEmail;
