const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const { TEST_SENDGRID_KEY } = process.env;

sgMail.setApiKey(TEST_SENDGRID_KEY);

const sendEmail = async (data) => {
  const mail = { ...data, from: "nura_arh@ukr.net" };
  await sgMail
    .send(mail)
    .then(() => console.log("Email send successfully"))
    .catch((err) => console.log(err.message));
  return true;
};

module.exports = sendEmail;
