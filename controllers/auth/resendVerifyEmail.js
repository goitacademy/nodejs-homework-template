const createError = require("http-errors");
const { authServices } = require("../../services");
const { sendVerifyMail } = require("../../helpers");

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;
  const user = await authServices.getByEmail({ email });
  if (!user) throw createError(404, "User not found");
  if (user.verified)
    throw createError(400, "Verification has already been passed");

  sendVerifyMail(email, user.verificationToken);

  res.status(200).json({
    message: "Verification email sent",
  });
};

module.exports = resendVerifyEmail;
