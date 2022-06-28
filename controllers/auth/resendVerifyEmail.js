const { createError } = require("../../helpers");
const { User } = require("../../models/user");
const { sendMail } = require("../../helpers");

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw createError(404, "User not found");
  }
  if (user.verify) {
    throw createError(400, "Verification has already been passed");
  }
  const { verificationToken } = user;
  const mail = {
    to: email,
    subject: "Verify your email address",
    html: `<a target="_blank" href='http://localhost:3000/users/verify/${verificationToken}'>Click to verify your email address</a>`,
  };
  await sendMail(mail);
  res.json({ message: "Verification successful" });
};

module.exports = resendVerifyEmail;
