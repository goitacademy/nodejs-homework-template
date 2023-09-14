const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: process.env.MAILTRAP_USER,
    pass: process.env.MAILTRAP_PASSWORD,
  },
});

async function sendVerificationEmail(user, verificationToken) {
  try {
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: user.email,
      subject: "Verification Email",
      text: `Click the following link to verify your email: ${process.env.BASE_URL}/users/verify/${verificationToken}`,
    };

    await transporter.sendMail(mailOptions);

    console.log(`Verification email sent to ${user.email}`);
  } catch (error) {
    console.error("Error sending verification email:", error);
    throw error;
  }
}

module.exports = {
  sendVerificationEmail,
};
