const nodemailer = require("nodemailer");

const sendVerificationEmail = async (to, verificationToken) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.ukr.net",
    port: 465,
    secure: true,
    auth: {
      user: "makunka44@ukr.net",
      pass: "02095makK",
    },
  });

  const mailOptions = {
    from: "makunka44@ukr.net",
    to: "makunka44@gmail.com",
    subject: "Email Verification",
    text: `Click the following link to verify your email: /users/verify/${verificationToken}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Verification email sent successfully");
  } catch (error) {
    console.error("Error sending verification email:", error);
    throw error;
  }
};

module.exports = sendVerificationEmail;
