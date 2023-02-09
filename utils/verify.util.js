const sgMail = require("@sendgrid/mail");
require("dotenv").config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendVerifyEmail = (verificationToken, email) => {
  const msg = {
    to: "uu.sokil@gmail.com",
    from: "uu.sokil@gmail.com",
    subject: "Sign up",
    text: "Congratulations! You have successfully signed up",
    html: `<a href="http://localhost:3000/api/users/verify/${verificationToken}">Please, verify your email!</a>`,
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
