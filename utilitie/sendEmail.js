const nodemailer = require("nodemailer");
require("dotenv").config();

const { EMAIL_PASS, EMAIL_FROM} = process.env;

const config = {
    host: "smtp.meta.ua",
    port: 465,
    secure: true,
    auth: {
      user: "yuliyasoloveniuk@meta.ua",
      pass: EMAIL_PASS,
    },
  };
  
  const emailTransport = nodemailer.createTransport(config);
//   const emailOptions = {
//     from: EMAIL_FROM,
//     to: USER_EMAIL,
//     subject: 'Verification for email',
//     text: 'Confirm your email!',
//     html: '<h1>Email must be confirmed!</h1>'
//   };
  
//   emailTransport
//     .sendMail(emailOptions)
//     .then(() => console.log("Email send success"))
//     .catch(err => console.log(err));

// const data = {
//     to: "deyena9429@ipniel.com",
//     subject: "Test email",
//     html: "<strong>Test email</strong>"
// };

const sendEmail = data => {
    const email = {...data, from: EMAIL_FROM};
    return emailTransport.sendMail(email)
}

module.exports = sendEmail;