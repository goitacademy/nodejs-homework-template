// const nodemailer = require("nodemailer");

// require("dotenv").config();

// const config = {
//   host: "smtp.forwardemail.net",
//   port: 465,
//   secure: true,
//   auth: {
//     user: "apikey",
//     pass: process.env.SENDGRID_API_KEY,
//   },
// };

// const transporter = nodemailer.createTransport(config);
// // console.log(transporter);
// const sendVerificationEmail = async (email, verificationToken) => {
//   const baseUrl =
//     `${process.env.BASE_URL}:${process.env.PORT}` ||
//     `${process.env.BASE_URL}:3000`;

//   // console.log(email);
//   // console.log(process.env.SENDER);

//   const emailOptions = {
//     from: process.env.SENDER,
//     to: email,
//     subject: "Verify your email address",
//     text: `To verify your email go to: ${baseUrl}/api/users/verify/${verificationToken}`,
//     html: `<p>To verify your email go to: <a clicktracking=off href="${baseUrl}/api/users/verify/${verificationToken}">${baseUrl}/api/users/verify/${verificationToken}</a></p>`,
//   };

//   transporter.sendMail(emailOptions);
// };

// module.exports = { sendVerificationEmail };

// -----------------------------------------------

const sgMail = require("@sendgrid/mail");

require("dotenv").config();

const apiKey = process.env.SENDGRID_API_KEY;
console.log(apiKey);
// sgMail.setApiKey(process.env.SENDGRID_API_KEY);
sgMail.setApiKey(apiKey);

// sgMail.setApiKey(
//   "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"
// );

sendVerificationEmail = async (email, verificationToken) => {
  const baseUrl =
    `${process.env.BASE_URL}:${process.env.PORT}` ||
    `${process.env.BASE_URL}:3000`;

  // console.log(email);
  // console.log(process.env.SENDER);

  const msg = {
    from: process.env.SENDER,
    to: email,
    subject: "Verify your email address",
    text: `To verify your email go to: ${baseUrl}/api/users/verify/${verificationToken}`,
    html: `<p>To verify your email go to: <a clicktracking=off href="${baseUrl}/api/users/verify/${verificationToken}">${baseUrl}/api/users/verify/${verificationToken}</a></p>`,
  };
  sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent");
    })
    .catch((error) => {
      console.error(error);
    });
};

module.exports = { sendVerificationEmail };
