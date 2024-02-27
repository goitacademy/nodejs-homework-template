const sgMail = require("@sendgrid/mail");

require("dotenv").config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendVerificationEmail = async (user) => {
  const msg = {
    to: user.email,
    from: process.env.SENDGRID_USER,
    subject: "Verify your email",
    text: `Please verify your email by clicking on this link: localhost:3000/users/verify/${user.verificationToken}`,
    html: `<p>Please verify your email by clicking on this link: <a href='localhost:3000/users/verify/${user.verificationToken}'>localhost:3000/users/verify/${user.verificationToken}</a></p>`,
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

module.exports = sendVerificationEmail;
