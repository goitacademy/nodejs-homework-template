const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: process.env.MAILTRAP_USER,
    pass: process.env.MAILTRAP_PASSWORD,
  },
});

// const message = {
//   to: "rasinoleg3@gmail.com",
//   from: "rasinoleg3@gmail.com",
//   subject: "From Node.js with love",
//   html: "<h1>Node.js is awesome platform</h1>",
//   text: "Node.js is awesome platform",
// };

function sendMail(message) {
  message.from = "rasinoleg3@gmail.com";
  return transport.sendMail(message);
}

module.exports = sendMail;
