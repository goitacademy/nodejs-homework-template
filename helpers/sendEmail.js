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
//   to: "taracatus@gmail.com",
//   from: "taracatus@gmail.com",
//   subject: "From Node.js with love",
//   html: "<h1>Node.js is awesome platform</h1>",
//   text: "Node.js is awesome platform",
// };

function sendEmail(message) {
  message.from = "taracatus@gmail.com";

  return transport.sendMail(message);
}

// transport
//   .sendMail(message)
//   .then((response) => console.log(response))
//   .catch((error) => console.log(error));
module.exports = sendEmail;
