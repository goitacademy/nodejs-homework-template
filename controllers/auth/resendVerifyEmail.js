const { User } = require("../../models/user");
const { ctrlWrapper, HttpError } = require("../../helpers");

const resendVerifyEmail = async (req, res) => {
  const { email } = req.params;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(400, "missing required field email");
  }

  if (user.verify) {
    throw HttpError(400, "Verification has already been passed");
  }

  const verifyEmail = {
    to: email,
    subject: "Verify email",
    html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${user.verificationToken}">Click veryfy</a>`,
  };

  await transport.sendMail(verifyEmail);

  res.json({
    message: "Verification email sent",
  });
};

module.exports = ctrlWrapper(resendVerifyEmail);
