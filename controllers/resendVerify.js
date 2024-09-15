const {RequestError, sendEmail } = require("../helpers");
const { User } = require("../models/user");

const resendVerify = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw RequestError(400, "missing required field email");
  }
  if (user.verify) {
    throw RequestError(400, "Verification has already been passed");
  }

  const verifyEmail = {
    to: email,
    suject: "Verify email",
    html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${user.verificationToken}">Click verify email</a>`,
  };

  await sendEmail(verifyEmail);

  res.json({ message: "Verification email sent" });
};
module.exports = resendVerify;