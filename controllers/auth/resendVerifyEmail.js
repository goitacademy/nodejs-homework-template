const { sendEmail, HttpError } = require("../../helpers");
const { templateHTML } = require("../../messages");
const { User } = require("../../models/user");

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError(400, "Not valid email");
  }

  const { verificationToken, verify } = user;
  if (verify) {
    throw HttpError(400, "Verification has already been passed");
  }

  const data = {
    email,
    verificationToken,
  };

  const verifyEmail = {
    to: email,
    subject: "Verify email",
    html: templateHTML.messageVerify(data),
  };

  await sendEmail(verifyEmail);

  res.json({ message: "Verification email sent" });
};

module.exports = resendVerifyEmail;
