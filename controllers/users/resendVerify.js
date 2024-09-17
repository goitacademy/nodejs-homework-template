const { HttpError, ctrlWrapper, sendEmail } = require("../../helpers");
const { User } = require("../../models");

require("dotenv").config();
const { BASE_URL } = process.env;

const resendVerify = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!email) {
    throw HttpError(400, "missing required field email");
  }
  if (!user) {
    throw HttpError(401);
  }
  if (user.verify) {
    throw HttpError(400, "Verification has already been passed");
  }

  const varifyEmail = {
    to: email,
    subject: "Resend verify Email",
    html: `<a target="_blank" href="${BASE_URL}api/users/verify/${user.verifycationCode}">Click to verify email</a>`,
  };
  await sendEmail(varifyEmail);

  res.json({ message: "Verify email send success" });
};
module.exports = { resendVerify: ctrlWrapper(resendVerify) };