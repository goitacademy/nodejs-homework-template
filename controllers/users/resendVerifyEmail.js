const { HttpError } = require("../../helpers");
const { User } = require("../../models");
const BASE_URL = process.env.BASE_URL;

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(404, "missing required field email");
  }
  if (user.verify) {
    throw HttpError(400, "Verification has already been passed");
  }

  const verifyEmail = {
    to: email,
    subject: "verify email",
    html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${user.verificationToken}">Click verify email</a>`,
  };

  await sendEmail(verifyEmail);

  return res.status(200).json({
    message: "Verification email sent",
  });
};

module.exports = resendVerifyEmail;
