import nodemailer from "nodemailer";
import { config } from "dotenv";

config();
const { NODEMAILER_USERNAME, NODEMAILER_PASSWORD } = process.env;

const transporter = nodemailer.createTransport({
  host: "smtp-relay.sendinblue.com",
  port: 587,
  auth: {
    user: NODEMAILER_USERNAME,
    pass: NODEMAILER_PASSWORD,
  },
});

export const sendVerificationEmail = (to, verificationToken) => {
  const subject = "Email Verification";
  const html = `<p>Click the following link to verify your email: <a href="http://localhost:3000/users/verify/${verificationToken}">Verify Email</a></p>`;

  const mailOptions = {
    from: NODEMAILER_USERNAME,
    to,
    subject,
    html,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};
