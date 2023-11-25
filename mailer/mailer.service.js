const nodemailer = require("nodemailer");
const { gmailUser, gmailPassword } = require("../config");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: gmailUser,
    pass: gmailPassword,
  },
});

const sendMail = async (options) => {
  try {
    await transporter.sendMail(options);
  } catch (e) {
    console.error(e);
    throw new Error("Mail sending failed!");
  }
};

module.exports = {
  sendMail,
};
