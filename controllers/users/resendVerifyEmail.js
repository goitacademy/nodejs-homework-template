const { User } = require("../../models");
const { HttpError, sendMail } = require("../../helpers");

const { BASE_URL } = process.env;

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError(404);
  }
  if (user.verify) {
    throw HttpError(400, "Verification has already been passed");
  }

  const verifyEmail = {
    to: email,
    subject: "Verify you email",
    html: `<a target="_blank" href="${BASE_URL}/verify/${user.verificationToken}">Click verify email</a>`,
  };

  await sendMail(verifyEmail);

  res.json({
    message: "Verify email resend",
  });
};

module.exports = resendVerifyEmail;
