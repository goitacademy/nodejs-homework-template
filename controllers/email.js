const nodemailer = require("nodemailer");
const sgMail = require("@sendgrid/mail");
const ejs = require("ejs");
const path = require("path");
require("dotenv").config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const transporter = nodemailer.createTransport({
  service: "SendGrid",
  auth: {
    user: "apikey",
    pass: process.env.SENDGRID_API_KEY,
  },
});

module.exports = {
  sendVerificationEmail: async (email, verificationToken, req) => {
    try {
      const verificationLink = `${req.protocol}://${req.get(
        "host"
      )}/api/users/verify/${verificationToken}`;

      const html = await ejs.renderFile(
        path.join(__dirname, "../../views/verificationEmail.ejs"),
        { verificationLink }
      );

      const mailOptions = {
        from: process.env.SENDER_EMAIL,
        to: to,
        subject,
        html,
      };

      await transporter.sendMail(mailOptions);
    } catch (err) {
      console.error("Error sending verification email:", err);
      throw new Error("Error sending verification email");
    }
  },
};
