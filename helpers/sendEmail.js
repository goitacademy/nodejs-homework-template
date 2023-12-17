const nodemailer = require("nodemailer");

const sendVerificationEmail = async (to, verificationToken) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.ukr.net",
    port: 465,
    secure: true,
    auth: {
      user: process.env.MAIL,
      pass: process.env.PASSWORD,
    },
  });

  const mailOptions = {
    from: "makunka44@ukr.net",
    to,
    subject: "Email Verification",
    html: `
      <p>Click the following link to verify your email:</p>
      <a href="${process.env.BASE_URL}/users/verify/${verificationToken}">Verify Email</a>
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
