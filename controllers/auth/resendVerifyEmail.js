const { User } = require("../../models/user");
const { HttpError, ctrlWrapper, sendEmail } = require("../../helpers");
const { BASE_URL } = process.env;

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError(404, "User not found");
  }
  if (user.verify) {
    throw HttpError(400, "Verification has already been passed");
  }

  const verifyEmail = {
    to: email,
    subject: "Verify your email",
    html: `<a
        target="_blank"
        href="${BASE_URL}/api/auth/verify/${user.verificationToken}">
        Click here to verify your email.
      </a>`,
  };

  await sendEmail(verifyEmail);

  res.status(200).json({ message: `"Verify email send success"` });
};

module.exports = { resendVerifyEmail: ctrlWrapper(resendVerifyEmail) };