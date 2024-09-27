const { BadRequest } = require("http-errors");
require("dotenv").config();

const { User } = require("../../models");
const { sendEmail } = require("../../services");

const { BASE_URL } = process.env;

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw new BadRequest("Missing required field email");
  }
  if (user.verify) {
    throw new BadRequest("Verification has already been passed");
  }

  const verifyEmail = {
    to: email,
    subject: "Please verify your email",
    html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${user.verificationToken}">Click to verify email</a>`,
  };

  await sendEmail(verifyEmail);

  res.status(200);
  res.json({
    message: "Verification email sent",
  });
};

module.exports = resendVerifyEmail;