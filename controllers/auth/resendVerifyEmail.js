const { ctrlWrapper } = require("../../utils");

const { User } = require("../../models/user");

const { HttpError } = require("../../helpers");

const { sendEmail } = require("../../services/email/sendEmail");

const emailTemplate = require("../../services/email/emailTemplate");

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(400, "missing required field email");
  }
  if (user.verify) {
    throw HttpError(400, "Verification has already been passed");
  }

  const verifyEmail = emailTemplate(email, user.verificationToken);

  await sendEmail(verifyEmail);
  res.json({ message: "Verification email sent" });
};

module.exports = {
  resendVerifyEmail: ctrlWrapper(resendVerifyEmail),
};
