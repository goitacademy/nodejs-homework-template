const nodemailer = require("nodemailer");
const { nanoid } = require("nanoid");

function verificationToken() {
  return nanoid();
}
console.log(verificationToken());
const transporter = nodemailer.createTransport({
  host: "https://poczta.wp.pl",
  port: 465,
  secure: true,
  auth: {
    user: `${process.env.emailLogin}`,
    pass: `${process.env.emailPass}`,
  },
});

function sendVerificationEmail(userEmail, verificationToken) {
  const verificationLink = `http://localhost:3000/users/verify/${verificationToken}`;
  const mailOptions = {
    from: `${process.env.emailLogin}`,
    to: userEmail,
    subject: "Email Verification",
    text: `Click the link below to verify your email:\n\n${verificationLink}`,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log("Error occurred:", err);
    } else {
      console.log("Email sent:", info.response);
    }
  });
}
const userEmail = `${process.env.sendEmail}`;
sendVerificationEmail(userEmail, verificationToken);

module.exports = { verificationToken };
