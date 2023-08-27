const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const { SENDGRID_API_KEY } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const sendEmail = async (data) => {
  const email = { ...data, from: "maracasimova@gmail.com" };

  await sgMail
    .send(email)
    .then(() => console.log("Email send successfully"))
    .catch((err) => console.log(err.message));
  return true;
};

module.exports = sendEmail;
