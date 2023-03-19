const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const { SENDGRID_API_KEY } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const sendEmail = async (data) => {
  const email = { ...data, from: "mixaluch11@i.ua" };
  try {
    await sgMail.send(email);
    return true;
  } catch (error) {
    throw error;
  }
};
// const email = {
//   to: email,
//   from: "mixaluch11@i.ua",
//   subject: "Новий контакт",
//   html: "<p>Новий контакт доданий до вашого списку</p>",
// };
module.exports = sendEmail;
