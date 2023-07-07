const nodemailer = require("nodemailer");

require("dotenv").config();

const config = {
  host: "smtp.sendgrid.net",
  port: 25,
  auth: {
    user: "apikey",
    pass: process.env.SENDGRID_API_KEY,
  },
};

const transporter = nodemailer.createTransport(config);

const sendVerificationEmail = async (email, verificationToken) => {
  const baseUrl =
    `${process.env.BASE_URL}:${process.env.PORT}` ||
    `${process.env.BASE_URL}:3001`;

  const emailOptions = {
    from: process.env.SENDER,
    to: email,
    subject: "Verify your email address",
    text: `To verify your email go to: ${baseUrl}/api/users/verify/${verificationToken}`,
    html: `<p>To verify your email go to: <a clicktracking=off href="${baseUrl}/api/users/verify/${verificationToken}">${baseUrl}/api/users/verify/${verificationToken}</a></p>`,
  };

  transporter.sendMail(emailOptions);
};

module.exports = { sendVerificationEmail };
