const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const sendVerifyEmail = (verificationToken, email) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to: email, // Change to your recipient
    from: "uu.sokil@gmail.com", // Change to your verified sender
    subject: "Sign up", // Change to your
    text: "Congratulations! You have successfully signed up",
    html: `<a href="http://localhost:3000/api/users/verify/${verificationToken}">Please, verify your email!</a>`,
  };
  // console.log(msg); // verificationToken=yes !!!
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
