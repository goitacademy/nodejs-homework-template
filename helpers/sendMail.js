require("dotenv").config();

const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

function sendMail(message) {
  message["from"] = "krinn@centrum.cz";
  return sgMail
    .send(message)
    .then((response) => {
      console.log("Email sent successfully");
      console.log(response);
    })
    .catch((error) => {
      console.error("Error sending email:");
      console.error(error);
      if (error.response) {
        console.error("SendGrid API Response:");
        console.error(error.response.body);
      }
    });
}
module.exports = sendMail;
// const message = {
//   to: "krinn@centrum.cz",
//   from: "krinn@centrum.cz",
//   subject: "From Node.js with love",
//   html: '<h1 style="color: #ff0000">Node.js is awesome platform</h1>',
//   text: "Node.js is awesome platform",
// };
