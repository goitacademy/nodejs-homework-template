const nodemailer = require("nodemailer");
require("dotenv").config();

const { META_PASSWORD } = process.env;

const nodemailerConfig = {
  host: "smtp.meta.ua",
  port: 465, //25, 465, 2525
  secure: true,
  auth: {
    user: "inna.pokydko@meta.ua",
    pass: META_PASSWORD,
  },
};

const transport = nodemailer.createTransport(nodemailerConfig);

const sendEmail = async (email) => {
  try {
    await transport.sendMail(email);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending verification email:", error.message);
    throw error;
  }
};

module.exports = sendEmail;



// const nodemailer = require("nodemailer");
// require("dotenv").config();

// const {META_PASSWORD} = process.env;

// const nodemailerConfig = {
//     host: "smtp.meta.ua",
//     port: 465, //25, 465, 2525
//     secure: true,
//     auth: {
//         user: "inna.pokydko@meta.ua",
//         pass: META_PASSWORD
//     }
// };

// const transport = nodemailer.createTransport(nodemailerConfig);

// const email = {
//     to: "sea@gmail.com",
//     from: "inna.pokydko@meta.ua",
//     subject: "Test email",
//     html: "<p><strong>Test email</strong> from localhost:3000</p>"
// };

// transport.sendMail(email)
//     .then(()=> console.log("Email send success"))
//     .catch(error => console.log(error.message));

  