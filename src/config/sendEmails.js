const sgMail = require("@sendgrid/mail");
require("dotenv").config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendGridMsg = (email, verificationToken) => {
  const host = process.env.HOST;
  const SENDGRID_EMAIL = process.env.SENDGRID_EMAIL;
  const msg = {
    to: email, // Change to your recipient
    from: SENDGRID_EMAIL, // Change to your verified sender
    subject: "Registration Verefication",
    html: `<b>To verify your registration tap at this <a href="http://${host}/api/users/verify/${verificationToken}">link</a></b>`,
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

module.exports = sendGridMsg;
