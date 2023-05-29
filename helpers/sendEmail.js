
const nodemailer = require('nodemailer');
require("dotenv").config();

const { UKR_NET_PASSWORD, UKR_NET_USER } = process.env;

const nodemailerConfig = {
  host: "smtp.ukr.net",
  port: 465, //25, 465, 2525
  secure: true,
  auth: {
    user: UKR_NET_USER,
    pass: UKR_NET_PASSWORD
  }
};

const transport = nodemailer.createTransport(nodemailerConfig);

const sendEmail = async (data) => {
  const email = { ...data, from: UKR_NET_USER };
  await transport.sendMail(email)
  // .then(() => console.log("Email send success"))
  // .catch(error=>console.log(error.message))
  return true;
}

// const email = {
//   to: "hawigok844@mevori.com",
//   from: UKR_NET_USER,
//   subject: "Verify email",
//   html: "<h1>Verify email</h1>"
// };

// transport.sendMail(email)
//   .then(() => console.log("Email send success"))
//   .catch(error=>console.log(error.message))


module.exports = sendEmail;










// EXAMPLE mailjet
// const Mailjet = require('node-mailjet');
// require('dotenv').config();

// const { MJ_APIKEY_PUBLIC, MJ_APIKEY_PRIVATE, MJ_SENDER_EMAIL } = process.env;

// const mailjet = new Mailjet({
//   apiKey: MJ_APIKEY_PUBLIC,
//   apiSecret: MJ_APIKEY_PRIVATE,
// });

// /*
// data={
//     to:"",
//     subject:"",
//     html:""
// }
// */
// const sendEmail = async (data) => {
// await mailjet.post('send', { version: 'v3.1' }).request({
//           Messages: [
//             {
//               From: {
//                 Email: MJ_SENDER_EMAIL
//               },
//               To: [
//                 {
//                   Email: data.to
//                 }
//               ],
//               Subject: data.subject,
//               HTMLPart: data.html
//             }
//           ]
// })
//     return true;
// };
// EXAMPLE mailjet FIN


