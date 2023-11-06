const { ctrlWrapper } = require("../../decorators");

const { User } = require("../../models/User");

const { HttpError, sendEmail } = require("../../helpers");

const { BASE_URL } = process.env;

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError(404, "Email not found");
  }

  if (user.verify) {
    throw HttpError(400, "Verification has already been passed");
  }

  const verifyEmail = {
    to: email,
    subject: "Verify email",
    html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${user.verificationToken}">Click to verify</a>`,
  };

  await sendEmail(verifyEmail);

  res.json({
    message: "Verify email send",
  });
};

module.exports = ctrlWrapper(resendVerifyEmail);
