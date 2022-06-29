/* Sendgrid mail */
const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const { SENDGRID_API_KEY } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);
const sendEmail = async (data) => {
  const email = { ...data, from: "sumcue@gmail.com" };
  try {
    await sgMail.send(email);
    return true;
  } catch (error) {
    console.log("Don't send");
  }
};

/* Nodemailer */

// const nodemailer = require("nodemailer");
// const aws = require("@aws-sdk/client-ses");
// const { defaultProvider } = require("@aws-sdk/credential-provider-node");
// require("dotenv").config();

// const ses = new aws.SES({
//   apiVersion: "2010-12-01",
//   region: "eu-north-1",
//   defaultProvider,
// });

// const transporter = nodemailer.createTransport({
//   SES: { ses, aws },
// });

// const sendEmail = async (data) => {
//   try {
//     await transporter.sendMail({
//       ...data,
//       from: "sumcue@gmail.com",
//     });
//   } catch (error) {
//     console.log("Don't send");
//   }
// };

module.exports = sendEmail;
