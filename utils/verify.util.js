const sgMail = require("@sendgrid/mail");
require("dotenv").config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendVerifyEmail = (verificationToken, email) => {
  const msg = {
    to: email, //"uu.sokil@gmail.com"
    from: process.env.SENDGRID_EMAIL,
    subject: "Sign up",
    text: "Congratulations! You have successfully signed up",
    html: `<a href="${process.env.SENDGRID_HOSTING}/api/users/verify/${verificationToken}">Please, verify your email!</a>`,
  };
  console.log(msg);
  sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent");
    })
    .catch((error) => {
      console.error(error);
    });
};

module.exports = { sendVerifyEmail };
