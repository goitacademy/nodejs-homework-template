const { HttpError, sendEmail } = require("../../helpers");

const { User } = require("../../models/user");

const { BASE_URL } = process.env;

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(400, "Email not found");
  }
  if (user.verify) {
    throw HttpError(400, "Verification has already been passed");
  }
  const verifyEmail = {
    to: email,
    subject: "verify email",
    html: `<div><a target="_blank" href="${BASE_URL}/api/auth/verify/${user.verificationToken}">Click verify email</a><a target="_blank" href="localhost:5000//api/auth/verify/${user.verificationToken}">"http://${BASE_URL}/api/auth/verify/${user.verificationToken}"</a></div>`,
  };

  await sendEmail(verifyEmail);

  res.json({
    message: "Verification email sent",
  });
};

module.exports = resendVerifyEmail;
