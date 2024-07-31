const nodemailer = require("nodemailer");

require("dotenv").config();

const USER = process.env.USER;
const PASS = process.env.PASS;

const transporter = nodemailer.createTransport({
  host: "smtp.mailgun.org",
  port: 587,
  secure: false,
  auth: {
    user: USER,
    pass: PASS,
  },
});

const verificationEmail = async (email, verificationToken) => {
  const options = {
    from: '"Klaudia Test" <contact@contact.com>',
    to: email,
    subject: "Verify your email",
    html: `<a href="${process.env.URL}:${
      process.env.PORT || 3000
    }/api/users/verify/${verificationToken}">Verify your email</a>`,
  };

  try {
    await transporter.sendMail(options);
  } catch (error) {
    console.error("Error sending verification email: ", error);
    throw error;
  }
};

module.expors = { verificationEmail };
