const sgMail = require("@sendgrid/mail");

require("dotenv").config();

const { SENDGRID_API_KEY, EMAIL_FROM } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const sendEmail = async (data) => {
  const msg = { ...data, from: EMAIL_FROM };
  await sgMail.send(msg);
  return true;
};

module.exports = sendEmail;

// const msg = {
//   to: "rogol97699@pixiil.com",
//   from: EMAIL_FROM,
//   subject: "TEST EMAIL - Sending with SendGrid is Fun",
//   text: "and easy to do anywhere, even with Node.js",
//   html: "<strong>TEST EMAIL </strong>",
// };

// sgMail
//   .send(msg)
//   .then(() => {
//     console.log("Email sent");
//   })
//   .catch((error) => {
//     console.error(error);
//   });