const sgMail = require("@sendgrid/mail");
require("dotenv").config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const mailMsg = (email, verificationToken) => {
  return {
    to: email,
    from: "slawomir.glinkau@gmail.com",
    subject: "Verify your email address",
    html: `
    <div>
      <h2> Confirm your email </h2>
      <p> Please click link to active your account </p>
      <a href="http://localhost:3000/api/users/verify/${verificationToken}">Confirm</a>
    </div>`,
  };
};

const sendMail = (email, verificationToken) => {
  sgMail
    .send(mailMsg(email, verificationToken))
    .then(() => {
      console.log("Email sent");
    })
    .catch((error) => {
      console.error(error);
    });
};

module.exports = sendMail;
