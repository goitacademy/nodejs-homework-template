const nodemailer = require("nodemailer");
const { nanoid } = require("nanoid");
require("dotenv").config();

const mailtrapApiToken = process.env.MAILTRAP_APITOKEN;

function verificationToken() {
  return nanoid();
}
console.log(verificationToken());
const transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "0a4016d298c20f",
    pass: "f772d2da5304dd",
  },
});

function sendVerificationEmail(userEmail, verificationToken) {
  const verificationLink = `${mailtrapApiToken}/users/verify/${verificationToken}`;
  const mailOptions = {
    from: "0a4016d298c20f",
    to: userEmail,
    subject: "Email Verification",
    text: `Hello Hello ${verificationLink}`,
  };

  transport.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log("Error occurred:", err);
    } else {
      console.log("Email sent:", info.response);
    }
  });
}
const userEmail = "faceitszpn@gmail.com";
sendVerificationEmail(userEmail, verificationToken);

module.exports = { verificationToken, sendVerificationEmail };
