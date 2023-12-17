const nodemailer = require("nodemailer");

const sendVerificationEmail = async (verificationToken) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.meta.ua",
    port: 465,
    secure: true,
    auth: {
      user: "makunka44@meta.ua",
      pass: process.env.PASSWORD,
    },
  });

  const mailOptions = {
    from: "makunka44@meta.ua",
    to: "makunka44@gmail.com",
    subject: "Email Verification",
    html: `
      <p>Click the following link to verify your email:</p>
      <a href="http://localhost:3001/users/verify/${verificationToken}">Verify Email</a>
    `,
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
