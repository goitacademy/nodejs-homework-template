const nodemailer = require("nodemailer");

require("dotenv").config();
const sender = process.env.AUTHUSERNAME;
const senderPassword = process.env.AUTHPASS;

const transporter = nodemailer.createTransport({
  service: "hotmail",
  auth: {
    user: sender,
    pass: senderPassword,
  },
});

async function sendVeryficationMail(email, verificationToken) {
  const link = `http://localhost:3000/api/auth/verify/${verificationToken}`;
  await transporter.sendMail({
    from: `"Your bestfriend from YouPlatform", <${sender}>`,
    to: email,
    subject: "Hello ✔",
    text: "Hello world?",
    html: `<b>Please confirm your mail: <a href="${link}">Naciśnij aby potwierdzić</a> </b>`,
  });
}

module.exports = {
  sendVeryficationMail,
};
