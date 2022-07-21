const { createError, sendMail } = require("../../helpers");

const { User } = require("../../models/user");

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    throw createError(400, "Missing required field email");
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw createError(404, "User is not found");
  }
  if (user.verify) {
    throw createError(400, "Verification has already been passed");
  }

  const { verificationToken } = user;

  const mail = {
    to: email,
    subject: "Email conformation",
    html: `<a target="_blank" href="http://localhost:3000/api/auth/verify/${verificationToken}">Click here to confirm your email</a>`,
  };

  await sendMail(mail);

  res.json({ message: "Verification email sent" });
};

module.exports = resendVerifyEmail;
